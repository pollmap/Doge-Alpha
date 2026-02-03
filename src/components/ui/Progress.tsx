import { cn } from "@/lib/utils/cn";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  color,
  className,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "w-full bg-[var(--c-bg-surface)] rounded-full overflow-hidden",
        size === "sm" && "h-1",
        size === "md" && "h-1.5",
        size === "lg" && "h-2",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          !color && "bg-[var(--c-gold)]"
        )}
        style={{
          width: `${percentage}%`,
          ...(color ? { backgroundColor: color } : {}),
        }}
      />
    </div>
  );
}
