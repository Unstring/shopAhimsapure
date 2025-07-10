
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { AddToCartForm } from "./add-to-cart-form";
import { Star, Leaf, Truck, CheckCircle } from "lucide-react";

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
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-4xl font-headline font-bold mt-1">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
              </div>
              <span className="text-sm text-muted-foreground">(125 reviews)</span>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground">{product.description}</p>
          
          <p className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          
          <div className="pt-4">
             <AddToCartForm product={product} />
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Certified Organic & Non-GMO</span>
            </div>
             <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Availability: <span className="font-semibold text-foreground">In Stock</span></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Ships within 24 hours</span>
            </div>
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
