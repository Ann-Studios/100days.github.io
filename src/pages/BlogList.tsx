import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogPostCard from '../components/BlogPostCard';

const BlogList: React.FC = () => {
  const { blogPosts, loading } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const safeBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];
  const allTags = [...new Set(safeBlogPosts.flatMap(post => post.tags || []))];

  const filteredPosts = safeBlogPosts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="geometric-shapes blog-shapes animate-fade-in">
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>

      <div className="relative-z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-github">Blog Posts</h1>
            <p className="mt-1 text-github">Share your thoughts and document your journey</p>
          </div>

          <Link
            to="/blog/new"
            className="flex items-center space-x-2 btn-github-primary px-6 py-3 rounded-lg transition-colors w-fit"
          >
            <Plus size={20} />
            <span>New Post</span>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="enhanced-card p-6 rounded-xl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-github rounded-lg focus:ring-2 focus:ring-github-accent focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-2 border border-github rounded-lg focus:ring-2 focus:ring-github-accent focus:border-transparent min-w-40"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : safeBlogPosts.length === 0 ? (
          <div className="enhanced-card geometric-pattern text-center py-20 rounded-xl">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold text-github mb-2">Start Your Blog Journey</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Document your progress, share insights, and reflect on your experiences with your first blog post.
            </p>
            <Link
              to="/blog/new"
              className="btn-github-primary px-6 py-3 rounded-lg transition-colors"
            >
              Write Your First Post
            </Link>
          </div>
        ) : (
          <div className="enhanced-card geometric-pattern text-center py-20 rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-github mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;