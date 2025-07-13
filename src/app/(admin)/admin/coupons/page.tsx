
"use client";

import { PageHeader } from "../_components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useCoupon } from "../../_context/coupon-context";
import { CouponTable } from "./_components/coupon-table";

export default function CouponsPage() {
  const { coupons } = useCoupon();

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader>Coupons</PageHeader>
        <Button asChild>
          <Link href="/admin/coupons/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Coupon
          </Link>
        </Button>
      </div>
      <CouponTable data={coupons} />
    </>
  );
}
