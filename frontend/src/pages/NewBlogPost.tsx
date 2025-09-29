// NewBlogPost.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { generateId } from '../utils/dateUtils';

const NewBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { createBlogPost } = useBlogPosts();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    setIsSubmitting(true);

    try {
      const newPost = {
        id: generateId(),
        title: title.trim(),
        content: content.trim(),
        excerpt: content.trim().slice(0, 200) + (content.length > 200 ? '...' : ''), // Add excerpt
        author: author.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await createBlogPost(newPost);
      navigate('/blog');
    } catch (error) {
      console.error('Failed to create blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Write New Post</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || !author.trim() || isSubmitting}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={18} />
              <span>{isSubmitting ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400 resize-none"
              autoFocus
            />
          </div>

          {/* Author Field */}
          <div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name..."
              className="w-full text-lg border-none outline-none placeholder-gray-400 resize-none"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              rows={20}
              className="w-full text-lg leading-relaxed border-none outline-none placeholder-gray-400 resize-none"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="productivity, habits, learning..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPost;