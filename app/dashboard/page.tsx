'use client'
import { useAuth } from "@/context";
import { mockAccountsData, mockInvoicesData } from "@/mockData";
import StatsBreakDown from "./_components/StatsBreakdown";
import InvoiceTable from "./_components/InvoicesTable";

export default function Dashboard() {
  const { user } = useAuth();
  return <section className="flex flex-col gap-4">
    <div className="flex flex-col gap-4">
      <p className="font-bold text-2xl text-gray-900">Welcome {user?.first_name}!</p>
      <p className="mt-4 text-gray-500">{(new Date()).toLocaleDateString('en-US', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })}</p>
    </div>

    <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <StatsBreakDown breakdown={mockAccountsData} />
    </section>

    <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <InvoiceTable />
    </section>
  </section >
}
