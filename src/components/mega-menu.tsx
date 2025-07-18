
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
import blogPosts from "@/content/blog-posts.json";
import { ManagedImage } from "./managed-image"

const companyIcons: { [key: string]: LucideIcon } = {
    Info, Heart, Rss, HelpCircle, Shield
}

export function MegaMenu() {
    const { categories, companyLinks } = layoutData.megaMenu;
    const featuredProduct = products.find(p => p.id === 'prod_1') || products[0];
    const recentPosts = blogPosts.slice(0, 2);

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
                    title={link.title}
                    >
                      <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                              {Icon && <Icon className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                              <p className="font-semibold">{link.title}</p>
                              <p className="text-sm text-muted-foreground">{link.description}</p>
                          </div>
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
                  <ListItem key={post.frontmatter.title} href={`/blog/${post.slug}`} title={post.frontmatter.title}>
                     <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <ManagedImage src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover" />
                        </div>
                        <div>
                           <p className="font-semibold">{post.frontmatter.title}</p>
                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{post.frontmatter.excerpt}</p>
                        </div>
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
            <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              <Link href="/contact">
                Contact
              </Link>
            </NavigationMenuLink>
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
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
})
ListItem.displayName = "ListItem"
