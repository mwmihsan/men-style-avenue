
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  onClearFilters: () => void;
  categories: string[];
}

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  categories
}: SearchFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under Rs. 2,000', value: 'under-2000' },
    { label: 'Rs. 2,000 - 4,000', value: '2000-4000' },
    { label: 'Rs. 4,000 - 6,000', value: '4000-6000' },
    { label: 'Above Rs. 6,000', value: 'above-6000' }
  ];

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-brand-gray border-brand-gold/20 text-white placeholder-gray-400 focus:border-brand-gold"
        />
      </div>

      {/* Filter Toggle and Quick Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          variant="outline"
          className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-brand-gold text-brand-dark text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {isFiltersOpen && (
        <Card className="bg-brand-gray border-brand-gold/20">
          <CardContent className="p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <Label className="text-white text-base font-medium mb-3 block">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="bg-brand-dark border-brand-gold/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-brand-gold/20">
                  <SelectItem value="all" className="text-white hover:bg-brand-gray">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-white hover:bg-brand-gray"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <Label className="text-white text-base font-medium mb-3 block">
                Price Range
              </Label>
              <RadioGroup value={priceRange} onValueChange={onPriceRangeChange}>
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={range.value} 
                      id={range.value}
                      className="border-brand-gold text-brand-gold"
                    />
                    <Label 
                      htmlFor={range.value} 
                      className="text-gray-300 hover:text-white cursor-pointer"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchFilters;
