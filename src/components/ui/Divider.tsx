import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 border-t border-slate-200/70 dark:border-slate-800/70 my-10 sm:my-14",
        className
      )}
    />
  );
}

export default Divider;
