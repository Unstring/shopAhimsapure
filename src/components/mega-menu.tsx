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
import { HelpCircle, Info, LucideIcon, Rss, Shield, Heart } from "lucide-react"

const categories = [
    { title: "All Products", href: "/products", description: "Browse our entire collection." },
    { title: "Vegetables", href: "/products?category=Vegetables", description: "Fresh, seasonal, and organic." },
    { title: "Fruits", href: "/products?category=Fruits", description: "Juicy, delicious, and natural." },
    { title: "Dairy", href: "/products?category=Dairy", description: "Pure A2 milk products." },
    { title: "Pantry", href: "/products?category=Pantry", description: "Wholesome staples." },
    { title: "Oils", href: "/products?category=Oils", description: "Cold-pressed and nutrient-rich." },
]

const companyLinks: { title: string; href: string; icon: LucideIcon; description: string }[] = [
    { title: "About Us", href: "/about", icon: Info, description: "Learn about our mission and values." },
    { title: "Our Story", href: "/about", icon: Heart, description: "The journey of AhimsaPure." },
    { title: "Blog", href: "/blog", icon: Rss, description: "Recipes, tips, and farm stories." },
    { title: "FAQs", href: "/faq", icon: HelpCircle, description: "Answers to your common questions." },
    { title: "Privacy Policy", href: "/privacy", icon: Shield, description: "How we protect your data." },
]

export function MegaMenu() {
    const featuredProduct = products[6]; // Organic Mangoes

  return (
    <NavigationMenu>
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
            <div className="grid w-full gap-6 p-4 md:grid-cols-[.75fr_1fr] lg:grid-cols-[1fr_250px] md:w-[500px] lg:w-[600px]">
                <ul className="grid grid-cols-2 gap-3">
                  {categories.map((component) => (
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
                    <Link href={`/products`}>
                        Shop Bestsellers &rarr;
                    </Link>
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-full gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {companyLinks.map((link) => (
                <ListItem
                  key={link.title}
                  href={link.href}
                  className="flex items-start gap-3"
                >
                    <div className="bg-primary/10 p-2 rounded-md">
                        <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold">{link.title}</p>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
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
