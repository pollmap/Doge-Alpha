"use client";

import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton } from "@/components/ui/Skeleton";
import { useKimchi } from "@/hooks/useKimchi";
import { formatCurrency, formatPercent } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export function KimchiCard() {
  const { data: kimchi, isLoading, error } = useKimchi();

  if (isLoading) {
    return (
      <Card variant="metric">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-9 w-32 mb-3" />
        <Skeleton className="h-4 w-40" />
      </Card>
    );
  }

  if (error || !kimchi) {
    return (
      <Card variant="metric">
        <p className="text-[var(--color-text-secondary)] text-sm">김프/역프</p>
        <p className="text-[var(--color-negative)] mt-2">로드 실패</p>
      </Card>
    );
  }

  const isPositive = kimchi.premium > 0;
  const isNeutral = Math.abs(kimchi.premium) < 0.5;
  const isHighPremium = Math.abs(kimchi.premium) > 3;
  const StatusIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <Card
      variant="metric"
      className={cn(isHighPremium && "border-[var(--color-warning)]")}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--color-text-secondary)] text-sm font-medium">김프/역프</span>
        {isHighPremium && (
          <Tooltip content="프리미엄이 높습니다">
            <AlertTriangle className="w-4 h-4 text-[var(--color-warning)]" />
          </Tooltip>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span
          className={cn(
            "text-3xl font-bold font-mono tracking-tight",
            isNeutral
              ? "text-[var(--color-text-primary)]"
              : isPositive
              ? "text-[var(--color-negative)]"
              : "text-[var(--color-positive)]"
          )}
        >
          {formatPercent(kimchi.premium)}
        </span>
        <StatusIcon
          className={cn(
            "w-5 h-5",
            isNeutral
              ? "text-[var(--color-text-secondary)]"
              : isPositive
              ? "text-[var(--color-negative)]"
              : "text-[var(--color-positive)]"
          )}
        />
      </div>

      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        {isPositive
          ? `업비트가 ${formatCurrency(Math.abs(kimchi.absoluteKrw))} 비쌈`
          : isNeutral
          ? "거의 평형 상태"
          : `업비트가 ${formatCurrency(Math.abs(kimchi.absoluteKrw))} 저렴`}
      </p>

      <div className="pt-3 border-t border-[var(--color-border)] space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-secondary)]">업비트</span>
          <span className="text-[var(--color-text-primary)] font-mono">
            {formatCurrency(kimchi.upbitPrice)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-secondary)]">바이낸스 (환산)</span>
          <span className="text-[var(--color-text-primary)] font-mono">
            {formatCurrency(kimchi.binancePrice * kimchi.exchangeRate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-secondary)]">환율</span>
          <span className="text-[var(--color-text-primary)] font-mono">
            $1 = ₩{kimchi.exchangeRate.toFixed(0)}
          </span>
        </div>
      </div>
    </Card>
  );
}
