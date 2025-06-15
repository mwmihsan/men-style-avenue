import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ProductModal from './ProductModal';
import ProductSearch from './ProductSearch';

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      name: 'Long-Sleeved Shirts',
      description: 'Premium quality long-sleeved shirts for professional and casual wear',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Short-Sleeved Shirts',
      description: 'Comfortable and stylish short-sleeved shirts for everyday wear',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Collar T-Shirts',
      description: 'Smart casual collar t-shirts perfect for semi-formal occasions',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Round Neck T-Shirts',
      description: 'Premium cotton round neck tees in various styles and colors',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Long-Sleeved T-Shirts',
      description: 'Comfortable long-sleeved t-shirts for layering and casual wear',
      image: 'https://images.unsplash.com/photo-1556821840-3a9fbc6339b6?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Denim Trousers',
      description: 'High-quality denim trousers in various fits and washes',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Pants & Trousers',
      description: 'Perfectly tailored pants and trousers for every occasion',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Accessories',
      description: 'Complete your look with our range of premium accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Sample product data with multiple images per category
  const productData = {
    'Long-Sleeved Shirts': [
      { id: '1', name: 'Classic White Dress Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,500 - 4,500' },
      { id: '2', name: 'Blue Striped Formal Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,800 - 4,800' },
      { id: '3', name: 'Black Formal Shirt', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae4c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,700 - 4,700' },
      { id: '4', name: 'Checked Pattern Shirt', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', price: 'Rs. 3,000 - 5,000' }
    ],
    'Short-Sleeved Shirts': [
      { id: '5', name: 'Casual Blue Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,000 - 3,500' },
      { id: '6', name: 'White Cotton Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,800 - 3,200' },
      { id: '7', name: 'Striped Summer Shirt', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae4c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,200 - 3,800' }
    ],
    'Collar T-Shirts': [
      { id: '8', name: 'Navy Polo Shirt', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,500 - 2,800' },
      { id: '9', name: 'Gray Collar Tee', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,400 - 2,600' },
      { id: '10', name: 'Black Polo Shirt', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae4c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,600 - 2,900' }
    ],
    'Round Neck T-Shirts': [
      { id: '11', name: 'Basic White Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80', price: 'Rs. 800 - 1,500' },
      { id: '12', name: 'Black Round Neck', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 900 - 1,600' },
      { id: '13', name: 'Gray Cotton Tee', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', price: 'Rs. 850 - 1,450' }
    ],
    'Long-Sleeved T-Shirts': [
      { id: '14', name: 'White Long Sleeve', image: 'https://images.unsplash.com/photo-1556821840-3a9fbc6339b6?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,200 - 2,200' },
      { id: '15', name: 'Black Long Sleeve', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,300 - 2,300' }
    ],
    'Denim Trousers': [
      { id: '16', name: 'Classic Blue Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80', price: 'Rs. 3,500 - 6,500' },
      { id: '17', name: 'Black Denim', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae4c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 3,800 - 6,800' },
      { id: '18', name: 'Slim Fit Jeans', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', price: 'Rs. 4,000 - 7,000' }
    ],
    'Pants & Trousers': [
      { id: '19', name: 'Formal Black Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,500 - 4,500' },
      { id: '20', name: 'Navy Dress Pants', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae4c?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,700 - 4,700' },
      { id: '21', name: 'Khaki Chinos', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,200 - 4,200' }
    ],
    'Accessories': [
      { id: '22', name: 'Leather Belt', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', price: 'Rs. 1,500 - 3,500' },
      { id: '23', name: 'Dress Watch', image: 'https://images.unsplash.com/photo-1594576662596-1265985854a0?auto=format&fit=crop&w=600&q=80', price: 'Rs. 2,500 - 8,500' },
      { id: '24', name: 'Wallet', image: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=600&q=80', price: 'Rs. 800 - 2,800' }
    ]
  };

  // Flatten all products for search
  const allProducts = Object.entries(productData).flatMap(([category, products]) =>
    products.map(product => ({ ...product, category }))
  );

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

  return (
    <section id="products" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
            Our Collection
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our carefully curated selection of premium men's fashion
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <ProductSearch allProducts={allProducts} categories={categoryNames} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="bg-brand-gray border-brand-gold/20 overflow-hidden card-hover group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold text-white mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleViewProducts(category.name)}
                    className="btn-gold w-full"
                  >
                    View Products
                  </Button>
                  <Button 
                    onClick={() => handleWhatsApp(category.name)}
                    variant="outline"
                    className="w-full border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
                  >
                    Quick Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* New Product Request Section */}
        <div className="mt-16 text-center">
          <Card className="bg-brand-gray border-brand-gold/20 p-8 mx-auto max-w-4xl">
            <CardContent className="p-0">
              <h3 className="text-3xl font-playfair font-bold text-white mb-4">
                🆕 Looking for Something Specific?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Can't find what you're looking for? We regularly update our collection with new arrivals. 
                Contact us to inquire about specific items or request new products!
              </p>
              <Button 
                onClick={handleAddNewProduct}
                className="btn-gold px-8 py-3"
              >
                Request New Products
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Special Offers Section */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-gold text-brand-dark p-8 mx-auto max-w-4xl">
            <CardContent className="p-0">
              <h3 className="text-3xl font-playfair font-bold mb-4">
                🎉 Special Offers Available!
              </h3>
              <p className="text-lg mb-6">
                Get up to 30% off on selected items. Mix and match deals on shirts and pants.
                Free alteration services for formal wear purchases above Rs. 5000.
              </p>
              <Button 
                onClick={() => handleWhatsApp('Special Offers')}
                className="bg-brand-dark text-brand-gold hover:bg-brand-gray transition-colors px-8 py-3"
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
          products={productData[selectedCategory as keyof typeof productData] || []}
        />
      )}
    </section>
  );
};

export default ProductGallery;
