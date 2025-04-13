
import { CodingStatsTab } from "@/components/analytics/CodingStatsTab";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { codingChallenges, CodingChallenge as CodingChallengeType } from "@/lib/mockData";
import MonacoEditor from "@monaco-editor/react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  HelpCircle,
  ListChecks,
  Play,
  RotateCcw,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CodingChallenge = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<CodingChallengeType | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; output: string; expected: string }>
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    // Find the challenge with the matching ID
    const foundChallenge = codingChallenges.find((c) => c.id === challengeId);
    if (foundChallenge) {
      setChallenge(foundChallenge);
      // Set default language to Java if available, otherwise first language
      if (foundChallenge.languages.length > 0) {
        const preferredLanguage = foundChallenge.languages.includes('Java') 
          ? 'Java' 
          : foundChallenge.languages[0];
        setSelectedLanguage(preferredLanguage);
        setCode(foundChallenge.starter_code[preferredLanguage] || "");
      }
    }
  }, [challengeId]);

  useEffect(() => {
    // Update code when language changes
    if (challenge && selectedLanguage) {
      setCode(challenge.starter_code[selectedLanguage] || "");
    }
  }, [selectedLanguage, challenge]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    
    // Use our code validation service to run the code with a sample input
    setTimeout(() => {
      // Import the validation function
      import("@/lib/codeValidation").then(({ validateCode }) => {
        if (!challenge) return;
        
        // Use the first test case as a sample input
        const sampleTest = challenge.test_cases[0];
        const result = validateCode(
          code,
          selectedLanguage,
          sampleTest.input,
          sampleTest.output
        );
        
        if (result.error) {
          setOutput(`Running your code...\n\nError: ${result.error}\n\nPlease check your code and try again.`);
          toast({
            title: "Code execution failed",
            description: "There was an error executing your code.",
            variant: "destructive",
          });
        } else {
          setOutput(`Running your code...\n\nCompilation successful!\n\nInput: ${result.input}\nYour Output: ${result.output}\nExpected: ${result.expected}\n\n${result.passed ? "✅ Your solution is correct!" : "❌ Your solution is incorrect."}`);
          toast({
            title: result.passed ? "Code executed successfully" : "Code executed with issues",
            description: result.passed ? "Your code ran without errors and produced the correct output." : "Your code ran without errors but produced incorrect output.",
            variant: result.passed ? "default" : "destructive",
          });
        }
        
        setIsRunning(false);
      }).catch(error => {
        console.error("Error running code:", error);
        setOutput("Error running your code. Please try again.");
        setIsRunning(false);
        toast({
          title: "Error running code",
          description: "There was an error running your code. Please try again.",
          variant: "destructive",
        });
      });
    }, 1500);
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Use our code validation service to validate the code
    setTimeout(() => {
      if (!challenge) return;
      
      // Import the validation function
      import("@/lib/codeValidation").then(({ validateCode }) => {
        const simResults = challenge.test_cases.map((testCase) => {
          // Use our validation service to validate the code
          return validateCode(
            code,
            selectedLanguage,
            testCase.input,
            testCase.output
          );
        });
      
        setTestResults(simResults);
        setIsRunning(false);
        
        const passedCount = simResults.filter(r => r.passed).length;
        toast({
          title: `${passedCount} of ${simResults.length} tests passed`,
          description: passedCount === simResults.length 
            ? "Great job! All tests passed." 
            : "Some tests failed. Check the results for details.",
          variant: passedCount === simResults.length ? "default" : "destructive",
        });
      }).catch(error => {
        console.error("Error validating code:", error);
        setIsRunning(false);
        toast({
          title: "Error validating code",
          description: "There was an error validating your code. Please try again.",
          variant: "destructive",
        });
      });
    }, 2000);
  };

  const handleReset = () => {
    if (challenge && selectedLanguage) {
      setCode(challenge.starter_code[selectedLanguage] || "");
      toast({
        title: "Code reset",
        description: "Your code has been reset to the starter template.",
      });
    }
  };

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

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-xl text-muted-foreground">Challenge not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/coding">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{challenge.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                  challenge.difficulty
                )}`}
              >
                {challenge.difficulty}
              </span>
              <span className="text-sm text-muted-foreground">
                {challenge.category}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Hint
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Problem description */}
        <Tabs defaultValue="problem" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="problem">Problem</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="problem" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>{challenge.description}</p>
                
                <h3 className="text-lg font-medium mt-6">Examples</h3>
                {challenge.test_cases.filter(test => !test.isHidden).map((test, idx) => (
                  <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="mb-2">
                      <strong>Input:</strong> <code>{test.input}</code>
                    </div>
                    <div>
                      <strong>Output:</strong> <code>{test.output}</code>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-1 mt-6">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <CodingStatsTab />
          </TabsContent>

          <TabsContent value="tests" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length > 0 ? (
                  <div className="space-y-3">
                    {testResults.map((result, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-md ${
                          result.passed ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Test Case {idx + 1}</span>
                          {result.passed ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Passed
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              Failed
                            </div>
                          )}
                        </div>
                        <div className="text-sm">
                          <div>
                            <span className="font-medium">Input:</span>{" "}
                            <code className="bg-gray-100 px-1 py-0.5 rounded">
                              {result.input}
                            </code>
                          </div>
                          <div>
                            <span className="font-medium">Expected:</span>{" "}
                            <code className="bg-gray-100 px-1 py-0.5 rounded">
                              {result.expected}
                            </code>
                          </div>
                          {!result.passed && (
                            <div>
                              <span className="font-medium">Your Output:</span>{" "}
                              <code className="bg-gray-100 px-1 py-0.5 rounded">
                                {result.output}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Run tests to see the results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Code editor and output */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Code Editor</CardTitle>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {challenge.languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <MonacoEditor
                  height="24rem"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    suggest: {
                      showKeywords: true,
                      snippetsPreventQuickSuggestions: false
                    },
                    quickSuggestions: {
                      other: true,
                      comments: true,
                      strings: true
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Output</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRunTests}
                    disabled={isRunning}
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    Run Tests
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleRun}
                    disabled={isRunning}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t bg-black text-white p-4 font-mono text-sm h-40 overflow-auto">
                {isRunning ? (
                  <div className="flex items-center justify-center h-full">
                    <Clock className="h-6 w-6 animate-spin mr-2" />
                    <span>Running...</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{output || "// Output will appear here after running your code."}</pre>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
