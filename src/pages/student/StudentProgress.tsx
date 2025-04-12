
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Code, Clock } from "lucide-react";

const StudentProgress = () => {
  // Mock data for demonstration
  const courses = [
    { id: 1, name: "Introduction to Web Development", progress: 75, modules: 12, completed: 9 },
    { id: 2, name: "Advanced JavaScript", progress: 45, modules: 10, completed: 4 },
    { id: 3, name: "React Fundamentals", progress: 20, modules: 8, completed: 1 },
    { id: 4, name: "Database Design", progress: 60, modules: 6, completed: 3 },
  ];

  const codingChallenges = [
    { id: 1, name: "Array Manipulation", difficulty: "Medium", status: "Completed", score: 92 },
    { id: 2, name: "String Operations", difficulty: "Easy", status: "Completed", score: 100 },
    { id: 3, name: "Tree Traversal", difficulty: "Hard", status: "In Progress", score: 0 },
    { id: 4, name: "Graph Algorithms", difficulty: "Hard", status: "Not Started", score: 0 },
  ];

  const achievements = [
    { id: 1, name: "Fast Learner", description: "Completed 5 modules in a single day", date: "2023-04-05", icon: Clock },
    { id: 2, name: "Code Master", description: "Solved 10 hard coding challenges", date: "2023-05-12", icon: Code },
    { id: 3, name: "Course Explorer", description: "Enrolled in 5 different courses", date: "2023-06-20", icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Progress</h2>
        <p className="text-muted-foreground">Track your learning journey and achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <Progress value={58} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/7</div>
            <p className="text-xs text-muted-foreground">28.5% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coding Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/15</div>
            <p className="text-xs text-muted-foreground">53.3% solved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="coding">Coding Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{course.name}</h3>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{course.completed} of {course.modules} modules completed</span>
                      <span>Last activity: 2 days ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Coding Challenge Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {codingChallenges.map(challenge => (
                  <div key={challenge.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{challenge.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                          challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          challenge.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                          challenge.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {challenge.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {challenge.status === 'Completed' ? (
                        <div className="text-lg font-bold">{challenge.score}/100</div>
                      ) : (
                        <Button variant="outline" size="sm">
                          {challenge.status === 'In Progress' ? 'Continue' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map(achievement => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-start gap-4 border-b pb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Icon className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Achieved on: {achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProgress;
