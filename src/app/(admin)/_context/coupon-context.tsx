
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export type Coupon = {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  status: 'active' | 'expired' | 'disabled';
  usageLimit: number;
  timesUsed: number;
  expiryDate: string;
};

const initialCoupons: Coupon[] = [
    { id: 'c1', code: 'SUMMER10', type: 'percentage', value: 10, status: 'active', usageLimit: 100, timesUsed: 25, expiryDate: '2024-12-31' },
    { id: 'c2', code: 'WELCOME50', type: 'fixed', value: 50, status: 'active', usageLimit: 500, timesUsed: 150, expiryDate: '2025-01-31' },
    { id: 'c3', code: 'DIWALI2023', type: 'percentage', value: 15, status: 'expired', usageLimit: 200, timesUsed: 200, expiryDate: '2023-11-15' },
    { id: 'c4', code: 'MONSOON', type: 'fixed', value: 75, status: 'disabled', usageLimit: 50, timesUsed: 10, expiryDate: '2024-09-30' },
];


interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'timesUsed'>) => void;
  updateCoupon: (id: string, coupon: Omit<Coupon, 'id' | 'timesUsed'>) => void;
  deleteCoupon: (id: string) => void;
  getCouponById: (id: string) => Coupon | undefined;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const { toast } = useToast();

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'timesUsed'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup_${new Date().getTime()}`,
      timesUsed: 0,
    };
    setCoupons(prev => [newCoupon, ...prev]);
    toast({ title: "Coupon Added", description: `Coupon "${newCoupon.code}" has been created.` });
  };

  const updateCoupon = (id: string, couponData: Omit<Coupon, 'id' | 'timesUsed'>) => {
    setCoupons(prev => 
      prev.map(c => c.id === id ? { ...c, ...couponData } : c)
    );
     toast({ title: "Coupon Updated", description: `Coupon "${couponData.code}" has been updated.` });
  };

  const deleteCoupon = (id: string) => {
    const couponToDelete = coupons.find(c => c.id === id);
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast({ variant: "destructive", title: "Coupon Deleted", description: `Coupon "${couponToDelete?.code}" has been removed.` });
  };
  
  const getCouponById = (id: string) => {
    return coupons.find(c => c.id === id);
  }

  return (
    <CouponContext.Provider value={{ coupons, addCoupon, updateCoupon, deleteCoupon, getCouponById }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};
