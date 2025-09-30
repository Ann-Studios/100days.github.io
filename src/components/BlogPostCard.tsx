import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../utils/dateUtils';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="enhanced-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-slide-up">
      <div className="space-y-4 relative z-10">
        <div>
          <Link
            to={`/blog/${post.id}`}
            className="text-xl font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors line-clamp-2"
          >
            {post.title}
          </Link>
          <p className="text-[var(--text)] opacity-70 mt-2 line-clamp-3">{post.excerpt}</p>
          <Link
            to={`/blog/${post.id}`}
            className="btn-github mt-4 inline-block"
          >
            Read More
          </Link>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--secondary)]">
          <div className="flex items-center space-x-2 text-sm text-[var(--text)] opacity-60">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag size={16} className="text-[var(--text)] opacity-60" />
              <div className="flex space-x-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="tag-github px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-[var(--text)] opacity-60">+{post.tags.length - 2} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;