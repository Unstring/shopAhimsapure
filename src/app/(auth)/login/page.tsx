
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
import { useEffect, useState } from "react";
import { getPublicKey, encryptPayload } from "@/lib/auth";
import api from "@/lib/api";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

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

export default function LoginPage() {
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
          title: "Authentication Error",
          description: "Could not fetch security credentials. Please try again later.",
        });
      }
    };
    fetchKey();
  }, [toast]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
     defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (!publicKey) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Security key not available. Cannot log in.",
        });
        return;
    }
    setIsLoading(true);

    try {
        const payload = { email: data.email, password: data.password };
        const encryptedPayload = encryptPayload(payload, publicKey);
        
        const response = await api.post('/auth/login', { payload: encryptedPayload });

        const user = response.data; // Assuming API returns user object { email, role, ... }
        localStorage.setItem('user', JSON.stringify(user));
        
        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
        
        if (user.role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
    } catch (error: any) {
         console.error("Login failed:", error);
         const errorMessage = error.response?.data?.message || "Invalid credentials or an unknown error occurred.";
         toast({
            variant: "destructive",
            title: "Login Failed",
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
          <Link href="/" className="flex items-center gap-2 justify-center mb-4">
              <CowIcon className="h-8 w-8 text-primary" />
              <span className="font-headline text-3xl font-bold text-foreground">
                  AhimsaPure
              </span>
          </Link>
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
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
                    <div className="flex justify-between items-baseline">
                        <FormLabel>Password</FormLabel>
                        <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                            Forgot password?
                        </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled={!publicKey || isLoading}>
                {isLoading ? "Signing In..." : (publicKey ? 'Sign In' : 'Loading...')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
