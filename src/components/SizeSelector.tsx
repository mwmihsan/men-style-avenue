
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
  category: string;
  className?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onChange, category, className = '' }) => {
  const [newSize, setNewSize] = useState('');

  // Default size options based on category
  const getDefaultSizes = (cat: string) => {
    if (cat.includes('Shirt') || cat.includes('T-Shirt')) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
    if (cat.includes('Trouser') || cat.includes('Pants')) {
      return ['28', '30', '32', '34', '36', '38', '40'];
    }
    return ['One Size', 'S', 'M', 'L'];
  };

  const defaultSizes = getDefaultSizes(category);

  const addSize = (size: string) => {
    if (size && !sizes.includes(size)) {
      onChange([...sizes, size]);
    }
  };

  const removeSize = (sizeToRemove: string) => {
    onChange(sizes.filter(size => size !== sizeToRemove));
  };

  const addCustomSize = () => {
    if (newSize.trim()) {
      addSize(newSize.trim());
      setNewSize('');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-white">Available Sizes</Label>
      
      {/* Quick add buttons for common sizes */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {defaultSizes.map((size) => (
            <Button
              key={size}
              type="button"
              variant={sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => sizes.includes(size) ? removeSize(size) : addSize(size)}
              className={sizes.includes(size) 
                ? "bg-brand-gold text-brand-dark" 
                : "border-brand-gold/20 text-white hover:bg-brand-gold/10"
              }
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom size input */}
      <div className="flex gap-2">
        <Input
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          placeholder="Add custom size"
          className="bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && addCustomSize()}
        />
        <Button
          type="button"
          onClick={addCustomSize}
          size="sm"
          className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Selected sizes */}
      {sizes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Selected sizes:</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Badge
                key={size}
                variant="secondary"
                className="bg-brand-gold/20 text-brand-gold flex items-center gap-1"
              >
                {size}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-400"
                  onClick={() => removeSize(size)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
