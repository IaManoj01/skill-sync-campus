
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, BookOpen, Users, Award } from "lucide-react";
import { courses } from "@/lib/mockData";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Browse and manage your academic courses
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      {/* Courses grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                {course.code}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4" />
                {course.enrolled} students enrolled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm line-clamp-2">{course.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p>Progress</p>
                  <p className="font-medium">{course.progress}%</p>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{course.materials.length} materials</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="mr-1 h-4 w-4" />
                  <span>{course.credits} credits</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/courses/${course.id}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredCourses.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
