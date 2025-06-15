
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  // Mock Instagram posts data (in a real app, this would come from Instagram API)
  const mockPosts = [
    {
      id: '1',
      image: '/lovable-uploads/66a209a7-ad7d-4c9e-ae70-bc9edccbd135.png',
      caption: 'New collection of premium formal shirts now available! #4MenMensWear #FormalWear',
      likes: 45,
      comments: 8,
      timestamp: '2 days ago'
    },
    {
      id: '2',
      image: '/lovable-uploads/a6517966-9226-4e24-9a2a-ab006d202a9a.png',
      caption: 'Casual Friday looks sorted with our latest casual wear collection 👔',
      likes: 32,
      comments: 5,
      timestamp: '4 days ago'
    },
    {
      id: '3',
      image: '/lovable-uploads/b33654c5-c79a-454b-8132-6b99f8698b94.png',
      caption: 'Traditional meets modern - check out our ethnic wear collection',
      likes: 28,
      comments: 3,
      timestamp: '1 week ago'
    }
  ];

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/4men_mens_wear?igsh=MWRpZ295bXJoanJsZw==', '_blank');
  };

  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-gradient mb-6">
            Follow Us on Instagram
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-poppins">
            Stay updated with our latest collections and fashion trends
          </p>
          <Button 
            onClick={handleInstagramClick}
            className="btn-gold"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @4men_mens_wear
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPosts.map((post) => (
            <Card 
              key={post.id} 
              className="bg-brand-gray border-brand-gold/20 card-hover overflow-hidden"
            >
              <div className="relative aspect-square">
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={handleInstagramClick}
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View on Instagram
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-300 text-sm mb-3 line-clamp-2 font-poppins">
                  {post.caption}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 font-poppins">
                  <div className="flex space-x-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <span>{post.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
