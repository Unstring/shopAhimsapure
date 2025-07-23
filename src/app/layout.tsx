
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers';
import { PageProgressBar } from '@/components/page-progress-bar';
import { SmoothScroll } from '@/components/smooth-scroll';
import { useState, useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'AhimsaPure',
//   description: 'Ethically sourced, naturally grown, and delivered with love.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AhimsaPure</title>
        <meta name="description" content="Ethically sourced, naturally grown, and delivered with love." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AppProviders>
          <SmoothScroll />
          {isClient && <PageProgressBar />}
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
