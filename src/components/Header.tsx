
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-brand-gold text-brand-dark py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+94 77 811 7375</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>237/2E, Matale Road, Akurana</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs">Follow us:</span>
            <a 
              href="https://www.facebook.com/4MENAkurana/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://www.instagram.com/4men_mens_wear?igsh=MWRpZ295bXJoanJsZw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gold/20 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-playfair font-bold text-gradient">
              4MEN
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="nav-link"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="nav-link"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="nav-link"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>
              <a 
                href="/admin"
                className="nav-link text-brand-gold"
              >
                Admin
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-brand-gold/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-brand-gold/20">
              <div className="flex flex-col space-y-4 pt-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="nav-link text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="nav-link text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="nav-link text-left"
                >
                  Products
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="nav-link text-left"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="nav-link text-left"
                >
                  Contact
                </button>
                <a 
                  href="/admin"
                  className="nav-link text-left text-brand-gold"
                >
                  Admin
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
