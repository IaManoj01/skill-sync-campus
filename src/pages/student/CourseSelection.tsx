
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from '@/components/ui/label';
import { BookOpen, ArrowRight, Clock, Users } from 'lucide-react';
import { courses } from '@/lib/mockData';

const CourseSelection = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    if (selectedCourses.length === 0) {
      toast({
        title: "No courses selected",
        description: "Please select at least one course to enroll.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create enrollments for each selected course
      const enrollments = selectedCourses.map(courseId => ({
        user_id: user.id,
        course_id: courseId,
      }));

      const { error } = await supabase
        .from('enrollments')
        .insert(enrollments);

      if (error) throw error;

      toast({
        title: "Courses selected!",
        description: `You are now enrolled in ${selectedCourses.length} courses.`,
      });

      navigate('/student');
    } catch (error) {
      console.error('Error enrolling in courses:', error);
      toast({
        title: "Error",
        description: "Failed to enroll in courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Campus Bridge!</h1>
        <p className="text-gray-600 mt-2">Select the courses you're interested in to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {courses.map(course => (
          <Card 
            key={course.id} 
            className={`cursor-pointer transition-all ${
              selectedCourses.includes(course.id) 
                ? 'ring-2 ring-blue-500 border-blue-300' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleToggleCourse(course.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </div>
                <div className="flex justify-center items-center h-6 w-6">
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={() => handleToggleCourse(course.id)}
                    className="pointer-events-none"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{course.enrolledStudents} students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || selectedCourses.length === 0}
          className="flex items-center gap-2"
        >
          {isSubmitting ? "Enrolling..." : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseSelection;
