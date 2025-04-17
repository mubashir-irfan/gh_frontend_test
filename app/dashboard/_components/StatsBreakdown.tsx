import { Stat, StatGrpah } from "@/components"
import { defaultStatValues } from "@/libs/constants"
import { formatCurrency } from "@/libs/utils"
import { BrickChart } from "@/shared/components"
import { AccountantData } from "@/types"
import { STAT_LABELS } from "@/types/dashboard"
import ProfitDistribution from "./ProfitDistribution"

type Props = {
  breakdown: AccountantData
}

const StatsBreakDown = ({ breakdown }: Props) => {
  const profitDistribution: AccountantData['financials']['profit_distribution'] | null = breakdown.financials?.profit_distribution ?? null;

  if (!profitDistribution) return null;

  return (
    <div className="p-4 flex flex-col gap-4 bg-white border border-gray-200 rounded-lg shadow-sm">

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
        <button type="button" className="text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-4 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-400">View Financial reports</button>
      </div>
    </div>
  )
}
export default StatsBreakDown;