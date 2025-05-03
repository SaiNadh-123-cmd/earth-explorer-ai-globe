
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface MapTokenInputProps {
  onTokenSave: (token: string) => void;
  className?: string;
}

const MapTokenInput: React.FC<MapTokenInputProps> = ({ onTokenSave, className }) => {
  const [token, setToken] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (token.trim().startsWith('pk.')) {
      onTokenSave(token.trim());
      toast.success('Mapbox token saved! Refreshing map...');
    } else {
      toast.error('Please enter a valid Mapbox public token (starts with "pk.")');
    }
  };
  
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <h3 className="text-sm font-medium mb-2">Mapbox Token Required</h3>
        <p className="text-xs text-white/70 mb-2">
          Enter your Mapbox public token to enable the 3D globe. 
          You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-geo-teal underline">mapbox.com</a>
        </p>
        <div className="flex gap-2">
          <Input 
            type="text" 
            value={token} 
            onChange={(e) => setToken(e.target.value)}
            placeholder="pk.eyJ1Ijoi..."
            className="flex-1 bg-geo-blue-medium text-white border-geo-blue-light"
          />
          <Button type="submit" size="sm" className="bg-geo-teal hover:bg-geo-highlight">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MapTokenInput;
