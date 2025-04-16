'use client'
import { useAuth } from "@/context"
import StatsBreakDown from "./_components/StatsBreakdown";
import { mockAccountsData } from "@/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  return <section>
    <div className="flex flex-col">
      <p className="font-bold text-2xl text-gray-900">Welcome {user?.first_name}!</p>
      <p className="mt-4 text-gray-500">{(new Date()).toLocaleDateString('en-US', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })}</p>
    </div>

    <section>
      <StatsBreakDown breakdown={mockAccountsData} />
    </section>
  </section>
}
