import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-doge-gold)] disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-[var(--color-doge-gold)] text-black hover:bg-[var(--color-doge-gold-light)]",
        variant === "secondary" && "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]",
        variant === "ghost" && "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
        variant === "outline" && "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
        size === "sm" && "px-2.5 py-1.5 text-xs gap-1",
        size === "md" && "px-4 py-2 text-sm gap-2",
        size === "lg" && "px-6 py-3 text-base gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
