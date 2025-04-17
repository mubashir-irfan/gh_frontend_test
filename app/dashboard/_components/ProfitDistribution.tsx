import { formatCurrency } from "@/libs/utils"
import { BrickChart } from "@/components/ui"
import { AccountantData } from "@/types"

type Props = {
  profitDistribution: AccountantData['financials']['profit_distribution']
}

const ProfitDistribution = ({ profitDistribution }: Props) => {
  return <div className="flex flex-col gap-2">
    <div className="flex justify-between">
      <div className="flex flex-col gap-1 text-sm text-gray-500">
        <p>Profit</p>
        <p className="text-xl font-bold text-gray-900">{profitDistribution.profit ?? 0}%</p>
        <p>{formatCurrency(profitDistribution.profit)}</p>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-500">
        <p>Expenses</p>
        <p className="text-xl font-bold text-gray-900">{profitDistribution.expenses ?? 0}%</p>
        <p>{formatCurrency(profitDistribution.expenses)}</p>
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-500">
        <p>Assets</p>
        <p className="text-xl font-bold text-gray-900">{profitDistribution.assets ?? 0}%</p>
        <p>{formatCurrency(profitDistribution.assets)}</p>
      </div>

    </div>
    <div>
      <BrickChart bricks={
        [
          {
            label: 'Profit',
            value: profitDistribution.profit,
            color: 'bg-blue-500'
          },
          {
            label: 'Expenses',
            value: profitDistribution.expenses,
            color: 'bg-cyan-500'
          },
          {
            label: 'Assets',
            value: profitDistribution.assets,
            color: 'bg-red-500'
          },
        ]
      } />
    </div>
  </div>
}

export default ProfitDistribution