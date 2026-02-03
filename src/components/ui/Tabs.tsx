"use client";

import { cn } from "@/lib/utils/cn";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
}

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  labels,
  className,
}: TabsProps<T>) {
  return (
    <div
      className={cn(
        "flex gap-4 border-b border-[var(--c-border-subtle)]",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={cn(
              "relative pb-2 text-[13px] font-medium transition-colors duration-150",
              "focus:outline-none focus-visible:text-[var(--c-text-primary)]",
              isActive
                ? "text-[var(--c-gold)]"
                : "text-[var(--c-text-tertiary)] hover:text-[var(--c-text-secondary)]",
              isActive &&
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--c-gold)] after:rounded-full"
            )}
          >
            {labels?.[tab] ?? tab}
          </button>
        );
      })}
    </div>
  );
}
