
"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  LineChart,
  Settings,
  FileText,
  BookOpen,
  User,
  Ticket,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutProvider, useLayout } from './_context/layout-context';
import { TopNav } from './_components/top-nav';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ProductProvider } from './_context/product-context';
import { ContentProvider } from './_context/content-context';
import { BlogProvider } from './_context/blog-context';
import { CouponProvider } from './_context/coupon-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AdminThemeSwitcher } from '@/components/admin-theme-switcher';
import { Logo } from '../../components/logo';

const CowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24" 
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

export const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/coupons", icon: Ticket, label: "Coupons" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/analytics", icon: LineChart, label: "Analytics" },
    { href: "/admin/content", icon: FileText, label: "Content" },
    { href: "/admin/blog", icon: BookOpen, label: "Blog" },
];

export const settingsItem = { href: "/admin/settings", icon: Settings, label: "Settings" };
export const accountItem = { href: "/admin/settings", icon: User, label: "My Account" };


function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { layout } = useLayout();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (layout === 'top-nav') {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNav />
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar 
          collapsible="icon" 
          className="peer">
          <SidebarContent className="p-2 flex flex-col">
            <SidebarHeader className="group-data-[collapsible=icon]:justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 mb-4 group-data-[collapsible=icon]:justify-center">
                <Logo />
              </Link>
            </SidebarHeader>
            <SidebarMenu className="flex-1">
              {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                          <SidebarMenuButton tooltip={item.label} isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}>
                              <item.icon />
                              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </SidebarMenuButton>
                      </Link>
                  </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="flex justify-between items-center p-4 border-b shrink-0 sticky top-0 bg-background z-10">
              <SidebarTrigger />
               <div className="flex items-center gap-2">
                <AdminThemeSwitcher />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push('/admin/settings')}>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider>
        <ProductProvider>
            <ContentProvider>
                <BlogProvider>
                    <CouponProvider>
                        <AdminLayoutContent>{children}</AdminLayoutContent>
                    </CouponProvider>
                </BlogProvider>
            </ContentProvider>
        </ProductProvider>
    </LayoutProvider>
  )
}
