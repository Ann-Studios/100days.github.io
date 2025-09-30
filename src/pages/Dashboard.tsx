import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogPostCard from '../components/BlogPostCard';
import ChallengeCard from '../components/ChallengeCard';

const Dashboard: React.FC = () => {
  const { challenges, updateChallenge, loading: challengesLoading } = useChallenges();
  const { blogPosts, loading: postsLoading } = useBlogPosts();

  const loading = challengesLoading || postsLoading;

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const activeChallenges = challenges.filter(c => c.isActive);
  const recentPosts = blogPosts.slice(0, 3);

  const handleToggleDay = async (challengeId: string, day: number) => {
    try {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return;

      const newCompletedDays = [...challenge.completedDays];
      const dayIndex = day - 1;
      newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];

      await updateChallenge(challengeId, {
        completedDays: newCompletedDays,
        currentDay: Math.max(challenge.currentDay, day)
      });
    } catch (error) {
      console.error('Failed to toggle day:', error);
    }
  };

  const totalChallenges = challenges.length;
  const totalPosts = blogPosts.length;
  const completedChallenges = challenges.filter(c => c.currentDay >= 100).length;
  const totalCompletedDays = challenges.reduce((sum, c) => sum + c.completedDays.filter(Boolean).length, 0);

  return (

      <div className="relative-z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-github">
            Welcome to Your Journey
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-github">
            Track your progress, share your thoughts, and stay motivated on your 100-day challenges.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stats-card-github p-6 rounded-xl">
            <div className="flex items-center space-x-3">
            <div class="p-2 bg-primary-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target w-6 h-6 text-primary-600"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></div>
              <div>
                <div className="text-2xl font-bold text-github">{totalChallenges}</div>
                <div className="text-sm text-gray-600">Total Challenges</div>
              </div>
            </div>
          </div>

          <div className="stats-card-github p-6 rounded-xl">
            <div className="flex items-center space-x-3">
            <div class="p-2 bg-success-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-6 h-6 text-success-600"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg></div>
              <div>
                <div className="text-2xl font-bold text-github">{completedChallenges}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="stats-card-github p-6 rounded-xl">
            <div className="flex items-center space-x-3">
            <div class="p-2 bg-warning-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-6 h-6 text-warning-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg></div>
              <div>
                <div className="text-2xl font-bold text-github">{totalCompletedDays}</div>
                <div className="text-sm text-gray-600">Days Completed</div>
              </div>
            </div>
          </div>

          <div className="stats-card-github p-6 rounded-xl">
            <div className="flex items-center space-x-3">
            <div class="p-2 bg-purple-100 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-6 h-6 text-purple-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
              <div>
                <div className="text-2xl font-bold text-github">{totalPosts}</div>
                <div className="text-sm text-gray-600">Blog Posts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
        <Link
          to="/challenges/new"
          className="enhanced-card bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Start New Challenge</h3>
              <p className="text-blue-100">Begin your next 100-day journey</p>
            </div>
          </div>
        </Link>

          <Link
            to="/blog/new"
            className="enhanced-card bg-gradient-to-r from-success-500 to-success-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Write New Post</h3>
                <p className="text-success-100">Share your thoughts and progress</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Active Challenges */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-github">Active Challenges</h2>
            <Link
              to="/challenges"
              className="text-github-accent hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>

          {activeChallenges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {activeChallenges.slice(0, 2).map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleDay={(day) => handleToggleDay(challenge.id, day)}
                />
              ))}
            </div>
          ) : (
            <div className="enhanced-card geometric-pattern text-center py-12 rounded-xl">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-github mb-2">No active challenges</h3>
              <p className="text-gray-600 mb-4">Start your first 100-day challenge and begin your journey!</p>
              <Link
                to="/challenges/new"
                className="btn-github-primary px-6 py-2 rounded-lg transition-colors"
              >
                Create Your First Challenge
              </Link>
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-github">Recent Posts</h2>
            <Link
              to="/blog"
              className="text-github-accent hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="enhanced-card geometric-pattern text-center py-12 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-github mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-4">Start documenting your journey with your first post!</p>
              <Link
                to="/blog/new"
                className="btn-github-primary px-6 py-2 rounded-lg transition-colors"
              >
                Write Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;