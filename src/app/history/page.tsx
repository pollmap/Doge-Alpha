"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EventList } from "@/components/dashboard/EventList";
import { useEvents } from "@/hooks/useHistory";

export default function HistoryPage() {
  const { data: events } = useEvents();

  const stats = events
    ? {
        total: events.length,
        positive: events.filter((e) => e.impact === "positive").length,
        negative: events.filter((e) => e.impact === "negative").length,
        elon: events.filter((e) => e.category === "elon").length,
      }
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">도지코인 역사</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          2013년 탄생부터 현재까지, 도지코인의 주요 이벤트를 타임라인으로 확인합니다
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="metric">
            <p className="text-sm text-[var(--color-text-secondary)]">총 이벤트</p>
            <p className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">{stats.total}</p>
          </Card>
          <Card variant="metric">
            <p className="text-sm text-[var(--color-text-secondary)]">긍정적 이벤트</p>
            <p className="text-2xl font-bold font-mono text-[var(--color-positive)]">{stats.positive}</p>
          </Card>
          <Card variant="metric">
            <p className="text-sm text-[var(--color-text-secondary)]">부정적 이벤트</p>
            <p className="text-2xl font-bold font-mono text-[var(--color-negative)]">{stats.negative}</p>
          </Card>
          <Card variant="metric">
            <p className="text-sm text-[var(--color-text-secondary)]">일론 관련</p>
            <p className="text-2xl font-bold font-mono text-[var(--color-info)]">{stats.elon}</p>
          </Card>
        </div>
      )}

      {/* Full event list */}
      <EventList limit={100} />
    </div>
  );
}
