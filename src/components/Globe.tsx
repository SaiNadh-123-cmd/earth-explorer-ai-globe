
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlobeProps {
  className?: string;
  autoRotate?: boolean;
  showPoliticalBorders?: boolean;
}

const Globe: React.FC<GlobeProps> = ({ 
  className,
  autoRotate = true,
  showPoliticalBorders = false 
}) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 20, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // When component mounts
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Apply rotation styles
  const globeStyle = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    animation: autoRotate && !isDragging ? 'globe-rotate 120s linear infinite' : 'none',
  };

  return (
    <div 
      className={cn(
        "w-full h-full globe-container relative",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={globeRef}
        className="globe w-[500px] h-[500px] mx-auto rounded-full bg-geo-blue-light relative overflow-hidden"
        style={globeStyle}
      >
        {/* Base ocean layer */}
        <div className="absolute inset-0 bg-geo-water"></div>
        
        {/* Land masses - simplified for initial version */}
        <div className="absolute w-[60%] h-[80%] bg-geo-land opacity-90 top-[10%] left-[20%] rounded-full"></div>
        <div className="absolute w-[30%] h-[40%] bg-geo-land opacity-90 top-[30%] left-[5%] rounded-full"></div>
        <div className="absolute w-[25%] h-[60%] bg-geo-land opacity-90 top-[20%] left-[70%] rounded-full"></div>
        
        {/* Political borders overlay */}
        {showPoliticalBorders && (
          <div className="absolute inset-0 bg-white opacity-10 
            bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png')] 
            bg-cover bg-center">
          </div>
        )}
        
        {/* Atmosphere glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-geo-teal/10 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Glow effect beneath globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-20 bg-geo-teal/20 rounded-full blur-xl animate-pulse-glow"></div>
    </div>
  );
};

export default Globe;
