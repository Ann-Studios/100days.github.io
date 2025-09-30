// api/challengeApi.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Challenge {
  _id?: string;
  id: string;
  title: string;
  description: string;
  author: string;
  startDate: Date;
  currentDay: number;
  completedDays: boolean[];
  isActive: boolean;
  createdAt: Date;
}

export const challengeApi = {
  // Get all challenges
  getAll: async (): Promise<Challenge[]> => {
    try {
      console.log('Fetching challenges from:', `${API_BASE_URL}/challenges`);
      const response = await axios.get(`${API_BASE_URL}/challenges`);
      
      console.log('Raw API response:', response);
      console.log('Response data:', response.data);
      
      // Handle the actual response format: {success: true, data: Array(0)}
      let challenges: Challenge[] = [];
      
      if (response.data && Array.isArray(response.data.data)) {
        challenges = response.data.data;
      } else if (Array.isArray(response.data)) {
        challenges = response.data;
      } else {
        console.warn('Unexpected response format, defaulting to empty array');
        challenges = [];
      }
      
      console.log('Processed challenges:', challenges);
      return challenges;
    } catch (error) {
      console.error('Error in challengeApi.getAll:', error);
      throw error;
    }
  },

  // Get challenge by ID
  getById: async (id: string): Promise<Challenge> => {
    const response = await axios.get(`${API_BASE_URL}/challenges/${id}`);
    return response.data.data; // Access the data property
  },

  // Create new challenge
  create: async (challenge: Omit<Challenge, '_id' | 'id'>): Promise<Challenge> => {
    const response = await axios.post(`${API_BASE_URL}/challenges`, challenge);
    return response.data.data; // Access the data property
  },

  // Update challenge
  update: async (id: string, challenge: Partial<Challenge>): Promise<Challenge> => {
    const response = await axios.put(`${API_BASE_URL}/challenges/${id}`, challenge);
    return response.data.data; // Access the data property
  },

  // Delete challenge
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/challenges/${id}`);
  }
};