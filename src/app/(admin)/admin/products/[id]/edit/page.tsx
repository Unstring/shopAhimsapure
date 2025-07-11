
import { PageHeader } from "../../../_components/page-header";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";
import { notFound } from "next/navigation";
import { EditForm } from "./edit-form";

// Generate static paths for Next.js to export
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export default function EditProductPage({ params }: { params: { id: string } }) {
    const product = getProductById(params.id);
    
    if (!product) {
       notFound();
    }
    
    return (
        <>
            <PageHeader>Edit Product</PageHeader>
            <EditForm product={product} />
        </>
    )
}
