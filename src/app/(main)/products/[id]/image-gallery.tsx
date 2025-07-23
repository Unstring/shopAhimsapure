
"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/products';
import { Expand } from 'lucide-react';
import { ManagedImage } from '@/components/managed-image';
import { ImageFullscreenViewer } from '@/components/image-fullscreen-viewer';

interface ImageGalleryProps {
    product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative group aspect-square w-full rounded-lg overflow-hidden border cursor-pointer"
                onClick={() => setFullscreenOpen(true)}
            >
                <ManagedImage
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    data-ai-hint={product.data_ai_hint}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Expand className="h-10 w-10 text-white" />
                </div>
            </div>
            <ImageFullscreenViewer
                open={fullscreenOpen}
                onOpenChange={setFullscreenOpen}
                src={selectedImage}
                alt={product.name}
                images={product.images}
                productName={product.name}
            />
            <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative aspect-square w-full rounded-md overflow-hidden border-2 transition-colors",
                            selectedImage === image ? "border-primary" : "border-transparent"
                        )}
                    >
                        <ManagedImage
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                            data-ai-hint={product.data_ai_hint}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
