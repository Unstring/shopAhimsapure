
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import layoutData from "@/content/layout.json";
import { ThemeSwitcher } from "./theme-switcher";

const socialIcons: { [key: string]: React.ElementType } = {
  Facebook,
  Twitter,
  Instagram,
};

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

export default function Footer() {
  const { quickLinks, shopLinks, socialLinks } = layoutData;

  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Info & Socials */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                <CowIcon className="h-7 w-7 text-primary" />
                <span className="font-headline text-2xl font-bold text-foreground">
                    AhimsaPure
                </span>
                </Link>
                <p className="text-sm text-muted-foreground">
                Ethically sourced, naturally grown, and delivered with love.
                </p>
            </div>
            <div>
                <h3 className="font-headline font-semibold text-foreground">Follow Us</h3>
                <div className="flex space-x-2 mt-4">
                {socialLinks.map((social) => {
                    const Icon = socialIcons[social.icon];
                    return (
                    <Button key={social.name} variant="ghost" size="icon" asChild>
                        <a href={social.href} aria-label={social.name}>
                        <Icon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                        </a>
                    </Button>
                    )
                })}
                </div>
            </div>
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
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AhimsaPure.com. All rights reserved.</p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
