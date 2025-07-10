
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { AddToCartForm } from "./add-to-cart-form";
import { Star, CheckCircle, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageGallery } from "./image-gallery";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 5;

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
              <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-accent' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>
          </div>
          
          <p className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          
          <div className="pt-4">
             <AddToCartForm product={product} />
          </div>

          <div className="border-t pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">{product.description.split('.')[0] + '.'}</p>
          </div>
        </div>
      </div>

      {/* Description, Specs, Reviews Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-10">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6 prose max-w-none prose-p:text-muted-foreground">
          {product.description}
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
        <TabsContent value="reviews" className="py-6">
            {product.reviews.length > 0 ? (
                <div className="space-y-8">
                    {product.reviews.map((review, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
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
    </div>
  );
}
