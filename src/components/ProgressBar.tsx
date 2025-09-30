import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showPercentage = false,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-[var(--color-accent)]',
    success: 'bg-green-500',
    warning: 'bg-orange-500',
  };

  return (
    <div className={`relative ${className}`}>
      <div className="w-full bg-[var(--color-bg-secondary)] rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showPercentage && (
        <span className="absolute right-0 -top-6 text-sm text-[var(--color-text-secondary)] font-medium">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;