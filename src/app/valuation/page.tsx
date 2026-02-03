"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useSnapshot } from "@/hooks/useSnapshot";
import { DOGE_ANNUAL_ISSUANCE } from "@/lib/utils/constants";

export default function ValuationPage() {
  const { data: snapshot } = useSnapshot();
  const v = snapshot?.valuation;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">가치 평가</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          다양한 밸류에이션 모델로 도지코인의 적정 가치를 분석합니다
        </p>
      </div>

      {/* NVT Ratio card */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">NVT 비율</span>
        </CardHeader>
        <CardBody className="space-y-4">
          {v ? (
            <>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-mono-value text-[var(--c-text-primary)]">
                  {v.nvt.toFixed(1)}
                </span>
                <Badge variant={v.nvt < 20 ? "positive" : v.nvt < 50 ? "warning" : "negative"}>
                  {v.nvt < 20 ? "저평가" : v.nvt < 50 ? "적정" : "고평가"}
                </Badge>
              </div>
              <p className="text-[11px] text-[var(--c-text-tertiary)]">
                NVT(Network Value to Transaction)는 시가총액을 일일 온체인 트랜잭션 금액으로 나눈 값입니다.
                주식의 PER과 유사한 개념으로, 네트워크의 실제 사용량 대비 시장 가치를 측정합니다.
              </p>
              <p className="text-[11px] text-[var(--c-text-secondary)]">
                {v.nvt < 20
                  ? "현재 저평가 구간입니다. 온체인 트랜잭션 활동이 시가총액 대비 활발합니다."
                  : v.nvt < 50
                  ? "현재 적정 구간입니다. 네트워크 가치와 실제 사용량이 균형 상태입니다."
                  : "현재 고평가 구간입니다. 투기적 과열 가능성이 있으며, 트랜잭션 대비 시총이 높습니다."}
              </p>

              {/* NVT level indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-md bg-[var(--c-bg-surface)]">
                  <Badge variant="positive">NVT &lt; 20</Badge>
                  <p className="text-[11px] mt-2 text-[var(--c-text-primary)]">저평가</p>
                  <p className="text-[11px] text-[var(--c-text-tertiary)]">트랜잭션 활발</p>
                </div>
                <div className="p-3 rounded-md bg-[var(--c-bg-surface)]">
                  <Badge variant="warning">NVT 20-50</Badge>
                  <p className="text-[11px] mt-2 text-[var(--c-text-primary)]">적정</p>
                  <p className="text-[11px] text-[var(--c-text-tertiary)]">균형 상태</p>
                </div>
                <div className="p-3 rounded-md bg-[var(--c-bg-surface)]">
                  <Badge variant="negative">NVT &gt; 50</Badge>
                  <p className="text-[11px] mt-2 text-[var(--c-text-primary)]">고평가</p>
                  <p className="text-[11px] text-[var(--c-text-tertiary)]">투기적 과열</p>
                </div>
              </div>
            </>
          ) : (
            <div className="animate-pulse h-24 bg-[var(--c-bg-surface)] rounded" />
          )}
        </CardBody>
      </Card>

      {/* Stock-to-Flow card */}
      <Card variant="default">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">Stock-to-Flow 모델</span>
        </CardHeader>
        <CardBody className="space-y-4">
          {v ? (
            <>
              <div className="flex items-baseline gap-4">
                <div>
                  <p className="text-[11px] text-[var(--c-text-tertiary)] mb-1">S2F 비율</p>
                  <span className="text-3xl font-bold text-mono-value text-[var(--c-text-primary)]">
                    {v.s2f.toFixed(1)}
                  </span>
                </div>
                {v.s2fPrice && (
                  <div>
                    <p className="text-[11px] text-[var(--c-text-tertiary)] mb-1">S2F 모델 가격</p>
                    <span className="text-2xl font-bold text-mono-value text-[var(--c-text-primary)]">
                      ${v.s2fPrice.toFixed(4)}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-[var(--c-text-tertiary)]">
                S2F는 기존 공급량(Stock)을 연간 신규 발행량(Flow)으로 나눈 비율입니다.
                비트코인에서 유명한 이 모델은 희소성과 가치의 관계를 설명합니다.
              </p>
              <p className="text-[11px] text-[var(--c-text-secondary)]">
                도지코인은 연간 약 {(DOGE_ANNUAL_ISSUANCE / 1e9).toFixed(2)}B DOGE가 신규 발행되며,
                비트코인과 달리 반감기가 없어 S2F가 천천히 증가합니다. 이는 인플레이션율이
                점진적으로 감소함을 의미합니다.
              </p>
            </>
          ) : (
            <div className="animate-pulse h-24 bg-[var(--c-bg-surface)] rounded" />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
