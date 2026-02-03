import type { VolatilityLevel } from "@/lib/types";

export function calculateKimchi(
  upbitKrw: number,
  binanceUsd: number,
  exchangeRate: number
): { premium: number; absoluteKrw: number } {
  const binanceKrw = binanceUsd * exchangeRate;
  const premium = ((upbitKrw - binanceKrw) / binanceKrw) * 100;
  const absoluteKrw = upbitKrw - binanceKrw;
  return { premium, absoluteKrw };
}

export function calculateNVT(marketCap: number, dailyTransactionValue: number): number {
  if (dailyTransactionValue === 0) return 0;
  return marketCap / dailyTransactionValue;
}

export function calculateS2F(totalSupply: number, annualIssuance: number): number {
  if (annualIssuance === 0) return 0;
  return totalSupply / annualIssuance;
}

export function calculateVolatility(returns: number[]): number {
  if (returns.length < 2) return 0;
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const squaredDiffs = returns.map((r) => Math.pow(r - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / (returns.length - 1);
  return Math.sqrt(variance) * Math.sqrt(365) * 100;
}

export function calculateReturns(prices: number[]): number[] {
  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] > 0) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
  }
  return returns;
}

export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  if (denominator === 0) return 0;
  return numerator / denominator;
}

export function getVolatilityLevel(volatility: number): VolatilityLevel {
  if (volatility < 20) return "very-low";
  if (volatility < 40) return "low";
  if (volatility < 60) return "medium";
  if (volatility < 80) return "high";
  return "very-high";
}

export function calculateMAI(components: {
  activeAddressGrowth: number;
  transactionGrowth: number;
  merchantCount: number;
  socialMentions: number;
  devActivity: number;
}): number {
  const normalizedActive = Math.max(0, Math.min(100, 50 + components.activeAddressGrowth / 2));
  const normalizedTx = Math.max(0, Math.min(100, 50 + components.transactionGrowth / 2));
  const mai =
    normalizedActive * 0.25 +
    normalizedTx * 0.25 +
    components.merchantCount * 0.2 +
    components.socialMentions * 0.15 +
    components.devActivity * 0.15;
  return Math.round(Math.max(0, Math.min(100, mai)));
}
