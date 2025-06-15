
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Pradeep Silva',
      role: 'Business Executive',
      content: 'Amazing quality shirts and excellent customer service. 4Men has become my go-to place for all formal wear needs.',
      rating: 5
    },
    {
      name: 'Kasun Perera',
      role: 'Teacher',
      content: 'Great variety of casual wear and very reasonable prices. The staff is very helpful in selecting the right fit.',
      rating: 5
    },
    {
      name: 'Nuwan Fernando',
      role: 'Entrepreneur',
      content: 'Perfect tailoring and premium quality fabrics. Their traditional wear collection is outstanding!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-brand-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-brand-gray border-brand-gold/20 card-hover"
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-brand-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-brand-gold/20 pt-4">
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-brand-gold">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
