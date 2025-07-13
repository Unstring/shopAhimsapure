
"use client";

import { CouponProvider, useCoupon } from "@/app/(admin)/_context/coupon-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Ticket, Copy } from "lucide-react";

function OffersPageComponent() {
    const { coupons } = useCoupon();
    const { toast } = useToast();
    const activeCoupons = coupons.filter(c => c.status === 'active');

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
            description: `Coupon code "${code}" has been copied.`,
        });
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-5xl font-headline font-bold">Special Offers & Coupons</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Save on your next purchase with our latest deals and discounts.
                </p>
            </div>

            {activeCoupons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeCoupons.map(coupon => (
                        <Card key={coupon.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Ticket className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-headline text-2xl">
                                            {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                                        </CardTitle>
                                        <CardDescription>
                                            Expires on {new Date(coupon.expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">Use this code at checkout to redeem your discount.</p>
                            </CardContent>
                            <CardFooter>
                                <div className="w-full flex items-center justify-between gap-4 p-3 border-2 border-dashed rounded-lg bg-muted/50">
                                    <span className="font-mono font-bold text-lg tracking-widest">{coupon.code}</span>
                                    <Button size="icon" variant="ghost" onClick={() => handleCopyCode(coupon.code)}>
                                        <Copy className="h-5 w-5" />
                                        <span className="sr-only">Copy code</span>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                     <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-2xl font-headline font-semibold">No Active Offers</h2>
                    <p className="mt-2 text-muted-foreground">
                        We don't have any special offers right now. Please check back later!
                    </p>
                </div>
            )}
        </div>
    );
}


export default function OffersPage() {
    return (
        <CouponProvider>
            <OffersPageComponent />
        </CouponProvider>
    );
}
