
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Crop, RotateCw } from 'lucide-react';
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
  const [showCropModal, setShowCropModal] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
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
      // Create preview for cropping
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setOriginalImage(imageUrl);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current || !originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Set canvas size to crop dimensions
    canvas.width = 400; // Fixed width for consistency
    canvas.height = 400; // Fixed height for square crop

    if (ctx) {
      // Calculate crop position and size
      const scaleX = img.naturalWidth / img.clientWidth;
      const scaleY = img.naturalHeight / img.clientHeight;
      
      const sourceX = cropData.x * scaleX;
      const sourceY = cropData.y * scaleY;
      const sourceWidth = cropData.width * scaleX;
      const sourceHeight = cropData.height * scaleY;

      // Draw cropped image
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );

      // Convert canvas to blob and upload
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
          uploadImage(croppedFile);
          setShowCropModal(false);
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
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-10 h-10 text-brand-gold" />
                <Crop className="w-6 h-6 text-brand-gold/60" />
              </div>
            )}
            <div className="text-center">
              <span className="text-sm font-medium">
                {uploading ? 'Uploading...' : 'Click to upload & crop image'}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                Image will be automatically cropped to 1:1 ratio
              </p>
            </div>
          </Label>
        </div>
      )}

      {/* Crop Modal */}
      <Dialog open={showCropModal} onOpenChange={setShowCropModal}>
        <DialogContent className="max-w-2xl bg-brand-gray border-brand-gold/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-playfair flex items-center gap-2">
              <Crop className="w-5 h-5 text-brand-gold" />
              Crop Image
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {originalImage && (
              <div className="relative">
                <div className="relative w-full h-64 md:h-80 border border-brand-gold/20 rounded-lg overflow-hidden">
                  <img
                    ref={imageRef}
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                  {/* Crop overlay */}
                  <div 
                    className="absolute border-2 border-brand-gold bg-brand-gold/10"
                    style={{
                      left: `${cropData.x}%`,
                      top: `${cropData.y}%`,
                      width: `${cropData.width}%`,
                      height: `${cropData.height}%`,
                      minWidth: '100px',
                      minHeight: '100px'
                    }}
                  >
                    <div className="absolute inset-0 border border-dashed border-brand-gold/50"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label className="text-sm text-gray-300">Position X (%)</Label>
                    <Input
                      type="range"
                      min="0"
                      max="50"
                      value={cropData.x}
                      onChange={(e) => setCropData({...cropData, x: parseInt(e.target.value)})}
                      className="bg-brand-dark border-brand-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300">Position Y (%)</Label>
                    <Input
                      type="range"
                      min="0"
                      max="50"
                      value={cropData.y}
                      onChange={(e) => setCropData({...cropData, y: parseInt(e.target.value)})}
                      className="bg-brand-dark border-brand-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300">Width (%)</Label>
                    <Input
                      type="range"
                      min="25"
                      max="100"
                      value={cropData.width}
                      onChange={(e) => setCropData({...cropData, width: parseInt(e.target.value)})}
                      className="bg-brand-dark border-brand-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300">Height (%)</Label>
                    <Input
                      type="range"
                      min="25"
                      max="100"
                      value={cropData.height}
                      onChange={(e) => setCropData({...cropData, height: parseInt(e.target.value)})}
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
                onClick={() => setShowCropModal(false)}
                className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCrop}
                className="btn-gold"
                disabled={uploading}
              >
                {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Crop & Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
