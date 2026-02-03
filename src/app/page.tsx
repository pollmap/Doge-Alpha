"use client";

import { Activity, Hash, Users, ArrowRightLeft, TrendingUp, BarChart3, Coins } from "lucide-react";
import { PriceCard } from "@/components/dashboard/PriceCard";
import { KimchiCard } from "@/components/dashboard/KimchiCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PriceChart } from "@/components/charts/PriceChart";
import { EventList } from "@/components/dashboard/EventList";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useSnapshot } from "@/hooks/useSnapshot";
import { useOnchain } from "@/hooks/useOnchain";
import { useDashboardStore, type Timeframe } from "@/store/useDashboardStore";
import { formatCompact, formatHashrate } from "@/lib/utils/formatters";
import { VOLATILITY_LEVELS } from "@/lib/utils/constants";

const TIMEFRAMES: readonly Timeframe[] = ["1H", "1D", "7D", "1M", "3M", "1Y", "ALL"];

export default function DashboardPage() {
  const { data: snapshot } = useSnapshot();
  const { data: onchain, isLoading: onchainLoading } = useOnchain();
  const { selectedTimeframe, setTimeframe } = useDashboardStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Hero tagline */}
      <div className="text-center mb-2">
        <p className="text-sm text-[var(--color-text-secondary)]">
          도지코인 분석의 정석 &mdash; 밈을 넘어 데이터로
        </p>
      </div>

      {/* Top metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PriceCard />
        <KimchiCard />
        <MetricCard
          title="시가총액"
          value={snapshot ? `$${formatCompact(snapshot.price.marketCap)}` : "-"}
          tooltip="전체 도지코인의 시장 가치 (USD)"
          icon={<Coins className="w-4 h-4" />}
          loading={!snapshot}
          subtitle={snapshot ? `순위 #${snapshot.price.rank}` : undefined}
        />
        <MetricCard
          title="24h 거래량"
          value={snapshot ? `$${formatCompact(snapshot.price.volume24h)}` : "-"}
          tooltip="전 세계 거래소 24시간 거래량"
          icon={<BarChart3 className="w-4 h-4" />}
          loading={!snapshot}
        />
      </div>

      {/* Main chart + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                가격 차트
              </h2>
              <div className="flex gap-1">
                {TIMEFRAMES.map((tf) => (
                  <Button
                    key={tf}
                    variant={selectedTimeframe === tf ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            <div className="h-[320px]">
              <PriceChart />
            </div>
          </Card>
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {/* Volatility */}
          <Card className="p-4">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              변동성 지수 (DVI)
            </h3>
            {snapshot?.volatility ? (
              <>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                    {snapshot.volatility.dvi30d.toFixed(1)}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: VOLATILITY_LEVELS[snapshot.volatility.level]?.color }}
                  >
                    {VOLATILITY_LEVELS[snapshot.volatility.level]?.label}
                  </span>
                </div>
                <Progress value={snapshot.volatility.dvi30d} max={100} size="md" />
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                  30일 연율화 변동성 기준
                </p>
              </>
            ) : (
              <div className="animate-pulse h-16 bg-[var(--color-surface)] rounded" />
            )}
          </Card>

          {/* Adoption */}
          <Card className="p-4">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              채택 지수 (MAI)
            </h3>
            {snapshot?.adoption ? (
              <>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                    {snapshot.adoption.mai}
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">/ 100</span>
                </div>
                <Progress value={snapshot.adoption.mai} max={100} showLabel size="md" />
                <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  대중 화폐까지 {snapshot.adoption.mai}% 도달
                </p>
              </>
            ) : (
              <div className="animate-pulse h-16 bg-[var(--color-surface)] rounded" />
            )}
          </Card>

          {/* NVT */}
          <Card className="p-4">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              NVT 비율
            </h3>
            {snapshot?.valuation ? (
              <>
                <span className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                  {snapshot.valuation.nvt.toFixed(1)}
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                  {snapshot.valuation.nvt < 20
                    ? "저평가 구간 (트랜잭션 대비 시총 낮음)"
                    : snapshot.valuation.nvt < 50
                    ? "적정 구간"
                    : "고평가 구간 (트랜잭션 대비 시총 높음)"}
                </p>
              </>
            ) : (
              <div className="animate-pulse h-12 bg-[var(--color-surface)] rounded" />
            )}
          </Card>
        </div>
      </div>

      {/* Onchain metrics */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          온체인 지표
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="해시레이트"
            value={onchain ? formatHashrate(onchain.hashrate) : "-"}
            icon={<Hash className="w-4 h-4" />}
            tooltip="네트워크 총 연산력 (24h 평균)"
            loading={onchainLoading}
          />
          <MetricCard
            title="활성 주소"
            value={onchain?.activeAddresses24h ? formatCompact(onchain.activeAddresses24h) : "N/A"}
            icon={<Users className="w-4 h-4" />}
            tooltip="24시간 내 트랜잭션이 발생한 고유 주소 수"
            loading={onchainLoading}
          />
          <MetricCard
            title="일일 트랜잭션"
            value={onchain ? formatCompact(onchain.transactions24h) : "-"}
            icon={<ArrowRightLeft className="w-4 h-4" />}
            tooltip="24시간 총 트랜잭션 수"
            loading={onchainLoading}
          />
          <MetricCard
            title="평균 수수료"
            value={onchain ? `${onchain.avgFee.toFixed(4)} DOGE` : "-"}
            icon={<Activity className="w-4 h-4" />}
            tooltip="트랜잭션당 평균 수수료"
            loading={onchainLoading}
          />
        </div>
      </div>

      {/* Events */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          최근 이벤트
        </h2>
        <EventList limit={5} />
      </div>
    </div>
  );
}
