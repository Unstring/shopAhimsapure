
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Megaphone, Gift } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BannerData {
  bannerId: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  behavior: 'fixed' | 'sticky' | 'static';
  position: 'top' | 'bottom';
  removable: boolean;
  isActive: boolean;
}

interface BannerProps {
  banner: BannerData;
}

export function Banner({ banner }: BannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent banner from showing if it was previously dismissed by the user.
    if (localStorage.getItem(`banner-dismissed-${banner.bannerId}`) === 'true') {
      return;
    }
    setIsOpen(true);
  }, [banner.bannerId]);

  const handleClose = () => {
    setIsOpen(false);
    // Remember the user's choice in localStorage.
    if (banner.removable) {
      localStorage.setItem(`banner-dismissed-${banner.bannerId}`, 'true');
    }
  };

  if (!isOpen) {
    return null;
  }

  const positionClasses = {
      top: 'top-0',
      bottom: 'bottom-0'
  }
  const behaviorClasses = {
      static: 'relative',
      sticky: 'sticky z-50',
      fixed: 'fixed z-50 w-full'
  }

  return (
    <div className={cn(
        "bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm",
        banner.behavior === 'fixed' || banner.behavior === 'sticky' ? behaviorClasses[banner.behavior] : 'relative',
        positionClasses[banner.position]
    )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 p-3 sm:gap-6">
                <div className="flex items-center gap-3 text-center sm:text-left">
                    {banner.position === 'top' ? <Megaphone className="h-6 w-6 flex-shrink-0" /> : <Gift className="h-6 w-6 flex-shrink-0" />}
                    <p className="font-medium text-sm">{banner.message}</p>
                </div>
                {banner.ctaText && banner.ctaLink && (
                    <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto flex-shrink-0">
                        <Link href={banner.ctaLink}>{banner.ctaText}</Link>
                    </Button>
                )}
                {banner.removable && (
                    <button 
                        onClick={handleClose}
                        className="absolute top-1/2 -translate-y-1/2 right-3 rounded-full bg-primary/80 p-1 text-primary-foreground transition-transform hover:scale-110"
                        aria-label="Dismiss banner"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    </div>
  );
}
