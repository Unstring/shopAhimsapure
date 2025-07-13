
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
    if (localStorage.getItem(`banner-dismissed-${banner.bannerId}`) === 'true') {
      return;
    }
    setIsOpen(true);
  }, [banner.bannerId]);

  const handleClose = () => {
    setIsOpen(false);
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
      fixed: 'fixed z-50'
  }

  return (
    <div className={cn(
        "bg-primary text-primary-foreground",
        banner.behavior === 'fixed' || banner.behavior === 'sticky' ? behaviorClasses[banner.behavior] : 'relative',
        positionClasses[banner.position]
    )}>
      <div className="container mx-auto flex h-10 items-center justify-center px-4 text-sm font-medium sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-x-3">
          {banner.position === 'top' ? <Megaphone className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
          <p>{banner.message}</p>
        </div>

        {banner.ctaText && banner.ctaLink && (
            <Link href={banner.ctaLink} className="ml-3 hidden font-semibold text-primary-foreground underline underline-offset-4 hover:text-white sm:inline">
                {banner.ctaText}
            </Link>
        )}

        {banner.removable && (
            <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-primary-foreground/70 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Dismiss banner"
            >
                <X className="h-4 w-4" />
            </button>
        )}
      </div>
    </div>
  );
}
