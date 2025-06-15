
import { Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/94778117375?text=Hello! I would like to get in touch.', '_blank');
  };

  const handleFacebook = () => {
    window.open('https://www.facebook.com/4MENAkurana/', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/4men_mens_wear?igsh=MWRpZ295bXJoanJsZw==', '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-darker border-t border-brand-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-playfair font-bold text-gradient mb-4">
              4Men Men's Wear
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium Range of Men's collections. Your premier destination for quality men's fashion in Akurana. 
              Island wide and world wide delivery services available.
            </p>
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>237/2E, Matale Road, Akurana (Opposite to Maysun Studio)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>+94 77 811 7375</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button 
                onClick={handleInstagram}
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Instagram</span>
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-brand-gold transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-brand-gold transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-brand-gold transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-brand-gold transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li>Premium Men's Collections</li>
              <li>Island Wide Delivery</li>
              <li>World Wide Delivery</li>
              <li>WhatsApp Ordering</li>
            </ul>
            <button 
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>💬</span>
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
        
        <div className="border-t border-brand-gold/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 4Men Men's Wear. All rights reserved. | Crafted with ❤️ for modern gentlemen
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
