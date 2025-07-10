"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';
import Link from 'next/link';

export function BottomBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage to see if the banner was closed before.
    // This runs only on the client-side, preventing hydration errors.
    const bannerClosed = localStorage.getItem('bottomBannerClosed');
    if (bannerClosed !== 'true') {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember the user's choice in localStorage.
    localStorage.setItem('bottomBannerClosed', 'true');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 rounded-lg bg-primary/90 p-4 text-primary-foreground shadow-lg backdrop-blur-sm sm:gap-6">
                <div className="flex items-center gap-3">
                    <Gift className="h-8 w-8 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold">First Order Discount!</h4>
                        <p className="text-sm text-primary-foreground/80">Get 15% off your first purchase.</p>
                    </div>
                </div>
                <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto">
                    <Link href="/products">Shop Now</Link>
                </Button>
                <button 
                    onClick={handleClose}
                    className="absolute -top-2 -right-2 sm:top-1/2 sm:-translate-y-1/2 sm:right-3 rounded-full bg-primary p-1 text-primary-foreground transition-transform hover:scale-110"
                    aria-label="Dismiss promotional banner"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
  );
}
