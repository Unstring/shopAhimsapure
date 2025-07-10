"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { products } from "@/lib/products"
import { Button } from "./ui/button"

const shopComponents: { title: string; href: string; description: string }[] = [
  {
    title: "All Products",
    href: "/products",
    description:
      "Browse our entire collection of farm-fresh and natural products.",
  },
  {
    title: "Vegetables",
    href: "/products?category=Vegetables",
    description:
      "Fresh, seasonal, and organic vegetables straight from the farm.",
  },
  {
    title: "Fruits",
    href: "/products?category=Fruits",
    description:
      "Juicy and delicious fruits, grown naturally without harmful chemicals.",
  },
  {
    title: "Dairy",
    href: "/products?category=Dairy",
    description: "Pure A2 milk products, including ghee, paneer, and more.",
  },
   {
    title: "Pantry",
    href: "/products?category=Pantry",
    description:
      "Wholesome pantry staples like honey, flour, and spices.",
  },
  {
    title: "Oils",
    href: "/products?category=Oils",
    description:
      "Cold-pressed and nutrient-rich oils for healthy cooking.",
  },
]

export function MegaMenu() {
    const featuredProduct = products[6]; // Organic Mangoes

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-[1fr_250px] gap-6 p-4">
                <ul className="grid grid-cols-2 gap-3">
                  {shopComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              <div className="flex flex-col h-full justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted p-4">
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                     <Image
                        src={featuredProduct.image}
                        alt={featuredProduct.name}
                        fill
                        className="object-cover"
                        data-ai-hint={featuredProduct.data_ai_hint}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-bold font-headline">{featuredProduct.name}</h4>
                        <p className="text-sm">Our seasonal bestseller is back!</p>
                     </div>
                </div>
                 <Button asChild className="w-full mt-4">
                    <Link href="/products">
                        Shop all products &rarr;
                    </Link>
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
