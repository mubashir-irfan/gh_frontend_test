'use client'
import { Spinner, Stat, StatGrpah } from "@/components/ui"
import { defaultStatValues } from "@/libs/constants"
import { AccountantData } from "@/types"
import { STAT_LABELS } from "@/types/dashboard"
import ProfitDistribution from "./ProfitDistribution"
import { SecondaryButton } from "@/components/ui"
import { useGet } from "@/hooks/useAPIQueryHooks"
import { ENDPOINTS } from "@/utils"


const StatsBreakDown = () => {
  const { data: breakdown, isError, error, isLoading } = useGet<AccountantData>(ENDPOINTS.dashboard.accountant(), ENDPOINTS.dashboard.accountant())

  if (isError && error.status === 403) return <AccessDeniedView />

  if (isLoading) return <div className="p-12 flex justify-center items-center"><Spinner /></div>

  let profitDistribution: AccountantData['financials']['profit_distribution']

  if (breakdown) {
    profitDistribution = breakdown.financials?.profit_distribution;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-16 pb-4 border-b border-gray-200">
        {(Object.keys(breakdown.stats) as (keyof typeof STAT_LABELS)[]).map((key: keyof typeof STAT_LABELS) => (
          <Stat
            key={key}
            label={STAT_LABELS[key]}
            change={breakdown.change[key]}
            value={breakdown.stats[key] ? breakdown.stats[key].toString() : defaultStatValues[key].toString()}
            context="vs last month"
            isFinancialAmount={key as string === 'gross_profit_margin'}
          />
        ))}
      </div>

      <div className="flex gap-8 py-8 border-b border-gray-200">
        {(Object.keys(breakdown.financials) as (keyof typeof STAT_LABELS)[]).filter(key => key as string !== 'profit_distribution').map((key: keyof typeof STAT_LABELS) => (
          <div className="border-r border-gray-200 px-4 w-[22.5%]">
            <StatGrpah
              key={key}
              label={STAT_LABELS[key]}
              change={breakdown.change[key]}
              value={breakdown.financials[key] ? breakdown.financials[key].toString() : defaultStatValues[key].toString()}
              isFinancialAmount
            />
          </div>
        ))}
        <div className=" w-[22.5%]">
          <ProfitDistribution profitDistribution={profitDistribution} />
        </div>
      </div>

      <div>
        <SecondaryButton label="View Financial Reports" onClick={() => { }}></SecondaryButton>
      </div>
    </div>
  )
}
export default StatsBreakDown;

const AccessDeniedView = () => <div className="flex flex-col items-center p-8 justify-center dark:bg-gray-900 rounded-lg">
  <div className="text-center">
    <h1 className="text-xl font-bold text-red-600 mb-2">Access Denied</h1>
    <p className="text-gray-400 dark:text-gray-400">You do not have permission to view this data.</p>
    <p className="text-gray-400 dark:text-gray-400">Please contact your administrator for assistance.</p>
  </div>
</div>