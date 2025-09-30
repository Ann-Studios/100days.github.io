import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle } from 'lucide-react';
import { Challenge } from '../types';
import { formatDate, getDaysSinceStart, getProgressPercentage } from '../utils/dateUtils';
import ProgressBar from './ProgressBar';

interface ChallengeCardProps {
  challenge: Challenge;
  onToggleDay?: (day: number) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onToggleDay }) => {
  const daysSinceStart = getDaysSinceStart(challenge.startDate);
  const progress = getProgressPercentage(challenge.currentDay);
  const completedCount = challenge.completedDays.filter(Boolean).length;

  return (
    <div className="enhanced-card rounded-xl p-6 hover:shadow-md transition-all animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link
            to={`/challenges/${challenge.id}`}
            className="text-lg font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          >
            {challenge.title}
          </Link>
          <p className="mt-1 text-[var(--text)] opacity-80 line-clamp-2">{challenge.description}</p>
        </div>

        <div className={`px-3 py-1 rounded-full text-sm font-medium ${challenge.isActive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-[var(--primary)] text-[var(--text)]'
          }`}>
          {challenge.isActive ? 'Active' : 'Paused'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="border-2 border-[var(--secondary)] rounded-lg p-3">
            <div className="text-2xl font-bold text-[var(--accent)]">{challenge.currentDay}</div>
            <div className="text-sm text-[var(--text)] opacity-70">Current Day</div>
          </div>

          <div className="border-2 border-[var(--secondary)] rounded-lg p-3">
            <div className="text-2xl font-bold text-green-500">{completedCount}</div>
            <div className="text-sm text-[var(--text)] opacity-70">Completed</div>
          </div>

          <div className="border-2 border-[var(--secondary)] rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-500">{100 - challenge.currentDay}</div>
            <div className="text-sm text-[var(--text)] opacity-70">Remaining</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--text)] opacity-70">Progress</span>
            <span className="text-sm font-medium text-[var(--text)]">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} color="primary" />
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--text)] opacity-70">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>Started {formatDate(challenge.startDate)}</span>
          </div>

          {challenge.isActive && onToggleDay && (
            <button
              onClick={() => onToggleDay(daysSinceStart)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${challenge.completedDays[daysSinceStart - 1]
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                  : 'bg-[var(--primary)] text-[var(--text)] hover:bg-[var(--secondary)]'
                }`}
            >
              <CheckCircle size={16} />
              <span>
                {challenge.completedDays[daysSinceStart - 1] ? 'Completed Today' : 'Mark Complete'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;