"use client";

import { cn } from "@/lib/utils/cn";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  labels?: Record<T, string>;
}

export function Tabs<T extends string>({ tabs, active, onChange, labels }: TabsProps<T>) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-[var(--color-bg)]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
            active === tab
              ? "bg-[var(--color-doge-gold)] text-black"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          {labels?.[tab] ?? tab}
        </button>
      ))}
    </div>
  );
}
