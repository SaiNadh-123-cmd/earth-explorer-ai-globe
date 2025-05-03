
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBarSuggestions = [
  { name: 'Tokyo', type: 'City' },
  { name: 'Mount Everest', type: 'Mountain' },
  { name: 'Amazon River', type: 'River' },
  { name: 'Sahara Desert', type: 'Desert' },
  { name: 'Great Barrier Reef', type: 'Landmark' }
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(SearchBarSuggestions);
  
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
    
    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = SearchBarSuggestions.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(SearchBarSuggestions);
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
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-geo-blue-medium border border-geo-blue-light rounded-md shadow-lg z-10">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-geo-blue-light flex items-center justify-between cursor-pointer text-white"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-geo-teal" />
                  {suggestion.name}
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
