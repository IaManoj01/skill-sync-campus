
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart3,
  Bell,
  BookOpen,
  Code,
  Layers,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  isAdmin?: boolean;
}

const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  // Get role from localStorage
  const userRole = localStorage.getItem('userRole') || 'student';
  const baseUrl = isAdmin ? '/admin' : '/student';

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Close sidebar on mobile by default
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userRole'); // Clear role on logout
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleSwitchPortal = () => {
    localStorage.removeItem('userRole'); // Clear role before switching
    navigate('/');
  };

  if (!user) return null;

  // Different navigation items based on role
  const adminNavItems = [
    { icon: <Users className="w-5 h-5 mr-3" />, label: 'Manage Users', path: `${baseUrl}/users` },
    { icon: <BookOpen className="w-5 h-5 mr-3" />, label: 'Courses', path: `${baseUrl}/courses` },
    { icon: <Code className="w-5 h-5 mr-3" />, label: 'Coding Challenges', path: `${baseUrl}/coding` },
    { icon: <BarChart3 className="w-5 h-5 mr-3" />, label: 'Analytics', path: `${baseUrl}/analytics` },
    { icon: <Settings className="w-5 h-5 mr-3" />, label: 'Settings', path: `${baseUrl}/settings` },
    { icon: <User className="w-5 h-5 mr-3" />, label: 'Profile', path: `${baseUrl}/profile` },
  ];

  const studentNavItems = [
    { icon: <BookOpen className="w-5 h-5 mr-3" />, label: 'My Courses', path: `${baseUrl}/courses` },
    { icon: <Code className="w-5 h-5 mr-3" />, label: 'Coding Challenges', path: `${baseUrl}/coding` },
    { icon: <Layers className="w-5 h-5 mr-3" />, label: 'My Progress', path: `${baseUrl}/progress` },
    { icon: <User className="w-5 h-5 mr-3" />, label: 'Profile', path: `${baseUrl}/profile` },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-30 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-20 flex flex-col w-64 h-full bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo with portal indicator */}
        <div className="flex flex-col items-center justify-center h-24 border-b">
          <Link to={baseUrl} className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-600 mr-2"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span className="font-bold text-xl text-gray-800">Campus Bridge</span>
          </Link>
          <span className={`text-sm mt-1 px-3 py-1 rounded-full ${isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
            {isAdmin ? 'Admin Portal' : 'Student Portal'}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link
                to={baseUrl}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                Dashboard
              </Link>
            </li>

            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Option to switch portals */}
            <li className="mt-6">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handleSwitchPortal}
              >
                <svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Switch Portal
              </Button>
            </li>
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{isAdmin ? 'Administrator' : 'Student'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {/* Top navbar */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSwitchPortal}>
                    <svg 
                      className="mr-2 h-4 w-4"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Switch Portal</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
