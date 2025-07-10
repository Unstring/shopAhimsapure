
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
        </Button>
    );
}
