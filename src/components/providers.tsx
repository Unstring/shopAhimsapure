"use client";

import type { ReactNode } from 'react';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from '@/components/ui/toaster';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster />
    </CartProvider>
  );
}
