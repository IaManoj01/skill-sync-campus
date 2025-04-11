
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/analytics/OverviewTab";
import { AcademicProgressTab } from "@/components/analytics/AcademicProgressTab";
import { CodingStatsTab } from "@/components/analytics/CodingStatsTab";
import { SkillsAnalysisTab } from "@/components/analytics/SkillsAnalysisTab";

const Analytics = () => {
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
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        {/* Academic Progress Tab */}
        <TabsContent value="academic">
          <AcademicProgressTab />
        </TabsContent>

        {/* Coding Stats Tab */}
        <TabsContent value="coding">
          <CodingStatsTab />
        </TabsContent>

        {/* Skills Analysis Tab */}
        <TabsContent value="skills">
          <SkillsAnalysisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
