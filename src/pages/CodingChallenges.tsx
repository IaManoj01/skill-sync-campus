
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Code, Filter } from "lucide-react";
import { codingChallenges } from "@/lib/mockData";

const CodingChallenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories
  const categories = Array.from(
    new Set(codingChallenges.map((challenge) => challenge.category))
  );

  // Filter challenges
  const filteredChallenges = codingChallenges.filter((challenge) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Apply difficulty filter
    const matchesDifficulty =
      difficultyFilter === "all" || challenge.difficulty === difficultyFilter;

    // Apply category filter
    const matchesCategory =
      categoryFilter === "all" || challenge.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-campus-green/10 text-campus-green";
      case "medium":
        return "bg-campus-orange/10 text-campus-orange";
      case "hard":
        return "bg-campus-red/10 text-campus-red";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
        <p className="text-muted-foreground">
          Practice your coding skills with these challenges
        </p>
      </div>

      {/* Search and filters */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search challenges, tags, etc..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Challenge cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-1">{challenge.title}</CardTitle>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent className="py-2 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {challenge.description}
              </p>
              
              <div className="mt-4">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Available languages
                </div>
                <div className="flex flex-wrap gap-2">
                  {challenge.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-1 bg-secondary rounded-md text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button asChild className="w-full">
                <Link to={`/coding/${challenge.id}`}>Solve Challenge</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Code className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">No challenges found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery("");
            setDifficultyFilter("all");
            setCategoryFilter("all");
          }}>
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodingChallenges;
