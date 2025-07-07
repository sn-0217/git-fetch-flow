
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers } from 'lucide-react';

interface AppStatus {
  text: string;
  color: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

interface AppCardProps {
  app: string;
  index: number;
  status: AppStatus;
  hasValidSubmissions: boolean;
  onAppClick: (appName: string) => void;
  onStatusClick: (appName: string, e: React.MouseEvent) => void;
}

const AppCard: React.FC<AppCardProps> = ({
  app,
  index,
  status,
  hasValidSubmissions,
  onAppClick,
  onStatusClick
}) => {
  return (
    <Card 
      key={app} 
      className={`group relative transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'} hover:scale-[1.02]`} 
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }} 
      onClick={() => onAppClick(app)} 
      data-app={app.toLowerCase().replace(/\s+/g, '-')}
    >
      {/* Enhanced gradient overlay with glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-blue-500/0 to-indigo-600/0 group-hover:from-purple-600/15 group-hover:via-blue-500/10 group-hover:to-indigo-600/15 transition-all duration-700 pointer-events-none" />
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-purple-200/50 group-hover:shadow-[inset_0_0_20px_rgba(147,51,234,0.1)] transition-all duration-700" />
      
      <CardContent className="p-6 text-center relative z-10">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-purple-100 group-hover:to-blue-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-700 group-hover:scale-115 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25 group-hover:rotate-3">
            <Layers className="w-8 h-8 text-slate-600 group-hover:text-purple-600 transition-all duration-500 group-hover:scale-110" />
          </div>
          {/* Enhanced status indicator dot with pulse effect */}
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-500 ${status.text === 'Approved' ? 'bg-emerald-500 group-hover:bg-emerald-400' : status.text === 'Rejected' ? 'bg-rose-500 group-hover:bg-rose-400' : status.text === 'Timed Approval' ? 'bg-amber-500 group-hover:bg-amber-400' : 'bg-slate-400 group-hover:bg-slate-300'} group-hover:scale-125 group-hover:animate-pulse`}></div>
        </div>
        <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-purple-900 transition-all duration-500 leading-tight group-hover:scale-105">{app}</h3>
        <Badge 
          className={`${status.bgColor} ${status.borderColor} ${status.color} border gap-2 font-medium transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/20 ${
            hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'
          } ${
            status.text === 'Approved' 
              ? 'hover:bg-emerald-100 hover:border-emerald-300 hover:text-emerald-800 group-hover:bg-emerald-50' 
              : status.text === 'Rejected' 
              ? 'hover:bg-rose-100 hover:border-rose-300 hover:text-rose-800 group-hover:bg-rose-50'
              : status.text === 'Timed Approval'
              ? 'hover:bg-amber-100 hover:border-amber-300 hover:text-amber-800 group-hover:bg-amber-50'
              : 'hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 group-hover:bg-slate-50'
          }`}
          onClick={e => onStatusClick(app, e)} 
          data-status={status.text.toLowerCase().replace(/\s+/g, '-')}
        >
          {status.icon}
          {status.text}
        </Badge>
      </CardContent>
      
      {/* Enhanced animated bottom accent line with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center group-hover:shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
      
      {/* Subtle corner highlights */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-sm" />
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-sm" />
    </Card>
  );
};

export default AppCard;
