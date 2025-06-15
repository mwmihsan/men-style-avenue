
import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/94712345678?text=Hello! I\'d like to know more about your latest collection.', '_blank');
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.7)), url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            <span className="text-gradient">4Men</span>
            <br />
            <span className="text-white text-3xl md:text-5xl">Men's Wear</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium fashion for the modern gentleman. 
            <br className="hidden md:block" />
            Style, sophistication, and quality redefined.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToProducts}
              className="btn-gold text-lg px-8 py-4 w-full sm:w-auto"
            >
              Explore Collection
            </Button>
            <Button 
              onClick={handleWhatsApp}
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark text-lg px-8 py-4 w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
        
        {/* Promo Banner */}
        <div className="mt-12 animate-scale-in">
          <div className="bg-gradient-gold text-brand-dark px-6 py-3 rounded-full inline-block">
            <p className="font-semibold">🎉 New Arrivals - Up to 30% Off Limited Time!</p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
