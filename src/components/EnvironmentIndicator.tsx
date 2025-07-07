
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Code, Shield, Cpu, Zap } from 'lucide-react';

interface EnvironmentIndicatorProps {
  environment: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const EnvironmentIndicator: React.FC<EnvironmentIndicatorProps> = ({ 
  environment, 
  size = 'md',
  showLabel = true 
}) => {
  const getEnvironmentConfig = (env: string) => {
    switch (env) {
      case 'DEV':
        return {
          icon: <Code className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />,
          className: 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 hover:shadow-blue-100/50 shadow-blue-50/30',
          pulseColor: 'bg-blue-400'
        };
      case 'PROD':
        return {
          icon: <Shield className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />,
          className: 'bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 text-red-700 border-red-200 hover:from-red-100 hover:via-rose-100 hover:to-pink-100 hover:shadow-red-100/50 shadow-red-50/30',
          pulseColor: 'bg-red-400'
        };
      case 'TEST':
        return {
          icon: <Cpu className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />,
          className: 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 text-amber-700 border-amber-200 hover:from-amber-100 hover:via-yellow-100 hover:to-orange-100 hover:shadow-amber-100/50 shadow-amber-50/30',
          pulseColor: 'bg-amber-400'
        };
      default:
        return {
          icon: <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />,
          className: 'bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 text-slate-700 border-slate-200 hover:from-slate-100 hover:via-gray-100 hover:to-slate-100 hover:shadow-slate-100/50 shadow-slate-50/30',
          pulseColor: 'bg-slate-400'
        };
    }
  };

  const config = getEnvironmentConfig(environment);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-semibold',
    lg: 'px-4 py-2 text-base font-bold'
  };

  return (
    <div className="relative">
      <Badge 
        className={`
          ${config.className} 
          ${sizeClasses[size]}
          gap-2 
          hover:scale-105 
          transition-all 
          duration-300 
          shadow-sm 
          hover:shadow-lg
          border
          backdrop-blur-sm
        `}
      >
        <div className="relative">
          {config.icon}
          <div className={`absolute -top-1 -right-1 w-2 h-2 ${config.pulseColor} rounded-full animate-pulse opacity-75`}></div>
        </div>
        {showLabel && environment}
      </Badge>
    </div>
  );
};

export default EnvironmentIndicator;
