import { CodingStatsTab } from "@/components/analytics/CodingStatsTab";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { courses, skillMetrics } from "@/lib/mockData";
import { Award, BookOpen, Code, Edit2, Mail, User } from "lucide-react";

const StudentProfile = () => {
  const { user } = useAuth();

  // Get enrolled courses (in a real app, this would be filtered by user)
  const enrolledCourses = courses.slice(0, 3);

  // Calculate skill strengths
  const skillStrengths = [...skillMetrics]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account settings and view your progress
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Coding Stats</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal information and academic status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completed Challenges</CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7 days</div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Progress */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Course Progress</h4>
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.code}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Progress: {course.progress}%</div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Strengths */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Top Skills</h4>
                <div className="space-y-4">
                  {skillStrengths.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{skill.skill}</div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {skill.category}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Level {skill.level}/5</div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={skill.level * 20} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}</span>
                          <span>{skill.level * 20}% Mastery</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <CodingStatsTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="flex space-x-2">
                  <Input id="name" value={user?.name} disabled />
                  <Button size="icon" variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex space-x-2">
                  <Input id="email" value={user?.email} disabled />
                  <Button size="icon" variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;