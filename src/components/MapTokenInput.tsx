
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
    
    if (token.trim()) {
      onTokenSave(token.trim());
      toast.success('Google API key saved! You can now search for locations.');
    } else {
      toast.error('Please enter a valid Google API key');
    }
  };
  
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <h3 className="text-sm font-medium mb-2">Google Maps API Key</h3>
        <p className="text-xs text-white/70 mb-2">
          Enter your Google Maps API key to enable place search. 
          You can get one for free at <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-geo-teal underline">Google Cloud Console</a>
        </p>
        <div className="flex gap-2">
          <Input 
            type="text" 
            value={token} 
            onChange={(e) => setToken(e.target.value)}
            placeholder="Your Google Maps API key"
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
