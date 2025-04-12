import { Link } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  BarChart3,
  PlusCircle,
  Clock,
  Percent
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/mockData";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // For simplicity, we'll use the mock data
  const totalStudents = 245;
  const activeStudents = 189;
  const totalCourses = courses.length;
  const averageCompletion = 67;

  // Recent course enrollments (mocked data)
  const recentEnrollments = [
    { id: 1, student: "Emma Johnson", course: "Introduction to Computer Science", date: "2025-04-10" },
    { id: 2, student: "James Wilson", course: "Data Structures and Algorithms", date: "2025-04-09" },
    { id: 3, student: "Sophia Lee", course: "Web Development Fundamentals", date: "2025-04-08" },
    { id: 4, student: "Michael Brown", course: "Database Management Systems", date: "2025-04-08" },
    { id: 5, student: "Olivia Smith", course: "Machine Learning Basics", date: "2025-04-07" },
  ];

  // Popular courses based on enrollment numbers
  const popularCourses = [...courses]
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your educational platform, monitor student progress, and analyze performance data.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {activeStudents} active in the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              3 new courses this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">
              Up 5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 hrs</div>
            <p className="text-xs text-muted-foreground">
              Per student per week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent enrollments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>Latest students joining courses</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.student}</TableCell>
                  <TableCell>{enrollment.course}</TableCell>
                  <TableCell>{new Date(enrollment.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Popular courses */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Popular Courses</CardTitle>
                <CardDescription>Highest enrollment rates</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/courses">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-muted-foreground">{course.enrolled} students</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Completion: {course.progress}%</div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/admin/courses">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Platform usage statistics</CardDescription>
          </CardHeader>
          <CardContent className="flex h-60 items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">Analytics visualization would be displayed here</p>
              <p className="text-sm">Check the Analytics page for detailed reports</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/analytics">View Detailed Analytics</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
