
export type QueryParams = Record<string, string | number | number[] | boolean | boolean[] | undefined | null>;

export interface APIError {
  error?: string;
  message?: string;
  errorCode?: string;
  statusCode: number;
  detail?: string;
}

export type PaginatedData<T> = {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}

export type {
  ProfitDistribution,
  Financials,
  Stats,
  Change,
  Period,
  AccountantData
} from './dashboard'
