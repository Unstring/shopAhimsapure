
"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/announcement-banner';

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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
           <div className="flex items-center gap-2 mb-8 justify-center">
            <CowIcon className="h-10 w-10 text-primary" />
            <span className="font-headline text-4xl font-bold text-foreground">
                AhimsaPure
            </span>
          </div>
          <AlertTriangle className="w-24 h-24 text-destructive mb-4 mx-auto" />
          <h2 className="text-3xl font-semibold">Something went wrong!</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            We're sorry, but an unexpected error occurred. You can try to reload the page or go back to the homepage.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button onClick={() => reset()}>
              Try Again
            </Button>
            <Button variant="outline" asChild>
                <a href="/">Go Back Home</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
