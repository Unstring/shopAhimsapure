
"use client";

import { useProduct } from "../../../../_context/product-context";
import { ProductForm } from "../../_components/product-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Product } from "@/lib/products";

interface EditFormProps {
    product: Product;
}

export function EditForm({ product }: EditFormProps) {
    const { getProductById } = useProduct();
    const router = useRouter();
    
    // This effect ensures that if the product data from the context is not yet available,
    // or if the id is invalid in the context's state, we handle it gracefully.
    useEffect(() => {
        const productInContext = getProductById(product.id);
        if (!productInContext) {
            // Using a timeout to give state updates time to propagate before navigating
            setTimeout(() => router.push('/404'), 0);
        }
    }, [product.id, getProductById, router]);
    
    return (
        <ProductForm product={product} />
    )
}
