
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade-out animation to complete
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-opacity duration-300 opacity-0 pointer-events-none`}>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-pulse">
            Apptech
          </h1>
          <p className="text-xl font-medium text-gray-500">
            Knitwell Group
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-pulse">
          Apptech
        </h1>
        <p className="text-xl font-medium text-gray-500">
          Knitwell Group
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
