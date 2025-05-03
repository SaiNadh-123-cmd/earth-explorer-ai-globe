
import React, { useState, useEffect } from 'react';
import Globe from '@/components/Globe';
import Sidebar from '@/components/Sidebar';
import PlaceInfo from '@/components/PlaceInfo';
import MapTokenInput from '@/components/MapTokenInput';
import { toast } from "sonner";
import { googleMapsConfig } from '@/config/apiConfig';

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('globe');
  const [activeLayers, setActiveLayers] = useState<{[key: string]: boolean}>({
    political: false,
    biomes: false,
    tectonic: false,
    weather: false
  });
  
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [googleApiKey, setGoogleApiKey] = useState<string>(() => {
    // Try to get token from localStorage
    return localStorage.getItem('google_api_key') || googleMapsConfig.apiKey;
  });
  
  // Save token to localStorage when it changes
  useEffect(() => {
    if (googleApiKey) {
      localStorage.setItem('google_api_key', googleApiKey);
    }
  }, [googleApiKey]);
  
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
  
  // AI-enhanced search with place information
  const handleSearch = (query: string) => {
    toast(`Searching for "${query}"...`);
    
    // Our AI-powered location database with rich information
    const aiLocationData: {[key: string]: any} = {
      "tokyo": {
        name: 'Tokyo',
        type: 'City',
        country: 'Japan',
        continent: 'Asia',
        coordinates: [139.6503, 35.6762],
        population: 13960000,
        founded: '1603',
        weather: 'Partly Cloudy',
        temperature: 22,
        description: 'Tokyo is the capital and largest city of Japan, and one of the most populous metropolitan areas in the world. It combines ultramodern and traditional aspects, from neon-lit skyscrapers to historic temples.'
      },
      "mount everest": {
        name: 'Mount Everest',
        type: 'Mountain',
        country: 'Nepal/China',
        continent: 'Asia',
        coordinates: [86.9250, 27.9881],
        elevation: 8848,
        weather: 'Snow',
        temperature: -36,
        description: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. It attracts climbers of all levels, including highly experienced mountaineers.'
      },
      "great barrier reef": {
        name: 'Great Barrier Reef',
        type: 'Natural Wonder',
        country: 'Australia',
        continent: 'Oceania',
        coordinates: [145.8688, -16.2864],
        area: 344400, // sq km
        weather: 'Sunny',
        temperature: 28,
        description: 'The Great Barrier Reef is the world\'s largest coral reef system, visible from outer space. It supports a wide diversity of life and was selected as a World Heritage Site in 1981.'
      },
      "grand canyon": {
        name: 'Grand Canyon',
        type: 'Natural Wonder',
        country: 'United States',
        continent: 'North America',
        coordinates: [-112.1401, 36.0544],
        depth: 1857, // meters
        weather: 'Clear',
        temperature: 25,
        description: 'The Grand Canyon is a steep-sided canyon carved by the Colorado River. It is 277 miles long, up to 18 miles wide and attains a depth of over 1,800 meters.'
      },
      "pyramids of giza": {
        name: 'Pyramids of Giza',
        type: 'Historical Landmark',
        country: 'Egypt',
        continent: 'Africa',
        coordinates: [31.1342, 29.9792],
        built: '2580 BCE',
        weather: 'Hot',
        temperature: 32,
        description: 'The Pyramids of Giza are ancient pyramid complexes on the Giza Plateau, near Cairo. The pyramids were built as tombs for the pharaohs and their consorts during the Old Kingdom period.'
      }
    };
    
    // Search our AI database
    const queryLower = query.toLowerCase();
    const foundLocation = Object.entries(aiLocationData).find(([key]) => 
      queryLower.includes(key) || key.includes(queryLower)
    );
    
    if (foundLocation) {
      setSelectedPlace(foundLocation[1]);
    } else {
      // Generate AI response for unknown location
      const words = query.split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      const formattedName = capitalizedWords.join(' ');
      
      // Generate random coordinates near the equator for demonstration
      const randomLong = Math.random() * 360 - 180;
      const randomLat = Math.random() * 60 - 30;
      
      setSelectedPlace({
        name: formattedName,
        type: 'Location',
        coordinates: [randomLong, randomLat],
        description: `This is an AI-generated description for ${formattedName}. In a full implementation, we would connect to a real geographic database or API to get accurate information about this location.`,
      });
    }
  };
  
  // Handle location selection from the map
  const handleLocationSelect = (location: { name: string; coordinates: [number, number] }) => {
    setSelectedPlace({
      name: location.name,
      type: 'Location',
      coordinates: location.coordinates,
      description: 'Selected location on the globe. Our AI system can analyze terrain, population, and geographic features of this area.'
    });
    
    toast.info(`Selected: ${location.name}`);
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
  
  const handleTokenSave = (token: string) => {
    setGoogleApiKey(token);
  };
  
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        onLayerToggle={handleLayerToggle}
        onSearch={handleSearch}
        onViewChange={handleViewChange}
        activeLayers={activeLayers}
      />
      
      {/* Main content */}
      <div className="flex-1 relative bg-geo-blue-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10"></div>
        
        {/* Content container */}
        <div className="relative h-full flex items-center justify-center overflow-hidden">
          <Globe 
            autoRotate={!selectedPlace}
            showPoliticalBorders={activeLayers.political}
            showBiomes={activeLayers.biomes}
            showTectonicPlates={activeLayers.tectonic}
            showWeather={activeLayers.weather}
            onLocationSelect={handleLocationSelect}
          />
          
          {selectedPlace && (
            <PlaceInfo 
              place={selectedPlace} 
              onClose={() => setSelectedPlace(null)}
            />
          )}
        </div>
        
        {/* API Key Input */}
        <div className="absolute top-4 right-4 w-72 z-10">
          <MapTokenInput 
            onTokenSave={handleTokenSave} 
            className="bg-geo-blue-dark/80 backdrop-blur-md p-3 rounded-md border border-geo-blue-light" 
          />
        </div>
        
        {/* App version and info */}
        <div className="absolute bottom-2 right-2 text-xs text-white/50">
          GeoSphere 360° – AI-Powered Earth Explorer
        </div>
      </div>
    </div>
  );
};

export default Index;
