import { productRecommendations, type ProductRecommendationsInput } from "@/ai/flows/product-recommendations";
import { products as allProducts } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

export async function ProductRecommendations() {
  const mockInput: ProductRecommendationsInput = {
    userPurchaseHistory: ["prod_1", "prod_4"],
    userBrowsingHistory: ["prod_2", "prod_5", "prod_6"],
    trendingProducts: ["prod_7", "prod_2", "prod_3"],
    newlyLaunchedProducts: ["prod_8", "prod_6"],
    ratingsAndReviews: {
      "prod_2": { rating: 5, review: "Fantastic tomatoes, so fresh!" },
      "prod_3": { rating: 4, review: "Good quality honey." },
      "prod_7": { rating: 5, review: "The best mangoes I have ever had." },
    },
  };

  let recommendedProducts = [];

  try {
    const result = await productRecommendations(mockInput);
    const recommendedIds = result.recommendedProductIds || [];
    recommendedProducts = allProducts.filter(p => recommendedIds.includes(p.id));
  } catch (error) {
    console.error("Failed to get product recommendations:", error);
    // Fallback to a few trending products if AI fails
    recommendedProducts = allProducts.filter(p => mockInput.trendingProducts.includes(p.id)).slice(0, 4);
  }

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
