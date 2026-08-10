"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, labelClassName, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[var(--text-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-11 rounded-xl text-[12.5px] font-semibold transition-all duration-200",
              "bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-default)]",
              "placeholder:text-[var(--text-placeholder)] placeholder:font-normal",
              "focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
              error && "border-rose-500 dark:border-rose-600 focus:border-rose-500 focus:ring-rose-500/20",
              leftIcon ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
