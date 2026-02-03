import { cn } from "@/lib/utils/cn";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  colorClass?: string;
  showLabel?: boolean;
  label?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  colorClass = "bg-[var(--color-doge-gold)]",
  showLabel = false,
  label,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-[var(--color-text-secondary)]">{label}</span>
          {showLabel && (
            <span className="text-[var(--color-text-primary)] font-mono">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-[var(--color-surface)] rounded-full overflow-hidden",
          size === "sm" && "h-1",
          size === "md" && "h-2",
          size === "lg" && "h-3"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
