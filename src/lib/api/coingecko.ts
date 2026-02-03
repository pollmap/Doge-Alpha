import { API_ENDPOINTS } from "@/lib/utils/constants";

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_date: string;
  atl: number;
  atl_date: string;
}

export async function getDogeMarketData(): Promise<CoinGeckoMarketData> {
  const res = await fetch(
    `${API_ENDPOINTS.COINGECKO}/coins/markets?vs_currency=usd&ids=dogecoin&sparkline=false&price_change_percentage=7d,30d`
  );
  if (!res.ok) throw new Error("Failed to fetch CoinGecko data");
  const data = await res.json();
  return data[0];
}

export async function getDogeHistoricalPrice(
  days: number = 30
): Promise<{ prices: [number, number][]; market_caps: [number, number][]; total_volumes: [number, number][] }> {
  const res = await fetch(
    `${API_ENDPOINTS.COINGECKO}/coins/dogecoin/market_chart?vs_currency=usd&days=${days}`
  );
  if (!res.ok) throw new Error("Failed to fetch historical price");
  return res.json();
}
