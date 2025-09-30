import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { generateId } from '../utils/dateUtils';

const NewChallenge: React.FC = () => {
  const navigate = useNavigate();
  const { createChallenge } = useChallenges();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !author.trim()) return;

    setIsSubmitting(true);

    try {
      const newChallenge = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        author: author.trim(),
        startDate: new Date(),
        currentDay: 0,
        completedDays: new Array(100).fill(false),
        isActive: true,
        createdAt: new Date()
      };

      await createChallenge(newChallenge);
      navigate('/challenges');
    } catch (error) {
      console.error('Failed to create challenge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-github">Create New Challenge</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/challenges')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !description.trim() || !author.trim() || isSubmitting}
              className="flex items-center space-x-2 btn-github-primary px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={18} />
              <span>{isSubmitting ? 'Creating...' : 'Create Challenge'}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="enhanced-card p-8 space-y-8">
          <div>
            <label className="block text-sm font-medium text-github mb-3">
              Challenge Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn Spanish, Daily Exercise, Read Books..."
              className="w-full px-4 py-3 text-xl border border-github rounded-lg focus:ring-2 focus:ring-github-accent focus:border-transparent bg-github-primary"
              autoFocus
            />
          </div>

          {/* Author Field */}
          <div>
            <label className="block text-sm font-medium text-github mb-3">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 text-xl border border-github rounded-lg focus:ring-2 focus:ring-github-accent focus:border-transparent bg-github-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-github mb-3">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your challenge, goals, and what you hope to achieve over the next 100 days..."
              rows={6}
              className="w-full px-4 py-3 text-xl border border-github rounded-lg focus:ring-2 focus:ring-github-accent focus:border-transparent bg-github-primary"
            />
          </div>

          <div className="bg-github-primary p-6 rounded-lg border border-github-accent">
            <h3 className="font-semibold text-github mb-2">💡 Challenge Tips</h3>
            <ul className="text-sm text-github space-y-1">
              <li>• Be specific about what you want to achieve</li>
              <li>• Make it measurable and trackable</li>
              <li>• Start with realistic daily goals</li>
              <li>• Document your journey with blog posts</li>
              <li>• Celebrate small wins along the way</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewChallenge;