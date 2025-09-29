// api/blogApi.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://one00daysbackend.onrender.com/api';

export interface Blog {
  _id?: string;
  id: string;
  title: string;
  content: string;
  excerpt: string; // Add this field
  author: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const blogApi = {
  // Get all blog posts
  getAll: async (): Promise<Blog[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blog`);
      console.log('Blog posts API response:', response.data);
      
      // Handle the same response format: {success: true, data: Array(0)}
      let posts: Blog[] = [];
      
      if (response.data && Array.isArray(response.data.data)) {
        posts = response.data.data;
      } else if (Array.isArray(response.data)) {
        posts = response.data;
      } else {
        console.warn('Unexpected blog posts response format, defaulting to empty array');
        posts = [];
      }
      
      return posts;
    } catch (error) {
      console.error('Error in blogPostApi.getAll:', error);
      throw error;
    }
  },

  // Get blog post by ID
  getById: async (id: string): Promise<Blog> => {
    const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
    return response.data.data; // Access the data property
  },

  // Create new blog post
  create: async (post: Omit<Blog, '_id' | 'id'>): Promise<Blog> => {
    const response = await axios.post(`${API_BASE_URL}/blog`, post);
    return response.data.data; // Access the data property
  },

  // Update blog post
  update: async (id: string, post: Partial<Blog>): Promise<Blog> => {
    const response = await axios.put(`${API_BASE_URL}/blog/${id}`, post);
    return response.data.data; // Access the data property
  },

  // Delete blog post
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/blog/${id}`);
  }
};