
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
      className={`group relative transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 bg-gradient-to-br from-white via-slate-50/50 to-white border border-slate-200/60 shadow-md overflow-hidden ${hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'} hover:scale-[1.02] hover:border-indigo-300/50`} 
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }} 
      onClick={() => onAppClick(app)} 
      data-app={app.toLowerCase().replace(/\s+/g, '-')}
    >
      {/* Enhanced gradient overlay with shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-purple-500/0 to-pink-600/0 group-hover:from-indigo-600/8 group-hover:via-purple-500/5 group-hover:to-pink-600/8 transition-all duration-500 pointer-events-none" />
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
      
      {/* Enhanced border glow */}
      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-indigo-200/60 group-hover:shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] transition-all duration-500" />
      
      <CardContent className="p-6 text-center relative z-10">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 via-white to-slate-100 group-hover:from-indigo-100 group-hover:via-purple-50 group-hover:to-pink-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-300/30 group-hover:rotate-2 border border-slate-200/50 group-hover:border-indigo-200/60">
            <Layers className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-all duration-500 group-hover:scale-105" />
          </div>
          {/* Enhanced status indicator with better styling */}
          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-500 ${
            status.text === 'Approved' 
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 group-hover:from-emerald-400 group-hover:to-green-400 shadow-emerald-200' 
              : status.text === 'Rejected' 
              ? 'bg-gradient-to-r from-rose-500 to-red-500 group-hover:from-rose-400 group-hover:to-red-400 shadow-rose-200' 
              : status.text === 'Timed Approval' 
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 shadow-amber-200' 
              : 'bg-gradient-to-r from-slate-400 to-gray-400 group-hover:from-slate-300 group-hover:to-gray-300 shadow-slate-200'
          } group-hover:scale-125 group-hover:animate-pulse`}></div>
        </div>
        
        <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-indigo-900 transition-all duration-500 leading-tight group-hover:scale-105">{app}</h3>
        
        <Badge 
          className={`${status.bgColor} ${status.borderColor} ${status.color} border gap-2 font-medium transition-all duration-500 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-indigo-300/30 ${
            hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'
          } ${
            status.text === 'Approved' 
              ? 'hover:bg-emerald-100 hover:border-emerald-300 hover:text-emerald-800 group-hover:bg-emerald-50/80 hover:shadow-emerald-200/60' 
              : status.text === 'Rejected' 
              ? 'hover:bg-rose-100 hover:border-rose-300 hover:text-rose-800 group-hover:bg-rose-50/80 hover:shadow-rose-200/60'
              : status.text === 'Timed Approval'
              ? 'hover:bg-amber-100 hover:border-amber-300 hover:text-amber-800 group-hover:bg-amber-50/80 hover:shadow-amber-200/60'
              : 'hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 group-hover:bg-slate-50/80 hover:shadow-slate-200/60'
          }`}
          onClick={e => onStatusClick(app, e)} 
          data-status={status.text.toLowerCase().replace(/\s+/g, '-')}
        >
          {status.icon}
          {status.text}
        </Badge>
      </CardContent>
      
      {/* Enhanced animated bottom accent with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center group-hover:shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
      
      {/* Enhanced corner highlights */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 blur-sm" />
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 blur-sm" />
    </Card>
  );
};

export default AppCard;
