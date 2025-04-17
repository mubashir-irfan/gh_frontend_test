'use client'
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

type BarSeriesDataEntry = {
  name: string;
  color: string;
  data: number[];
}

type Props = {
  series: BarSeriesDataEntry[];
  categories: string[]
}

const GroupedHorizontalBarChart = ({ series, categories }: Props) => {

  const options = {
    series,
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
        return "$" + value
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function (value) {
          return "$" + value
        }
      },
      categories,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      },
    },
    fill: {
      opacity: 1,
    }
  }

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);
  const isChartRendered = useRef(false);

  useEffect(() => {
    if (chartRef.current && !isChartRendered.current) {
      console.log('debug group horizontal component drawing chart', series, categories)
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
      isChartRendered.current = true; // Mark the chart as rendered
      console.log('effect done drawing chart')
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        isChartRendered.current = false; // Reset the flag on unmount
      }
    };
  }, [options]);

  return (<div>
    <div ref={chartRef} id="bar-chart"></div>
  </div>)
}

export default GroupedHorizontalBarChart