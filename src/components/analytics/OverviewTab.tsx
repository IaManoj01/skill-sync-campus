
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data for charts
const weeklyActivityData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 2.9 },
  { day: "Sat", hours: 4.3 },
  { day: "Sun", hours: 1.5 },
];

const courseProgressData = [
  { name: "CS301", progress: 68 },
  { name: "CS401", progress: 42 },
  { name: "CS302", progress: 90 },
  { name: "CS501", progress: 30 },
];

export const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Coding Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.3</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
            <div className="h-1 w-full bg-gray-200 mt-2">
              <div className="h-1 bg-campus-blue" style={{ width: '65%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Academic Grade Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">89.5% average</p>
            <div className="h-1 w-full bg-gray-200 mt-2">
              <div className="h-1 bg-campus-green" style={{ width: '89.5%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/30</div>
            <p className="text-xs text-muted-foreground">50% completion rate</p>
            <div className="h-1 w-full bg-gray-200 mt-2">
              <div className="h-1 bg-campus-orange" style={{ width: '50%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Skill Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
            <div className="h-1 w-full bg-gray-200 mt-2">
              <div className="h-1 bg-campus-purple" style={{ width: '72%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Hours spent on coding practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" name="Hours" fill="#1E88E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Completion percentage by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={courseProgressData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" name="Progress %" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
