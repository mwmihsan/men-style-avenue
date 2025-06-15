
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-brand-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
            About 4Men
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Crafting exceptional fashion experiences for the modern gentleman since our inception
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="4Men Store Interior"
              className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-playfair font-semibold text-white mb-4">
              Our Story
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Located in the heart of Akurana, 4Men Men's Wear has been the go-to destination 
              for gentlemen who appreciate quality, style, and sophistication. We believe that 
              every man deserves to look and feel his best, whether for professional settings, 
              casual outings, or special occasions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our carefully curated collection features the latest trends in men's fashion, 
              from crisp formal shirts and tailored pants to comfortable casual wear and 
              elegant traditional attire. We pride ourselves on offering premium quality 
              garments that combine contemporary style with timeless elegance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <Card className="bg-brand-gray border-brand-gold/20 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">5+</div>
                  <p className="text-sm text-gray-300">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="bg-brand-gray border-brand-gold/20 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">1000+</div>
                  <p className="text-sm text-gray-300">Happy Customers</p>
                </CardContent>
              </Card>
              <Card className="bg-brand-gray border-brand-gold/20 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                  <p className="text-sm text-gray-300">Products Available</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
