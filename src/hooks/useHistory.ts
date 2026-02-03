"use client";

import { useQuery } from "@tanstack/react-query";
import { getDogeKlines } from "@/lib/api/binance";
import type { PriceHistory, HistoricalEvent } from "@/lib/types";

function getBasePath() {
  return typeof window !== "undefined" && window.location.pathname.startsWith("/Canis-Alpha")
    ? "/Canis-Alpha"
    : "";
}

export function usePriceHistory(days: number = 30) {
  return useQuery({
    queryKey: ["priceHistory", days],
    queryFn: async (): Promise<PriceHistory[]> => {
      const interval = days <= 1 ? "1h" : "1d";
      const limit = days <= 1 ? 24 : Math.min(days, 365);
      const klines = await getDogeKlines(interval, limit);

      return klines.map((k) => ({
        date: new Date(k.openTime).toISOString().split("T")[0],
        open: parseFloat(k.open),
        high: parseFloat(k.high),
        low: parseFloat(k.low),
        close: parseFloat(k.close),
        volume: parseFloat(k.quoteVolume),
      }));
    },
    staleTime: 5 * 60_000,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<HistoricalEvent[]> => {
      const basePath = getBasePath();
      const res = await fetch(`${basePath}/data/history/events.json`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      return data.events;
    },
    staleTime: 60 * 60_000,
  });
}
