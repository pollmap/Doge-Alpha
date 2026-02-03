import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "positive" | "negative" | "warning" | "gold";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] leading-4 px-1.5 py-0.5 rounded-[2px] font-medium",

        variant === "default" &&
          "border border-[var(--c-border-subtle)] bg-[var(--c-bg-surface)] text-[var(--c-text-secondary)]",
        variant === "positive" &&
          "bg-[var(--c-positive-bg)] text-[var(--c-positive-text)]",
        variant === "negative" &&
          "bg-[var(--c-negative-bg)] text-[var(--c-negative-text)]",
        variant === "warning" &&
          "bg-[var(--c-warning)]/10 text-[var(--c-warning)]",
        variant === "gold" &&
          "bg-[var(--c-gold-bg)] text-[var(--c-gold)]",

        className
      )}
    >
      {children}
    </span>
  );
}
