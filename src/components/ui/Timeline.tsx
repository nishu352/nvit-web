import React from "react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  number?: string;
  stepNumber?: string;
  title?: string;
  name?: string;
  duration?: string;
  deliverable?: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {steps.map((st, idx) => {
        const stepNum = st.number || st.stepNumber || `0${idx + 1}`;
        const stepTitle = st.title || st.name || `Phase ${stepNum}`;
        return (
          <div
            key={idx}
            className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 space-y-3 hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                STEP {stepNum}
              </span>
              {st.duration && (
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded">
                  {st.duration}
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {stepTitle}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {st.description}
            </p>

            {st.deliverable && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200">Deliverable:</strong>{" "}
                {st.deliverable}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
