
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchFilters from './SearchFilters';
import ProductModal from './ProductModal';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  category: string;
}

interface ProductSearchProps {
  allProducts: Product[];
  categories: string[];
}

const ProductSearch = ({ allProducts, categories }: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedModalCategory, setSelectedModalCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search term filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all' && product.price) {
        const priceNumbers = product.price.match(/\d+/g);
        if (priceNumbers && priceNumbers.length > 0) {
          const minPrice = parseInt(priceNumbers[0]);
          const maxPrice = priceNumbers.length > 1 ? parseInt(priceNumbers[1]) : minPrice;
          const avgPrice = (minPrice + maxPrice) / 2;

          switch (priceRange) {
            case 'under-2000':
              matchesPrice = avgPrice < 2000;
              break;
            case '2000-4000':
              matchesPrice = avgPrice >= 2000 && avgPrice <= 4000;
              break;
            case '4000-6000':
              matchesPrice = avgPrice >= 4000 && avgPrice <= 6000;
              break;
            case 'above-6000':
              matchesPrice = avgPrice > 6000;
              break;
          }
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, searchTerm, selectedCategory, priceRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const handleProductClick = (product: Product) => {
    // Add to recently viewed
    addToRecentlyViewed(product);

    const message = `Hello! I'm interested in this ${product.category} item:

Product: ${product.name}
${product.price ? `Price Range: ${product.price}` : ''}

Could you please provide more details about availability, sizes, colors, and pricing?`;
    
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Group filtered products by category for modal
  const getProductsByCategory = (category: string) => {
    return filteredProducts.filter(product => product.category === category);
  };

  // Show search results only if there's a search term or active filters
  const showResults = searchTerm || selectedCategory !== 'all' || priceRange !== 'all';

  return (
    <div className="space-y-8">
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onClearFilters={handleClearFilters}
        categories={categories}
      />

      {/* Search Results */}
      {showResults && (
        <div>
          <h3 className="text-2xl font-playfair font-bold text-white mb-6">
            Search Results ({filteredProducts.length} items)
          </h3>
          
          {filteredProducts.length === 0 ? (
            <Card className="bg-brand-gray border-brand-gold/20 p-8 text-center">
              <CardContent className="p-0">
                <p className="text-gray-300 text-lg">
                  No products found matching your criteria.
                </p>
                <Button 
                  onClick={handleClearFilters}
                  className="btn-gold mt-4"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="bg-brand-gray border-brand-gold/20 overflow-hidden group cursor-pointer hover:border-brand-gold/40 transition-all"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-white font-medium mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-brand-gold text-sm mb-2">
                      {product.category}
                    </p>
                    {product.price && (
                      <p className="text-gray-300 text-sm">
                        {product.price}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Modal */}
      {selectedModalCategory && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedModalCategory}
          products={getProductsByCategory(selectedModalCategory)}
        />
      )}
    </div>
  );
};

export default ProductSearch;
