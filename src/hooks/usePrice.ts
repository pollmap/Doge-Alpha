"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogeUsdtTicker, getDogeBtcTicker } from "@/lib/api/binance";
import { getDogeKrwTicker } from "@/lib/api/upbit";
import { REFRESH_INTERVALS } from "@/lib/utils/constants";

export interface LivePrice {
  usd: number;
  krw: number;
  btc: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24hUsd: number;
  volumeKrw24h: number;
  timestamp: string;
}

async function fetchLivePrice(): Promise<LivePrice> {
  const [usdtTicker, btcTicker, krwTicker] = await Promise.all([
    getDogeUsdtTicker(),
    getDogeBtcTicker(),
    getDogeKrwTicker(),
  ]);

  return {
    usd: parseFloat(usdtTicker.lastPrice),
    krw: krwTicker.trade_price,
    btc: parseFloat(btcTicker.lastPrice),
    change24h: parseFloat(usdtTicker.priceChangePercent),
    high24h: parseFloat(usdtTicker.highPrice),
    low24h: parseFloat(usdtTicker.lowPrice),
    volume24hUsd: parseFloat(usdtTicker.quoteVolume),
    volumeKrw24h: krwTicker.acc_trade_price_24h,
    timestamp: new Date().toISOString(),
  };
}

export function usePrice() {
  return useQuery({
    queryKey: ["livePrice"],
    queryFn: fetchLivePrice,
    refetchInterval: REFRESH_INTERVALS.PRICE,
    staleTime: REFRESH_INTERVALS.PRICE / 2,
    retry: 2,
  });
}
