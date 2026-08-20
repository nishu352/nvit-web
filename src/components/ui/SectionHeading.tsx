import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeVariant?: "blue" | "indigo" | "violet" | "emerald" | "rose" | "slate";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const BADGE_VARIANTS = {
  blue: "bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/80 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300",
  violet: "bg-violet-50 dark:bg-violet-950/60 border-violet-200/80 dark:border-violet-800/40 text-violet-700 dark:text-violet-300",
  emerald: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300",
  rose: "bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-800/40 text-rose-700 dark:text-rose-300",
  slate: "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300",
};

export function SectionHeading({
  badge,
  badgeIcon,
  badgeVariant = "blue",
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-4xl",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm",
            BADGE_VARIANTS[badgeVariant],
            align === "center" ? "justify-center" : ""
          )}
        >
          {badgeIcon}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
