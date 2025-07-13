
"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Banner, type BannerData } from './banner';

export function BannerController() {
    const [banners, setBanners] = useState<BannerData[]>([]);
    
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                // Assuming the API returns an array of active banner objects
                const response = await api.get<BannerData[]>('/banners/active');
                if (response.data && Array.isArray(response.data)) {
                    // Sort banners by priority, lower number is higher priority
                    const sortedBanners = response.data.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0));
                    setBanners(sortedBanners);
                }
            } catch (error) {
                // Mock a banner for UI development if API fails
                console.error("Failed to fetch banners, using mock data.", error);
                setBanners([
                    {
                        bannerId: "promo-top-123",
                        message: "Free delivery on all orders above ₹500!",
                        ctaText: "Shop Now",
                        ctaLink: "/products",
                        behavior: "sticky",
                        position: "top",
                        removable: true,
                        isActive: true,
                    },
                    {
                        bannerId: "promo-bottom-456",
                        message: "Get 15% off your first purchase with code NEW15.",
                        ctaText: "Claim Discount",
                        ctaLink: "/signup",
                        behavior: "fixed",
                        position: "bottom",
                        removable: true,
                        isActive: true,
                    }
                ].sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0)));
            }
        };

        fetchBanners();
    }, []);

    const topBanners = banners.filter(b => b.position === 'top');
    const bottomBanners = banners.filter(b => b.position === 'bottom');

    return (
        <>
            <div>
                {topBanners.map(banner => <Banner key={banner.bannerId} banner={banner} />)}
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 w-full pointer-events-none">
                 <div className="flex flex-col gap-2 items-center pb-4">
                     {bottomBanners.map(banner => (
                        <div key={banner.bannerId} className="w-full max-w-5xl pointer-events-auto px-4">
                           <Banner banner={banner} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
