import { products as allProducts } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ProductRecommendations() {
  // Fallback to a few trending products
  const trendingProductIds = ["prod_1", "prod_2", "prod_3", "prod_4", "prod_5"];
  const recommendedProducts = allProducts.filter(p => trendingProductIds.includes(p.id));

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-headline font-bold text-center mb-8">Recommended For You</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
