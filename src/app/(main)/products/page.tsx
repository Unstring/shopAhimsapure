import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our collection of pure, natural, and farm-fresh dairy products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
