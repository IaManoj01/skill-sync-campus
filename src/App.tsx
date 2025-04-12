
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CodingChallenges from "./pages/CodingChallenges";
import CodingChallenge from "./pages/CodingChallenge";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import StudentProgress from "./pages/student/StudentProgress";

// Components
import DashboardLayout from "./components/layouts/DashboardLayout";
import AiAssistant from "./components/AiAssistant";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// Role-based route component
const RoleBasedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: 'admin' | 'student' }) => {
  const userRole = localStorage.getItem('userRole') || 'student';
  const { user } = useAuth();
  
  useEffect(() => {
    // If no user is logged in, we won't redirect as the login component will handle that
    if (!user) return;
    
    // If user has the wrong role, redirect to the proper portal
    if (userRole !== requiredRole) {
      window.location.href = `/${userRole}`;
    }
  }, [user, userRole, requiredRole]);

  if (!user) return null;
  
  // If user has the correct role, render the children
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <RoleBasedRoute requiredRole="admin">
              <DashboardLayout isAdmin={true} />
            </RoleBasedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="coding" element={<CodingChallenges />} />
            <Route path="coding/:challengeId" element={<CodingChallenge />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Student routes */}
          <Route path="/student" element={
            <RoleBasedRoute requiredRole="student">
              <DashboardLayout isAdmin={false} />
            </RoleBasedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="coding" element={<CodingChallenges />} />
            <Route path="coding/:challengeId" element={<CodingChallenge />} />
            <Route path="progress" element={<StudentProgress />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* AI Assistant available on all pages */}
        <AiAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
