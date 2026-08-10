import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "royal" | "amber" | "rose" | "slate";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "royal",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    emerald: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    royal:   "bg-blue-50 dark:bg-blue-950/50 text-royal dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
    amber:   "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
    rose:    "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30",
    slate:   "bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
        variants[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
