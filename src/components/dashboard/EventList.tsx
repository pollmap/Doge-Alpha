"use client";

import { useEvents } from "@/hooks/useHistory";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/formatters";
import { EVENT_CATEGORIES } from "@/lib/utils/constants";
import { cn } from "@/lib/utils/cn";
import type { EventCategory } from "@/lib/types";

const EVENT_ICONS: Record<EventCategory, string> = {
  milestone: "\u{1F3C6}",
  elon: "\u{1F680}",
  exchange: "\u{1F4B1}",
  partnership: "\u{1F91D}",
  technical: "\u{2699}\u{FE0F}",
  market: "\u{1F4C8}",
};

export function EventList({ limit = 5 }: { limit?: number }) {
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Card>
        <div className="p-4 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const recentEvents = (events ?? []).slice(-limit).reverse();

  return (
    <Card>
      <div className="divide-y divide-[var(--color-border)]">
        {recentEvents.length > 0 ? (
          recentEvents.map((event) => {
            const cat = EVENT_CATEGORIES[event.category];
            return (
              <div
                key={event.id}
                className="p-4 flex items-start gap-4 hover:bg-[var(--color-surface)]/50 transition-colors"
              >
                <span className="text-2xl mt-0.5">{EVENT_ICONS[event.category]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      {cat.label}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <h4 className="font-medium text-[var(--color-text-primary)] mb-1 text-sm">
                    {event.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {event.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono text-[var(--color-text-secondary)]">
                    ${event.priceAtEvent}
                  </p>
                  {event.priceChange24h !== undefined && (
                    <Badge variant={event.priceChange24h >= 0 ? "positive" : "negative"}>
                      {event.priceChange24h >= 0 ? "+" : ""}
                      {event.priceChange24h.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-[var(--color-text-secondary)]">
            이벤트 데이터를 불러오는 중...
          </div>
        )}
      </div>
    </Card>
  );
}
