
import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';

export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );
  
  useEffect(() => {
    const updateOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };
    
    // Run once to set initial value
    updateOrientation();
    
    // Add event listener
    window.addEventListener('resize', updateOrientation);
    
    // Screen orientation API if available
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateOrientation);
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation);
      }
    };
  }, []);
  
  return orientation;
}
