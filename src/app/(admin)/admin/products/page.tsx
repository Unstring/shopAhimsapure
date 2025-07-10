
import { PageHeader } from "../_components/page-header";
import { ProductTable } from "./_components/product-table";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeader>Products</PageHeader>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>
            <ProductTable data={products} />
        </>
    )
}
