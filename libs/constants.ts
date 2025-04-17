export const EMAIL_SESSION_STORAGE_KEY = 'sessionEmail';
export const OTP_TIMESTAMP_SESSION_STORAGE_KEY = 'sessionOtp';
export const REMEMBER_USER_STORAGE_KEY = 'rememberMe';
export const USER_TYPE_STORAGE_KEY = 'userType';

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
export const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export const OTP_VERIFICATION_MILLISECONDS = 10 * 60 * 1000;

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

export const PAGE_SIZE = 10;