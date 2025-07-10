
"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { products } from "@/lib/products"
import { Button } from "./ui/button"
import { HelpCircle, Info, LucideIcon, Rss, Shield, Heart } from "lucide-react"
import layoutData from "@/content/layout.json";
import { ManagedImage } from "./managed-image"

const companyIcons: { [key: string]: LucideIcon } = {
    Info, Heart, Rss, HelpCircle, Shield
}

// These are static for the mega menu.
// A real app might fetch these, but for this component, we'll use a static list.
const recentPosts = [
    {
        "slug": "the-ahimsa-promise",
        "title": "The AhimsaPure Promise: More Than Just Dairy",
        "image": "https://images.unsplash.com/photo-1455354269813-804b407a1118?q=80&w=2070&auto=format&fit=crop",
        "excerpt": "Discover the deep-rooted principles that guide everything we do, from our happy cows to your healthy family."
    },
    {
        "slug": "healthy-eating-tips",
        "title": "The Ancient Wisdom of A2 Ghee",
        "image": "https://images.unsplash.com/photo-1606859228783-53336c175342?q=80&w=2070&auto=format&fit=crop",
        "excerpt": "Learn why traditional, hand-churned A2 Ghee is considered liquid gold in Ayurveda..."
    }
]


export function MegaMenu() {
    const { categories, companyLinks } = layoutData.megaMenu;
    const featuredProduct = products.find(p => p.id === 'prod_1') || products[0];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 grid w-[600px] grid-cols-[1fr_250px] gap-6">
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
                <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
                     <ManagedImage
                        src={featuredProduct.images[0]}
                        alt={featuredProduct.name}
                        fill
                        className="object-cover"
                        data-ai-hint={featuredProduct.data_ai_hint}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-bold font-headline">{featuredProduct.name}</h4>
                        <p className="text-sm">Our most popular product!</p>
                     </div>
                </div>
                 <Button asChild className="w-full">
                    <Link href={`/products`}>
                        Shop All Products &rarr;
                    </Link>
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-3 p-4 grid-cols-2">
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
          <NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[650px] gap-6 p-4 grid-cols-[1fr_250px]">
              <ul className="flex flex-col gap-3">
                {recentPosts.map((post) => (
                  <ListItem key={post.title} href={`/blog/${post.slug}`} title={post.title} className="flex items-start gap-4">
                     <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                       <ManagedImage src={post.image} alt={post.title} fill className="object-cover" />
                     </div>
                     <div>
                        <p className="font-semibold">{post.title}</p>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{post.excerpt}</p>
                     </div>
                  </ListItem>
                ))}
              </ul>
              <div className="flex flex-col h-full justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted p-4">
                 <div>
                    <Rss className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-bold font-headline text-lg">From the Farmstead</h4>
                    <p className="text-sm text-muted-foreground">Stories of purity, tradition, and the goodness of A2 dairy.</p>
                 </div>
                 <Button asChild className="w-full mt-4">
                    <Link href="/blog">View All Posts &rarr;</Link>
                </Button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" passHref>
            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              <a>Contact</a>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="absolute left-1/2 top-full flex justify-center">
        <NavigationMenuIndicator />
      </div>
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
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
