
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
type Props = {
  change: number;
  showArithmeticSymbol?: boolean;
}

const DeltaTag = ({ change, showArithmeticSymbol }: Props) => {
  const isIncrement = change > 0;
  const isDecrement = change < 0;

  const getChangeIndicatorIcon = () => {
    if (isIncrement) {
      if (showArithmeticSymbol) return '+';
      return <span className="font-bold text-xs me-1"><FaArrowUp /></span>

    }
    else if (isDecrement) {
      if (showArithmeticSymbol) return null;
      return <span className="font-bold text-xs me-1"><FaArrowDown /></span>;
    }
    else return null;
  }

  const getChangeClasses = (): string => {
    if (isDecrement) return 'bg-red-100 text-red-800'
    else return 'bg-green-100 text-green-800'
  }

  return <p className={`px-2 py-1 text-xs flex items-center rounded-lg font-semibold ${getChangeClasses()}`}>
    {getChangeIndicatorIcon()}
    <span>{change}%</span>
  </p>
}

export default DeltaTag;