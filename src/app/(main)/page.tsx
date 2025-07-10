import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Leaf, Truck, HeartHandshake, Star } from "lucide-react";
import Link from "next/link";
import { ProductRecommendations } from "@/components/product-recommendations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  const whyChooseUsItems = [
    {
      icon: Leaf,
      title: "100% Farm-Fresh",
      description: "We source directly from local farms to ensure the freshest produce for your family.",
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "Get your fresh groceries delivered to your doorstep, on time, every time.",
    },
    {
      icon: HeartHandshake,
      title: "Supporting Farmers",
      description: "We are committed to fair trade practices that support our hardworking farmers.",
    },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      location: "Bengaluru",
      quote: "The quality of the vegetables is unmatched. It feels like I'm getting them straight from a garden!",
      avatar: "https://placehold.co/40x40.png"
    },
    {
      name: "Amit K.",
      location: "Mumbai",
      quote: "Finally, a service that delivers truly organic and fresh products. The A2 ghee is a must-try.",
      avatar: "https://placehold.co/40x40.png"
    },
    {
      name: "Rohan M.",
      location: "Delhi",
      quote: "I love the convenience and the quality. The customer service is also excellent. Highly recommended!",
      avatar: "https://placehold.co/40x40.png"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mx-8 -mt-8 h-[60vh] flex items-center justify-center rounded-b-2xl overflow-hidden bg-primary/10">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="A lush green farm"
            fill
            className="object-cover opacity-20"
            data-ai-hint="lush farm"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        <div className="relative text-center p-8">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-foreground">
            From Our Farm to Your Table
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the taste of real, nutritious food. Ethically sourced, naturally grown, and delivered with love.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/products">Shop All Products</Link>
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
          {whyChooseUsItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Recommendations Section */}
      <section>
        <ProductRecommendations />
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
             <Card key={index} className="bg-card/80 border-2">
                <CardContent className="p-6">
                  <div className="flex text-accent mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                  </div>
                  <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-4">
                      <Avatar className="h-10 w-10">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person smiling" />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                  </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
