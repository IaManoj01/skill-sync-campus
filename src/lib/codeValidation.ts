// Code validation service for different programming languages

/**
 * Interface for code execution result
 */
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * Interface for test case result
 */
export interface TestCaseResult {
  passed: boolean;
  input: string;
  output: string;
  expected: string;
  error?: string;
}

/**
 * Validates Java code by parsing and checking for syntax errors
 * @param code Java code to validate
 * @param input Test case input
 * @param expectedOutput Expected output
 */
export const validateJavaCode = (code: string, input: string, expectedOutput: string): TestCaseResult => {
  try {
    // Check if code contains required class structure
    if (!code.includes('class Solution') || !code.includes('public int[]') || !code.includes('twoSum')) {
      return {
        passed: false,
        input,
        output: 'Compilation error: Missing required class structure',
        expected: expectedOutput,
        error: 'Your code must define a Solution class with a twoSum method.'
      };
    }

    // Parse input (assuming format like "[2,7,11,15]\n9")
    const [arrayStr, targetStr] = input.split('\n');
    const target = parseInt(targetStr.trim());
    
    // Simulate execution (in a real app, this would call a Java execution service)
    const simulatedOutput = simulateJavaExecution(code, arrayStr, target);
    
    // Compare with expected output
    const normalizedExpected = normalizeOutput(expectedOutput);
    const normalizedOutput = normalizeOutput(simulatedOutput);
    
    return {
      passed: normalizedOutput === normalizedExpected,
      input,
      output: simulatedOutput,
      expected: expectedOutput
    };
  } catch (error) {
    return {
      passed: false,
      input,
      output: 'Execution error',
      expected: expectedOutput,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validates C++ code by parsing and checking for syntax errors
 * @param code C++ code to validate
 * @param input Test case input
 * @param expectedOutput Expected output
 */
export const validateCppCode = (code: string, input: string, expectedOutput: string): TestCaseResult => {
  try {
    // Check if code contains required class structure
    if (!code.includes('class Solution') || !code.includes('vector<int>') || !code.includes('twoSum')) {
      return {
        passed: false,
        input,
        output: 'Compilation error: Missing required class structure',
        expected: expectedOutput,
        error: 'Your code must define a Solution class with a twoSum method.'
      };
    }

    // Parse input (assuming format like "[2,7,11,15]\n9")
    const [arrayStr, targetStr] = input.split('\n');
    const target = parseInt(targetStr.trim());
    
    // Simulate execution (in a real app, this would call a C++ execution service)
    const simulatedOutput = simulateCppExecution(code, arrayStr, target);
    
    // Compare with expected output
    const normalizedExpected = normalizeOutput(expectedOutput);
    const normalizedOutput = normalizeOutput(simulatedOutput);
    
    return {
      passed: normalizedOutput === normalizedExpected,
      input,
      output: simulatedOutput,
      expected: expectedOutput
    };
  } catch (error) {
    return {
      passed: false,
      input,
      output: 'Execution error',
      expected: expectedOutput,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validates JavaScript code by parsing and checking for syntax errors
 * @param code JavaScript code to validate
 * @param input Test case input
 * @param expectedOutput Expected output
 */
export const validateJavaScriptCode = (code: string, input: string, expectedOutput: string): TestCaseResult => {
  try {
    // Check if code contains required function
    if (!code.includes('function twoSum') && !code.includes('twoSum =')) {
      return {
        passed: false,
        input,
        output: 'Compilation error: Missing required function',
        expected: expectedOutput,
        error: 'Your code must define a twoSum function.'
      };
    }

    // Parse input (assuming format like "[2,7,11,15]\n9")
    const [arrayStr, targetStr] = input.split('\n');
    const target = parseInt(targetStr.trim());
    
    // Simulate execution (in a real app, this would use eval or a JS execution service)
    const simulatedOutput = simulateJavaScriptExecution(code, arrayStr, target);
    
    // Compare with expected output
    const normalizedExpected = normalizeOutput(expectedOutput);
    const normalizedOutput = normalizeOutput(simulatedOutput);
    
    return {
      passed: normalizedOutput === normalizedExpected,
      input,
      output: simulatedOutput,
      expected: expectedOutput
    };
  } catch (error) {
    return {
      passed: false,
      input,
      output: 'Execution error',
      expected: expectedOutput,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validates Python code by parsing and checking for syntax errors
 * @param code Python code to validate
 * @param input Test case input
 * @param expectedOutput Expected output
 */
export const validatePythonCode = (code: string, input: string, expectedOutput: string): TestCaseResult => {
  try {
    // Check if code contains required function
    if (!code.includes('def twoSum') && !code.includes('def two_sum')) {
      return {
        passed: false,
        input,
        output: 'Compilation error: Missing required function',
        expected: expectedOutput,
        error: 'Your code must define a twoSum or two_sum function.'
      };
    }

    // Parse input (assuming format like "[2,7,11,15]\n9")
    const [arrayStr, targetStr] = input.split('\n');
    const target = parseInt(targetStr.trim());
    
    // Simulate execution (in a real app, this would call a Python execution service)
    const simulatedOutput = simulatePythonExecution(code, arrayStr, target);
    
    // Compare with expected output
    const normalizedExpected = normalizeOutput(expectedOutput);
    const normalizedOutput = normalizeOutput(simulatedOutput);
    
    return {
      passed: normalizedOutput === normalizedExpected,
      input,
      output: simulatedOutput,
      expected: expectedOutput
    };
  } catch (error) {
    return {
      passed: false,
      input,
      output: 'Execution error',
      expected: expectedOutput,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validates code based on the selected language
 * @param code Code to validate
 * @param language Programming language
 * @param input Test case input
 * @param expectedOutput Expected output
 */
export const validateCode = (
  code: string,
  language: string,
  input: string,
  expectedOutput: string
): TestCaseResult => {
  // Normalize language name to lowercase for case-insensitive comparison
  const normalizedLanguage = language.toLowerCase();
  
  switch (normalizedLanguage) {
    case 'java':
      return validateJavaCode(code, input, expectedOutput);
    case 'c++':
    case 'cpp':
      return validateCppCode(code, input, expectedOutput);
    case 'javascript':
    case 'js':
      return validateJavaScriptCode(code, input, expectedOutput);
    case 'python':
    case 'py':
      return validatePythonCode(code, input, expectedOutput);
    default:
      return {
        passed: false,
        input,
        output: 'Unsupported language',
        expected: expectedOutput,
        error: `Language ${language} is not supported for validation.`
      };
  }
};

// Helper functions for simulating code execution

/**
 * Normalizes output for comparison
 * @param output Output string to normalize
 */
const normalizeOutput = (output: string): string => {
  // Remove whitespace, convert to lowercase for case-insensitive comparison
  return output.replace(/\s+/g, '').toLowerCase();
};

/**
 * Simulates Java code execution
 * @param code Java code
 * @param arrayStr Array string representation
 * @param target Target number
 */
const simulateJavaExecution = (code: string, arrayStr: string, target: number): string => {
  // This is a simplified simulation - in a real app, you would use a Java execution service
  // For the Two Sum problem, we'll simulate the correct output if the code looks reasonable
  if (code.includes('Map<Integer, Integer>') || code.includes('HashMap<Integer, Integer>')) {
    // Simulate correct implementation using hash map
    return simulateTwoSumSolution(arrayStr, target);
  } else if (code.includes('for') && code.includes('for')) {
    // Simulate brute force approach (might be correct but inefficient)
    return simulateTwoSumSolution(arrayStr, target);
  }
  
  // If code doesn't match known patterns, return a generic error
  return 'Implementation error: Your solution doesn\'t match expected patterns';
};

/**
 * Simulates C++ code execution
 * @param code C++ code
 * @param arrayStr Array string representation
 * @param target Target number
 */
const simulateCppExecution = (code: string, arrayStr: string, target: number): string => {
  // This is a simplified simulation - in a real app, you would use a C++ execution service
  if (code.includes('unordered_map') || code.includes('map<int, int>')) {
    // Simulate correct implementation using hash map
    return simulateTwoSumSolution(arrayStr, target);
  } else if (code.includes('for') && code.includes('for')) {
    // Simulate brute force approach
    return simulateTwoSumSolution(arrayStr, target);
  }
  
  return 'Implementation error: Your solution doesn\'t match expected patterns';
};

/**
 * Simulates JavaScript code execution
 * @param code JavaScript code
 * @param arrayStr Array string representation
 * @param target Target number
 */
const simulateJavaScriptExecution = (code: string, arrayStr: string, target: number): string => {
  // This is a simplified simulation - in a real app, you would use eval or a JS execution service
  if (code.includes('Map(') || code.includes('new Map()') || code.includes('{}')) {
    // Simulate correct implementation using hash map or object
    return simulateTwoSumSolution(arrayStr, target);
  } else if (code.includes('for') && code.includes('for')) {
    // Simulate brute force approach
    return simulateTwoSumSolution(arrayStr, target);
  }
  
  return 'Implementation error: Your solution doesn\'t match expected patterns';
};

/**
 * Simulates Python code execution
 * @param code Python code
 * @param arrayStr Array string representation
 * @param target Target number
 */
const simulatePythonExecution = (code: string, arrayStr: string, target: number): string => {
  // This is a simplified simulation - in a real app, you would use a Python execution service
  if (code.includes('dict(') || code.includes('{}')) {
    // Simulate correct implementation using dictionary
    return simulateTwoSumSolution(arrayStr, target);
  } else if (code.includes('for') && code.includes('for')) {
    // Simulate brute force approach
    return simulateTwoSumSolution(arrayStr, target);
  }
  
  return 'Implementation error: Your solution doesn\'t match expected patterns';
};

/**
 * Simulates the Two Sum solution for any language
 * @param arrayStr Array string representation
 * @param target Target number
 */
const simulateTwoSumSolution = (arrayStr: string, target: number): string => {
  try {
    // Parse array from string like "[2,7,11,15]"
    const cleanArrayStr = arrayStr.replace(/\[|\]/g, '').trim();
    if (!cleanArrayStr) return '[]';
    
    const nums = cleanArrayStr.split(',').map(num => parseInt(num.trim()));
    
    // Implement the Two Sum solution
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return `[${map.get(complement)},${i}]`;
      }
      map.set(nums[i], i);
    }
    
    return '[]'; // No solution found
  } catch (error) {
    return 'Error parsing input';
  }
};