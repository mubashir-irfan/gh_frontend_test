import { DeltaTag } from "@/components";
import { formatCurrency } from "@/libs/utils";

type Props = {
  label: string;
  value: string;
  change: number;
  context: string;
  isFinancialAmount?: boolean;
}

const Stat = ({ label, value, change, context, isFinancialAmount }: Props) => {
  const statValue = isFinancialAmount ? formatCurrency(+value) : value;
  return (
    <div className="flex flex-col gap-3 text-sm text-gray-500">
      <p>{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl text-gray-900 font-bold">{statValue}</p>
        <DeltaTag change={change} />
      </div>
      <p>{context}</p>
    </div>
  );
}

export default Stat;