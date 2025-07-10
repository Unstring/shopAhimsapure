
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import faqData from '@/content/faq-page.json';
import homePageData from '@/content/home-page.json';
import { useToast } from '@/hooks/use-toast';

interface Faq {
    question: string;
    answer: string;
}

interface WhyChooseUsItem {
    icon: string;
    title: string;
    description: string;
}

interface Testimonial {
    name: string;
    location: string;
    quote: string;
    avatar: string;
}

interface Content {
    faqs: Faq[];
    whyChooseUsItems: WhyChooseUsItem[];
    testimonials: Testimonial[];
}

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Content) => void;
}

const initialContent: Content = {
    faqs: faqData.faqs,
    whyChooseUsItems: homePageData.whyChooseUsItems,
    testimonials: homePageData.testimonials,
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Content>(initialContent);
  const { toast } = useToast();

  const updateContent = (newContent: Content) => {
    setContent(newContent);
    toast({ title: "Content Updated", description: "Website content has been successfully saved." });
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
