
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products as initialProducts, Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'reviews' | 'certifications'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id' | 'reviews' | 'certifications'>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();

  const addProduct = (productData: Omit<Product, 'id' | 'reviews' | 'certifications'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${new Date().getTime()}`, // Simple unique ID generation
      reviews: [],
      certifications: [], // Defaulting to empty arrays
    };
    setProducts(prev => [newProduct, ...prev]);
    toast({ title: "Product Added", description: `${newProduct.name} has been successfully added.` });
  };

  const updateProduct = (id: string, productData: Omit<Product, 'id' | 'reviews' | 'certifications'>) => {
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, ...productData } : p)
    );
     toast({ title: "Product Updated", description: `${productData.name} has been successfully updated.` });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ variant: "destructive", title: "Product Deleted", description: "The product has been removed." });
  };
  
  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
