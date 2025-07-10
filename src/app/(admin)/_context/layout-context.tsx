
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LayoutType = 'sidebar' | 'top-nav';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayoutState] = useState<LayoutType>('sidebar');

  useEffect(() => {
    const savedLayout = localStorage.getItem('adminLayout') as LayoutType | null;
    if (savedLayout && (savedLayout === 'sidebar' || savedLayout === 'top-nav')) {
      setLayoutState(savedLayout);
    }
  }, []);

  const setLayout = (newLayout: LayoutType) => {
    setLayoutState(newLayout);
    localStorage.setItem('adminLayout', newLayout);
  };

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
