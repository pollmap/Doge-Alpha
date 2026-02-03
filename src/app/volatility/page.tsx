"use client";

import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Progress } from "@/components/ui/Progress";
import { useVolatility } from "@/hooks/useVolatility";
import { useSnapshot } from "@/hooks/useSnapshot";
import { Activity, BarChart3 } from "lucide-react";
import { VOLATILITY_LEVELS } from "@/lib/utils/constants";
import type { VolatilityLevel } from "@/lib/types";

export default function VolatilityPage() {
  const { data: vol, isLoading } = useVolatility();
  const { data: snapshot } = useSnapshot();

  const level = vol?.level ?? snapshot?.volatility?.level ?? "medium";
  const levelInfo = VOLATILITY_LEVELS[level as VolatilityLevel];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">변동성 분석</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          도지코인의 가격 변동성을 다각도로 분석합니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="7일 DVI"
          value={vol ? vol.dvi7d.toFixed(1) : "-"}
          icon={<Activity className="w-4 h-4" />}
          tooltip="7일 일간 수익률의 연율화 표준편차"
          loading={isLoading}
        />
        <MetricCard
          title="30일 DVI"
          value={vol ? vol.dvi30d.toFixed(1) : "-"}
          icon={<Activity className="w-4 h-4" />}
          tooltip="30일 일간 수익률의 연율화 표준편차"
          loading={isLoading}
        />
        <MetricCard
          title="90일 DVI"
          value={vol ? vol.dvi90d.toFixed(1) : "-"}
          icon={<BarChart3 className="w-4 h-4" />}
          tooltip="90일 일간 수익률의 연율화 표준편차"
          loading={isLoading}
        />
      </div>

      {/* Volatility gauge */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">변동성 등급</h3>
        <div className="space-y-3">
          {(Object.entries(VOLATILITY_LEVELS) as [VolatilityLevel, typeof levelInfo][]).map(
            ([key, info]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="text-sm w-20 text-[var(--color-text-secondary)]">{info.label}</span>
                <div className="flex-1">
                  <Progress
                    value={key === level ? (vol?.dvi30d ?? 0) : 0}
                    max={info.max}
                    size="md"
                    colorClass={key === level ? `bg-[${info.color}]` : "bg-[var(--color-surface)]"}
                  />
                </div>
                {key === level && (
                  <span className="text-sm font-mono font-bold" style={{ color: info.color }}>
                    {vol?.dvi30d.toFixed(1) ?? "-"}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </Card>

      {/* Explanation */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">DVI란?</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          DVI(Doge Volatility Index)는 도지코인 일간 수익률의 표준편차를 연율화한 값입니다.
          주식시장의 VIX와 유사한 개념으로, 높을수록 가격 변동이 크다는 것을 의미합니다.
          도지코인은 밈코인 특성상 이벤트에 따라 변동성이 급격히 변할 수 있습니다.
        </p>
      </Card>
    </div>
  );
}
