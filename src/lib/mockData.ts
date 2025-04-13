
// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
  photoURL?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  instructor: string;
  credits: number;
  enrolled: number;
  thumbnail: string;
  progress?: number;
  materials: CourseMaterial[];
  assignments: Assignment[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'quiz';
  url: string;
  dateUploaded: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status?: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  category: string;
  tags: string[];
  languages: string[];
  starter_code: {
    [key: string]: string;
  };
  solution_code?: {
    [key: string]: string;
  };
  test_cases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
  isHidden: boolean;
}

export interface SkillMetric {
  skill: string;
  category: string;
  level: number; // 0-5
  lastPracticed: string;
}

// Mock data
export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  role: 'student',
  avatar: '/placeholder.svg'
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Data Structures and Algorithms',
    code: 'CS301',
    description: 'Learn fundamental data structures and algorithms used in software development.',
    instructor: 'Dr. Emily Chen',
    credits: 4,
    enrolled: 120,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    progress: 68,
    materials: [
      {
        id: 'm1',
        title: 'Introduction to Algorithms',
        type: 'pdf',
        url: '#',
        dateUploaded: '2025-03-15'
      },
      {
        id: 'm2',
        title: 'Sorting Algorithms',
        type: 'video',
        url: '#',
        dateUploaded: '2025-03-20'
      }
    ],
    assignments: [
      {
        id: 'a1',
        title: 'Implement QuickSort',
        description: 'Implement the QuickSort algorithm in your language of choice.',
        dueDate: '2025-04-15',
        status: 'pending'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Web Development',
    code: 'CS401',
    description: 'Learn modern web development with HTML, CSS, JavaScript, and React.',
    instructor: 'Prof. Michael Brown',
    credits: 3,
    enrolled: 95,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    progress: 42,
    materials: [
      {
        id: 'm3',
        title: 'HTML & CSS Fundamentals',
        type: 'pdf',
        url: '#',
        dateUploaded: '2025-03-10'
      },
      {
        id: 'm4',
        title: 'JavaScript Basics',
        type: 'video',
        url: '#',
        dateUploaded: '2025-03-12'
      }
    ],
    assignments: [
      {
        id: 'a2',
        title: 'Create a Personal Portfolio',
        description: 'Build a personal portfolio website using HTML, CSS, and JavaScript.',
        dueDate: '2025-04-10',
        status: 'submitted'
      }
    ]
  },
  {
    id: 'c3',
    title: 'Database Management Systems',
    code: 'CS302',
    description: 'Learn about database design, SQL, and management systems.',
    instructor: 'Dr. Robert Wilson',
    credits: 3,
    enrolled: 85,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    progress: 90,
    materials: [
      {
        id: 'm5',
        title: 'Introduction to SQL',
        type: 'pdf',
        url: '#',
        dateUploaded: '2025-03-05'
      }
    ],
    assignments: [
      {
        id: 'a3',
        title: 'Design a Database Schema',
        description: 'Design a database schema for an e-commerce website.',
        dueDate: '2025-04-05',
        status: 'graded',
        grade: 92
      }
    ]
  },
  {
    id: 'c4',
    title: 'Machine Learning',
    code: 'CS501',
    description: 'Introduction to machine learning algorithms and applications.',
    instructor: 'Dr. Sarah Johnson',
    credits: 4,
    enrolled: 75,
    thumbnail: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    progress: 30,
    materials: [
      {
        id: 'm6',
        title: 'Introduction to Neural Networks',
        type: 'pdf',
        url: '#',
        dateUploaded: '2025-03-25'
      }
    ],
    assignments: [
      {
        id: 'a4',
        title: 'Implement Linear Regression',
        description: 'Implement linear regression algorithm from scratch.',
        dueDate: '2025-04-20',
        status: 'pending'
      }
    ]
  }
];

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'cc1',
    title: 'Two Sum',
    difficulty: 'easy',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    category: 'Algorithms',
    tags: ['array', 'hash table'],
    languages: ['java', 'python', 'c++', 'javascript'],
    starter_code: {
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
      python: 'def twoSum(nums, target):\n    # Your code here\n    pass',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};',
      javascript: 'function twoSum(nums, target) {\n    // Your code here\n};'
    },
    test_cases: [
      { input: '[2,7,11,15]\n9', output: '[0,1]', isHidden: false },
      { input: '[3,2,4]\n6', output: '[1,2]', isHidden: false },
      { input: '[3,3]\n6', output: '[0,1]', isHidden: true }
    ],
    solution_code: {
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException("No two sum solution");\n    }\n}',
      python: 'def twoSum(nums, target):\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i\n    return []',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (map.find(complement) != map.end()) {\n                return {map[complement], i};\n            }\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};',
      javascript: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};'
    }
  },
  {
    id: 'cc4',
    title: 'Two Sum (Alternative)',
    difficulty: 'easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    category: 'Arrays',
    tags: ['arrays', 'hash table'],
    languages: ['python', 'java', 'javascript', 'c++'],
    starter_code: {
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return null;\n}',
      javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}'
    },
    solution_code: {
      python: 'def two_sum(nums, target):\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i\n    return []',
      java: 'public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    throw new IllegalArgumentException(\"No two sum solution\");\n}',
      javascript: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (map.find(complement) != map.end()) {\n            return {map[complement], i};\n        }\n        map[nums[i]] = i;\n    }\n    return {};\n}'
    },
    test_cases: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        isHidden: false
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        isHidden: false
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        isHidden: false
      }
    ]
  },
  {
    id: 'cc2',
    title: 'Reverse Linked List',
    difficulty: 'medium',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    category: 'Linked Lists',
    tags: ['linked list', 'recursion'],
    languages: ['python', 'java', 'javascript', 'c++'],
    starter_code: {
      python: 'def reverse_list(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev',
      java: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode current = head;\n    while (current != null) {\n        ListNode next = current.next;\n        current.next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}',
      javascript: 'function reverseList(head) {\n    let prev = null;\n    let current = head;\n    while (current) {\n        const next = current.next;\n        current.next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}',
      cpp: 'ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* current = head;\n    while (current) {\n        ListNode* next = current->next;\n        current->next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}'
    },
    test_cases: [
      {
        input: '[1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        isHidden: false
      },
      {
        input: '[1,2]',
        output: '[2,1]',
        isHidden: false
      }
    ]
  },
  {
    id: 'cc3',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    category: 'Stacks',
    tags: ['stack', 'string'],
    languages: ['python', 'java', 'javascript', 'c++'],
    starter_code: {
      python: 'def is_valid(s):\n    stack = []\n    mapping = {\')\': \'(\', \'}\': \'{\', \']\': \'[\'}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else \'#\'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack',
      java: 'public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == \'(\' || c == \'[\' || c == \'{\') {\n            stack.push(c);\n        } else {\n            if (stack.isEmpty()) return false;\n            char top = stack.pop();\n            if ((c == \')\' && top != \'(\') || \n                (c == \']\' && top != \'[\') || \n                (c == \'}\' && top != \'{\')) {\n                return false;\n            }\n        }\n    }\n    return stack.isEmpty();\n}',
      javascript: 'function isValid(s) {\n    const stack = [];\n    const map = {\')\': \'(\', \'}\': \'{\', \']\': \'[\'};\n    for (const char of s) {\n        if (char in map) {\n            const top = stack.pop();\n            if (map[char] !== top) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}',
      cpp: 'bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == \'(\' || c == \'[\' || c == \'{\') {\n            st.push(c);\n        } else {\n            if (st.empty()) return false;\n            char top = st.top();\n            st.pop();\n            if ((c == \')\' && top != \'(\') || \n                (c == \']\' && top != \'[\') || \n                (c == \'}\' && top != \'{\')) {\n                return false;\n            }\n        }\n    }\n    return st.empty();\n}',
      typescript: 'function isValid(s: string): boolean {\n    const stack: string[] = [];\n    const map: { [key: string]: string } = {\n        \')\': \'(\',\n        \'}\': \'{\',\n        \']\': \'[\'\n    };\n\n    for (const char of s) {\n        if (char in map) {\n            const top = stack.pop() || \'#\';\n            if (map[char] !== top) {\n                return false;\n            }\n        } else {\n            stack.push(char);\n        }\n    }\n\n    return stack.length === 0;\n}'
    },    
    test_cases: [
      {
        input: '()',
        output: 'true',
        isHidden: false
      },
      {
        input: '()[]{}',
        output: 'true',
        isHidden: false
      },
      {
        input: '(]',
        output: 'false',
        isHidden: false
      }
    ]
  }
];

export const skillMetrics: SkillMetric[] = [
  { skill: 'Arrays', category: 'Data Structures', level: 4, lastPracticed: '2025-04-05' },
  { skill: 'Linked Lists', category: 'Data Structures', level: 3, lastPracticed: '2025-03-28' },
  { skill: 'Binary Trees', category: 'Data Structures', level: 2, lastPracticed: '2025-03-15' },
  { skill: 'Sorting', category: 'Algorithms', level: 5, lastPracticed: '2025-04-08' },
  { skill: 'Searching', category: 'Algorithms', level: 4, lastPracticed: '2025-04-02' },
  { skill: 'Graph Algorithms', category: 'Algorithms', level: 1, lastPracticed: '2025-02-20' },
  { skill: 'Dynamic Programming', category: 'Algorithms', level: 2, lastPracticed: '2025-03-10' },
  { skill: 'HTML/CSS', category: 'Web Development', level: 5, lastPracticed: '2025-04-10' },
  { skill: 'JavaScript', category: 'Web Development', level: 4, lastPracticed: '2025-04-07' },
  { skill: 'React', category: 'Web Development', level: 3, lastPracticed: '2025-03-25' },
  { skill: 'SQL', category: 'Databases', level: 4, lastPracticed: '2025-04-01' },
  { skill: 'Python', category: 'Languages', level: 5, lastPracticed: '2025-04-09' },
  { skill: 'Java', category: 'Languages', level: 3, lastPracticed: '2025-03-20' },
  { skill: 'C++', category: 'Languages', level: 2, lastPracticed: '2025-02-15' }
];
