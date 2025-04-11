
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";
import { skillMetrics } from "@/lib/mockData";

// Colors for charts
const COLORS = ["#1E88E5", "#4CAF50", "#FF9800", "#F44336", "#9C27B0"];

// Data for skill distribution chart
const skillDistributionData = [
  { name: "Data Structures", value: 35 },
  { name: "Algorithms", value: 25 },
  { name: "Web Development", value: 20 },
  { name: "Databases", value: 10 },
  { name: "Languages", value: 10 },
];

export const SkillsAnalysisTab = () => {
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
                    {skillDistributionData.map((_, index) => (
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
    </div>
  );
};

export default SkillsAnalysisTab;
