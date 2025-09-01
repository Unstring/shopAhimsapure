
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ManagedImage } from './managed-image';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking the button
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const outOfStock = product.quantity === 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link
        href={outOfStock ? `` : `/products/${product.id}`}
        className="flex flex-col flex-grow">
        <CardHeader className="p-0 border-b relative">
          <div className="relative aspect-square w-full">
            <ManagedImage
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={product.data_ai_hint}
            />
            {outOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className='w-full flex flex-row items-center justify-between'>
          <CardTitle className="text-lg font-semibold font-headline leading-tight">{product.name}</CardTitle>
          <p>{product?.details?.netWeight}</p></div>
          {product.mrp && (
      <p className="mt-2 text-sm text-muted-foreground line-through">
        ₹{product.mrp.toFixed(2)}
      </p>
    )}
          <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart} disabled={outOfStock} variant={outOfStock ? 'outline' : 'default'}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
