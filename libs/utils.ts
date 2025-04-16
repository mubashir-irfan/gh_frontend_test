export const formatCurrency = (amount: number, currency = '$'): string => {
  if (amount >= 1_000_000_000) {
    return `${currency}${(amount / 1_000_000_000).toFixed(1)}B`;
  } else if (amount >= 1_000_000) {
    return `${currency}${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 100_000) {
    return `${currency}${(amount / 1_000).toFixed(1)}k`;
  } else {
    return `${currency}${amount.toLocaleString()}`;
  }
};