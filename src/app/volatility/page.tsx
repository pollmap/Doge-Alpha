"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
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
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">변동성 분석</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          도지코인의 가격 변동성을 다각도로 분석합니다
        </p>
      </div>

      {/* DVI cards */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">
            Doge Volatility Index (DVI)
          </span>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--c-text-tertiary)]">7일 DVI</p>
              <span className="text-2xl font-bold text-mono-value text-[var(--c-text-primary)] block">
                {vol ? vol.dvi7d.toFixed(1) : "-"}
              </span>
              {vol && <Progress value={vol.dvi7d} max={100} size="sm" />}
              <p className="text-[11px] text-[var(--c-text-tertiary)]">7일 연율화 표준편차</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--c-text-tertiary)]">30일 DVI</p>
              <span className="text-2xl font-bold text-mono-value text-[var(--c-text-primary)] block">
                {vol ? vol.dvi30d.toFixed(1) : "-"}
              </span>
              {vol && <Progress value={vol.dvi30d} max={100} size="sm" />}
              <p className="text-[11px] text-[var(--c-text-tertiary)]">30일 연율화 표준편차</p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] text-[var(--c-text-tertiary)]">90일 DVI</p>
              <span className="text-2xl font-bold text-mono-value text-[var(--c-text-primary)] block">
                {vol ? vol.dvi90d.toFixed(1) : "-"}
              </span>
              {vol && <Progress value={vol.dvi90d} max={100} size="sm" />}
              <p className="text-[11px] text-[var(--c-text-tertiary)]">90일 연율화 표준편차</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Level indicator */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">변동성 등급</span>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {(Object.entries(VOLATILITY_LEVELS) as [VolatilityLevel, typeof levelInfo][]).map(
              ([key, info]) => {
                const isActive = key === level;
                return (
                  <div key={key} className="flex items-center gap-4">
                    <span className="text-[11px] w-20 text-[var(--c-text-secondary)]">
                      {info.label}
                    </span>
                    <div className="flex-1">
                      <Progress
                        value={isActive ? (vol?.dvi30d ?? 0) : 0}
                        max={info.max}
                        size="md"
                        color={isActive ? info.color : undefined}
                      />
                    </div>
                    {isActive && (
                      <span
                        className="text-[11px] text-mono-value font-bold"
                        style={{ color: info.color }}
                      >
                        {vol?.dvi30d.toFixed(1) ?? "-"}
                      </span>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </CardBody>
      </Card>

      {/* Explanation */}
      <Card variant="default">
        <CardBody>
          <h3 className="text-sm font-semibold text-[var(--c-text-primary)] mb-2">DVI란?</h3>
          <p className="text-[11px] text-[var(--c-text-tertiary)]">
            DVI(Doge Volatility Index)는 도지코인 일간 수익률의 표준편차를 연율화한 값입니다.
            주식시장의 VIX와 유사한 개념으로, 높을수록 가격 변동이 크다는 것을 의미합니다.
            도지코인은 밈코인 특성상 이벤트에 따라 변동성이 급격히 변할 수 있습니다.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
