"use client";

import { EventList } from "@/components/dashboard/EventList";

export default function HistoryPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-sm font-semibold text-[var(--c-text-primary)]">이벤트 타임라인</h1>
        <p className="text-[11px] text-[var(--c-text-tertiary)] mt-1">
          2013년 탄생부터 현재까지, 도지코인의 주요 이벤트를 타임라인으로 확인합니다
        </p>
      </div>

      {/* Full event list */}
      <EventList limit={20} />
    </div>
  );
}
