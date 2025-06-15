
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-gray border-brand-gold/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold text-white flex items-center justify-between">
            Size Guide
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-brand-gold/20">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="tshirts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-brand-dark border border-brand-gold/20">
              <TabsTrigger value="tshirts" className="text-white data-[state=active]:bg-brand-gold data-[state=active]:text-brand-dark">
                T-Shirts
              </TabsTrigger>
              <TabsTrigger value="shirts" className="text-white data-[state=active]:bg-brand-gold data-[state=active]:text-brand-dark">
                Shirts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tshirts" className="mt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">T-Shirt Size Chart</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img 
                    src="/lovable-uploads/a6517966-9226-4e24-9a2a-ab006d202a9a.png"
                    alt="T-Shirt Size Chart"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 mt-4 text-sm">
                  All measurements are in inches. For best fit, measure your chest and length as shown in the diagram.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="shirts" className="mt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Shirt Size Chart</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img 
                    src="/lovable-uploads/66a209a7-ad7d-4c9e-ae70-bc9edccbd135.png"
                    alt="Shirt Size Chart"
                    className="max-w-full h-auto"
                  />
                </div>
                <p className="text-gray-300 mt-4 text-sm">
                  All measurements are in inches. Measure shoulder, length, and chest as indicated by the numbered points.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 bg-brand-dark border border-brand-gold/20 rounded-lg">
            <h4 className="text-white font-semibold mb-2">How to Measure:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li>• <strong>Length:</strong> Measure from the highest point of the shoulder to the desired length</li>
              <li>• <strong>Shoulder:</strong> Measure from shoulder point to shoulder point across the back</li>
            </ul>
            <p className="text-gray-300 text-sm mt-3">
              <strong>Need help choosing your size?</strong> Contact us via WhatsApp for personalized fitting advice!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
