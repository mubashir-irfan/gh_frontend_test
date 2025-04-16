'use client'
import { useGet } from "@/hooks/useAPIQueryHooks";
import { mockAccountsData } from "@/mockData";
import { AccountantData } from "@/types";
import { ENDPOINTS } from "@/utils";
import Image from "next/image";
import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  const { data: accountsData } = useGet(ENDPOINTS.dashboard.accountant(), ENDPOINTS.dashboard.accountant())
  const { data: financialSummary } = useGet('dashboard/accountant/financial-summary', 'dashboard/financial-summary', true, {
    period: 'last month'
  })
  const { data: invoices } = useGet('dashboard/accountant/invoices', 'dashboard/invoices')
  const { data: receipts } = useGet('dashboard/accountant/receipts', 'dashboard/receipts')
  const { data: plGraph } = useGet('dashboard/accountant/pl-graph', 'dashboard/pl-graph')
  const { data: invetory } = useGet('dashboard/accountant/inventory', 'dashboard/inventory')
  const { data: monthlyTarget } = useGet('dashboard/shared/monthly_target', 'shared/monthly_target')

  const mockAccountant: AccountantData = mockAccountsData;

  console.log('debug', { mockAccountant })

  return <div className="h-screen w-screen flex flex-col">
    <header className="min-h-[64px] border-b border-gray-200">
      <div className="flex gap-4 py-2 px-4">
        <Image src='/gh_small_logo.svg' width={95} height={40} alt="garage-hero logo" />
      </div>
    </header>
    <main className="flex flex-grow">
      <Sidebar isDrawerOpen={false} />
      <div className="p-4 flex-grow h-full bg-akcent">
        <div className="max-w-[1480px] mx-auto">{children}</div>
      </div>
    </main>
  </div>
}
