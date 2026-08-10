"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "surface" | "subtle";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = true, children, ...props }, ref) => {
    const baseStyles = "rounded-3xl transition-all duration-300 relative overflow-hidden";

    const variants = {
      // Theme-aware via CSS vars — works in both light and dark
      default:
        "bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-card)]",
      glass:
        "glass-card",
      surface:
        "bg-[var(--bg-subtle)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]",
      subtle:
        "bg-[var(--bg-muted)] border border-[var(--border-subtle)]",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect
            ? { y: -4, transition: { duration: 0.22, ease: "easeOut" } }
            : undefined
        }
        className={cn(baseStyles, variants[variant], className)}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
