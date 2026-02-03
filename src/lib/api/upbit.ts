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

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

export async function getDogeKrwTicker(): Promise<UpbitTicker> {
  const targetUrl = `${API_ENDPOINTS.UPBIT}/ticker?markets=KRW-DOGE`;

  // Try direct first
  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const data = await res.json();
      return data[0];
    }
  } catch {
    // CORS blocked, try proxies
  }

  // Try CORS proxies
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy(targetUrl));
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data[0] : data;
      }
    } catch {
      continue;
    }
  }

  throw new Error("Failed to fetch Upbit ticker (CORS blocked)");
}
