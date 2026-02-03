import { type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils/cn";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  tooltip?: string;
  change?: number;
  changeLabel?: string;
  loading?: boolean;
  error?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  tooltip,
  change,
  changeLabel = "24h",
  loading = false,
  error = false,
}: MetricCardProps) {
  if (loading) {
    return (
      <Card variant="default">
        <CardBody className="p-3">
          <Skeleton className="h-3 w-20 mb-2 animate-shimmer" />
          <Skeleton className="h-6 w-24 animate-shimmer" />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="default">
        <CardBody className="p-3">
          <span className="text-[11px] text-[var(--c-text-tertiary)]">{title}</span>
          <p className="text-[var(--c-negative)] text-sm mt-1">Error</p>
        </CardBody>
      </Card>
    );
  }

  const hasChange = change !== undefined;
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card variant="default">
      <CardBody className="p-3">
        {/* Top row: icon + title + tooltip */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            {icon && (
              <span className="text-[var(--c-text-tertiary)] [&>svg]:w-3.5 [&>svg]:h-3.5">
                {icon}
              </span>
            )}
            <span className="text-[11px] text-[var(--c-text-tertiary)] leading-none">
              {title}
            </span>
          </div>
          {tooltip && (
            <Tooltip content={tooltip}>
              <HelpCircle className="w-3 h-3 text-[var(--c-text-disabled)] cursor-help" />
            </Tooltip>
          )}
        </div>

        {/* Value */}
        <span className="text-[20px] text-mono-value font-semibold text-[var(--c-text-primary)] leading-tight block">
          {value}
        </span>

        {/* Optional subtitle */}
        {subtitle && (
          <span className="text-[11px] text-[var(--c-text-tertiary)] mt-0.5 block">
            {subtitle}
          </span>
        )}

        {/* Optional change badge */}
        {hasChange && (
          <div className={cn("flex items-center gap-1.5 mt-1.5")}>
            <Badge variant={isPositive ? "positive" : "negative"}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </Badge>
            <span className="text-[11px] text-[var(--c-text-disabled)]">{changeLabel}</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
