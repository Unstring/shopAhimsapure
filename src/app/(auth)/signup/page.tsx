
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { getPublicKey, encryptPayload } from "@/lib/auth";


const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

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

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const key = await getPublicKey();
        setPublicKey(key);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Security Error",
          description: "Could not fetch security credentials. Please try again later.",
        });
      }
    };
    fetchKey();
  }, [toast]);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    if (!publicKey) {
        toast({ variant: "destructive", title: "Error", description: "Security key not available. Cannot register." });
        return;
    }
    setIsLoading(true);

    const [firstName, ...lastNameParts] = data.fullName.split(' ');
    const lastName = lastNameParts.join(' ') || '-';

    const payload = {
        email: data.email,
        password: data.password,
        firstName: firstName,
        lastName: lastName,
        baseUrl: window.location.origin + '/verify'
    };

    try {
        const encryptedPayload = encryptPayload(payload, publicKey);
        
        await api.post('/auth/register', { payload: encryptedPayload });

        toast({
            title: "Account Created!",
            description: "Welcome to AhimsaPure. Please check your email to verify your account and then log in.",
        });
        router.push('/login');

    } catch (error: any) {
        console.error("Registration failed:", error);
        const errorMessage = error.response?.data?.message || "An unknown error occurred.";
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: errorMessage,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <Link
              href="/"
              className="flex items-center gap-2 justify-center mb-4">
              <CowIcon className="h-8 w-8 text-primary" />
              <span className="font-headline text-3xl font-bold text-foreground">
                  AhimsaPure
              </span>
            </Link>
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join our community of conscious consumers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled={!publicKey || isLoading}>
                {isLoading ? "Creating Account..." : (publicKey ? "Create Account" : "Loading...")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
