
"use client";

import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from '@/components/cart-sheet';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MegaMenu } from './mega-menu';
import layoutData from "@/content/layout.json";

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

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { megaMenu } = layoutData;
  const navLinks = [
    ...megaMenu.categories.map(c => ({ name: c.title, href: c.href})),
    ...megaMenu.companyLinks.map(c => ({ name: c.title, href: c.href})),
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];


  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <CowIcon className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                AhimsaPure
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center">
               <MegaMenu />
            </nav>
          </div>


          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
                <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                </Link>
            </Button>

             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-6 p-6">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <CowIcon className="h-7 w-7 text-primary" />
                            <span className="font-headline text-2xl font-bold text-foreground">AhimsaPure</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <SheetClose asChild key={link.name}>
                                    <Link href={link.href} className="text-lg font-medium hover:text-primary transition-colors">{link.name}</Link>
                                </SheetClose>
                            ))}
                        </nav>
                        <hr />
                        <SheetClose asChild>
                            <Button asChild>
                                <Link href="/login">Login / Sign Up</Link>
                            </Button>
                        </SheetClose>
                         <SheetClose asChild>
                            <Button asChild variant="outline">
                                <Link href="/track-order">Track Order</Link>
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
