import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { JobFilters } from '@/types';

interface SearchFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-white/70" />
        <Input
          placeholder="Search for job titles..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
        />
      </div>
    </div>
  );
};
