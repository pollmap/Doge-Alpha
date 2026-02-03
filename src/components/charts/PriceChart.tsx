"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { usePriceHistory } from "@/hooks/useHistory";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
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

  const priceChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    return ((last - first) / first) * 100;
  }, [chartData]);

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-lg" />;
  }

  if (!chartData.length) {
    return (
      <div className="h-full flex items-center justify-center text-[var(--color-text-secondary)]">
        차트 데이터를 불러올 수 없습니다
      </div>
    );
  }

  const isPositive = priceChange >= 0;
  const strokeColor = isPositive ? "#238636" : "#da3633";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#8b949e", fontSize: 11 }}
          tickFormatter={(value) => {
            const d = new Date(value);
            return `${d.getMonth() + 1}/${d.getDate()}`;
          }}
          minTickGap={40}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#8b949e", fontSize: 11 }}
          tickFormatter={(value) => `$${value.toFixed(3)}`}
          domain={["auto", "auto"]}
          width={58}
        />
        <RechartsTooltip
          contentStyle={{
            backgroundColor: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#8b949e" }}
          formatter={(value) => [formatCurrency(Number(value), "USD"), "가격"]}
          labelFormatter={(label) => formatDate(label as string)}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={strokeColor}
          strokeWidth={2}
          fill="url(#priceGradient)"
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
