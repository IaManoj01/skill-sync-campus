
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Pie, Cell, Bar } from "recharts";

// Colors for charts
const COLORS = ["#1E88E5", "#4CAF50", "#FF9800", "#F44336", "#9C27B0"];

export const AcademicProgressTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Course Progress Over Time</CardTitle>
            <CardDescription>Your progress across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { week: "Week 1", CS301: 10, CS401: 5, CS302: 15, CS501: 3 },
                    { week: "Week 2", CS301: 20, CS401: 12, CS302: 30, CS501: 8 },
                    { week: "Week 3", CS301: 32, CS401: 18, CS302: 45, CS501: 12 },
                    { week: "Week 4", CS301: 45, CS401: 24, CS302: 60, CS501: 15 },
                    { week: "Week 5", CS301: 55, CS401: 30, CS302: 75, CS501: 20 },
                    { week: "Week 6", CS301: 68, CS401: 42, CS302: 90, CS501: 30 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="CS301" name="Data Structures" stroke="#1E88E5" />
                  <Line type="monotone" dataKey="CS401" name="Web Development" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="CS302" name="Database Management" stroke="#FF9800" />
                  <Line type="monotone" dataKey="CS501" name="Machine Learning" stroke="#F44336" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Your grades by assignment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Quizzes", value: 92 },
                      { name: "Assignments", value: 88 },
                      { name: "Projects", value: 95 },
                      { name: "Exams", value: 85 },
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
                    {[0, 1, 2, 3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignment Submission Timeline</CardTitle>
            <CardDescription>Days before deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { assignment: "A1", days: 2 },
                    { assignment: "A2", days: -1 },
                    { assignment: "A3", days: 3 },
                    { assignment: "A4", days: 1 },
                    { assignment: "A5", days: 0 },
                    { assignment: "A6", days: -2 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="assignment" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="days"
                    name="Days before deadline"
                    fill="#4CAF50"
                  >
                    {/* Use Cell components to conditionally color the bars based on values */}
                    {[0, 1, 2, 3, 4, 5].map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? "#4CAF50" : "#F44336"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicProgressTab;
