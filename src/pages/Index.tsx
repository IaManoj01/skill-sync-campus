
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCog, UserRound, BookOpen, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: "admin" | "student") => {
    // Store the selected role in localStorage for future reference
    localStorage.setItem("userRole", role);
    
    // Navigate to the appropriate dashboard based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        <div className="flex flex-col items-center mb-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 text-blue-600 mb-4"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <h1 className="text-4xl font-bold mt-2 text-gray-800">Campus Bridge</h1>
          <p className="text-xl text-gray-600 mt-2">Integrated Academic LMS + Coding Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-6 space-y-4">
              <UserCog className="h-24 w-24 text-blue-600" />
              <div className="text-center space-y-2">
                <p className="text-gray-700">For instructors and administrators</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Manage student enrollments</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Create and edit courses</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>View analytics and reports</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => handleRoleSelection("admin")} 
                className="w-full text-lg py-6"
                size="lg"
              >
                Enter as Admin
              </Button>
            </CardFooter>
          </Card>

          {/* Student Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center">Student Portal</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-6 space-y-4">
              <UserRound className="h-24 w-24 text-blue-600" />
              <div className="text-center space-y-2">
                <p className="text-gray-700">For students and learners</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center justify-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Browse and enroll in courses</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Code className="h-4 w-4 mr-2" />
                    <span>Practice coding challenges</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Track your learning progress</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => handleRoleSelection("student")} 
                className="w-full text-lg py-6"
                size="lg"
              >
                Enter as Student
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
