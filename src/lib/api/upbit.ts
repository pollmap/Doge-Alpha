import { API_ENDPOINTS } from "@/lib/utils/constants";

export interface UpbitTicker {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_price: number;
  change: "RISE" | "FALL" | "EVEN";
  signed_change_rate: number;
  signed_change_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  lowest_52_week_price: number;
  timestamp: number;
}

export async function getDogeKrwTicker(): Promise<UpbitTicker> {
  const res = await fetch(`${API_ENDPOINTS.UPBIT}/ticker?markets=KRW-DOGE`);
  if (!res.ok) throw new Error("Failed to fetch Upbit ticker");
  const data = await res.json();
  return data[0];
}
