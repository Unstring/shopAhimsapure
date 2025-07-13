
"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Truck, HeartHandshake, Star } from "lucide-react";
import Link from "next/link";
import { ProductRecommendations } from "@/components/product-recommendations";
import { Card, CardContent } from "@/components/ui/card";
import { ManagedImage } from "@/components/managed-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContentProvider, useContent } from "@/app/(admin)/_context/content-context";

const CowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M18.8 8.02A6.45 6.45 0 0 0 19 6c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 .98.24 1.89.66 2.7l-2.68 8.3h16.04l-2.68-8.28z" />
        <path d="M5 14v4" />
        <path d="M19 14v4" />
        <path d="M12 2v2" />
        <path d="M12 12c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
    </svg>
)

const icons: { [key: string]: React.ElementType } = {
  CowIcon,
  Truck,
  HeartHandshake,
};


function HomePageContent() {
  const featuredProducts = products.slice(0, 4);
  const { content } = useContent();
  const { whyChooseUsItems, testimonials } = content;

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
                  {Icon && <Icon className="h-8 w-8 text-primary" />}
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
      <section className="w-full overflow-x-hidden">
        <div className="text-center mb-8">
            <Link href="/testimonials" className="inline-block">
                <h2 className="text-3xl font-headline font-bold hover:text-primary transition-colors">What Our Customers Say &rarr;</h2>
            </Link>
        </div>
        <div className="group relative flex gap-8 overflow-hidden
          before:absolute before:left-0 before:top-0 before:h-full before:w-16 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10
          after:absolute after:right-0 after:top-0 after:h-full after:w-16 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
            <div className="flex shrink-0 animate-marquee items-stretch justify-around gap-8 group-hover:[animation-play-state:paused]">
                 {[...testimonials, ...testimonials].map((testimonial, index) => (
                     <div key={`${testimonial.name}-${index}`} className="w-[350px] max-w-[80vw]">
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
                 ))}
            </div>
             <div className="absolute top-0 flex h-full shrink-0 animate-marquee items-stretch justify-around gap-8 group-hover:[animation-play-state:paused]" aria-hidden="true">
                 {[...testimonials, ...testimonials].map((testimonial, index) => (
                     <div key={`${testimonial.name}-${index}-clone`} className="w-[350px] max-w-[80vw]">
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
                 ))}
            </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <ContentProvider>
      <HomePageContent />
    </ContentProvider>
  )
}
