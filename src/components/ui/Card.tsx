"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "surface" | "subtle" | "elevated";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl sm:rounded-3xl transition-all duration-200 relative overflow-hidden";

    const variants = {
      default:
        "bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-card)]",
      glass:
        "glass-card",
      surface:
        "bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]",
      subtle:
        "bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
      elevated:
        "bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-elevated)]",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect
            ? { y: -3, transition: { duration: 0.2, ease: "easeOut" } }
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
