
"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Leaf, Truck, HeartHandshake, Star } from "lucide-react";
import Link from "next/link";
import { ProductRecommendations } from "@/components/product-recommendations";
import { Card, CardContent } from "@/components/ui/card";
import { ManagedImage } from "@/components/managed-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import homePageData from "@/content/home-page.json";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const icons: { [key: string]: React.ElementType } = {
  Leaf,
  Truck,
  HeartHandshake,
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const { whyChooseUsItems, testimonials } = homePageData;

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, direction: 'backward' })
  )

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mx-8 -mt-8 h-[60vh] flex items-center justify-center rounded-b-2xl overflow-hidden bg-primary/10">
        <div className="absolute inset-0">
          <ManagedImage
            src="https://images.unsplash.com/photo-1552856436-f9412f5d9626?q=80&w=2070&auto=format&fit=crop"
            alt="A beautiful Indian cow in a field"
            fill
            className="object-cover opacity-20"
            data-ai-hint="indian cow field"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        <div className="relative text-center p-8">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-foreground">
            The Goodness of Pure A2 Milk
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the taste of real, nutritious dairy. Ethically sourced from happy cows and delivered with love.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/products">Shop Our Dairy Products</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Our Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Why AhimsaPure?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {whyChooseUsItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-headline font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            )
           })}
        </div>
      </section>

      {/* Product Recommendations Section */}
      <section>
        <ProductRecommendations />
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-8">What Our Customers Say</h2>
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
        >
          <CarouselContent>
             {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <Card className="bg-card/80 border-2 h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="flex text-accent mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                                </div>
                                <p className="text-foreground/90 italic flex-grow">"{testimonial.quote}"</p>
                                <div className="flex items-center mt-4 pt-4 border-t">
                                    <Avatar className="h-10 w-10">
                                        <ManagedImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person smiling" width={40} height={40} className="aspect-square h-full w-full" />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
             ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}
