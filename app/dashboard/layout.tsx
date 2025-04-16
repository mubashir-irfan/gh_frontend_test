'use client'
import Image from "next/image";
import Sidebar from "./_components/Sidebar";
import { useAuth } from "@/context";
import { useGet } from "@/hooks/useAPIQueryHooks";
import { ENDPOINTS } from "@/utils";

export default function DashboardLayout() {
  const { user } = useAuth();

  const { data: accountsData } = useGet(ENDPOINTS.dashboard.accountant(), ENDPOINTS.dashboard.accountant())
  const { data: financialSummary } = useGet('dashboard/accountant/financial-summary', 'dashboard/financial-summary', true, {
    period: 'last month'
  })
  const { data: invoices } = useGet('dashboard/accountant/invoices', 'dashboard/invoices')
  const { data: receipts } = useGet('dashboard/accountant/receipts', 'dashboard/receipts')
  const { data: plGraph } = useGet('dashboard/accountant/pl-graph', 'dashboard/pl-graph')
  const { data: owner } = useGet('dashboard/accountant/owner', 'dashboard/owner')

  return <div className="h-screen w-screen flex flex-col">
    <header className="min-h-[64px] border border-b border-gray-200">
      <div className="flex gap-4 py-2 px-4">
        <Image src='/gh_small_logo.svg' width={95} height={40} alt="garage-hero logo" />
      </div>
    </header>
    <main className="flex flex-grow">
      <Sidebar isDrawerOpen={false} />
      <div className="flex-grow bg-akcent p-4">
        <p className="font-bold text-2xl text-gray-900">Welcome {user?.first_name}!</p>
        <p className="mt-4 text-gray-500">{(new Date()).toLocaleDateString('en-US', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })}</p>
      </div>
    </main>
  </div>
}
