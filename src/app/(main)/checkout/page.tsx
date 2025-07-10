"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(6, "Invalid postal code").max(6, "Invalid postal code"),
  paymentMethod: z.enum(["card", "netbanking", "upi"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log("Order placed:", data);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/track-order');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-headline font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">You can't proceed to checkout without any items.</p>
        <Button asChild className="mt-6">
          <a href="/products">Go Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Shipping & Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Shipping & Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="font-semibold font-headline">Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 Farm Lane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Farmville" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <h3 className="font-semibold font-headline">Payment Method</h3>
                     <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <CreditCard className="mr-2 h-5 w-5" />
                          <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="netbanking" />
                          </FormControl>
                          <Landmark className="mr-2 h-5 w-5" />
                          <FormLabel className="font-normal">Net Banking</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="upi" />
                          </FormControl>
                           <Wallet className="mr-2 h-5 w-5" />
                          <FormLabel className="font-normal">UPI</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
               <Button type="submit" size="lg" className="w-full">
                Place Order
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md border overflow-hidden">
                    <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
               </div>
               <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 !pt-0">
          <Separator />
          <div className="w-full flex justify-between">
            <p>Subtotal</p>
            <p>₹{cartTotal.toFixed(2)}</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <Separator />
          <div className="w-full flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>₹{cartTotal.toFixed(2)}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
