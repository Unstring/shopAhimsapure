
import { PageHeader } from "../_components/page-header";
import { CustomerTable } from "./_components/customer-table";
import { customers } from "./_lib/data";


export default function AdminCustomersPage() {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <CustomerTable data={customers} />
        </>
    )
}
