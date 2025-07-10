
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
import layoutData from "@/content/layout.json";


const companyIcons: { [key: string]: LucideIcon } = {
    Info, Heart, Rss, HelpCircle, Shield
}

export function MegaMenu() {
    const { categories, companyLinks } = layoutData.megaMenu;
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
            <div className="p-4 w-full md:w-auto md:grid-cols-[.75fr_1fr] lg:w-[600px] lg:max-w-screen-lg lg:grid-cols-[1fr_250px] grid gap-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <ul className="grid w-full gap-3 p-4 md:w-auto lg:w-[500px] lg:grid-cols-2 lg:max-w-screen-md">
              {companyLinks.map((link) => {
                const Icon = companyIcons[link.icon]
                return (
                    <ListItem
                    key={link.title}
                    href={link.href}
                    className="flex items-start gap-3"
                    >
                        <div className="bg-primary/10 p-2 rounded-md">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold">{link.title}</p>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                    </ListItem>
                )
            })}
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
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "#"}
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
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
