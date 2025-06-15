
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-brand-navy">
      <Header />
      
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <Card className="bg-brand-navy-light border-brand-gold/20 shadow-xl">
            <CardContent className="p-8">
              {/* 404 Visual */}
              <div className="mb-6">
                <div className="text-6xl sm:text-8xl font-bold text-brand-gold opacity-50 mb-4">404</div>
                <div className="w-16 h-16 mx-auto bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-brand-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-8">
                <h1 className="text-2xl font-playfair font-bold text-white">Page Not Found</h1>
                <p className="text-brand-gray-light text-sm leading-relaxed">
                  The page you're looking for doesn't exist or has been moved. 
                  Let's get you back to where you need to be.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link to="/" className="block">
                  <Button className="btn-gold w-full h-12">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full h-12 border-brand-gold/20 text-white hover:bg-brand-gold/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-8 space-y-2">
            <p className="text-brand-gray-light text-sm">Or try these popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/orders">
                <Button variant="ghost" size="sm" className="text-brand-gold hover:bg-brand-gold/10">
                  Orders
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-brand-gold hover:bg-brand-gold/10">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
