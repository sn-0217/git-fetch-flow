
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Code, Cpu } from 'lucide-react';

interface EnvironmentIndicatorProps {
  currentEnv: string;
  className?: string;
}

const EnvironmentIndicator: React.FC<EnvironmentIndicatorProps> = ({
  currentEnv,
  className = ''
}) => {
  const getEnvironmentConfig = (env: string) => {
    switch (env) {
      case 'DEV':
        return {
          icon: <Code className="w-4 h-4" />,
          label: 'DEV',
          className: 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 border-blue-200 shadow-blue-100/50 hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 hover:shadow-blue-200/50'
        };
      case 'PROD':
        return {
          icon: <Shield className="w-4 h-4" />,
          label: 'PROD',
          className: 'bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 text-red-700 border-red-200 shadow-red-100/50 hover:from-red-100 hover:via-rose-100 hover:to-pink-100 hover:shadow-red-200/50'
        };
      default:
        return {
          icon: <Cpu className="w-4 h-4" />,
          label: env,
          className: 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 text-emerald-700 border-emerald-200 shadow-emerald-100/50 hover:from-emerald-100 hover:via-teal-100 hover:to-cyan-100 hover:shadow-emerald-200/50'
        };
    }
  };

  const config = getEnvironmentConfig(currentEnv);

  return (
    <Badge 
      className={`gap-2 px-4 py-2 font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${config.className} ${className}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default EnvironmentIndicator;
