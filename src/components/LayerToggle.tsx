
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Layers3, Map, Satellite } from 'lucide-react';

interface LayerToggleProps {
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
  active?: boolean;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ id, label, onChange, active = false }) => {
  // Function to get the appropriate icon based on layer type
  const getLayerIcon = () => {
    switch (id) {
      case 'political':
        return <Map className="h-4 w-4 text-geo-teal" />;
      case 'biomes':
        return <Globe className="h-4 w-4 text-geo-teal" />;
      case 'tectonic':
        return <Layers3 className="h-4 w-4 text-geo-teal" />;
      case 'weather':
        return <Satellite className="h-4 w-4 text-geo-teal" />;
      default:
        return <Layers3 className="h-4 w-4 text-geo-teal" />;
    }
  };

  return (
    <div className={`flex items-center justify-between p-2 rounded-md ${active ? 'bg-geo-blue-light/30' : ''}`}>
      <div className="flex items-center gap-2">
        {getLayerIcon()}
        <Label htmlFor={id} className="text-sm cursor-pointer">{label}</Label>
      </div>
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
