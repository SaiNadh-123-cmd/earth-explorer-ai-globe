
import React from 'react';
import { RotateCw } from 'lucide-react';

interface OrientationPromptProps {
  onDismiss: () => void;
}

const OrientationPrompt: React.FC<OrientationPromptProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-geo-blue-dark/95 flex flex-col items-center justify-center text-white px-4">
      <div className="animate-pulse mb-8">
        <RotateCw className="h-16 w-16 text-geo-teal" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Rotate Your Device</h2>
      <p className="text-center mb-8 text-white/80 max-w-xs">
        For the best viewing experience, please rotate your device to landscape orientation.
      </p>
      <button 
        onClick={onDismiss}
        className="bg-geo-teal text-white px-6 py-3 rounded-md font-medium hover:bg-geo-highlight transition-colors"
      >
        Continue Anyway
      </button>
    </div>
  );
};

export default OrientationPrompt;
