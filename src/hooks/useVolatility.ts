"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogeKlines } from "@/lib/api/binance";
import { calculateReturns, calculateVolatility, getVolatilityLevel } from "@/lib/utils/calculations";
import type { VolatilityData } from "@/lib/types";

async function fetchVolatility(): Promise<VolatilityData> {
  const klines90d = await getDogeKlines("1d", 90);
  const closes = klines90d.map((k) => parseFloat(k.close));

  const returns90 = calculateReturns(closes);
  const returns30 = returns90.slice(-30);
  const returns7 = returns90.slice(-7);

  const dvi90d = calculateVolatility(returns90);
  const dvi30d = calculateVolatility(returns30);
  const dvi7d = calculateVolatility(returns7);

  return {
    dvi7d,
    dvi30d,
    dvi90d,
    btcCorrelation: 0,
    level: getVolatilityLevel(dvi30d),
    timestamp: new Date().toISOString(),
  };
}

export function useVolatility() {
  return useQuery({
    queryKey: ["volatility"],
    queryFn: fetchVolatility,
    staleTime: 30 * 60_000,
    retry: 2,
  });
}
