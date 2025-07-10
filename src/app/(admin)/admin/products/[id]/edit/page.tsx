
"use client";

import { useProduct } from "../../../../_context/product-context";
import { PageHeader } from "../../../_components/page-header";
import { ProductForm } from "../../_components/product-form";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { getProductById } = useProduct();
    const router = useRouter();
    const product = getProductById(params.id);

    if (!product) {
       // Using a timeout to give state updates time to propagate before navigating
       setTimeout(() => router.push('/404'), 0);
       return null;
    }
    
    return (
        <>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} />
        </>
    )
}
