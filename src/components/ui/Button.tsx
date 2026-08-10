"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emerald" | "outline" | "ghost";
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
      "inline-flex items-center justify-center rounded-xl font-extrabold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

    const variants = {
      primary:
        "bg-royal hover:bg-royal-hover text-white shadow-md shadow-royal/25 hover:shadow-lg hover:shadow-royal/30 focus:ring-royal focus:ring-offset-[var(--bg-surface)]",
      secondary:
        "bg-navy text-white hover:bg-navy-dark shadow-md focus:ring-navy focus:ring-offset-[var(--bg-surface)]",
      emerald:
        "bg-emerald-fin hover:bg-emerald-dark text-white shadow-md shadow-emerald-fin/25 focus:ring-emerald-fin focus:ring-offset-[var(--bg-surface)]",
      outline:
        "bg-transparent border-2 border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-focus)] hover:text-royal dark:hover:text-blue-400 focus:ring-royal/30",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus:ring-royal/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs h-9 gap-1.5",
      md: "px-5 py-2.5 text-[12.5px] sm:text-sm h-10 gap-2",
      lg: "px-7 py-3 text-sm sm:text-[15px] h-12 gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.975 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
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
