import { API_ENDPOINTS } from "@/lib/utils/constants";

export interface BinanceTicker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
}

export interface BinanceKline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteVolume: string;
  trades: number;
}

export async function getDogeUsdtTicker(): Promise<BinanceTicker> {
  const res = await fetch(`${API_ENDPOINTS.BINANCE}/ticker/24hr?symbol=DOGEUSDT`);
  if (!res.ok) throw new Error("Failed to fetch Binance USDT ticker");
  return res.json();
}

export async function getDogeBtcTicker(): Promise<BinanceTicker> {
  const res = await fetch(`${API_ENDPOINTS.BINANCE}/ticker/24hr?symbol=DOGEBTC`);
  if (!res.ok) throw new Error("Failed to fetch Binance BTC ticker");
  return res.json();
}

export async function getDogeKlines(
  interval: "1h" | "4h" | "1d" | "1w" = "1d",
  limit: number = 100
): Promise<BinanceKline[]> {
  const res = await fetch(
    `${API_ENDPOINTS.BINANCE}/klines?symbol=DOGEUSDT&interval=${interval}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch Binance klines");
  const data = await res.json();
  return data.map((k: (string | number)[]) => ({
    openTime: k[0],
    open: k[1],
    high: k[2],
    low: k[3],
    close: k[4],
    volume: k[5],
    closeTime: k[6],
    quoteVolume: k[7],
    trades: k[8],
  }));
}
