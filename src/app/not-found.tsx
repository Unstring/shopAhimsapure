
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { BannerController } from '@/components/banner-controller';
import { Logo } from '../components/logo';

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

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <BannerController />
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
           <div className="flex items-center gap-2 mb-8 justify-center">
            <Logo className="h-10 w-10 text-primary" />
          </div>
          <SearchX className="w-24 h-24 text-destructive mb-4 mx-auto" />
          <h1 className="text-6xl font-headline font-bold text-destructive">404</h1>
          <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            Sorry, we couldn't find the page you were looking for.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
