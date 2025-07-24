import React from 'react';
import { FaWhatsapp, FaInstagram, FaYoutube, FaApple, FaAndroid, FaShoppingCart, FaFlask, FaUserTie, FaBookOpen } from 'react-icons/fa';

const links = [
  {
    label: 'Order Now',
    href: '/products',
    icon: <FaShoppingCart className="h-6 w-6" />,
    color: 'bg-primary',
  },
  {
    label: "Founder's Story",
    href: '/about',
    icon: <FaUserTie className="h-6 w-6" />,
    color: 'bg-blue-700',
  },
  {
    label: 'Brand Story',
    href: '/about',
    icon: <FaBookOpen className="h-6 w-6" />,
    color: 'bg-yellow-500',
  },
  {
    label: 'Product Lab Report',
    href: '/docs/lab-report.pdf',
    icon: <FaFlask className="h-6 w-6" />,
    color: 'bg-purple-700',
  },
  {
    label: 'WhatsApp Support',
    href: 'https://wa.me/919999999999',
    icon: <FaWhatsapp className="h-6 w-6" />,
    color: 'bg-green-500',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@ahimsapure',
    icon: <FaYoutube className="h-6 w-6" />,
    color: 'bg-red-600',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/ahimsapure',
    icon: <FaInstagram className="h-6 w-6" />,
    color: 'bg-pink-500',
  },
  {
    label: 'iOS App',
    href: 'https://apps.apple.com/app/idXXXXXXXX',
    icon: <FaApple className="h-6 w-6" />,
    color: 'bg-gray-900',
  },
  {
    label: 'Android App',
    href: 'https://play.google.com/store/apps/details?id=XXXXXXXX',
    icon: <FaAndroid className="h-6 w-6" />,
    color: 'bg-green-700',
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full mx-auto flex flex-col items-center gap-8 bg-white/90 dark:bg-background/80 rounded-2xl shadow-2xl p-8 border border-muted backdrop-blur-md">
        <div className="flex flex-col items-center gap-2">
          <img src="/Ahimsapure.svg" alt="AhimsaPure Logo" className="w-24 h-24 rounded-full border-4 border-primary bg-white shadow-lg" />
          <h1 className="text-4xl font-extrabold font-headline text-primary drop-shadow-lg tracking-tight">AhimsaPure Links</h1>
          <p className="text-muted-foreground text-center text-lg">All the important links in one place</p>
        </div>
        <div className="w-full flex flex-col gap-4 mt-2">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-lg text-white text-lg font-semibold ${link.color} transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:ring-2 hover:ring-primary/40 focus-visible:ring-4 focus-visible:ring-primary/60 active:scale-95 group`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95">{link.icon}</span>
              <span className="flex-1 text-left drop-shadow-sm">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 