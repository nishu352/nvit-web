import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[var(--bg-muted)]",
        className
      )}
      {...props}
    >
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/8 to-transparent animate-shimmer" />
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] space-y-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6 rounded-md" />
      <Skeleton className="w-full h-12 rounded-lg" />
      <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center">
        <Skeleton className="w-24 h-4 rounded-md" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>
    </div>
  );
}
