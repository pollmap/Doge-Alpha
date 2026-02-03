"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useKimchi } from "@/hooks/useKimchi";
import { formatCurrency, formatPercent } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export function KimchiCard() {
  const { data: kimchi, isLoading, error } = useKimchi();

  if (isLoading) {
    return (
      <Card variant="default">
        <CardBody className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-3 w-16 animate-shimmer" />
          </div>
          <Skeleton className="h-8 w-28 mb-2 animate-shimmer" />
          <Skeleton className="h-4 w-40 mb-4 animate-shimmer" />
          <div className="border-t border-[var(--c-border-subtle)] pt-3 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-16 animate-shimmer" />
                <Skeleton className="h-3 w-24 animate-shimmer" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error || !kimchi) {
    return (
      <Card variant="default">
        <CardBody className="p-4">
          <span className="text-[11px] text-[var(--c-text-tertiary)]">김프 / 역프</span>
          <p className="text-[var(--c-negative)] text-sm mt-2">로드 실패</p>
        </CardBody>
      </Card>
    );
  }

  const isExpensive = kimchi.premium > 0;
  const isNeutral = Math.abs(kimchi.premium) < 0.5;
  const isHighPremium = Math.abs(kimchi.premium) > 3;

  // Positive premium = expensive = bad (negative color)
  // Negative premium = cheap = good (positive color)
  const valueColor = isNeutral
    ? "text-[var(--c-text-primary)]"
    : isExpensive
    ? "text-[var(--c-negative-text)]"
    : "text-[var(--c-positive-text)]";

  return (
    <Card variant="default">
      <CardBody className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[var(--c-text-tertiary)] tracking-wide">
            김프 / 역프
          </span>
          {isHighPremium && (
            <AlertTriangle className="w-3.5 h-3.5 text-[var(--c-warning)]" />
          )}
        </div>

        {/* Main value */}
        <div className="mb-1">
          <span className={cn("text-[28px] text-mono-value font-bold leading-none", valueColor)}>
            {formatPercent(kimchi.premium)}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[var(--c-text-tertiary)] mb-3">
          {isExpensive
            ? `업비트가 ${formatCurrency(Math.abs(kimchi.absoluteKrw))} 비쌈`
            : isNeutral
            ? "거의 평형 상태"
            : `업비트가 ${formatCurrency(Math.abs(kimchi.absoluteKrw))} 저렴`}
        </p>

        {/* Divider */}
        <div className="border-t border-[var(--c-border-subtle)] my-3" />

        {/* Sub-metrics */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-[var(--c-text-tertiary)]">업비트</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {formatCurrency(kimchi.upbitPrice)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-[var(--c-text-tertiary)]">바이낸스 (환산)</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              {formatCurrency(kimchi.binancePrice * kimchi.exchangeRate)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-[var(--c-text-tertiary)]">환율</span>
            <span className="text-[13px] text-mono-value text-[var(--c-text-primary)]">
              $1 = ₩{kimchi.exchangeRate.toFixed(0)}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
