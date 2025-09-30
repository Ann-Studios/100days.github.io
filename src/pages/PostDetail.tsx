import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { formatDate } from '../utils/dateUtils';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { blogPosts } = useBlogPosts();

    if (!id) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-github mb-4">No Post Selected</h2>
                <p className="text-gray-600 mb-8">Please select a post to view its details.</p>
                <Link
                    to="/blog"
                    className="btn-github-primary px-6 py-3 rounded-lg transition-colors"
                >
                    Back to Blog
                </Link>
            </div>
        );
    }

    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold text-github mb-4">Post Not Found</h2>
                <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
                <Link
                    to="/blog"
                    className="btn-github-primary px-6 py-3 rounded-lg transition-colors"
                >
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                <div className="px-4 py-2 rounded-full text-sm font-medium bg-success-100 text-success-800 border border-success-200">
                    Published
                </div>
            </div>

            {/* Post Header */}
            <div className="enhanced-card rounded-xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-github mb-4">{post.title}</h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>By {post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Published {formatDate(post.createdAt)}</span>
                    </div>
                    {post.updatedAt && post.updatedAt !== post.createdAt && (
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Updated {formatDate(post.updatedAt)}</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Tag size={16} className="text-gray-400" />
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="tag-github text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Content */}
            <div className="enhanced-card p-8 mb-8">
                <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed text-github text-lg">
                        {post.content}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 px-6 py-3 border border-github rounded-lg hover:bg-github-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Blog</span>
                </button>

                <div className="flex items-center space-x-4">
                    <Link
                        to="/blog/new"
                        className="btn-github-primary px-6 py-3 rounded-lg transition-colors"
                    >
                        Write New Post
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;