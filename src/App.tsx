
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Analytics from "./pages/Analytics";
import CodingChallenge from "./pages/CodingChallenge";
import CodingChallenges from "./pages/CodingChallenges";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import UserManagement from "./pages/admin/UserManagement";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProgress from "./pages/student/StudentProgress";
import AdminProfile from "./pages/admin/Profile";
import StudentProfile from "./pages/student/Profile";

// Components
import { useEffect } from "react";
import AiAssistant from "./components/AiAssistant";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { useAuth } from "./contexts/AuthContext";

// Role-based route component
const RoleBasedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: 'admin' | 'student' }) => {
  const userRole = localStorage.getItem('userRole') || 'student';
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // If user is logged in but has the wrong role, redirect to the proper portal
    if (!isLoading && user && userRole !== requiredRole) {
      // Set the correct role in localStorage before redirecting
      localStorage.setItem('userRole', requiredRole);
      window.location.href = `/${requiredRole}`;
    }
  }, [user, userRole, requiredRole, isLoading]);

  // Always render children - DashboardLayout will handle redirects for unauthenticated users
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
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/coding" element={<CodingChallenges />} />
          <Route path="/coding/:challengeId" element={<CodingChallenge />} />
          
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
            <Route path="profile" element={<AdminProfile />} />
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
            <Route path="profile" element={<StudentProfile />} />
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
