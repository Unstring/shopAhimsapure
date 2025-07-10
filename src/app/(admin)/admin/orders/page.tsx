
import { PageHeader } from "../_components/page-header";
import { OrderTable } from "./_components/order-table";
import { orders } from "./_lib/data";

export default function AdminOrdersPage() {
    return (
        <>
            <PageHeader>Orders</PageHeader>
            <OrderTable data={orders} />
        </>
    )
}
