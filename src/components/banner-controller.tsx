
"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Banner, type BannerData } from './banner';

const BANNERS_CACHE_KEY = 'ahimsapure-banners';

export function BannerController() {
    const [banners, setBanners] = useState<BannerData[]>([]);
    
    useEffect(() => {
        // 1. Load banners from localStorage for instant UI
        try {
            const cachedBanners = localStorage.getItem(BANNERS_CACHE_KEY);
            if (cachedBanners) {
                setBanners(JSON.parse(cachedBanners));
            }
        } catch (error) {
            console.error("Failed to read banners from localStorage", error);
        }

        // 2. Fetch fresh banners from API
        const fetchBanners = async () => {
            try {
                const response = await api.get<BannerData[]>('/banners/active');
                if (response.data && Array.isArray(response.data)) {
                    const sortedBanners = response.data.sort((a, b) => (a.priority || 0) - (b.priority || 0));
                    setBanners(sortedBanners);
                    // 3. Update localStorage cache
                    localStorage.setItem(BANNERS_CACHE_KEY, JSON.stringify(sortedBanners));
                }
            } catch (error) {
                console.error("Failed to fetch banners from API:", error);
                // In case of API failure, we can choose to clear the cache or leave it.
                // For now, we'll leave it to show the last known good banners.
            }
        };

        fetchBanners();
    }, []);

    const topBanners = banners.filter(b => b.position === 'top');
    const bottomBanners = banners.filter(b => b.position === 'bottom');

    return (
        <>
            <div className="w-full">
                {topBanners.map(banner => <Banner key={banner.bannerId} banner={banner} />)}
            </div>
            {bottomBanners.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 w-full pointer-events-none">
                     <div className="flex flex-col-reverse">
                         {bottomBanners.map(banner => (
                            <div key={banner.bannerId} className="w-full pointer-events-auto">
                               <Banner banner={banner} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
