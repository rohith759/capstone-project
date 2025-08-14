import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecurityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const SecurityScore: React.FC<SecurityScoreProps> = ({ score, size = 'md', showLabel = true }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-red-600 bg-red-50';
    if (score >= 0.7) return 'text-orange-600 bg-orange-50';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.9) return 'Critical Risk';
    if (score >= 0.7) return 'High Risk';
    if (score >= 0.5) return 'Medium Risk';
    return 'Low Risk';
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const scorePercentage = Math.round(score * 100);

  return (
    <div className="flex items-center space-x-3">
      <div className={`relative flex items-center justify-center rounded-full font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}>
        {score >= 0.7 ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Shield className="w-4 h-4" />
        )}
        <div className="absolute -top-1 -right-1 bg-white rounded-full px-1 text-xs font-semibold border shadow-sm">
          {scorePercentage}
        </div>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{getScoreLabel(score)}</span>
          <span className="text-xs text-gray-500">Score: {scorePercentage}/100</span>
        </div>
      )}
    </div>
  );
};

export default SecurityScore;