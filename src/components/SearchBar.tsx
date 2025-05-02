
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Search places, countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-geo-blue-medium text-white border-geo-blue-light focus-visible:ring-geo-teal"
      />
      <Button type="submit" size="icon" className="bg-geo-teal hover:bg-geo-highlight text-white">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
