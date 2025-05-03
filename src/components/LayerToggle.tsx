
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Layers3, Map, Satellite, Cloud, Mountain } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LayerToggleProps {
  id: string;
  label: string;
  description?: string;
  onChange: (checked: boolean) => void;
  active?: boolean;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ 
  id, 
  label, 
  description, 
  onChange, 
  active = false 
}) => {
  // Function to get the appropriate icon based on layer type
  const getLayerIcon = () => {
    switch (id) {
      case 'political':
        return <Map className="h-4 w-4 text-geo-teal" />;
      case 'biomes':
        return <Mountain className="h-4 w-4 text-geo-teal" />;
      case 'tectonic':
        return <Layers3 className="h-4 w-4 text-geo-teal" />;
      case 'weather':
        return <Cloud className="h-4 w-4 text-geo-teal" />;
      default:
        return <Globe className="h-4 w-4 text-geo-teal" />;
    }
  };

  return (
    <div className={`flex items-center justify-between p-2 rounded-md ${active ? 'bg-geo-blue-light/30' : ''}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {getLayerIcon()}
            <Label htmlFor={id} className="text-sm cursor-pointer">{label}</Label>
          </div>
        </TooltipTrigger>
        {description && (
          <TooltipContent side="right" className="max-w-xs bg-geo-blue-dark text-white border-geo-blue-light">
            <p className="text-xs">{description}</p>
          </TooltipContent>
        )}
      </Tooltip>
      <Switch 
        id={id}
        checked={active}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-geo-teal"
      />
    </div>
  );
};

export default LayerToggle;
