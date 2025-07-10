"use client";

import Link from 'next/link';
import { Leaf, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from '@/components/cart-sheet';
import { useState } from 'react';
import { MegaMenu } from './mega-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header 
        className="bg-background/95 backdrop-blur-sm sticky top-0 z-40 w-full"
        style={{
          maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
        }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                AhimsaPure
              </span>
            </Link>
            
            <div className="hidden md:block">
              <MegaMenu />
            </div>
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                    <User className="h-5 w-5" />
                     <span className="sr-only">User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/login">Login / Sign Up</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/track-order">Track Order</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-6 p-6">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Leaf className="h-7 w-7 text-primary" />
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
