import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { X } from 'lucide-react';
import { ManagedImage } from './managed-image';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageFullscreenViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  images: string[];
  productName: string;
}

export function ImageFullscreenViewer({ open, onOpenChange, src, alt, images, productName }: ImageFullscreenViewerProps) {
  const [current, setCurrent] = useState(src);
  React.useEffect(() => { setCurrent(src); }, [src, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-full p-0 bg-black/95 border-0 flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white"
          aria-label="Close fullscreen image"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <ManagedImage
              src={current}
              alt={alt}
              fill
              className="object-contain max-h-screen max-w-screen"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="w-full flex justify-center bg-black/80 py-4 gap-2 overflow-x-auto border-t border-white/10">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setCurrent(img)}
              className={cn(
                'relative aspect-square w-20 h-20 rounded-md overflow-hidden border-2 transition-colors',
                current === img ? 'border-primary' : 'border-transparent'
              )}
              aria-label={`View ${productName} image ${idx + 1}`}
            >
              <ManagedImage
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                data-ai-hint={productName}
              />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 