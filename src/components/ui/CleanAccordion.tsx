"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface CleanAccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export function CleanAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: CleanAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("divide-y divide-slate-200/80 dark:divide-slate-800/80 border-t border-b border-slate-200/80 dark:border-slate-800/80", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="transition-colors">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.question}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 transition-colors">
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform duration-200",
                    isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                  )}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-4xl">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default CleanAccordion;
