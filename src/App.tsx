
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// Layout
import DashboardLayout from "./components/layouts/DashboardLayout";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// Role-based route component
const RoleBasedRoute = ({ children }: { children: React.ReactNode }) => {
  const userRole = localStorage.getItem('userRole') || 'student';
  const { user } = useAuth();
  
  useEffect(() => {
    // If no user is logged in, we won't redirect as the login component will handle that
    if (!user) return;
  }, [user]);

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
            <RoleBasedRoute>
              <DashboardLayout isAdmin={true} />
            </RoleBasedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="coding" element={<CodingChallenges />} />
            <Route path="coding/:challengeId" element={<CodingChallenge />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          {/* Student routes */}
          <Route path="/student" element={
            <RoleBasedRoute>
              <DashboardLayout isAdmin={false} />
            </RoleBasedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="coding" element={<CodingChallenges />} />
            <Route path="coding/:challengeId" element={<CodingChallenge />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
