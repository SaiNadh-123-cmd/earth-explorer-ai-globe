
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, X, Globe, Mountain, Users, Calendar } from 'lucide-react';

interface PlaceInfoProps {
  place: {
    name: string;
    type: string;
    country?: string;
    continent?: string;
    coordinates?: [number, number];
    elevation?: number;
    population?: number;
    founded?: string;
    description?: string;
  } | null;
  onClose: () => void;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ place, onClose }) => {
  if (!place) return null;
  
  return (
    <Card className="absolute right-4 bottom-4 max-w-md bg-geo-blue-dark/80 backdrop-blur-md text-white border-geo-blue-light">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2 bg-geo-teal/20 text-geo-highlight border-geo-teal">
              {place.type}
            </Badge>
            <CardTitle className="text-xl">{place.name}</CardTitle>
            {place.country && (
              <CardDescription className="text-geo-teal">
                {place.country} • {place.continent}
              </CardDescription>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-geo-highlight hover:bg-geo-blue-medium">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {place.description && (
          <p className="text-sm text-gray-300">{place.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          {place.coordinates && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-geo-teal" />
              <span>{place.coordinates[0].toFixed(2)}°, {place.coordinates[1].toFixed(2)}°</span>
            </div>
          )}
          
          {place.continent && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-geo-teal" />
              <span>{place.continent}</span>
            </div>
          )}
          
          {place.elevation !== undefined && (
            <div className="flex items-center gap-2">
              <Mountain className="h-4 w-4 text-geo-teal" />
              <span>{place.elevation.toLocaleString()} m</span>
            </div>
          )}
          
          {place.population !== undefined && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-geo-teal" />
              <span>{place.population.toLocaleString()}</span>
            </div>
          )}
          
          {place.founded && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-geo-teal" />
              <span>Founded: {place.founded}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="border-geo-teal text-geo-teal hover:bg-geo-teal hover:text-white">
            Explore
          </Button>
          <Button size="sm" className="bg-geo-teal hover:bg-geo-highlight text-white">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceInfo;
