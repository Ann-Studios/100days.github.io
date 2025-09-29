import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Target, CheckCircle } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { formatDate, getDaysSinceStart, getProgressPercentage } from '../utils/dateUtils';
import ProgressBar from '../components/ProgressBar';

const ChallengeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { challenges, updateChallenge } = useChallenges();

    if (!id) {
        return (
            <div className="text-center py-20">
                <Target className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Challenge Selected</h2>
                <p className="text-gray-600 mb-8">Please select a challenge to view its details.</p>
                <Link
                    to="/challenges"
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    Back to Challenges
                </Link>
            </div>
        );
    }

    const challenge = challenges.find(c => c.id === id);

    if (!challenge) {
        return (
            <div className="text-center py-20">
                <Target className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
                <p className="text-gray-600 mb-8">The challenge you're looking for doesn't exist.</p>
                <Link
                    to="/challenges"
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    Back to Challenges
                </Link>
            </div>
        );
    }

    const daysSinceStart = getDaysSinceStart(challenge.startDate);
    const progress = getProgressPercentage(challenge.currentDay);
    const completedCount = challenge.completedDays.filter(Boolean).length;

    const handleToggleDay = async (day: number) => {
        try {
            const newCompletedDays = [...challenge.completedDays];
            const dayIndex = day - 1;
            newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];

            await updateChallenge(challenge.id, {
                completedDays: newCompletedDays,
                currentDay: Math.max(challenge.currentDay, day)
            });
        } catch (error) {
            console.error('Failed to toggle day:', error);
        }
    };

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

                <div className={`px-4 py-2 rounded-full text-sm font-medium ${challenge.isActive
                    ? 'bg-success-100 text-success-800 border border-success-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                    {challenge.isActive ? 'Active' : 'Paused'}
                </div>
            </div>

            {/* Challenge Header */}
            <div className="enhanced-card rounded-xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{challenge.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{challenge.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Started {formatDate(challenge.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Target size={16} />
                        <span>Day {challenge.currentDay} of 100</span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="enhanced-card p-6 text-center">
                    <div className="text-2xl font-bold text-primary-600">{challenge.currentDay}</div>
                    <div className="text-sm text-gray-600">Current Day</div>
                </div>

                <div className="enhanced-card p-6 text-center">
                    <div className="text-2xl font-bold text-success-600">{completedCount}</div>
                    <div className="text-sm text-gray-600">Completed Days</div>
                </div>

                <div className="enhanced-card p-6 text-center">
                    <div className="text-2xl font-bold text-warning-600">{100 - challenge.currentDay}</div>
                    <div className="text-sm text-gray-600">Days Remaining</div>
                </div>

                <div className="enhanced-card p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                </div>
            </div>

            {/* Progress */}
            <div className="enhanced-card p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">Progress Overview</span>
                    <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
                </div>
                <ProgressBar progress={progress} color="primary" className="mb-6" />

                {challenge.isActive && (
                    <button
                        onClick={() => handleToggleDay(daysSinceStart)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors w-full justify-center ${challenge.completedDays[daysSinceStart - 1]
                            ? 'bg-success-100 text-success-700 border border-success-200'
                            : 'bg-primary-100 text-primary-700 border border-primary-200 hover:bg-primary-200'
                            }`}
                    >
                        <CheckCircle size={16} />
                        <span>
                            {challenge.completedDays[daysSinceStart - 1] ? 'Completed Today' : 'Mark Today as Complete'}
                        </span>
                    </button>
                )}
            </div>

            {/* Calendar Grid */}
            <div className="enhanced-card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Progress</h3>
                <div className="grid grid-cols-10 gap-2">
                    {challenge.completedDays.slice(0, 100).map((completed, index) => (
                        <div
                            key={index}
                            className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium ${completed
                                ? 'bg-success-500 border-success-600 text-white'
                                : index < challenge.currentDay
                                    ? 'bg-gray-300 border-gray-400 text-gray-600'
                                    : 'bg-gray-100 border-gray-200 text-gray-400'
                                }`}
                            title={`Day ${index + 1} - ${completed ? 'Completed' : 'Not completed'}`}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;