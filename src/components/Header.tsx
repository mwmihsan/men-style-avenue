
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/94712345678?text=Hello! I\'m interested in your men\'s wear collection.', '_blank');
  };

  return (
    <header className="fixed top-0 w-full bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gray z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-gradient">
              4Men
            </h1>
            <span className="text-sm text-brand-gold hidden md:block">Men's Wear</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-brand-gold transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-brand-gold transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-white hover:text-brand-gold transition-colors duration-300"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-brand-gold transition-colors duration-300"
            >
              Contact
            </button>
          </nav>

          {/* Contact Info & WhatsApp */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Phone className="w-4 h-4" />
              <span>+94 71 234 5678</span>
            </div>
            <Button onClick={handleWhatsApp} className="btn-gold">
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col space-y-1"
          >
            <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-brand-gray">
            <nav className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-white hover:text-brand-gold transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-white hover:text-brand-gold transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-left text-white hover:text-brand-gold transition-colors duration-300"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-white hover:text-brand-gold transition-colors duration-300"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-brand-gray">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>+94 71 234 5678</span>
                </div>
                <Button onClick={handleWhatsApp} className="btn-gold w-full">
                  Chat on WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
