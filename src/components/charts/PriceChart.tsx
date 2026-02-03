"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { usePriceHistory } from "@/hooks/useHistory";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatCurrency, formatShortDate } from "@/lib/utils/formatters";
import { Skeleton } from "@/components/ui/Skeleton";

const TIMEFRAME_DAYS: Record<string, number> = {
  "1H": 1,
  "1D": 1,
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  ALL: 365,
};

export function PriceChart() {
  const { selectedTimeframe } = useDashboardStore();
  const days = TIMEFRAME_DAYS[selectedTimeframe] ?? 7;
  const { data: history, isLoading } = usePriceHistory(days);

  const chartData = useMemo(() => {
    if (!history) return [];
    return history.map((item) => ({
      date: item.date,
      price: item.close,
      volume: item.volume,
    }));
  }, [history]);

  const { priceChange, isPositive } = useMemo(() => {
    if (chartData.length < 2) return { priceChange: 0, isPositive: true };
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    const change = ((last - first) / first) * 100;
    return { priceChange: change, isPositive: change >= 0 };
  }, [chartData]);

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-md animate-shimmer" />;
  }

  if (!chartData.length) {
    return (
      <div className="h-full flex items-center justify-center text-[12px] text-[var(--c-text-disabled)]">
        No chart data available
      </div>
    );
  }

  const strokeColor = isPositive
    ? "var(--c-positive)"
    : "var(--c-negative)";
  const gradientId = "priceAreaGradient";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.15} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="var(--c-chart-grid)"
          strokeDasharray="2 4"
          horizontal={true}
          vertical={false}
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--c-text-tertiary)",
            fontSize: 11,
            fontFamily: "var(--font-mono, monospace)",
          }}
          tickFormatter={(value) => formatShortDate(value)}
          minTickGap={48}
          dy={4}
        />

        <YAxis
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--c-text-tertiary)",
            fontSize: 11,
            fontFamily: "var(--font-mono, monospace)",
          }}
          tickFormatter={(value: number) => `$${value.toFixed(3)}`}
          domain={["auto", "auto"]}
          width={56}
          dx={-2}
        />

        <RechartsTooltip
          contentStyle={{
            backgroundColor: "var(--c-bg-elevated)",
            border: "1px solid var(--c-border-subtle)",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "var(--font-mono, monospace)",
            padding: "8px 10px",
            boxShadow: "var(--shadow-md)",
          }}
          labelStyle={{
            color: "var(--c-text-tertiary)",
            fontSize: "11px",
            marginBottom: "4px",
          }}
          itemStyle={{
            color: "var(--c-text-primary)",
            padding: 0,
          }}
          formatter={(value) => [
            formatCurrency(Number(value), "USD"),
            "Price",
          ]}
          labelFormatter={(label) => formatShortDate(label as string)}
          cursor={{
            stroke: "var(--c-border-default)",
            strokeWidth: 1,
            strokeDasharray: "3 3",
          }}
        />

        <Area
          type="monotone"
          dataKey="price"
          stroke={strokeColor}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          animationDuration={600}
          dot={false}
          activeDot={{
            r: 3,
            fill: strokeColor,
            stroke: "var(--c-bg-elevated)",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
