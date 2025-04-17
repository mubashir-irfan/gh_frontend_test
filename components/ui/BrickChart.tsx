import { Brick } from "@/types/charts"

type Props = {
  bricks: Brick[]
}

const BrickChart = ({ bricks }: Props) => {
  const total = bricks.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full rounded overflow-hidden" style={{ height: '20px' }}>
        {bricks.map((brick) => (
          <div
            key={brick.label}
            className={`${brick.color}`}
            style={{ width: `${(brick.value / total) * 100}%` }}
            title={`${brick.label}: ${brick.value}`}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        {bricks.map((brick) => (
          <div className="flex items-center gap-2">
            <div
              key={brick.label}
              className={`h-2 w-2 rounded-full ${brick.color}`}
            />
            <p className="text-xs">{brick.label}</p>
          </div>
        ))}
      </div>
    </div>)
}

export default BrickChart;