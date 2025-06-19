
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from './AdminLogin';
import CartIcon from './CartIcon';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated } = useAuth();

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/#products' },
    { label: 'View Orders', href: '/orders' },
    { label: 'Instagram', href: '/#instagram' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleNavClick = (href: string, isExternal = false) => {
    if (isExternal) {
      window.open(href, '_blank');
      return;
    }

    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const elementId = href.substring(2);
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const elementId = href.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    navigate('/admin');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-brand-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-playfair font-bold text-white">Men's Style Avenue</h1>
                <p className="text-xs text-gray-400 -mt-1">Premium Fashion</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.isExternal)}
                  className="text-gray-300 hover:text-brand-gold transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <CartIcon />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAdminClick}
                className="text-white hover:bg-brand-gold/20"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <CartIcon />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-brand-gold/20"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-brand-gold/20 pt-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href, item.isExternal)}
                    className="text-gray-300 hover:text-brand-gold transition-colors duration-200 font-medium text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={handleAdminClick}
                  className="text-gray-300 hover:text-brand-gold transition-colors duration-200 font-medium text-left flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </>
  );
};

export default Header;
