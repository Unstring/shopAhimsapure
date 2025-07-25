"use client";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { AddToCartForm } from "./add-to-cart-form";
import { Star, CheckCircle, Shield, Info, ListChecks, FlaskConical, HeartPulse, UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageGallery } from "./image-gallery";
import { ManagedImage } from "@/components/managed-image";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  averageRating: number;
  allProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts, averageRating, allProducts }: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState("description");
  const reviewsRef = useRef(null);

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image Gallery */}
        <ImageGallery product={product} />
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-4xl font-headline font-bold mt-1">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="flex text-accent focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => {
                  setActiveTab("reviews");
                  setTimeout(() => {
                    if (reviewsRef.current) {
                      const headerOffset = 64; // h-16 = 4rem = 64px
                      const elementPosition = (reviewsRef.current as HTMLElement).getBoundingClientRect().top + window.scrollY;
                      const offsetPosition = elementPosition - headerOffset - 16; // 16px extra spacing
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }, 100);
                }}
                aria-label="Jump to reviews"
                type="button"
                role="link"
                data-testid="jump-to-reviews"
              >
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-accent' : 'text-gray-300'}`} />)}
                </div>
                <span className="ml-2 text-sm text-muted-foreground underline">({product.reviews.length} reviews)</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
            {product.quantity === 0 && (
              <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
            )}
          </div>
          <div className="pt-4">
            <AddToCartForm product={product} disabled={product.quantity === 0} />
          </div>
          <div className="border-t pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">{product.description.split('.')[0] + '.'}</p>
            {product.quantity === 0 && (
              <p className="text-destructive font-semibold">This product is currently out of stock and cannot be ordered.</p>
            )}
          </div>
        </div>
      </div>
      {/* Description, Specs, Reviews Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-10">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6 max-w-none">
          <div className="mb-6 text-lg text-muted-foreground prose prose-p:text-muted-foreground">
            {product.description}
          </div>
          {product.info && (
            <div className="space-y-6">
              {product.info.productDetails && (
                <section className="rounded-xl border bg-background/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">Product Details</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-base">
                    {product.info.productDetails.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                  </ul>
                </section>
              )}
              {product.info.technicalInformation && (
                <section className="rounded-xl border bg-background/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">Technical Information</h3>
                  </div>
                  <ul className="list-none pl-0 space-y-1 text-base">
                    <li><b>Usage Instructions:</b> {product.info.technicalInformation.usageInstructions}</li>
                    <li><b>Storage Instructions:</b> {product.info.technicalInformation.storageInstructions}</li>
                    <li><b>Packaging Details:</b> {product.info.technicalInformation.packagingDetails}</li>
                    <li><b>Certifications:</b> {product.info.technicalInformation.certifications}</li>
                  </ul>
                </section>
              )}
              {product.info.methodPreparation && (
                <section className="rounded-xl border bg-background/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">Method Preparation</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-base">
                    {product.info.methodPreparation.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                  </ul>
                </section>
              )}
              {product.info.healthBenefits && (
                <section className="rounded-xl border bg-background/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">Health Benefits</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-base">
                    {product.info.healthBenefits.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                  </ul>
                </section>
              )}
              {product.info.nutritionTable && (
                <section className="rounded-xl border bg-background/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <ListChecks className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-xl">Nutrition Table</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-[300px] w-full border text-base">
                      <thead>
                        <tr className="bg-muted text-foreground">
                          <th className="p-2 text-left">Nutrient</th>
                          <th className="p-2 text-left">per 100g</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.info.nutritionTable.map((row: { nutrient: string; value: string }, idx: number) => (
                          <tr key={idx} className="border-t">
                            <td className="p-2">{row.nutrient}</td>
                            <td className="p-2">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="specifications" className="py-6">
          <ul className="space-y-2 text-muted-foreground">
            {Object.entries(product.details).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="font-semibold text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="certifications" className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.certifications.length > 0 ? product.certifications.map((cert) => (
              <div key={cert.name} className="flex items-start gap-4 p-4 border rounded-lg bg-primary/5">
                <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            )) : <p className="text-muted-foreground">No certifications listed for this product.</p>}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-6" ref={reviewsRef}>
          {product.reviews.length > 0 ? (
            <div className="space-y-8">
              {product.reviews.map((review, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <ManagedImage src={review.avatar} alt={review.author} width={40} height={40} className="aspect-square h-full w-full" data-ai-hint="person face" />
                          <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">There are no reviews for this product yet.</p>
          )}
        </TabsContent>
      </Tabs>
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
      {/* Recommended Products */}
      {allProducts.filter((p) => p.category !== product.category).length > 0 && (
        <section>
          <h2 className="text-2xl font-headline font-bold text-center mb-8">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.filter((p) => p.category !== product.category).slice(0, 4).map((recProduct) => (
              <ProductCard key={recProduct.id} product={recProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 