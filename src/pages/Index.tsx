
import React, { useState } from 'react';
import Globe from '@/components/Globe';
import Sidebar from '@/components/Sidebar';
import PlaceInfo from '@/components/PlaceInfo';
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('globe');
  const [activeLayers, setActiveLayers] = useState<{[key: string]: boolean}>({
    political: false,
    biomes: false,
    tectonic: false,
    weather: false
  });
  
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  
  // Handle layer toggle
  const handleLayerToggle = (layer: string, enabled: boolean) => {
    setActiveLayers(prevLayers => ({
      ...prevLayers,
      [layer]: enabled
    }));
    
    if (enabled) {
      toast.success(`${layer.charAt(0).toUpperCase() + layer.slice(1)} layer enabled`);
    } else {
      toast.info(`${layer.charAt(0).toUpperCase() + layer.slice(1)} layer disabled`);
    }
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    toast(`Searching for "${query}"...`, {
      description: "Feature in development"
    });
    
    // Simulate search result for demo purposes
    if (query.toLowerCase() === 'tokyo') {
      setSelectedPlace({
        name: 'Tokyo',
        type: 'City',
        country: 'Japan',
        continent: 'Asia',
        coordinates: [35.6762, 139.6503],
        population: 13960000,
        founded: '1603',
        description: 'Tokyo is the capital and largest city of Japan, and one of the most populous metropolitan areas in the world.'
      });
    } else if (query.toLowerCase() === 'everest' || query.toLowerCase() === 'mount everest') {
      setSelectedPlace({
        name: 'Mount Everest',
        type: 'Mountain',
        country: 'Nepal/China',
        continent: 'Asia',
        coordinates: [27.9881, 86.9250],
        elevation: 8848,
        description: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.'
      });
    }
  };
  
  // Handle view changes
  const handleViewChange = (view: string) => {
    setCurrentView(view);
    
    if (view !== 'globe') {
      toast.info(`${view.charAt(0).toUpperCase() + view.slice(1)} view will be available in the next update`);
      // Change back to globe view after notification
      setTimeout(() => setCurrentView('globe'), 100);
    }
  };
  
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        onLayerToggle={handleLayerToggle}
        onSearch={handleSearch}
        onViewChange={handleViewChange}
      />
      
      {/* Main content */}
      <div className="flex-1 relative bg-gradient-to-b from-geo-blue-dark to-geo-blue-medium">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-20"></div>
        
        {/* Content container */}
        <div className="relative h-full flex items-center justify-center overflow-hidden">
          <Globe 
            autoRotate={!selectedPlace}
            showPoliticalBorders={activeLayers.political}
          />
          
          {selectedPlace && (
            <PlaceInfo 
              place={selectedPlace} 
              onClose={() => setSelectedPlace(null)}
            />
          )}
        </div>
        
        {/* App version and info */}
        <div className="absolute bottom-2 left-2 text-xs text-white/50">
          GeoSphere 360° – Ultimate Earth Explorer
        </div>
      </div>
    </div>
  );
};

export default Index;
