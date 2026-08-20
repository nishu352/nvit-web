import React from "react";
import { cn } from "@/lib/utils";

export interface TechGroup {
  category: string;
  items: string[];
}

interface TechGridProps {
  groups: TechGroup[];
  className?: string;
}

export function TechGrid({ groups, className }: TechGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {groups.map((grp, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/70 space-y-3"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block font-mono">
            {grp.category}
          </span>
          <ul className="space-y-2">
            {grp.items.map((tech, tIdx) => (
              <li
                key={tIdx}
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TechGrid;
