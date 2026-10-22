"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      labelClassName,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]",
              disabled && "opacity-60 cursor-not-allowed",
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
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full h-11 rounded-xl text-[13px] font-medium transition-all duration-150",
              "bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-default)]",
              "placeholder:text-[var(--text-placeholder)] placeholder:font-normal",
              "focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-subtle)]",
              error && "border-rose-500 dark:border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20",
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
          <p id={errorId} className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-[11px] text-[var(--text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
