
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start content animation after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    // Hide splash screen after 2.5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Complete after fade-out animation
      setTimeout(onComplete, 600);
    }, 2500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 transition-all duration-500 ease-out opacity-0 pointer-events-none">
        <div className="text-center transform translate-y-4">
          <div className="mb-8">
            <h1 className="text-7xl font-black text-slate-800 mb-3 tracking-tight">
              Apptech
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full opacity-0"></div>
          </div>
          <p className="text-xl font-medium text-slate-500 tracking-wide">
            Knitwell Group
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 transition-all duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <div className="mb-8">
          <h1 className={`text-7xl font-black text-slate-800 mb-3 tracking-tight transition-all duration-800 ease-out ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'}`}>
            Apptech
          </h1>
          <div className={`h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full transition-all duration-1000 ease-out delay-300 ${showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>
        <p className={`text-xl font-medium text-slate-500 tracking-wide transition-all duration-800 ease-out delay-500 ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          Knitwell Group
        </p>
      </div>
      
      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 transition-all duration-[3000ms] ease-out ${showContent ? 'transform scale-150 rotate-45' : 'transform scale-100 rotate-0'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full opacity-15 transition-all duration-[3500ms] ease-out delay-200 ${showContent ? 'transform scale-125 -rotate-12' : 'transform scale-100 rotate-0'}`}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
