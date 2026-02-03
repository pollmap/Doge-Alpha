import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "positive" | "negative" | "warning" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
        variant === "positive" && "bg-[#238636]/20 text-[#3fb950]",
        variant === "negative" && "bg-[#da3633]/20 text-[#f85149]",
        variant === "warning" && "bg-[#d29922]/20 text-[#e3b341]",
        variant === "info" && "bg-[#3b82f6]/20 text-[#58a6ff]",
        className
      )}
    >
      {children}
    </span>
  );
}
