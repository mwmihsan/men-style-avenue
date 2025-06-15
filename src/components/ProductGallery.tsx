
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductGallery = () => {
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
                <Button 
                  onClick={() => handleWhatsApp(category.name)}
                  className="btn-gold w-full"
                >
                  Inquire on WhatsApp
                </Button>
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
    </section>
  );
};

export default ProductGallery;
