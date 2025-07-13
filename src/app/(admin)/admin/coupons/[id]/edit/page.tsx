
"use client";

import { PageHeader } from "../../../_components/page-header";
import { notFound, useParams } from "next/navigation";
import { CouponForm } from "../../_components/coupon-form";
import { useCoupon, type Coupon } from "../../../../_context/coupon-context";

// This is mock data just for generateStaticParams. The actual data comes from context.
const initialCouponsForStaticGeneration: Partial<Coupon>[] = [
    { id: 'c1' },
    { id: 'c2' },
    { id: 'c3' },
    { id: 'c4' },
];

export function generateStaticParams() {
  // In a real app with a database, you would fetch all coupon IDs here.
  // For this context-based app, we can't fetch dynamic IDs at build time,
  // but we can add stubs for the initial ones. New ones won't have static pages,
  // but client-side rendering will handle them.
  return initialCouponsForStaticGeneration.map((coupon) => ({
    id: coupon.id,
  }));
}

export default function EditCouponPage() {
    const params = useParams();
    const { getCouponById } = useCoupon();
    const id = typeof params.id === 'string' ? params.id : '';
    const coupon = getCouponById(id);

    // This check is important because generateStaticParams only covers initial data.
    // Client-side navigation to a newly created coupon should still work.
    if (!id) {
        return notFound();
    }

    // Since context might take a moment to populate, we can show a loading state
    // or render the form with the expectation that the context hook will update it.
    // If the coupon is truly not found after context loads, we can show a not found message.
    if (!coupon) {
       return (
        <>
            <PageHeader>Coupon Not Found</PageHeader>
            <p>The coupon you are trying to edit does not exist, or it has not loaded yet.</p>
        </>
       )
    }
    
    return (
        <>
            <PageHeader>Edit Coupon</PageHeader>
            <CouponForm coupon={coupon} />
        </>
    )
}
