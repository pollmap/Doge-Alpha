"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePrice } from "@/hooks/usePrice";
import { useSettingsStore } from "@/store/useSettingsStore";
import { formatCurrency, formatPercent, formatRelativeTime } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export function PriceCard() {
  const { data: price, isLoading, error } = usePrice();
  const { currency } = useSettingsStore();

  if (isLoading) {
    return (
      <Card variant="metric">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-9 w-36 mb-3" />
        <Skeleton className="h-5 w-20" />
      </Card>
    );
  }

  if (error || !price) {
    return (
      <Card variant="metric">
        <p className="text-[var(--color-text-secondary)] text-sm">DOGE 가격</p>
        <p className="text-[var(--color-negative)] mt-2">로드 실패</p>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">API 연결을 확인하세요</p>
      </Card>
    );
  }

  const isPositive = price.change24h >= 0;
  const isNeutral = Math.abs(price.change24h) < 0.01;
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <Card variant="metric" glow>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--color-text-secondary)] text-sm font-medium">
          DOGE/{currency}
        </span>
        <Tooltip content={`업데이트: ${formatRelativeTime(price.timestamp)}`}>
          <div className="w-2 h-2 rounded-full bg-[var(--color-positive)] animate-pulse" />
        </Tooltip>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-[var(--color-text-primary)] font-mono tracking-tight">
          {currency === "KRW"
            ? formatCurrency(price.krw, "KRW")
            : formatCurrency(price.usd, "USD")}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-medium",
            isNeutral
              ? "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
              : isPositive
              ? "bg-[#238636]/20 text-[#3fb950]"
              : "bg-[#da3633]/20 text-[#f85149]"
          )}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          {formatPercent(price.change24h)}
        </div>
        <span className="text-[var(--color-text-secondary)] text-xs">24h</span>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--color-border)] grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <span className="text-[var(--color-text-secondary)] text-xs">USD</span>
          <p className="text-[var(--color-text-primary)] font-mono text-sm">
            {formatCurrency(price.usd, "USD")}
          </p>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)] text-xs">BTC</span>
          <p className="text-[var(--color-text-primary)] font-mono text-sm">
            {price.btc.toFixed(8)}
          </p>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)] text-xs">24h 고가</span>
          <p className="text-[var(--color-text-primary)] font-mono text-sm">
            {formatCurrency(price.high24h, "USD")}
          </p>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)] text-xs">24h 저가</span>
          <p className="text-[var(--color-text-primary)] font-mono text-sm">
            {formatCurrency(price.low24h, "USD")}
          </p>
        </div>
      </div>
    </Card>
  );
}
