import { StatLabelKeys } from "@/types/dashboard";

export const defaultStatValues: Partial<Record<StatLabelKeys, number | string>> = {
  outstanding_invoices: 0,
  average_collection_period: "00:00",
  gross_profit_margin: 0,
  inventory_turnover: "00:00",
  online_payments: 0,
  revenue: 0,
  expenses: 0,
  stock_value: 0
};