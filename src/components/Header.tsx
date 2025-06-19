
import { useState } from 'react';
import { Menu, X, Package, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from './AdminLogin';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAdminAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-brand-navy/95 backdrop-blur-sm border-b border-brand-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-playfair font-bold text-brand-gold">
              4Men
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-white hover:text-brand-gold transition-colors">Home</Link>
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-white hover:text-brand-gold transition-colors"
              >
                Products
              </button>
              <Link to="/orders" className="text-white hover:text-brand-gold transition-colors">View Orders</Link>
              <button 
                onClick={() => scrollToSection('instagram')} 
                className="text-white hover:text-brand-gold transition-colors"
              >
                Instagram
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-white hover:text-brand-gold transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-white hover:text-brand-gold transition-colors"
              >
                Contact
              </button>
              
              {isAdminAuthenticated ? (
                <>
                  <Link to="/admin" className="text-white hover:text-brand-gold transition-colors">Admin</Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-brand-gold transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAdminClick}
                  className="text-white hover:text-brand-gold transition-colors"
                >
                  Admin
                </button>
              )}
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
                <Link to="/" className="text-white hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <button 
                  onClick={() => scrollToSection('products')} 
                  className="text-white hover:text-brand-gold transition-colors text-left"
                >
                  Products
                </button>
                <Link to="/orders" className="text-white hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>View Orders</Link>
                <button 
                  onClick={() => scrollToSection('instagram')} 
                  className="text-white hover:text-brand-gold transition-colors text-left"
                >
                  Instagram
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white hover:text-brand-gold transition-colors text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-white hover:text-brand-gold transition-colors text-left"
                >
                  Contact
                </button>
                
                {isAdminAuthenticated ? (
                  <>
                    <Link to="/admin" className="text-white hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-brand-gold transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAdminClick}
                    className="text-white hover:text-brand-gold transition-colors text-left"
                  >
                    Admin
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <AdminLogin 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
