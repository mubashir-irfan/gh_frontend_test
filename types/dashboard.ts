
export interface ProfitDistribution {
  profit: number;
  expenses: number;
  assets: number;
}

export interface Financials {
  revenue: number;
  expenses: number;
  stock_value: number;
  profit_distribution: ProfitDistribution;
}

export interface Stats {
  outstanding_invoices: number;
  average_collection_period: string;
  gross_profit_margin: number;
  inventory_turnover: string;
  online_payments: number;
}

export interface Change {
  outstanding_invoices: number;
  average_collection_period: number;
  gross_profit_margin: number;
  inventory_turnover: number;
  online_payments: number;
  revenue: number;
  expenses: number;
  stock_value: number;
}

export interface Period {
  start: string;
  end: string;
}

export interface AccountantData {
  stats: Stats;
  financials: Financials;
  change: Change;
  period: Period;
}

export enum STAT_LABELS {
  outstanding_invoices = 'Outstanding Invoices',
  average_collection_period = 'Average Collection Period',
  gross_profit_margin = 'Gross Profit Margin',
  inventory_turnover = 'Inventory Turnover',
  online_payments = 'Online Payments',
  revenue = 'Revenue',
  expenses = 'Expenses',
  stock_value = 'Stock value'
}

export type StatLabelKeys = keyof typeof STAT_LABELS;
