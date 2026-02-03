"use client";

import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { useSnapshot } from "@/hooks/useSnapshot";
import { TrendingUp, Scale, Layers } from "lucide-react";
import { DOGE_ANNUAL_ISSUANCE } from "@/lib/utils/constants";

export default function ValuationPage() {
  const { data: snapshot } = useSnapshot();
  const v = snapshot?.valuation;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">가치 평가</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          다양한 밸류에이션 모델로 도지코인의 적정 가치를 분석합니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="NVT 비율"
          value={v ? v.nvt.toFixed(1) : "-"}
          icon={<Scale className="w-4 h-4" />}
          tooltip="Network Value to Transaction: 시가총액 / 일일 트랜잭션 금액"
          loading={!v}
          subtitle={
            v ? (v.nvt < 20 ? "저평가 구간" : v.nvt < 50 ? "적정 구간" : "고평가 구간") : undefined
          }
        />
        <MetricCard
          title="S2F 비율"
          value={v ? v.s2f.toFixed(1) : "-"}
          icon={<Layers className="w-4 h-4" />}
          tooltip="Stock-to-Flow: 총 공급량 / 연간 신규 발행량"
          loading={!v}
          subtitle="도지코인은 무제한 발행이므로 S2F가 점진적 증가"
        />
        <MetricCard
          title="S2F 모델 가격"
          value={v?.s2fPrice ? `$${v.s2fPrice.toFixed(4)}` : "-"}
          icon={<TrendingUp className="w-4 h-4" />}
          tooltip="Stock-to-Flow 모델 기반 추정 가격"
          loading={!v}
        />
      </div>

      {/* NVT Explanation */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">NVT 비율이란?</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          NVT(Network Value to Transaction)는 시가총액을 일일 온체인 트랜잭션 금액으로 나눈 값입니다.
          주식의 PER과 유사한 개념으로, 네트워크의 실제 사용량 대비 시장 가치를 측정합니다.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-[var(--color-surface)]">
            <Badge variant="positive">NVT &lt; 20</Badge>
            <p className="text-sm mt-2 text-[var(--color-text-primary)]">저평가</p>
            <p className="text-xs text-[var(--color-text-secondary)]">트랜잭션 활발</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface)]">
            <Badge variant="warning">NVT 20-50</Badge>
            <p className="text-sm mt-2 text-[var(--color-text-primary)]">적정</p>
            <p className="text-xs text-[var(--color-text-secondary)]">균형 상태</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-surface)]">
            <Badge variant="negative">NVT &gt; 50</Badge>
            <p className="text-sm mt-2 text-[var(--color-text-primary)]">고평가</p>
            <p className="text-xs text-[var(--color-text-secondary)]">투기적 과열</p>
          </div>
        </div>
      </Card>

      {/* S2F Explanation */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">Stock-to-Flow 모델</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
          S2F는 기존 공급량(Stock)을 연간 신규 발행량(Flow)으로 나눈 비율입니다.
          비트코인에서 유명한 이 모델은 희소성과 가치의 관계를 설명합니다.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          도지코인은 연간 약 {(DOGE_ANNUAL_ISSUANCE / 1e9).toFixed(2)}B DOGE가 신규 발행되며,
          비트코인과 달리 반감기가 없어 S2F가 천천히 증가합니다. 이는 인플레이션율이
          점진적으로 감소함을 의미합니다.
        </p>
      </Card>
    </div>
  );
}
