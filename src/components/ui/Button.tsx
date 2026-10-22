"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emerald" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-bold tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

    const variants = {
      primary:
        "bg-royal hover:bg-royal-hover text-white shadow-sm shadow-royal/20 hover:shadow-md hover:shadow-royal/25 focus:ring-royal focus:ring-offset-[var(--bg-surface)]",
      secondary:
        "bg-navy text-white hover:bg-navy-dark shadow-sm focus:ring-navy focus:ring-offset-[var(--bg-surface)]",
      emerald:
        "bg-emerald-fin hover:bg-emerald-dark text-white shadow-sm shadow-emerald-fin/20 focus:ring-emerald-fin focus:ring-offset-[var(--bg-surface)]",
      outline:
        "bg-transparent border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-focus)] hover:bg-[var(--bg-subtle)] focus:ring-royal/30",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] focus:ring-royal/20",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 focus:ring-rose-500 focus:ring-offset-[var(--bg-surface)]",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs h-9 gap-1.5",
      md: "px-5 py-2 text-[13px] sm:text-sm h-10 gap-2",
      lg: "px-6 py-2.5 text-sm sm:text-[15px] h-12 gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
