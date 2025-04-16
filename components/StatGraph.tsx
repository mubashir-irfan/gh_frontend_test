import { DeltaTag } from "@/components";
import { formatCurrency } from "@/libs/utils";

type Props = {
  label: string;
  value: string;
  change: number;
  isFinancialAmount?: boolean
}

const Stat = ({ label, value, change, isFinancialAmount = false }: Props) => {
  const statValue = isFinancialAmount ? formatCurrency(+value) : value;
  return (
    <div className="flex flex-col gap-2 text-gray-500">
      <div className="flex justify-between items-center gap-2">
        <p>{label}</p>
        <DeltaTag change={change} showArithmeticSymbol />
      </div>
      <p className="text-xl text-gray-900 font-bold">{statValue}</p>

    </div>
  );
}

export default Stat;