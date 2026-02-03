import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/* ─── Card ─────────────────────────────────────────────────────────── */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "highlight";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md transition-colors duration-150",
        variant === "default" &&
          "bg-[var(--c-bg-elevated)] border border-[var(--c-border-subtle)]",
        variant === "elevated" &&
          "bg-[var(--c-bg-surface)] border border-[var(--c-border-subtle)] shadow-[var(--shadow-sm)]",
        variant === "highlight" &&
          "bg-[var(--c-bg-elevated)] border border-[var(--c-gold-border)] shadow-[var(--shadow-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

/* ─── CardHeader ───────────────────────────────────────────────────── */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-4 py-3 border-b border-[var(--c-border-subtle)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

/* ─── CardBody ─────────────────────────────────────────────────────── */

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardBody.displayName = "CardBody";
