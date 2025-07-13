
"use client";

import { useCoupon, type Coupon } from "../../../../_context/coupon-context";
import { CouponForm } from "../../_components/coupon-form";
import { useRouter, notFound, useParams } from "next/navigation";
import { useEffect } from "react";

interface EditFormProps {
    coupon: Coupon;
}

export function EditForm({ coupon: initialCouponData }: EditFormProps) {
    const { getCouponById } = useCoupon();
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';
    const coupon = getCouponById(id);
    
    // This effect ensures that if the product data from the context is not yet available,
    // or if the id is invalid in the context's state, we handle it gracefully.
    useEffect(() => {
        if (!id) {
            notFound();
        }
        const couponInContext = getCouponById(id);
        if (!couponInContext) {
            // Using a timeout to give state updates time to propagate before navigating
            setTimeout(() => router.push('/404'), 0);
        }
    }, [id, getCouponById, router]);
    
    if (!coupon) {
       return (
        <>
            <p>The coupon you are trying to edit does not exist, or it has not loaded yet.</p>
        </>
       )
    }
    
    return (
        <CouponForm coupon={coupon} />
    )
}

