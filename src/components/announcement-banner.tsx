
"use client";

import { Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Banner {
  id: string;
  text: string;
  link?: string;
  isActive: boolean;
}

export function AnnouncementBanner() {
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await api.get<Banner[]>('/banners/active');
        if (response.data && response.data.length > 0) {
          setActiveBanner(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch announcement banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!activeBanner) {
    return null;
  }

  const BannerContent = () => (
    <div className={cn(
        "bg-accent text-accent-foreground py-2 text-center text-sm font-medium",
        activeBanner.link && "hover:bg-accent/90 transition-colors"
    )}>
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Megaphone className="h-4 w-4" />
        <span>{activeBanner.text}</span>
      </div>
    </div>
  );

  if (activeBanner.link) {
    return (
        <Link href={activeBanner.link}>
            <BannerContent />
        </Link>
    )
  }

  return <BannerContent />;
}
