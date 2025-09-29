// hooks/useBlogPosts.ts
import { useState, useEffect } from 'react';
import { blogApi, Blog } from '../api/blogApi';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const postsData = await blogApi.getAll();
      
      // Ensure we always have an array
      if (!Array.isArray(postsData)) {
        console.error('Expected array but got:', postsData);
        setBlogPosts([]);
      } else {
        setBlogPosts(postsData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(errorMessage);
      console.error('Error fetching blog posts:', err);
      setBlogPosts([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (post: Omit<Blog, '_id' | 'id'>): Promise<Blog> => {
    try {
      setError(null);
      const newPost = await blogApi.create(post);
      setBlogPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create blog post';
      setError(errorMessage);
      console.error('Error creating blog post:', err);
      throw err;
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<Blog>): Promise<Blog> => {
    try {
      setError(null);
      const updatedPost = await blogApi.update(id, updates);
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === id ? updatedPost : post
        )
      );
      return updatedPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update blog post';
      setError(errorMessage);
      console.error('Error updating blog post:', err);
      throw err;
    }
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    try {
      setError(null);
      await blogApi.delete(id);
      setBlogPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog post';
      setError(errorMessage);
      console.error('Error deleting blog post:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    error,
    refetch: fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost
  };
};