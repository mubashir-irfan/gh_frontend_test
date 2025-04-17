import { Stat, StatGrpah } from "@/components"
import { defaultStatValues } from "@/libs/constants"
import { AccountantData } from "@/types"
import { STAT_LABELS } from "@/types/dashboard"
import ProfitDistribution from "./ProfitDistribution"
import { SecondaryButton } from "@/shared/components"

type Props = {
  breakdown: AccountantData
}

const StatsBreakDown = ({ breakdown }: Props) => {
  const profitDistribution: AccountantData['financials']['profit_distribution'] | null = breakdown.financials?.profit_distribution ?? null;

  if (!profitDistribution) return null;

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