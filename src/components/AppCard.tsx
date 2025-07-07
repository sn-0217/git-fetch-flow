
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Sparkles } from 'lucide-react';

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
      className={`group relative transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-6 bg-white/90 backdrop-blur-md border-0 shadow-lg overflow-hidden ${hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'} hover:scale-[1.03] transform-gpu`} 
      style={{
        animationDelay: `${index * 80}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }} 
      onClick={() => onAppClick(app)} 
      data-app={app.toLowerCase().replace(/\s+/g, '-')}
    >
      {/* Enhanced gradient overlays with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-blue-500/0 to-indigo-600/0 group-hover:from-purple-600/12 group-hover:via-blue-500/8 group-hover:to-indigo-600/12 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/0 to-violet-400/0 group-hover:from-pink-400/5 group-hover:to-violet-400/5 transition-all duration-1000 pointer-events-none" />
      
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out" />
      </div>
      
      {/* Enhanced border glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-200/60 group-hover:shadow-[inset_0_0_30px_rgba(147,51,234,0.08)] transition-all duration-700" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-purple-400/40 to-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-tr from-blue-400/40 to-purple-400/40 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-700" />
      
      <CardContent className="p-8 text-center relative z-10">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 via-white to-slate-50 group-hover:from-purple-50 group-hover:via-blue-50 group-hover:to-indigo-50 rounded-3xl flex items-center justify-center mx-auto transition-all duration-700 group-hover:scale-110 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:rotate-2 transform-gpu">
            <Layers className="w-10 h-10 text-slate-600 group-hover:text-purple-600 transition-all duration-500 group-hover:scale-110" />
          </div>
          
          {/* Enhanced status indicator with glow */}
          <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-3 border-white shadow-xl transition-all duration-500 ${
            status.text === 'Approved' 
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 group-hover:bg-gradient-to-br group-hover:from-emerald-300 group-hover:to-emerald-500' 
              : status.text === 'Rejected' 
              ? 'bg-gradient-to-br from-rose-400 to-rose-600 group-hover:bg-gradient-to-br group-hover:from-rose-300 group-hover:to-rose-500'
              : status.text === 'Timed Approval'
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 group-hover:bg-gradient-to-br group-hover:from-amber-300 group-hover:to-amber-500'
              : 'bg-gradient-to-br from-slate-400 to-slate-600 group-hover:bg-gradient-to-br group-hover:from-slate-300 group-hover:to-slate-500'
          } group-hover:scale-125 group-hover:animate-pulse group-hover:shadow-lg`}>
            {status.text === 'Approved' && (
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
            )}
          </div>
          
          {/* Sparkle effect for approved items */}
          {status.text === 'Approved' && (
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-slate-900 mb-4 text-xl group-hover:text-purple-900 transition-all duration-500 leading-tight group-hover:scale-105 transform-gpu">
          {app}
        </h3>
        
        <Badge 
          className={`${status.bgColor} ${status.borderColor} ${status.color} border-2 gap-2 font-semibold transition-all duration-500 group-hover:scale-110 shadow-md group-hover:shadow-xl group-hover:shadow-purple-500/15 px-4 py-2 text-sm ${
            hasValidSubmissions ? 'cursor-pointer' : 'cursor-default'
          } ${
            status.text === 'Approved' 
              ? 'hover:bg-emerald-100 hover:border-emerald-400 hover:text-emerald-800 group-hover:bg-emerald-50 hover:shadow-emerald-200/50' 
              : status.text === 'Rejected' 
              ? 'hover:bg-rose-100 hover:border-rose-400 hover:text-rose-800 group-hover:bg-rose-50 hover:shadow-rose-200/50'
              : status.text === 'Timed Approval'
              ? 'hover:bg-amber-100 hover:border-amber-400 hover:text-amber-800 group-hover:bg-amber-50 hover:shadow-amber-200/50'
              : 'hover:bg-slate-100 hover:border-slate-400 hover:text-slate-700 group-hover:bg-slate-50 hover:shadow-slate-200/50'
          } backdrop-blur-sm`}
          onClick={e => onStatusClick(app, e)} 
          data-status={status.text.toLowerCase().replace(/\s+/g, '-')}
        >
          <span className="group-hover:scale-110 transition-transform duration-300">
            {status.icon}
          </span>
          {status.text}
        </Badge>
      </CardContent>
      
      {/* Enhanced animated accent elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center group-hover:shadow-[0_0_12px_rgba(147,51,234,0.6)]" />
      
      {/* Corner glow effects */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm animate-pulse" />
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
    </Card>
  );
};

export default AppCard;
