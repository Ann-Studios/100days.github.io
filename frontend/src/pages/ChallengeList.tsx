import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import ChallengeCard from '../components/ChallengeCard';

const ChallengeList: React.FC = () => {
  const { challenges, updateChallenge, loading } = useChallenges();

  const handleToggleDay = async (challengeId: string, day: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const newCompletedDays = [...challenge.completedDays];
    const dayIndex = day - 1;
    newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];

    await updateChallenge(challengeId, {
      completedDays: newCompletedDays,
      currentDay: Math.max(challenge.currentDay, day)
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const activeChallenges = challenges.filter(c => c.isActive);
  const completedChallenges = challenges.filter(c => c.currentDay >= 100);
  const pausedChallenges = challenges.filter(c => !c.isActive && c.currentDay < 100);

  return (
    <div className="geometric-shapes challenges-shapes animate-fade-in">
      {/* Geometric Shapes */}
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>
      <div className="shape-5"></div>

      <div className="relative-z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Your Challenges</h1>
            <p className="mt-1">Track your progress on your 100-day journeys</p>
          </div>

          <Link
            to="/challenges/new"
            className="flex items-center space-x-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 transition-colors w-fit"
          >
            <Plus size={20} />
            <span>New Challenge</span>
          </Link>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Active Challenges</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleDay={(day) => handleToggleDay(challenge.id, day)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Completed Challenges 🎉</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}

        {/* Paused Challenges */}
        {pausedChallenges.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Paused Challenges</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pausedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {challenges.length === 0 && (
          <div className="enhanced-card geometric-pattern text-center py-20 rounded-xl">
            <Target className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
              100-day challenges are a powerful way to build habits, learn new skills, and achieve your goals.
              What will you commit to for the next 100 days?
            </p>
            <Link
              to="/challenges/new"
              className="bg-success-600 text-white px-8 py-4 rounded-lg hover:bg-success-700 transition-colors text-lg font-medium"
            >
              Create Your First Challenge
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;