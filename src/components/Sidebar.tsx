
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
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className,
  onLayerToggle,
  onSearch,
  onViewChange
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
        
        <LayerToggle 
          id="political"
          label="Political Borders"
          onChange={(checked) => onLayerToggle('political', checked)} 
        />
        
        <LayerToggle 
          id="biomes"
          label="Biomes & Ecosystems"
          onChange={(checked) => onLayerToggle('biomes', checked)} 
        />
        
        <LayerToggle 
          id="tectonic"
          label="Tectonic Plates"
          onChange={(checked) => onLayerToggle('tectonic', checked)} 
        />
        
        <LayerToggle 
          id="weather"
          label="Weather Systems"
          onChange={(checked) => onLayerToggle('weather', checked)} 
        />
      </div>
      
      <div className="mt-auto text-center">
        <p className="text-xs text-geo-highlight/70">
          GeoSphere 360° v0.1
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
