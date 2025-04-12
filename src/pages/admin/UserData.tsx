
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

interface UserEnrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
}

const UserData = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userEnrollments, setUserEnrollments] = useState<UserEnrollment[]>([]);
  const { isAdmin } = useAuth();

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data as UserProfile[]);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // Fetch user enrollments when a user is selected
  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!selectedUser) return;
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', selectedUser.id);

        if (error) throw error;
        setUserEnrollments(data as UserEnrollment[]);
      } catch (error) {
        console.error('Error loading user enrollments:', error);
      }
    };

    fetchUserEnrollments();
  }, [selectedUser]);

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.full_name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Handle viewing user details
  const handleViewUser = (user: UserProfile) => {
    setSelectedUser(user);
  };

  // Close user details dialog
  const closeDialog = () => {
    setSelectedUser(null);
    setUserEnrollments([]);
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Data</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No users match your search criteria" : "No users found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? "destructive" : "default"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p>{selectedUser.full_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Username</h3>
                  <p>{selectedUser.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <Badge variant={selectedUser.role === 'admin' ? "destructive" : "default"}>
                    {selectedUser.role}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Registered On</h3>
                  <p>{new Date(selectedUser.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Enrolled Courses</h3>
                {userEnrollments.length === 0 ? (
                  <p className="text-gray-500">No course enrollments found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course ID</TableHead>
                        <TableHead>Enrolled On</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userEnrollments.map((enrollment) => {
                        const course = courses.find(c => c.id === enrollment.course_id);
                        return (
                          <TableRow key={enrollment.id}>
                            <TableCell>{course ? `${course.title} (${course.code})` : enrollment.course_id}</TableCell>
                            <TableCell>{new Date(enrollment.enrolled_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={enrollment.completed_at ? "success" : "secondary"}>
                                {enrollment.completed_at ? "Completed" : "In Progress"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserData;
