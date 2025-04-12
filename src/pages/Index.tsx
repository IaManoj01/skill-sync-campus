
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserCog, UserRound } from "lucide-react";

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
            <CardContent className="flex justify-center pb-6">
              <UserCog className="h-32 w-32 text-blue-600" />
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
            <CardContent className="flex justify-center pb-6">
              <UserRound className="h-32 w-32 text-blue-600" />
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
