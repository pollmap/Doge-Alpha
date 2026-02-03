"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { useSnapshot } from "@/hooks/useSnapshot";
import { Users, ArrowRightLeft, Store, MessageCircle, Code } from "lucide-react";

const COMPONENT_CONFIG = [
  { key: "activeAddressGrowth" as const, label: "활성 주소 증가율", icon: Users, weight: "25%" },
  { key: "transactionGrowth" as const, label: "트랜잭션 증가율", icon: ArrowRightLeft, weight: "25%" },
  { key: "merchantCount" as const, label: "가맹점 수", icon: Store, weight: "20%" },
  { key: "socialMentions" as const, label: "소셜 멘션", icon: MessageCircle, weight: "15%" },
  { key: "devActivity" as const, label: "개발 활동", icon: Code, weight: "15%" },
];

export default function AdoptionPage() {
  const { data: snapshot } = useSnapshot();
  const adoption = snapshot?.adoption;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">채택 지표</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          도지코인의 대중 화폐 채택 진행 상황을 종합적으로 평가합니다
        </p>
      </div>

      {/* MAI Score card */}
      <Card variant="highlight">
        <CardHeader>
          <span className="text-sm font-semibold text-[var(--c-text-primary)]">
            Mass Adoption Index
          </span>
        </CardHeader>
        <CardBody>
          <div className="text-center mb-4">
            <span className="text-5xl font-bold text-mono-value text-[var(--c-gold)]">
              {adoption?.mai ?? "-"}
            </span>
            <span className="text-2xl text-[var(--c-text-tertiary)] ml-1">/ 100</span>
          </div>
          <Progress
            value={adoption?.mai ?? 0}
            max={100}
            size="lg"
          />
          <p className="text-[11px] text-[var(--c-text-tertiary)] text-center mt-3">
            대중 화폐 채택 진행률
          </p>
        </CardBody>
      </Card>

      {/* 5 component breakdown cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPONENT_CONFIG.map(({ key, label, icon: Icon, weight }) => {
          const value = adoption?.components[key] ?? 0;
          const normalized =
            key === "activeAddressGrowth" || key === "transactionGrowth"
              ? Math.max(0, Math.min(100, 50 + value / 2))
              : value;

          return (
            <Card key={key} variant="default">
              <CardBody>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--c-gold)]" />
                    <span className="text-sm font-semibold text-[var(--c-text-primary)]">
                      {label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--c-text-tertiary)]">
                    가중치 {weight}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold text-mono-value text-[var(--c-text-primary)]">
                    {normalized.toFixed(0)}
                  </span>
                  <span className="text-[11px] text-[var(--c-text-tertiary)]">/ 100</span>
                </div>
                <Progress value={normalized} max={100} size="sm" />
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Explanation */}
      <Card variant="default">
        <CardBody>
          <h3 className="text-sm font-semibold text-[var(--c-text-primary)] mb-2">MAI 산출 방법</h3>
          <p className="text-[11px] text-[var(--c-text-tertiary)]">
            MAI(Mass Adoption Index)는 5개 구성 요소의 가중 평균으로 산출됩니다.
            각 구성 요소는 0-100 범위로 정규화되며, 활성 주소 증가율과 트랜잭션 증가율은
            30일 기준 변화율을 사용합니다. 100에 가까울수록 대중 화폐로서의 채택이 진행되고 있음을 나타냅니다.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
