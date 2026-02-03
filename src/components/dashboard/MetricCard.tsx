import { type ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  tooltip?: string;
  loading?: boolean;
  error?: boolean;
  subtitle?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = "24h",
  icon,
  tooltip,
  loading = false,
  error = false,
  subtitle,
}: MetricCardProps) {
  if (loading) {
    return (
      <Card variant="metric">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-8 w-24" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="metric">
        <p className="text-[var(--color-text-secondary)] text-sm">{title}</p>
        <p className="text-[var(--color-negative)]">오류</p>
      </Card>
    );
  }

  const hasChange = change !== undefined;
  const isPositive = change !== undefined && change >= 0;
  const isNeutral = change !== undefined && Math.abs(change) < 0.01;
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <Card variant="metric">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-doge-gold)]">{icon}</span>}
          <span className="text-[var(--color-text-secondary)] text-sm">{title}</span>
        </div>
        {tooltip && (
          <Tooltip content={tooltip}>
            <HelpCircle className="w-3.5 h-3.5 text-[var(--color-text-secondary)] cursor-help" />
          </Tooltip>
        )}
      </div>

      <span className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
        {value}
      </span>

      {subtitle && (
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">{subtitle}</p>
      )}

      {hasChange && (
        <div className="flex items-center gap-1 mt-2">
          <div
            className={cn(
              "flex items-center gap-0.5 text-sm",
              isNeutral
                ? "text-[var(--color-text-secondary)]"
                : isPositive
                ? "text-[var(--color-positive)]"
                : "text-[var(--color-negative)]"
            )}
          >
            <TrendIcon className="w-3 h-3" />
            {isPositive ? "+" : ""}
            {change.toFixed(2)}%
          </div>
          <span className="text-[var(--color-text-secondary)] text-xs">{changeLabel}</span>
        </div>
      )}
    </Card>
  );
}
