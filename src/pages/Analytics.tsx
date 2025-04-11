
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell } from "recharts";
import { skillMetrics } from "@/lib/mockData";

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

const challengeCompletionData = [
  { name: "Easy", completed: 8, total: 10 },
  { name: "Medium", completed: 5, total: 12 },
  { name: "Hard", completed: 2, total: 8 },
];

const skillDistributionData = [
  { name: "Data Structures", value: 35 },
  { name: "Algorithms", value: 25 },
  { name: "Web Development", value: 20 },
  { name: "Databases", value: 10 },
  { name: "Languages", value: 10 },
];

const COLORS = ["#1E88E5", "#4CAF50", "#FF9800", "#F44336", "#9C27B0"];

const Analytics = () => {
  // Prepare skill heatmap data
  const getSkillsByCategory = () => {
    const categoryMap: Record<string, Array<typeof skillMetrics[0]>> = {};
    
    skillMetrics.forEach(skill => {
      if (!categoryMap[skill.category]) {
        categoryMap[skill.category] = [];
      }
      categoryMap[skill.category].push(skill);
    });
    
    return categoryMap;
  };

  const categorySkills = getSkillsByCategory();
  
  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-100", // Level 0
      "bg-blue-100", // Level 1
      "bg-blue-200", // Level 2
      "bg-blue-300", // Level 3
      "bg-blue-400", // Level 4
      "bg-blue-500", // Level 5
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and performance across courses and coding challenges
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic Progress</TabsTrigger>
          <TabsTrigger value="coding">Coding Stats</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
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
        </TabsContent>

        {/* Academic Progress Tab */}
        <TabsContent value="academic" className="space-y-6">
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
                        {skillDistributionData.map((entry, index) => (
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
                        {weeklyActivityData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.hours > 0 ? "#4CAF50" : "#F44336"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Coding Stats Tab */}
        <TabsContent value="coding" className="space-y-6">
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
                        {skillDistributionData.map((entry, index) => (
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
        </TabsContent>

        {/* Skills Analysis Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Skills Heatmap</CardTitle>
                <CardDescription>Visualization of your skill levels by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(categorySkills).map(([category, skills]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-3">{category}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {skills.map((skill) => (
                          <div
                            key={skill.skill}
                            className={`p-4 rounded-md skill-heatmap-cell ${getLevelColor(skill.level)}`}
                          >
                            <div className="font-medium">{skill.skill}</div>
                            <div className="text-sm mt-1 flex items-center justify-between">
                              <span>Level: {skill.level}/5</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-3 mx-0.5 rounded-sm ${
                                      i < skill.level ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Breakdown of your skill categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {skillDistributionData.map((entry, index) => (
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
                <CardTitle>Improvement Opportunities</CardTitle>
                <CardDescription>Suggested skills to focus on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillMetrics
                    .filter(skill => skill.level <= 2)
                    .sort((a, b) => a.level - b.level)
                    .slice(0, 5)
                    .map((skill, idx) => (
                      <div key={idx} className="flex items-center justify-between">
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
                      </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Recommended Focus Areas:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-campus-red mr-2"></div>
                      <span>Complete Graph Algorithms practice problems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-campus-red mr-2"></div>
                      <span>Improve C++ fundamentals through coding challenges</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-campus-red mr-2"></div>
                      <span>Work on Dynamic Programming advanced concepts</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
