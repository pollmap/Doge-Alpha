import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCurrency(num: number, currency: "KRW" | "USD" = "KRW"): string {
  if (currency === "KRW") {
    return `₩${formatNumber(Math.round(num))}`;
  }
  return `$${formatNumber(num, num < 1 ? 6 : 2)}`;
}

export function formatDoge(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B DOGE`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M DOGE`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K DOGE`;
  return `${formatNumber(num, 2)} DOGE`;
}

export function formatPercent(num: number, decimals: number = 2): string {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(decimals)}%`;
}

export function formatHashrate(hashrate: number): string {
  if (hashrate >= 1e15) return `${(hashrate / 1e15).toFixed(2)} PH/s`;
  if (hashrate >= 1e12) return `${(hashrate / 1e12).toFixed(2)} TH/s`;
  if (hashrate >= 1e9) return `${(hashrate / 1e9).toFixed(2)} GH/s`;
  return `${(hashrate / 1e6).toFixed(2)} MH/s`;
}

export function formatCompact(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return formatNumber(num);
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "yyyy년 M월 d일", { locale: ko });
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ko });
}

export function formatTimestamp(dateString: string): string {
  return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
}

export function formatShortDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
