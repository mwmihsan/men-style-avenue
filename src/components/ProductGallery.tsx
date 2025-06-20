
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search } from 'lucide-react';
import ProductModal from './ProductModal';
import ProductSearch from './ProductSearch';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const ProductGallery = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['All', ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    
    if (product.sizes && product.sizes.length > 0) {
      // If product has sizes, open modal for size selection
      setSelectedProduct(product);
    } else {
      // Add to cart without size
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category
      });
    }
  };

  if (loading) {
    return (
      <section id="products" className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
              Our Premium Collection
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
              Our Premium Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
              Discover our curated selection of premium menswear, crafted for the modern gentleman
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="mb-8 space-y-4">
            <ProductSearch 
                allProducts={products}
                 categories={categories.filter(cat => cat !== 'All')}
              />
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
                      : "border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="bg-brand-gray border-brand-gold/20 card-hover cursor-pointer group overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {product.isNewArrival && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      New
                    </Badge>
                  )}
                  
                  {product.hasOffer && product.offerText && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      {product.offerText}
                    </Badge>
                  )}
                  
                  {product.isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-gray-500 text-white">
                        Out of Stock
                      </Badge>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  {!product.isOutOfStock && (
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-2 left-2 right-2 bg-brand-gold text-brand-dark hover:bg-brand-gold/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-white text-lg mb-1 font-montserrat line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-brand-gold text-sm font-medium">
                      {product.category}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-brand-gold font-bold text-lg">
                      {product.price}
                    </p>
                    
                    {product.sizes && product.sizes.length > 0 && (
                      <p className="text-gray-400 text-xs">
                        {product.sizes.length} sizes
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-brand-gold mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            category={selectedProduct?.category || ''}
            products={selectedProduct ? [selectedProduct] : []}
        />
      )}
    </>
  );
};

export default ProductGallery;
