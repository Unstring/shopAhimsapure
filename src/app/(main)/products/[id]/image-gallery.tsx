
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/products';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Expand } from 'lucide-react';

interface ImageGalleryProps {
    product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="flex flex-col gap-4">
             <Dialog>
                <DialogTrigger asChild>
                    <div className="relative group aspect-square w-full rounded-lg overflow-hidden border cursor-pointer">
                        <Image
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
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-auto p-0 bg-transparent border-0">
                    <div className="relative aspect-square w-full">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </DialogContent>
            </Dialog>

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
        </div>
    );
}
