
import { useState } from 'react';
import { Menu, X, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-playfair font-bold text-brand-gold">
            4Men
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-brand-gold transition-colors">Home</Link>
            <a href="#about" className="text-white hover:text-brand-gold transition-colors">About</a>
            <a href="#products" className="text-white hover:text-brand-gold transition-colors">Products</a>
            <a href="#contact" className="text-white hover:text-brand-gold transition-colors">Contact</a>
            <Link to="/orders" className="text-white hover:text-brand-gold transition-colors flex items-center">
              <Package className="w-4 h-4 mr-1" />
              Orders
            </Link>
            <Link to="/admin" className="text-white hover:text-brand-gold transition-colors">Admin</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-brand-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-brand-gold/20">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-brand-gold transition-colors">Home</Link>
              <a href="#about" className="text-white hover:text-brand-gold transition-colors">About</a>
              <a href="#products" className="text-white hover:text-brand-gold transition-colors">Products</a>
              <a href="#contact" className="text-white hover:text-brand-gold transition-colors">Contact</a>
              <Link to="/orders" className="text-white hover:text-brand-gold transition-colors flex items-center">
                <Package className="w-4 h-4 mr-1" />
                Orders
              </Link>
              <Link to="/admin" className="text-white hover:text-brand-gold transition-colors">Admin</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
