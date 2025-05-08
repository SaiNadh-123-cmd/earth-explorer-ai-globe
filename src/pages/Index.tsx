
import React, { useState, useEffect } from 'react';
import Globe from '@/components/Globe';
import Sidebar from '@/components/Sidebar';
import PlaceInfo from '@/components/PlaceInfo';
import MapTokenInput from '@/components/MapTokenInput';
import { toast } from "sonner";
import { googleMapsConfig } from '@/config/apiConfig';
import { Map, Info, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Close sidebar on mobile by default
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
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

    // On mobile, close the sidebar when search results appear
    if (isMobile) {
      setSidebarOpen(false);
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
    
    // On mobile, close the sidebar when location is selected
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Handle view changes
  const handleViewChange = (view: string) => {
    setCurrentView(view);
    toast.info(`Switched to ${view.charAt(0).toUpperCase() + view.slice(1)} view`);
    
    // On mobile, close the sidebar when view changes
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const handleTokenSave = (token: string) => {
    setGoogleApiKey(token);
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Render appropriate content based on current view
  const renderContent = () => {
    switch(currentView) {
      case 'globe':
        return (
          <Globe 
            autoRotate={!selectedPlace}
            showPoliticalBorders={activeLayers.political}
            showBiomes={activeLayers.biomes}
            showTectonicPlates={activeLayers.tectonic}
            showWeather={activeLayers.weather}
            onLocationSelect={handleLocationSelect}
          />
        );
      case 'map':
        return (
          <div className="w-full h-full flex items-center justify-center flex-col text-white">
            <Map className="w-12 h-12 mb-4 text-geo-teal" />
            <h2 className="text-xl mb-2">2D Map View</h2>
            <p className="text-center text-white/70 max-w-md px-4">
              Flat map projection of Earth with interactive controls and the ability to toggle between different map styles.
            </p>
          </div>
        );
      case 'search':
        return (
          <div className="w-full h-full flex items-center justify-center flex-col text-white">
            <Search className="w-12 h-12 mb-4 text-geo-teal" />
            <h2 className="text-xl mb-2">Advanced Search</h2>
            <p className="text-center text-white/70 max-w-md mb-4 px-4">
              Find places, compare locations, and discover interesting facts about anywhere on Earth.
            </p>
            <div className="bg-geo-blue-medium p-4 sm:p-6 rounded-lg border border-geo-blue-light max-w-md w-full mx-4">
              <h3 className="text-lg mb-3">Search Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Search by coordinates</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text" 
                      placeholder="Latitude" 
                      className="flex-1 bg-geo-blue-dark text-white border border-geo-blue-light rounded p-2"
                    />
                    <input 
                      type="text" 
                      placeholder="Longitude" 
                      className="flex-1 bg-geo-blue-dark text-white border border-geo-blue-light rounded p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Search by category</label>
                  <select className="w-full bg-geo-blue-dark text-white border border-geo-blue-light rounded p-2">
                    <option>Cities</option>
                    <option>Mountains</option>
                    <option>Bodies of Water</option>
                    <option>Historical Sites</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'info':
        return (
          <div className="w-full h-full flex items-center justify-center flex-col text-white overflow-y-auto p-4">
            <Info className="w-12 h-12 mb-4 text-geo-teal" />
            <h2 className="text-xl mb-2">About GeoSphere 360°</h2>
            <div className="bg-geo-blue-medium p-4 sm:p-6 rounded-lg border border-geo-blue-light max-w-2xl w-full">
              <h3 className="text-lg mb-3 text-geo-teal">Application Overview</h3>
              <p className="mb-4 text-white/80">
                GeoSphere 360° is an AI-powered interactive Earth exploration platform that combines 
                real-world geographic data with advanced visualization technology.
              </p>
              
              <h3 className="text-lg mb-2 text-geo-teal">Key Features</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-white/80">
                <li>Interactive 3D globe with detailed Earth imagery</li>
                <li>Multiple data layers including political borders, biomes, and weather</li>
                <li>AI-enhanced search functionality for discovering global locations</li>
                <li>Real-time location information and detailed statistics</li>
              </ul>
              
              <h3 className="text-lg mb-2 text-geo-teal">Usage Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-white/80">
                <li>Drag the globe to rotate the view</li>
                <li>Click on any location to see detailed information</li>
                <li>Toggle data layers in the sidebar for different visualizations</li>
                <li>Use the search function to quickly find specific locations</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <div>Unknown view</div>;
    }
  };
  
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-30 bg-geo-blue-medium p-2 rounded-full shadow-lg border border-geo-blue-light"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-geo-teal"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                      transition-transform duration-300 fixed md:relative z-20 h-full 
                      ${isMobile ? 'w-3/4 sm:w-64' : 'w-64'}`}>
        <Sidebar 
          onLayerToggle={handleLayerToggle}
          onSearch={handleSearch}
          onViewChange={handleViewChange}
          activeLayers={activeLayers}
        />
      </div>
      
      {/* Backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main content */}
      <div className="flex-1 relative bg-geo-blue-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10"></div>
        
        {/* Content container - Add aspect ratio for mobile */}
        <div className={`relative h-full flex items-center justify-center overflow-hidden ${isMobile ? 'mobile-container' : ''}`}>
          {renderContent()}
          
          {selectedPlace && (
            <PlaceInfo 
              place={selectedPlace} 
              onClose={() => setSelectedPlace(null)}
            />
          )}
        </div>
        
        {/* API Key Input */}
        <div className="absolute top-4 right-4 w-72 max-w-[calc(100%-5rem)] z-10">
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
