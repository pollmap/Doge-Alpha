import { API_ENDPOINTS } from "@/lib/utils/constants";

interface ExchangeRates {
  base: string;
  date: string;
  rates: {
    KRW: number;
    [key: string]: number;
  };
}

let cachedRate: { value: number; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10분

export async function getUsdKrwRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_TTL) {
    return cachedRate.value;
  }

  try {
    const res = await fetch(API_ENDPOINTS.EXCHANGE_RATE);
    if (!res.ok) throw new Error("Failed to fetch exchange rate");
    const data: ExchangeRates = await res.json();
    cachedRate = { value: data.rates.KRW, timestamp: Date.now() };
    return data.rates.KRW;
  } catch {
    console.error("Exchange rate fetch failed, using fallback");
    return cachedRate?.value ?? 1350;
  }
}
