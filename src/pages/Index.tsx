
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductGallery from '@/components/ProductGallery';
import RecentlyViewed from '@/components/RecentlyViewed';
import InstagramFeed from '@/components/InstagramFeed';
import ShareButtons from '@/components/ShareButtons';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import InstallPWA from '@/components/InstallPWA';

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <Header />
      <Hero />
      <About />
      <ProductGallery />
      <RecentlyViewed />
      <InstagramFeed />
      <ShareButtons />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <InstallPWA />
    </div>
  );
};

export default Index;
