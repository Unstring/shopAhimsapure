
"use client";

import { ContentProvider, useContent } from "@/app/(admin)/_context/content-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ManagedImage } from "@/components/managed-image";
import { Star } from "lucide-react";

function TestimonialsPageComponent() {
    const { content } = useContent();
    const { testimonials } = content;

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-5xl font-headline font-bold">What Our Customers Say</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We are proud to serve our community with pure, ethically sourced dairy. Here's what they have to say about us.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card/80 border-2 h-full flex flex-col">
                        <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex text-accent mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                            </div>
                            <p className="text-foreground/90 italic flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-4 pt-4 border-t">
                                <Avatar className="h-12 w-12">
                                    <ManagedImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person smiling" width={48} height={48} className="aspect-square h-full w-full" />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <p className="font-semibold text-lg">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function TestimonialsPage() {
    return (
        <ContentProvider>
            <TestimonialsPageComponent />
        </ContentProvider>
    )
}
