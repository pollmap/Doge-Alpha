"use client";

import {
  Hash,
  Users,
  ArrowRightLeft,
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Layers,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOnchain } from "@/hooks/useOnchain";
import { formatCompact, formatHashrate, formatNumber } from "@/lib/utils/formatters";

export default function OnchainPage() {
  const { data: onchain, isLoading } = useOnchain();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">온체인 분석</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          도지코인 네트워크의 실시간 온체인 지표를 확인합니다
        </p>
      </div>

      {/* 네트워크 */}
      <section>
        <Card variant="default">
          <CardHeader>
            <span className="text-sm font-semibold text-[var(--c-text-primary)]">네트워크</span>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="해시레이트"
                value={onchain ? formatHashrate(onchain.hashrate) : "-"}
                icon={<Cpu className="w-4 h-4" />}
                tooltip="24시간 평균 네트워크 해시레이트"
                loading={isLoading}
              />
              <MetricCard
                title="난이도"
                value={onchain ? formatCompact(onchain.difficulty) : "-"}
                icon={<Layers className="w-4 h-4" />}
                tooltip="현재 채굴 난이도"
                loading={isLoading}
              />
              <MetricCard
                title="블록 높이"
                value={onchain ? formatNumber(onchain.blockHeight) : "-"}
                icon={<HardDrive className="w-4 h-4" />}
                tooltip="최신 블록 번호"
                loading={isLoading}
              />
              <MetricCard
                title="블록 생성 시간"
                value={onchain ? `${onchain.blockTime}초` : "-"}
                icon={<Clock className="w-4 h-4" />}
                tooltip="평균 블록 생성 간격"
                loading={isLoading}
              />
            </div>
          </CardBody>
        </Card>
      </section>

      {/* 트랜잭션 */}
      <section>
        <Card variant="default">
          <CardHeader>
            <span className="text-sm font-semibold text-[var(--c-text-primary)]">트랜잭션</span>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="일일 트랜잭션"
                value={onchain ? formatCompact(onchain.transactions24h) : "-"}
                icon={<ArrowRightLeft className="w-4 h-4" />}
                tooltip="24시간 총 트랜잭션 수"
                loading={isLoading}
              />
              <MetricCard
                title="평균 전송량"
                value={onchain ? `${formatCompact(onchain.avgTxValue)} DOGE` : "-"}
                icon={<Activity className="w-4 h-4" />}
                tooltip="트랜잭션당 평균 전송량"
                loading={isLoading}
              />
              <MetricCard
                title="총 전송량 (24h)"
                value={onchain ? `${formatCompact(onchain.totalTransferred24h)} DOGE` : "-"}
                icon={<Hash className="w-4 h-4" />}
                tooltip="24시간 총 이동량"
                loading={isLoading}
              />
              <MetricCard
                title="중간 수수료"
                value={onchain ? `${onchain.medianFee.toFixed(4)} DOGE` : "-"}
                icon={<Activity className="w-4 h-4" />}
                tooltip="트랜잭션 중간값 수수료"
                loading={isLoading}
              />
            </div>
          </CardBody>
        </Card>
      </section>

      {/* 지갑 */}
      <section>
        <Card variant="default">
          <CardHeader>
            <span className="text-sm font-semibold text-[var(--c-text-primary)]">지갑</span>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="활성 주소 (24h)"
                value={onchain?.activeAddresses24h ? formatCompact(onchain.activeAddresses24h) : "N/A"}
                icon={<Users className="w-4 h-4" />}
                tooltip="24시간 내 활동한 고유 주소 수"
                loading={isLoading}
              />
              <MetricCard
                title="신규 주소 (24h)"
                value={onchain?.newAddresses24h ? formatCompact(onchain.newAddresses24h) : "N/A"}
                icon={<Users className="w-4 h-4" />}
                tooltip="24시간 내 새로 생성된 주소 수"
                loading={isLoading}
              />
              <MetricCard
                title="멤풀 크기"
                value={onchain ? formatCompact(onchain.mempoolSize) : "-"}
                icon={<HardDrive className="w-4 h-4" />}
                tooltip="미확인 트랜잭션 대기열 크기 (bytes)"
                loading={isLoading}
              />
              <MetricCard
                title="총 주소 수"
                value={onchain?.totalAddresses ? formatCompact(onchain.totalAddresses) : "N/A"}
                icon={<Users className="w-4 h-4" />}
                tooltip="잔액이 있는 총 주소 수"
                loading={isLoading}
              />
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Data source info */}
      <Card variant="default">
        <CardBody>
          <h3 className="text-sm font-semibold text-[var(--c-text-primary)] mb-2">데이터 출처</h3>
          <p className="text-[11px] text-[var(--c-text-tertiary)]">
            온체인 데이터는 Blockchair API를 통해 수집됩니다. 일부 지표(활성 주소, 신규 주소 등)는
            무료 API 플랜의 제한으로 제공되지 않을 수 있습니다. 데이터는 5분마다 갱신됩니다.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
