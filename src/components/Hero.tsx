
import { Button } from '@/components/ui/button';

const Hero = () => {
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
          backgroundImage: `linear-gradient(rgba(10, 22, 40, 0.8), rgba(10, 22, 40, 0.8)), url('/lovable-uploads/3a0f5d9e-db53-453f-8006-1ee4430bbeee.png')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
            <span className="text-gradient">4Men</span>
            <br />
            <span className="text-white text-3xl md:text-5xl">Men's Wear</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-gray-light mb-8 max-w-2xl mx-auto leading-relaxed font-poppins">
            Premium Range of Men's Collections
            <br className="hidden md:block" />
            Island wide and world wide delivery services available
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={scrollToProducts}
              className="btn-gold text-lg px-8 py-4"
            >
              Explore Collection
            </Button>
          </div>
        </div>
        
        {/* Promo Banner */}
        <div className="mt-12 animate-scale-in">
          <div className="bg-gradient-gold text-brand-navy px-6 py-3 rounded-full inline-block">
            <p className="font-semibold font-poppins">🎉 New Arrivals - Premium Collections Available!</p>
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
