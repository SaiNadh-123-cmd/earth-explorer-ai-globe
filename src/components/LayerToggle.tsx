
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LayerToggleProps {
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ id, label, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <Switch 
        id={id}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-geo-teal"
      />
    </div>
  );
};

export default LayerToggle;
