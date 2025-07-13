
"use client";

import { PageHeader } from "../../../_components/page-header";
import { notFound, useParams } from "next/navigation";
import { CouponForm } from "../../_components/coupon-form";
import { useCoupon } from "../../../../_context/coupon-context";

export default function EditCouponPage() {
    const params = useParams();
    const { getCouponById } = useCoupon();
    const id = typeof params.id === 'string' ? params.id : '';
    const coupon = getCouponById(id);

    if (!id || !coupon) {
       // A client-side notFound may not work as expected in all scenarios with static export.
       // A redirect or a 'not found' component display is safer.
       return (
        <>
            <PageHeader>Coupon Not Found</PageHeader>
            <p>The coupon you are trying to edit does not exist.</p>
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
