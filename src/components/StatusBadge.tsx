import React from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'allowed' | 'quarantined' | 'blocked' | 'suspicious';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    allowed: {
      icon: CheckCircle,
      label: 'Safe',
      colors: 'bg-green-100 text-green-800 border-green-200',
      iconColors: 'text-green-600'
    },
    quarantined: {
      icon: AlertTriangle,
      label: 'Quarantined',
      colors: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      iconColors: 'text-yellow-600'
    },
    blocked: {
      icon: XCircle,
      label: 'Blocked',
      colors: 'bg-red-100 text-red-800 border-red-200',
      iconColors: 'text-red-600'
    },
    suspicious: {
      icon: Shield,
      label: 'Suspicious',
      colors: 'bg-orange-100 text-orange-800 border-orange-200',
      iconColors: 'text-orange-600'
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const { icon: Icon, label, colors, iconColors } = config[status];

  return (
    <span className={`inline-flex items-center space-x-1.5 font-medium rounded-full border ${colors} ${sizeClasses[size]}`}>
      <Icon className={`${iconSizes[size]} ${iconColors}`} />
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;