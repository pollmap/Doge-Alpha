"use client";

import { useEvents } from "@/hooks/useHistory";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/formatters";
import { EVENT_CATEGORIES } from "@/lib/utils/constants";
import type { EventCategory } from "@/lib/types";

const EVENT_EMOJI: Record<EventCategory, string> = {
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
      <Card variant="default">
        <CardHeader>
          <span className="text-[11px] text-[var(--c-text-tertiary)] tracking-wide uppercase">
            Events
          </span>
        </CardHeader>
        <CardBody className="p-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="px-4 py-3 flex items-center gap-3 border-b border-[var(--c-border-subtle)] last:border-b-0"
            >
              <Skeleton className="h-5 w-5 rounded animate-shimmer shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-48 animate-shimmer" />
                <Skeleton className="h-3 w-64 animate-shimmer" />
              </div>
              <Skeleton className="h-5 w-14 animate-shimmer shrink-0" />
            </div>
          ))}
        </CardBody>
      </Card>
    );
  }

  const recentEvents = (events ?? []).slice(-limit).reverse();

  if (!recentEvents.length) {
    return (
      <Card variant="default">
        <CardBody className="py-8 text-center">
          <span className="text-[12px] text-[var(--c-text-disabled)]">
            No events available
          </span>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <div>
        {recentEvents.map((event, idx) => {
          const cat = EVENT_CATEGORIES[event.category];
          const isLast = idx === recentEvents.length - 1;

          return (
            <div
              key={event.id}
              className={`
                px-4 py-3 transition-colors hover:bg-[var(--c-bg-hover)] cursor-default
                ${!isLast ? "border-b border-[var(--c-border-subtle)]" : ""}
              `}
            >
              {/* Row 1: emoji + date + title + price badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm leading-none shrink-0">
                  {EVENT_EMOJI[event.category]}
                </span>
                <span className="text-[11px] text-mono-value text-[var(--c-text-disabled)] shrink-0">
                  {formatDate(event.date)}
                </span>
                <span className="text-[13px] font-medium text-[var(--c-text-primary)] truncate flex-1">
                  {event.title}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] text-mono-value text-[var(--c-text-tertiary)]">
                    ${event.priceAtEvent}
                  </span>
                  {event.priceChange24h !== undefined && (
                    <Badge variant={event.priceChange24h >= 0 ? "positive" : "negative"}>
                      {event.priceChange24h >= 0 ? "+" : ""}
                      {event.priceChange24h.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Row 2: description */}
              {event.description && (
                <p className="text-[12px] text-[var(--c-text-tertiary)] line-clamp-1 mt-1 ml-6">
                  {event.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
