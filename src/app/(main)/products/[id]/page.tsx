
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductCard } from "@/components/product-card";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
           <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            data-ai-hint={product.data_ai_hint}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
            </div>
            <span className="text-sm text-muted-foreground">(5.0)</span>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <p className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          
          <div className="pt-4">
             <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-headline font-bold text-center mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
