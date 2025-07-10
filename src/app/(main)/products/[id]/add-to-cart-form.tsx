
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface AddToCartFormProps {
    product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast({
            title: "Added to cart",
            description: `${quantity} x ${product.name} has been added to your cart.`,
        });
    };

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={decrement} className="w-12 h-12">
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="flex items-center justify-center w-12 h-12 text-lg font-bold border rounded-md">
                    {quantity}
                </span>
                <Button variant="outline" size="icon" onClick={increment} className="w-12 h-12">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <Button size="lg" className="flex-1 h-12" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
            </Button>
        </div>
    );
}
