'use client'
import { GroupedHorizontalBarChart } from "@/components/ui";
import { useGet } from "@/hooks/useAPIQueryHooks";
import { formatCurrency } from "@/libs/utils";
import { mockFinancialSummary } from "@/mockData";

const SalesExpensesBarChart = () => {
  const { data: financialSummary } = useGet('dashboard/accountant/financial-summary', 'dashboard/financial-summary', true, {
    period: 'last month'
  })

  const mappedSalesSeries = mockFinancialSummary.monthly_data.map((entry) => Number(entry.sales.toFixed(2)));
  const mappedExpensesSeries = mockFinancialSummary.monthly_data.map((entry) => Number(entry.expenses.toFixed(2)));

  const salesAndExpensesSeries = [
    {
      name: "Sales",
      color: "#1A56DB",
      data: mappedSalesSeries,
    },
    {
      name: "Expenses",
      color: "#16BDCA",
      data: mappedExpensesSeries,
    },
  ];

  const categories = mockFinancialSummary.monthly_data.map((entry) => entry.month);

  const financialSummaryData = mockFinancialSummary;
  return (
    <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(financialSummaryData.total_profit)}</dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
            Profit rate {financialSummaryData.profit_rate.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Sales</dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">{formatCurrency(financialSummaryData.total_sales)}</dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">-{formatCurrency(financialSummaryData.total_expenses)}</dd>
        </dl>
      </div>
      <div><GroupedHorizontalBarChart series={salesAndExpensesSeries} categories={categories} /></div>

    </div>
  )
}
export default SalesExpensesBarChart;