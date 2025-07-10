
"use client";

import { useProduct } from "../../../../_context/product-context";
import { PageHeader } from "../../../_components/page-header";
import { ProductForm } from "../../_components/product-form";
import { notFound } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { getProductById } = useProduct();
    const product = getProductById(params.id);

    if (!product) {
       return notFound();
    }
    
    return (
        <>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} />
        </>
    )
}
