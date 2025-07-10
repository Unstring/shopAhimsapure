import type { ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/announcement-banner';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4 pb-12 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
