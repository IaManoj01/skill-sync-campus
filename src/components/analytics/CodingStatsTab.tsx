
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell, Line } from "recharts";

// Mock data for charts
const challengeCompletionData = [
  { name: "Easy", completed: 8, total: 10 },
  { name: "Medium", completed: 5, total: 12 },
  { name: "Hard", completed: 2, total: 8 },
];

// Colors for charts
const COLORS = ["#1E88E5", "#4CAF50", "#FF9800", "#F44336", "#9C27B0"];

export const CodingStatsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Challenge Completion Rate</CardTitle>
            <CardDescription>By difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={challengeCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                  <Bar dataKey="total" name="Total" fill="#1E88E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Language Usage</CardTitle>
            <CardDescription>Time spent by programming language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Python", value: 45 },
                      { name: "JavaScript", value: 25 },
                      { name: "Java", value: 15 },
                      { name: "C++", value: 10 },
                      { name: "SQL", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {[0, 1, 2, 3, 4].map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Coding Activity Timeline</CardTitle>
            <CardDescription>Hours spent coding per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "Apr 1", hours: 2.5 },
                    { date: "Apr 2", hours: 1.8 },
                    { date: "Apr 3", hours: 3.2 },
                    { date: "Apr 4", hours: 2.1 },
                    { date: "Apr 5", hours: 2.9 },
                    { date: "Apr 6", hours: 4.3 },
                    { date: "Apr 7", hours: 1.5 },
                    { date: "Apr 8", hours: 3.7 },
                    { date: "Apr 9", hours: 2.2 },
                    { date: "Apr 10", hours: 3.0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" name="Hours" stroke="#1E88E5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodingStatsTab;
