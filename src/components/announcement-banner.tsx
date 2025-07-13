
"use client";

import { Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Banner {
  id: string;
  text: string;
  link: string;
  isActive: boolean;
}

export function AnnouncementBanner() {
  const [bannerText, setBannerText] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await api.get<Banner[]>('/banners/active');
        if (response.data && response.data.length > 0) {
          setBannerText(response.data[0].text);
        }
      } catch (error) {
        console.error("Failed to fetch announcement banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!bannerText) {
    return null;
  }

  return (
    <div className="bg-accent text-accent-foreground py-2 text-center text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Megaphone className="h-4 w-4" />
        <span>{bannerText}</span>
      </div>
    </div>
  );
}
