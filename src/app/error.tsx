
"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Logo } from '../components/logo';

// Icon only
export function LogoIcon(props: React.ComponentProps<'span'>) {
  return (
    <span {...props} style={{ display: 'inline-flex', alignItems: 'center', ...props.style }}>
      <img src="/src/app/Ahimsapure.svg" width={32} height={32} alt="Ahimsapure Logo Icon" />
    </span>
  );
}

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
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center p-8">
           <div className="flex items-center gap-2 mb-8 justify-center">
            <Logo className="h-10 w-10 text-primary" />
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
    </div>
  );
}
