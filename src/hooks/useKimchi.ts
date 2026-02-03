"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogeUsdtTicker } from "@/lib/api/binance";
import { getDogeKrwTicker } from "@/lib/api/upbit";
import { getUsdKrwRate } from "@/lib/api/exchangeRate";
import { calculateKimchi } from "@/lib/utils/calculations";
import { REFRESH_INTERVALS } from "@/lib/utils/constants";
import type { KimchiData } from "@/lib/types";

async function fetchKimchi(): Promise<KimchiData> {
  const [binanceTicker, upbitTicker, exchangeRate] = await Promise.all([
    getDogeUsdtTicker(),
    getDogeKrwTicker(),
    getUsdKrwRate(),
  ]);

  const binancePrice = parseFloat(binanceTicker.lastPrice);
  const upbitPrice = upbitTicker.trade_price;
  const { premium, absoluteKrw } = calculateKimchi(upbitPrice, binancePrice, exchangeRate);

  return {
    premium,
    absoluteKrw,
    upbitPrice,
    binancePrice,
    exchangeRate,
    timestamp: new Date().toISOString(),
  };
}

export function useKimchi() {
  return useQuery({
    queryKey: ["kimchi"],
    queryFn: fetchKimchi,
    refetchInterval: REFRESH_INTERVALS.KIMCHI,
    staleTime: REFRESH_INTERVALS.KIMCHI / 2,
    retry: 2,
  });
}
