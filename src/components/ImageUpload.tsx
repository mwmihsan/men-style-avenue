
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, currentImage, className = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState(100); // percentage
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview for adjustment
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setOriginalImage(imageUrl);
        setShowAdjustModal(true);
        setImageSize(100);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAdjust = () => {
    if (!imageRef.current || !canvasRef.current || !originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Set canvas size (square format)
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      
      // Apply transformations
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      
      const scale = imageSize / 100;
      const drawSize = size * scale;
      
      ctx.drawImage(
        img,
        -drawSize / 2,
        -drawSize / 2,
        drawSize,
        drawSize
      );
      
      ctx.restore();

      // Convert canvas to blob and upload
      canvas.toBlob((blob) => {
        if (blob) {
          const adjustedFile = new File([blob], 'adjusted-image.jpg', { type: 'image/jpeg' });
          uploadImage(adjustedFile);
          setShowAdjustModal(false);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageUploaded('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-white">Product Image</Label>
      
      {previewUrl ? (
        <div className="relative">
          <div className="w-full h-40 md:h-48 rounded-md border border-brand-gold/20 overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-brand-gold/20 rounded-md p-6 text-center">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Label 
            htmlFor="image-upload" 
            className="cursor-pointer flex flex-col items-center space-y-3 text-gray-300 hover:text-white transition-colors"
          >
            {uploading ? (
              <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
            ) : (
              <Upload className="w-10 h-10 text-brand-gold" />
            )}
            <div className="text-center">
              <span className="text-sm font-medium">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                You can adjust size and rotation after selecting
              </p>
            </div>
          </Label>
        </div>
      )}

      {/* Image Adjustment Modal */}
      <Dialog open={showAdjustModal} onOpenChange={setShowAdjustModal}>
        <DialogContent className="max-w-2xl bg-brand-gray border-brand-gold/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-playfair">
              Adjust Image
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {originalImage && (
              <div className="relative">
                <div className="relative w-full h-64 md:h-80 border border-brand-gold/20 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <img
                    ref={imageRef}
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-full object-contain transition-transform"
                    style={{
                      transform: `scale(${imageSize / 100}) rotate(${rotation}deg)`
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Label className="text-sm text-gray-300 flex items-center gap-2">
                      <ZoomIn className="w-4 h-4" />
                      Size: {imageSize}%
                    </Label>
                    <Input
                      type="range"
                      min="50"
                      max="150"
                      value={imageSize}
                      onChange={(e) => setImageSize(parseInt(e.target.value))}
                      className="bg-brand-dark border-brand-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300 flex items-center gap-2">
                      <RotateCw className="w-4 h-4" />
                      Rotation: {rotation}°
                    </Label>
                    <Input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="bg-brand-dark border-brand-gold/20"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline"
                onClick={() => setShowAdjustModal(false)}
                className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleImageAdjust}
                className="btn-gold"
                disabled={uploading}
              >
                {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Apply & Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
