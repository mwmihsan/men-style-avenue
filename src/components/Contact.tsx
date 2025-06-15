
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/94712345678?text=Hello! I would like to get in touch regarding your services.', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+94712345678';
  };

  return (
    <section id="contact" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient mb-6">
            Visit Our Store
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Come experience our premium collection in person or get in touch with us
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Store Location</h3>
                    <p className="text-gray-300 leading-relaxed">
                      4Men Men's Wear<br />
                      Main Street, Akurana<br />
                      Central Province, Sri Lanka
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Contact Details</h3>
                    <p className="text-gray-300 mb-2">
                      Phone: +94 71 234 5678<br />
                      WhatsApp: +94 71 234 5678
                    </p>
                    <p className="text-gray-300 text-sm">
                      Store Hours: Mon-Sat 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleWhatsApp} className="btn-gold flex-1">
                Chat on WhatsApp
              </Button>
              <Button 
                onClick={handleCall}
                variant="outline"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark flex-1"
              >
                Call Now
              </Button>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="relative">
            <Card className="bg-brand-gray border-brand-gold/20 overflow-hidden h-full min-h-[400px]">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31685.123456789!2d80.5!3d7.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818cd051c74!2sAkurana%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
