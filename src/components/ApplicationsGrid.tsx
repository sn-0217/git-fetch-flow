
import React from 'react';
import { Search, Layers, AlertTriangle, XCircle, Activity, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppCard from './AppCard';

interface AppStatus {
  text: string;
  color: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

interface ApplicationsGridProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  error: string | null;
  filteredApps: string[];
  getAppStatus: (appName: string) => AppStatus;
  handleAppClick: (appName: string) => void;
  handleStatusClick: (appName: string, e: React.MouseEvent) => void;
}

const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({
  searchTerm,
  setSearchTerm,
  isLoading,
  error,
  filteredApps,
  getAppStatus,
  handleAppClick,
  handleStatusClick
}) => {
  return (
    <Card className="relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 group" data-section="applications">
      {/* Enhanced gradient background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/60 to-blue-50/80"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/3 via-transparent to-blue-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      {/* Floating accent elements */}
      <div className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-2xl opacity-40"></div>
      
      <CardContent className="p-10 relative z-10">
        <div className="flex items-center justify-between mb-10" data-section="apps-header">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 group-hover:shadow-purple-500/30">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg animate-bounce">
                {!error && !isLoading ? filteredApps.length : '0'}
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text">
                Application Portfolio
              </h2>
              <p className="text-slate-600 text-base font-medium">Select an application to initiate change requests</p>
            </div>
          </div>
          
          <div className="relative group" data-component="search">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-600 transition-colors duration-300 z-10" />
            <Input 
              placeholder="Search applications..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-12 w-80 bg-white/70 backdrop-blur-sm border-slate-200/60 focus:border-purple-300 focus:ring-purple-100/50 transition-all duration-300 focus:w-96 hover:bg-white/80 shadow-lg focus:shadow-xl relative z-10 text-slate-900 placeholder:text-slate-500" 
              data-input="search" 
            />
          </div>
        </div>

        {/* Enhanced loading, error, and empty states */}
        {isLoading ? (
          <div className="text-center py-24" data-state="loading">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-blue-400 rounded-full animate-spin mx-auto" style={{
                animationDirection: 'reverse',
                animationDuration: '1.5s'
              }}></div>
              <div className="absolute inset-0 w-24 h-24 border-2 border-transparent border-r-indigo-500 rounded-full animate-spin mx-auto" style={{
                animationDuration: '2s'
              }}></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-800">Loading Applications</h3>
              <p className="text-slate-600 max-w-md mx-auto">Fetching your application portfolio from the server</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-24" data-state="error">
            <div className="relative mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <AlertTriangle className="w-14 h-14 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Connection Failed</h3>
            <p className="text-slate-600 max-w-lg mx-auto mb-8 text-lg">
              Unable to connect to the server. Please contact admin for assistance.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="gap-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Activity className="w-5 h-5" />
              Retry Connection
            </Button>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-24" data-state="no-results">
            <div className="relative mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Search className="w-14 h-14 text-slate-400" />
              </div>
              <div className="absolute -top-2 -right-8 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <XCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">No Applications Found</h3>
            <p className="text-slate-600 max-w-lg mx-auto mb-8 text-lg">
              Your search didn't match any applications in the current environment. Try adjusting your search criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')} 
              className="gap-3 hover:scale-105 transition-all duration-300 px-8 py-3 text-base font-semibold bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white shadow-lg hover:shadow-xl"
            >
              <XCircle className="w-5 h-5" />
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8" data-grid="applications">
            {filteredApps.map((app, index) => {
              const status = getAppStatus(app);
              return (
                <AppCard 
                  key={app} 
                  app={app} 
                  index={index} 
                  status={status} 
                  hasValidSubmissions={status.text !== 'No Changes'} 
                  onAppClick={handleAppClick} 
                  onStatusClick={handleStatusClick} 
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsGrid;
