
"use client";

import Link from "next/link";
import { PageHeader } from "../_components/page-header";
import { ProductTable } from "./_components/product-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useProduct } from "../../_context/product-context";

export default function AdminProductsPage() {
    const { products } = useProduct();
    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>
            <ProductTable data={products} />
        </>
    )
}
