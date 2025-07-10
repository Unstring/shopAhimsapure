
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

const CowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
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

export default function MaintenancePage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-8">
        <CowIcon className="h-10 w-10 text-primary" />
        <span className="font-headline text-4xl font-bold text-foreground">
            Farm Fresh Express
        </span>
      </div>
      <Wrench className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-5xl font-headline font-bold">Under Maintenance</h1>
      <h2 className="mt-4 text-2xl font-semibold">We'll Be Right Back</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        We're currently performing some scheduled maintenance to improve our services. Please check back shortly.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
