import { useState, useEffect, useMemo } from 'react';
import { BarChart3, TrendingUp, Layers, Home, Code, Shield, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToastContext } from '@/contexts/ToastContext';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import { loadSubmissions } from '@/utils/testData';
import SubmissionStatistics from '@/components/SubmissionStatistics';
import SubmissionFilters from '@/components/SubmissionFilters';
import SubmissionsList from '@/components/SubmissionsList';

// Backend submission interface to match the API response
interface BackendSubmission {
  appData: {
    appName: string;
    changeNumber: string;
    applicationOwner: string;
    maintenanceWindow: string;
    changeDescription: string;
    infrastructureImpact: string;
    hosts: string[];
  };
  formSubmission: {
    changeNumber: string;
    approverName: string;
    approverEmail: string;
    decision: 'Approved' | 'Rejected' | 'Timed';
    environment: string;
    startTime?: string;
    endTime?: string;
    comments?: string;
  };
  submittedAt: string;
  status: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { showError } = useToastContext();
  const { currentEnv } = useEnvironment();
  const [searchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load submissions from API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);

        console.log('Loading submissions from API...');
        
        // Load submissions from API
        const submissionsData = await loadSubmissions();
        
        // Log the environment values in the submissions for debugging
        console.log('Submission environments:', submissionsData.map(sub => sub.formSubmission?.environment));
        console.log('Current environment filter:', currentEnv);
        
        // Filter by current environment
        const envSubmissions = submissionsData.filter((sub: BackendSubmission) => 
          sub.formSubmission && sub.formSubmission.environment === currentEnv);
        setSubmissions(envSubmissions);
        
        console.log('Submissions loaded and filtered:', envSubmissions);

      } catch (error) {
        console.error('Failed to load submissions:', error);
        setSubmissions([]);
        showError(
          'Failed to Load Submissions',
          'Unable to fetch submission data. Please check your connection and try again.'
        );
      } finally {
        // Check for search parameter in URL
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
          setSearchTerm(searchQuery);
        }

        setTimeout(() => setIsLoading(false), 600);
      }
    };
    fetchSubmissions();
  }, [currentEnv, searchParams, showError]);

  const handleStatisticClick = (filterType: string) => {
    setStatusFilter(filterType);
    setSearchTerm(''); // Clear search term when clicking filter cards
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      if (!submission.appData || !submission.formSubmission) return false;
      
      const matchesSearch = !searchTerm || 
        submission.appData.appName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        submission.formSubmission.changeNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
        submission.formSubmission.approverName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        submission.formSubmission.approverEmail?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        submission.formSubmission.comments?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        submission.formSubmission.decision.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-blue-400 rounded-full animate-spin mx-auto" style={{
              animationDirection: 'reverse',
              animationDuration: '1.5s'
            }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-700 font-semibold text-lg">Loading submissions...</p>
            <p className="text-slate-500 text-sm">Fetching approval history</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100" data-page="submissions">
      {/* Enhanced Header with Glass Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4" data-section="header-brand">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Submission Analytics</h1>
                <p className="text-slate-600 text-sm">Comprehensive approval history & insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4" data-section="header-actions">
              <Badge className={`gap-2 px-3 py-1.5 font-semibold hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md ${
                currentEnv === 'DEV' 
                  ? 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 border-indigo-200 hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 hover:shadow-indigo-100/50'
                  : currentEnv === 'PROD'
                  ? 'bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 text-red-700 border-red-200 hover:from-red-100 hover:via-rose-100 hover:to-pink-100 hover:shadow-red-100/50'
                  : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 text-amber-700 border-amber-200 hover:from-amber-100 hover:via-yellow-100 hover:to-orange-100 hover:shadow-amber-100/50'
              }`}>
                {currentEnv === 'DEV' ? (
                  <Code className="w-4 h-4" />
                ) : currentEnv === 'PROD' ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  <Cpu className="w-4 h-4" />
                )}
                {currentEnv}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2 hover:scale-105 transition-transform shadow-sm" onClick={() => navigate('/home')} data-action="back-home">
                <Home className="w-4 h-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8" data-main="submissions-content">
        <SubmissionStatistics 
          submissions={submissions}
          statusFilter={statusFilter}
          onStatisticClick={handleStatisticClick}
        />

        <SubmissionFilters 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
        />

        <SubmissionsList 
          submissions={filteredSubmissions}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              © 2025 Apptech Knitwell. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-slate-500">Powered by Modern Web Technologies</span>
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;