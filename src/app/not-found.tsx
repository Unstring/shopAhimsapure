import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
      <h2 className="mt-4 text-3xl font-headline font-bold text-foreground">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go back to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
           <Link href="/products">
            <Search className="mr-2 h-4 w-4" />
            Browse Products
          </Link>
        </Button>
      </div>
    </div>
  );
}
