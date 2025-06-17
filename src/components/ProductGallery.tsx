import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ProductModal from './ProductModal';
import ProductSearch from './ProductSearch';
import { useProducts } from '@/hooks/useProducts';

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, loading } = useProducts();

  // Enhanced price formatting function
  const formatPrice = (price?: string) => {
    if (!price) return 'Contact for Price';
    
    // If already formatted as "Rs. X", return as is
    if (price.includes('Rs.')) {
      const priceNumbers = price.match(/\d+/g);
      if (priceNumbers && priceNumbers.length > 0) {
        const avgPrice = parseInt(priceNumbers[0]);
        return avgPrice > 0 ? `Rs. ${avgPrice.toLocaleString()}` : 'Contact for Price';
      }
    }
    
    // If it's just a number, format it
    const numPrice = parseInt(price.toString());
    return numPrice > 0 ? `Rs. ${numPrice.toLocaleString()}` : 'Contact for Price';
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  // Create categories based on actual data
  const categories = Object.keys(groupedProducts).map(categoryName => ({
    name: categoryName,
    description: `Premium quality ${categoryName.toLowerCase()} for professional and casual wear`,
    image: groupedProducts[categoryName][0]?.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    productCount: groupedProducts[categoryName].length
  }));

  // Flatten all products for search with formatted price
  const allProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    category: product.category
  }));

  const categoryNames = categories.map(cat => cat.name);

  const handleViewProducts = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
  };

  const handleWhatsApp = (category: string) => {
    const message = `Hello! I'm interested in your ${category} collection. Could you please share more details?`;
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddNewProduct = () => {
    const message = `Hello! I'd like to inquire about adding new products to your collection or checking if you have any new arrivals.`;
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <section id="products" className="py-12 md:py-20 bg-brand-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gradient mb-4 md:mb-6">
              Our Collection
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Loading our premium collection...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="bg-brand-gray border-brand-gold/20 animate-pulse">
                <div className="aspect-square bg-gray-700 rounded-t-lg"></div>
                <CardContent className="p-3 md:p-4 lg:p-6">
                  <div className="h-4 md:h-6 bg-gray-700 rounded mb-2 md:mb-3"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded mb-4 md:mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-8 md:h-10 bg-gray-700 rounded"></div>
                    <div className="h-8 md:h-10 bg-gray-700 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 md:py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gradient mb-4 md:mb-6">
            Our Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our carefully curated selection of premium men's fashion
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 md:mb-12">
          <ProductSearch allProducts={allProducts} categories={categoryNames} />
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Card className="bg-brand-gray border-brand-gold/20 p-8 mx-auto max-w-md">
              <CardContent className="p-0">
                <h3 className="text-xl font-playfair font-bold text-white mb-4">
                  No Products Yet
                </h3>
                <p className="text-gray-300 mb-6">
                  Products will appear here once they are added to the collection.
                </p>
                <Button 
                  onClick={handleAddNewProduct}
                  className="btn-gold"
                >
                  Request Products
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="bg-brand-gray border-brand-gold/20 overflow-hidden card-hover group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-brand-gold text-brand-dark px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold">
                    {category.productCount} items
                  </div>
                </div>
                
                <CardContent className="p-3 md:p-4 lg:p-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-playfair font-semibold text-white mb-1 md:mb-2 lg:mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 mb-3 md:mb-4 lg:mb-6 leading-relaxed text-xs md:text-sm lg:text-base line-clamp-2">
                    {category.description}
                  </p>
                  <div className="space-y-1.5 md:space-y-2 lg:space-y-3">
                    <Button 
                      onClick={() => handleViewProducts(category.name)}
                      className="btn-gold w-full text-xs md:text-sm lg:text-base py-1.5 md:py-2 lg:py-3"
                    >
                      View Products
                    </Button>
                    <Button 
                      onClick={() => handleWhatsApp(category.name)}
                      variant="outline"
                      className="w-full border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs md:text-sm lg:text-base py-1.5 md:py-2 lg:py-3"
                    >
                      Quick Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* New Product Request Section */}
        <div className="mt-12 md:mt-16 text-center">
          <Card className="bg-brand-gray border-brand-gold/20 p-6 md:p-8 mx-auto max-w-4xl">
            <CardContent className="p-0">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-3 md:mb-4">
                🆕 Looking for Something Specific?
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
                Can't find what you're looking for? We regularly update our collection with new arrivals. 
                Contact us to inquire about specific items or request new products!
              </p>
              <Button 
                onClick={handleAddNewProduct}
                className="btn-gold px-6 md:px-8 py-2 md:py-3"
              >
                Request New Products
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Special Offers Section */}
        <div className="mt-6 md:mt-8 text-center">
          <Card className="bg-gradient-gold text-brand-dark p-6 md:p-8 mx-auto max-w-4xl">
            <CardContent className="p-0">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-3 md:mb-4">
                🎉 Special Offers Available!
              </h3>
              <p className="text-base md:text-lg mb-4 md:mb-6">
                Get up to 30% off on selected items. Mix and match deals on shirts and pants.
                Free alteration services for formal wear purchases above Rs. 5000.
              </p>
              <Button 
                onClick={() => handleWhatsApp('Special Offers')}
                className="bg-brand-dark text-brand-gold hover:bg-brand-gray transition-colors px-6 md:px-8 py-2 md:py-3"
              >
                Ask About Offers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Modal */}
      {selectedCategory && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
          products={groupedProducts[selectedCategory] || []}
        />
      )}
    </section>
  );
};

export default ProductGallery;
