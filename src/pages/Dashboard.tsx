
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Code, 
  Clock, 
  Award, 
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses, codingChallenges, skillMetrics } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  // Get enrolled courses (in a real app, this would be filtered by user)
  const enrolledCourses = courses.slice(0, 3);
  
  // Get trending challenges
  const trendingChallenges = codingChallenges.slice(0, 2);

  // Calculate upcoming deadlines
  const upcomingDeadlines = enrolledCourses.flatMap(course => 
    course.assignments.filter(assignment => 
      assignment.status === 'pending'
    ).map(assignment => ({
      ...assignment,
      course: course.title,
      courseCode: course.code
    }))
  ).slice(0, 3);

  // Calculate skill strengths
  const skillStrengths = [...skillMetrics]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  // Calculate skill weaknesses
  const skillWeaknesses = [...skillMetrics]
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your academic and coding progress.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              Academic progress on track
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Challenges</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 challenges this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">
              Keep up the good work!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Coding Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36.5</div>
            <p className="text-xs text-muted-foreground">
              Up 12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current courses */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Your enrolled academic courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-muted-foreground">{course.code}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Progress: {course.progress}%</div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Upcoming deadlines */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments and submissions due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="font-medium">{deadline.title}</p>
                  <p className="text-sm text-muted-foreground">{deadline.courseCode} - {deadline.course}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="font-medium">Due</p>
                  <p className="text-campus-orange">{new Date(deadline.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Track All Deadlines</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Coding challenges section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Coding Challenges</h2>
          <Button variant="outline" asChild>
            <Link to="/coding">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {trendingChallenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{challenge.title}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    challenge.difficulty === 'easy' 
                      ? 'bg-campus-green/10 text-campus-green' 
                      : challenge.difficulty === 'medium'
                      ? 'bg-campus-orange/10 text-campus-orange'
                      : 'bg-campus-red/10 text-campus-red'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <CardDescription>{challenge.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{challenge.description.length > 100 ? `${challenge.description.substring(0, 100)}...` : challenge.description}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/coding/${challenge.id}`}>Solve Challenge</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Strengths</CardTitle>
              <CheckCircle className="h-4 w-4 text-campus-green" />
            </div>
            <CardDescription>Areas where you excel</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {skillStrengths.map((skill) => (
                <li key={skill.skill} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{skill.skill}</p>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-5 rounded ${i < skill.level ? 'bg-campus-green' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Areas to Improve */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Areas to Improve</CardTitle>
              <AlertTriangle className="h-4 w-4 text-campus-orange" />
            </div>
            <CardDescription>Focus on these skills</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {skillWeaknesses.map((skill) => (
                <li key={skill.skill} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{skill.skill}</p>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-5 rounded ${i < skill.level ? 'bg-campus-orange' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
