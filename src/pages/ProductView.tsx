
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Ruler } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import SizeGuide from '@/components/SizeGuide';

// Mock product data - replace with actual data fetching
const mockProduct = {
  id: '1',
  name: 'Charles Smith',
  image: '/lovable-uploads/eaba63cd-93d4-402b-8d7d-ea7ac31dd184.png',
  price: 'Rs. 4,990',
  sizes: ['M', 'L', 'XL', 'XXL'],
  category: 'Long-Sleeved Shirts',
  description: 'Premium quality long-sleeved shirt crafted from the finest materials. Perfect for both casual and formal occasions.',
  features: [
    'Premium cotton blend fabric',
    'Comfortable regular fit',
    'Machine washable',
    'Wrinkle resistant',
    'Available in multiple sizes'
  ]
};

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();

  // In a real app, you'd fetch the product data based on the ID
  const product = mockProduct;

  const handleAddToCart = () => {
    if (!product.price) return;

    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category
    });

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      selectedSize: selectedSize
    });
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(selectedSize === size ? '' : size);
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-navy border-b border-brand-gold/20">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-brand-gold hover:bg-brand-gold/10 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-playfair font-bold text-white">Product Details</h1>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="aspect-square bg-brand-navy rounded-lg overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-white mb-2">
                {product.name}
              </h2>
              <p className="text-2xl font-semibold text-brand-gold mb-4">
                {product.price}
              </p>
              <Badge variant="outline" className="border-brand-gold/40 text-brand-gold">
                {product.category}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-brand-gold mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Select Size</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-brand-gold hover:bg-brand-gold/10 text-sm"
                  >
                    <Ruler className="w-4 h-4 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <Badge 
                      key={size}
                      variant="outline"
                      className={`px-4 py-2 cursor-pointer transition-all ${
                        selectedSize === size
                          ? 'bg-brand-gold text-brand-dark border-brand-gold'
                          : 'border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold/90 font-semibold py-4 text-lg"
                disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              {product.sizes && product.sizes.length > 0 && !selectedSize && (
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Please select a size
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};

export default ProductView;
