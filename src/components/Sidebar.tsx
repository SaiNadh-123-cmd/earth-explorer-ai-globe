
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SearchBar from './SearchBar';
import LayerToggle from './LayerToggle';
import { Globe, Info, Search, Layers, Map, Home } from 'lucide-react';

interface SidebarProps {
  className?: string;
  onLayerToggle: (layer: string, enabled: boolean) => void;
  onSearch: (query: string) => void;
  onViewChange: (view: string) => void;
  activeLayers?: {[key: string]: boolean};
}

const layerDescriptions = {
  political: "Shows country borders, capitals, major cities and administrative boundaries",
  biomes: "Displays ecological regions, forests, deserts, grasslands and other natural land cover",
  tectonic: "Visualizes tectonic plate boundaries, fault lines and geological features",
  weather: "Real-time weather patterns including precipitation, clouds and temperature"
};

const Sidebar: React.FC<SidebarProps> = ({ 
  className,
  onLayerToggle,
  onSearch,
  onViewChange,
  activeLayers = {
    political: false,
    biomes: false,
    tectonic: false,
    weather: false
  }
}) => {
  return (
    <div className={cn(
      "flex flex-col h-full bg-geo-blue-dark border-r border-geo-blue-medium text-white p-4 w-72",
      className
    )}>
      <div className="flex items-center mb-6">
        <Globe className="text-geo-teal mr-2" />
        <h1 className="text-xl font-bold">GeoSphere 360°</h1>
      </div>
      
      <SearchBar onSearch={onSearch} />
      
      <Separator className="my-4 bg-geo-blue-medium" />
      
      <div className="space-y-1">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 hover:bg-geo-blue-medium" 
          onClick={() => onViewChange('globe')}
        >
          <Home className="h-4 w-4" /> Overview
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 hover:bg-geo-blue-medium"
          onClick={() => onViewChange('map')}
        >
          <Map className="h-4 w-4" /> Map View
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 hover:bg-geo-blue-medium"
          onClick={() => onViewChange('search')}
        >
          <Search className="h-4 w-4" /> Advanced Search
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 hover:bg-geo-blue-medium"
          onClick={() => onViewChange('info')}
        >
          <Info className="h-4 w-4" /> About
        </Button>
      </div>
      
      <Separator className="my-4 bg-geo-blue-medium" />
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-2" />
          <h2 className="text-sm font-semibold">Map Layers</h2>
        </div>
        
        <div className="space-y-2">
          <LayerToggle 
            id="political"
            label="Political Borders"
            description={layerDescriptions.political}
            onChange={(checked) => onLayerToggle('political', checked)} 
            active={activeLayers.political}
          />
          
          <LayerToggle 
            id="biomes"
            label="Biomes & Ecosystems"
            description={layerDescriptions.biomes}
            onChange={(checked) => onLayerToggle('biomes', checked)} 
            active={activeLayers.biomes}
          />
          
          <LayerToggle 
            id="tectonic"
            label="Tectonic Plates"
            description={layerDescriptions.tectonic}
            onChange={(checked) => onLayerToggle('tectonic', checked)}
            active={activeLayers.tectonic}
          />
          
          <LayerToggle 
            id="weather"
            label="Weather Systems"
            description={layerDescriptions.weather}
            onChange={(checked) => onLayerToggle('weather', checked)}
            active={activeLayers.weather}
          />
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <div className="px-3 py-2 bg-geo-blue-light/20 rounded-md">
          <h3 className="text-sm font-semibold text-geo-teal mb-1">Pro Tip</h3>
          <p className="text-xs text-white/70">
            Click directly on the globe to select locations and see detailed information about any point on Earth.
          </p>
        </div>
        <p className="text-xs text-center text-geo-highlight/70 mt-2">
          GeoSphere 360° v0.3 - Real World Data
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
