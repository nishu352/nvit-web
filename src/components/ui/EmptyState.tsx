"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <AlertCircle className="w-10 h-10 text-amber-500 dark:text-amber-400" />,
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-[var(--bg-surface)] rounded-3xl p-12 text-center border border-[var(--border-default)] shadow-[var(--shadow-card)] max-w-xl mx-auto space-y-5"
    >
      <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">{description}</p>
      </div>
      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
