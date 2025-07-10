
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/products';

interface ImageGalleryProps {
    product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                {product.images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors",
                            selectedImage === image ? "border-primary" : "border-transparent"
                        )}
                    >
                        <Image
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
            <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    data-ai-hint={product.data_ai_hint}
                />
            </div>
        </div>
    );
}
