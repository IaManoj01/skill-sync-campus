import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
console.log('Gemini API Key:', import.meta.env.VITE_GEMINI_API_KEY ? '*** (exists)' : 'MISSING');
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Create a chat model instance with Gemini Pro
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro', generationConfig: {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
}});

// Initialize chat history
let chat = model.startChat({
  history: [
    {
      role: 'user',
      parts: [{text: 'You are a helpful AI assistant for a campus learning platform. You help students with their academic queries, coding challenges, and course-related questions. Keep your responses focused on educational content.'}],
    },
    {
      role: 'model',
      parts: [{text: 'I understand my role as an educational AI assistant. I will focus on helping students with their academic needs, providing guidance on coding challenges, and answering course-related questions. I will maintain a professional and educational tone in all interactions.'}],
    },
  ],
});

// Function to send a message and get a response
export async function sendMessage(message: string): Promise<string> {
  try {
    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty');
    }
    
    if (message.length > 4096) {
      throw new Error('Message exceeds maximum length of 4096 characters');
    }
    
    console.log('Sending message to Gemini API:', message.substring(0, 20) + (message.length > 20 ? '...' : ''));
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    if (!response) {
      throw new Error('No response received from AI');
    }
    
    const text = response.text();
    
    if (!text || text.trim() === '') {
      throw new Error('Received empty response from AI');
    }
    
    console.log('Received response from Gemini API:', {
      length: text.length,
      first50Chars: text.substring(0, 50),
      last50Chars: text.substring(Math.max(0, text.length - 50))
    });
    return text;
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Function to reset chat history
export function resetChat() {
  chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{text: 'You are a helpful AI assistant for a campus learning platform. You help students with their academic queries, coding challenges, and course-related questions. Keep your responses focused on educational content.'}],
      },
      {
        role: 'model',
        parts: [{text: 'I understand my role as an educational AI assistant. I will focus on helping students with their academic needs, providing guidance on coding challenges, and answering course-related questions. I will maintain a professional and educational tone in all interactions.'}],
      },
    ],
  });
}