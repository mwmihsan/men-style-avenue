
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Facebook, Instagram, MessageCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShareButtons = () => {
  const { toast } = useToast();
  const currentUrl = window.location.href;
  const shareText = "Check out 4Men Men's Wear - Premium men's fashion in Akurana!";

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing, so we'll open their profile
    window.open('https://www.instagram.com/4men_mens_wear?igsh=MWRpZ295bXJoanJsZw==', '_blank');
    toast({
      title: "Instagram Opened",
      description: "Follow us on Instagram and share our posts!",
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link Copied!",
        description: "Website link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '4Men Men\'s Wear',
          text: shareText,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className="py-12 bg-brand-darker">
      <div className="container mx-auto px-4">
        <Card className="bg-brand-gray border-brand-gold/20 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-playfair font-bold text-gradient mb-2">
                Share 4Men Men's Wear
              </h3>
              <p className="text-gray-300">
                Tell your friends about our premium men's fashion collection
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {/* Native Share (Mobile) */}
              {navigator.share && (
                <Button
                  onClick={handleNativeShare}
                  className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              )}
              
              {/* Facebook Share */}
              <Button
                onClick={handleFacebookShare}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              
              {/* WhatsApp Share */}
              <Button
                onClick={handleWhatsAppShare}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              {/* Instagram */}
              <Button
                onClick={handleInstagramShare}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
              
              {/* Copy Link */}
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ShareButtons;
