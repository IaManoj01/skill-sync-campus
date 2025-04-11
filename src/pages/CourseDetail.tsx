
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Clock, BookOpen, FileText, Video, Play, AlertCircle } from "lucide-react";
import { courses } from "@/lib/mockData";
import { Course } from "@/lib/mockData";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("materials");

  useEffect(() => {
    // Find the course with the matching ID
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-muted-foreground">Course not found</p>
      </div>
    );
  }

  // Helper function to render the appropriate icon based on material type
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "quiz":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.code} • {course.credits} credits
          </p>
        </div>
      </div>

      {/* Course info and progress */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{course.description}</p>
            <div>
              <h3 className="font-medium mb-2">Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {course.instructor.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Professor</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center flex-col">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${course.progress} 100`}
                    className="text-campus-blue"
                    transform="rotate(-90 18 18)"
                  ></circle>
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-bold">{course.progress}%</p>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p>Course materials</p>
                <p>{Math.round(course.progress / 100 * course.materials.length)}/{course.materials.length}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Assignments</p>
                <p>
                  {course.assignments.filter(a => a.status === "submitted" || a.status === "graded").length}/
                  {course.assignments.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for materials, assignments, etc. */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="materials">Course Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4 mt-6">
          {course.materials.length > 0 ? (
            <div className="grid gap-4">
              {course.materials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-md ${
                          material.type === "pdf" 
                            ? "bg-red-100 text-red-700" 
                            : material.type === "video" 
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {getMaterialIcon(material.type)}
                        </div>
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Added on {formatDate(material.dateUploaded)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {material.type === "video" ? (
                          <Button size="sm" className="flex items-center">
                            <Play className="h-4 w-4 mr-1" />
                            Watch
                          </Button>
                        ) : (
                          <Button size="sm" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No materials available</h3>
              <p className="text-muted-foreground">
                Course materials will be added soon
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4 mt-6">
          {course.assignments.length > 0 ? (
            <div className="grid gap-4">
              {course.assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-md ${
                          assignment.status === "pending" 
                            ? "bg-yellow-100 text-yellow-700" 
                            : assignment.status === "submitted" 
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Due {formatDate(assignment.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {assignment.status === "graded" && (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            Grade: {assignment.grade}%
                          </div>
                        )}
                        {assignment.status === "pending" && (
                          <Button size="sm">Submit</Button>
                        )}
                        {assignment.status === "submitted" && (
                          <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            Submitted
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No assignments yet</h3>
              <p className="text-muted-foreground">
                Check back later for assignments
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetail;
