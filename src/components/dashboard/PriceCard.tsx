"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePrice } from "@/hooks/usePrice";
import { formatCurrency, formatPercent, formatRelativeTime } from "@/lib/utils/formatters";

export function PriceCard() {
  const { data: price, isLoading, error } = usePrice();

  if (isLoading) {
    return (
      <Card variant="highlight">
        <CardBody className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-3 w-16 animate-shimmer" />
            <Skeleton className="h-2 w-2 rounded-full animate-shimmer" />
          </div>
          <Skeleton className="h-8 w-36 mb-3 animate-shimmer" />
          <Skeleton className="h-5 w-20 mb-4 animate-shimmer" />
          <div className="border-t border-[var(--c-border-subtle)] pt-3 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-12 mb-1 animate-shimmer" />
                <Skeleton className="h-4 w-20 animate-shimmer" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error || !price) {
    return (
      <Card variant="highlight">
        <CardBody className="p-4">
          <span className="text-[11px] text-[var(--c-text-tertiary)]">DOGE / USD</span>
          <p className="text-[var(--c-negative)] text-sm mt-2">Failed to load</p>
          <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">Check API connection</p>
        </CardBody>
      </Card>
    );
  }

  const isPositive = price.change24h >= 0;

  return (
    <Card variant="highlight">
      <CardBody className="p-4">
        {/* Header: pair label + live dot */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[var(--c-text-tertiary)] tracking-wide uppercase">
            DOGE / USD
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full bg-[var(--c-positive)] animate-pulse"
            title={`Updated: ${formatRelativeTime(price.timestamp)}`}
          />
        </div>

        {/* Main price */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-[28px] text-mono-value font-bold text-[var(--c-text-primary)] leading-none">
            {formatCurrency(price.usd, "USD")}
          </span>
          <Badge variant={isPositive ? "positive" : "negative"}>
            {formatPercent(price.change24h)}
          </Badge>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--c-border-subtle)] my-3" />

        {/* 2x2 sub-metric grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <span className="text-[11px] text-[var(--c-text-tertiary)] block">KRW</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {formatCurrency(price.krw, "KRW")}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--c-text-tertiary)] block">BTC</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {price.btc.toFixed(8)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--c-text-tertiary)] block">24h High</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {formatCurrency(price.high24h, "USD")}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--c-text-tertiary)] block">24h Low</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {formatCurrency(price.low24h, "USD")}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
