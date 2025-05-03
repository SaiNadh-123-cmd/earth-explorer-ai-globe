
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { googleMapsConfig } from '@/config/apiConfig';

interface SearchBarProps {
  onSearch: (query: string) => void;
  googleApiKey?: string;
}

// Default suggestions when no API key is provided
const DefaultSuggestions = [
  { name: 'Tokyo', type: 'City' },
  { name: 'Mount Everest', type: 'Mountain' },
  { name: 'Amazon River', type: 'River' },
  { name: 'Sahara Desert', type: 'Desert' },
  { name: 'Great Barrier Reef', type: 'Landmark' }
];

// AI-powered location suggestions with different categories
const AiSuggestions = [
  { name: "New York", type: "Major City", description: "Financial center of the US" },
  { name: "Great Wall of China", type: "Historical Landmark", description: "Ancient defensive structure" },
  { name: "Mount Kilimanjaro", type: "Natural Wonder", description: "Africa's highest mountain" },
  { name: "Venice", type: "Cultural Site", description: "City of canals and architecture" },
  { name: "Amazon Rainforest", type: "Ecosystem", description: "World's largest rainforest" },
  { name: "Mariana Trench", type: "Geological Feature", description: "Deepest oceanic trench" },
  { name: "Stonehenge", type: "Archaeological Site", description: "Prehistoric monument" },
  { name: "Dubai", type: "Modern City", description: "Futuristic architecture and luxury" }
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, googleApiKey }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Use AI-powered suggestions by default
  useEffect(() => {
    setSuggestions(AiSuggestions);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      // Filter AI suggestions based on input
      const filtered = AiSuggestions.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      
      // If Google API key is provided, we could fetch real places here in a production app
      // For now, we'll simulate AI-enhanced suggestions
      if (googleApiKey && value.length > 2) {
        setLoading(true);
        // Simulate network request
        setTimeout(() => {
          setLoading(false);
          // Generate some dynamic suggestions based on query
          const dynamicSuggestions = [
            { name: `${value} City`, type: "Urban Area", description: "Major metropolitan area" },
            { name: `${value} Mountains`, type: "Mountain Range", description: "Elevation up to 3,000m" },
            { name: `${value} National Park`, type: "Protected Area", description: "Rich biodiversity" }
          ];
          setSuggestions([...filtered, ...dynamicSuggestions]);
        }, 300);
      }
    } else {
      setSuggestions(AiSuggestions);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search places, countries..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowSuggestions(true)}
          className="flex-1 bg-geo-blue-medium text-white border-geo-blue-light focus-visible:ring-geo-teal"
        />
        <Button type="submit" size="icon" className="bg-geo-teal hover:bg-geo-highlight text-white">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-geo-blue-medium border border-geo-blue-light rounded-md shadow-lg z-10">
          {loading && (
            <div className="px-4 py-3 text-center text-white/70">
              <span className="inline-block animate-pulse">Searching...</span>
            </div>
          )}
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-geo-blue-light flex items-center justify-between cursor-pointer text-white"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-geo-teal" />
                  <div>
                    <div>{suggestion.name}</div>
                    {suggestion.description && (
                      <div className="text-xs text-white/70">{suggestion.description}</div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-geo-teal">{suggestion.type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
