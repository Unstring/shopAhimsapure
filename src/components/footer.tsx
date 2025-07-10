import Link from "next/link";
import { Leaf, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Track Order", href: "/track-order" },
  ];

  const shopLinks = [
    { name: "All Products", href: "/products" },
    { name: "Vegetables", href: "/products?category=Vegetables" },
    { name: "Fruits", href: "/products?category=Fruits" },
    { name: "Dairy", href: "/products?category=Dairy" },
    { name: "Pantry", href: "/products?category=Pantry" },
    { name: "Oils", href: "/products?category=Oils" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                AhimsaPure
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ethically sourced, naturally grown, and delivered with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Shop Links */}
          <div>
             <h3 className="font-headline font-semibold text-foreground">Shop</h3>
              <ul className="mt-4 space-y-2">
                 {shopLinks.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                            {link.name}
                        </Link>
                    </li>
                 ))}
              </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="font-headline font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AhimsaPure.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
