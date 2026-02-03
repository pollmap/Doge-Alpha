import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-[4px] transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--c-bg-primary)]",
        "disabled:opacity-50 disabled:pointer-events-none",

        variant === "primary" &&
          "bg-[var(--c-gold)] text-[var(--c-text-inverse)] hover:brightness-110 active:brightness-95",
        variant === "secondary" &&
          "border border-[var(--c-border-subtle)] text-[var(--c-text-secondary)] hover:bg-[var(--c-bg-hover)] active:bg-[var(--c-bg-active)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--c-text-secondary)] hover:bg-[var(--c-bg-hover)] hover:text-[var(--c-text-primary)] active:bg-[var(--c-bg-active)]",

        size === "sm" && "h-7 text-xs px-2.5 gap-1",
        size === "md" && "h-8 text-[13px] px-3 gap-1.5",
        size === "lg" && "h-9 text-sm px-4 gap-2",

        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
