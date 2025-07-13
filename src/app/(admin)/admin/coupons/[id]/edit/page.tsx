
import { PageHeader } from "../../../_components/page-header";
import { notFound } from "next/navigation";
import { CouponForm } from "../../_components/coupon-form";
import { useCoupon, type Coupon } from "../../../../_context/coupon-context";
import { EditForm } from "./edit-form";

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

// This is a mock function to get static data at build time
function getCouponById(id: string): Coupon | undefined {
    const initialCoupons: Coupon[] = [
        { id: 'c1', code: 'SUMMER10', type: 'percentage', value: 10, status: 'active', usageLimit: 100, timesUsed: 25, expiryDate: '2024-12-31' },
        { id: 'c2', code: 'WELCOME50', type: 'fixed', value: 50, status: 'active', usageLimit: 500, timesUsed: 150, expiryDate: '2025-01-31' },
        { id: 'c3', code: 'DIWALI2023', type: 'percentage', value: 15, status: 'expired', usageLimit: 200, timesUsed: 200, expiryDate: '2023-11-15' },
        { id: 'c4', code: 'MONSOON', type: 'fixed', value: 75, status: 'disabled', usageLimit: 50, timesUsed: 10, expiryDate: '2024-09-30' },
    ];
    return initialCoupons.find(c => c.id === id);
}


export default function EditCouponPage({ params }: { params: { id: string } }) {
    const coupon = getCouponById(params.id);

    if (!coupon) {
       notFound();
    }
    
    return (
        <>
            <PageHeader>Edit Coupon</PageHeader>
            <EditForm coupon={coupon} />
        </>
    )
}
