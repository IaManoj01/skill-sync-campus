
// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
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
    thumbnail: '/placeholder.svg',
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
    thumbnail: '/placeholder.svg',
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
    thumbnail: '/placeholder.svg',
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
    thumbnail: '/placeholder.svg',
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
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    category: 'Arrays',
    tags: ['arrays', 'hash table'],
    languages: ['python', 'java', 'javascript', 'c++'],
    starter_code: {
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return null;\n}',
      javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
      'c++': 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}'
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
      python: 'def reverse_list(head):\n    # Your code here\n    pass',
      java: 'public ListNode reverseList(ListNode head) {\n    // Your code here\n    return null;\n}',
      javascript: 'function reverseList(head) {\n    // Your code here\n}',
      'c++': 'ListNode* reverseList(ListNode* head) {\n    // Your code here\n}'
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
      python: 'def is_valid(s):\n    # Your code here\n    pass',
      java: 'public boolean isValid(String s) {\n    // Your code here\n    return false;\n}',
      javascript: 'function isValid(s) {\n    // Your code here\n}',
      'c++': 'bool isValid(string s) {\n    // Your code here\n}'
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
