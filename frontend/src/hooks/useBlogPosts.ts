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

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    error,
    refetch: fetchBlogPosts
  };
};