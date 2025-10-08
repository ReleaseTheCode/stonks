import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: number;
  totalScreens: number;
  onPrevious: () => void;
  onNext: () => void;
  nextLabel?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  totalScreens,
  onPrevious,
  onNext,
  nextLabel = 'Next'
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={currentScreen === 0}
          className="text-slate-300 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalScreens }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentScreen ? 'bg-white' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={currentScreen === totalScreens - 1}
          className="text-slate-300 hover:text-white disabled:opacity-30"
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;