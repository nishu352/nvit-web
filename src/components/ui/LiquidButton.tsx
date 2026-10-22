"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "pill-arrow" | "pill-play";
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function LiquidButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  icon,
  size = "md",
  disabled = false,
}: LiquidButtonProps) {
  const sizeStyles = {
    sm: "px-5 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-3.5 text-sm sm:text-base",
  }[size];

  const content = (
    <>
      <span className="relative z-10">{children}</span>

      {/* Primary Circular Inset Badge with Arrow */}
      {variant === "primary" && (
        <span className="relative z-10 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 ml-1 group-hover:translate-x-0.5 group-hover:bg-white/20 transition-all duration-200">
          {icon || <ArrowRight className="w-3.5 h-3.5 text-white" />}
        </span>
      )}

      {/* Secondary Play Icon or Arrow */}
      {variant === "secondary" && (
        <span className="relative z-10 w-6 h-6 rounded-full bg-slate-900/5 dark:bg-white/10 flex items-center justify-center shrink-0 ml-0.5 group-hover:translate-x-0.5 transition-transform duration-200">
          {icon || <Play className="w-2.5 h-2.5 fill-current text-slate-800 dark:text-slate-200 ml-0.5" />}
        </span>
      )}

      {/* Subtle top specular sheen reflection line */}
      <span className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
    </>
  );

  const buttonClass = `
    group select-none outline-none
    ${variant === "primary" ? "liquid-glass-btn-primary" : "liquid-glass-btn-secondary"}
    ${sizeStyles}
    ${disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full">
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ y: 0.5, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={buttonClass}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0.5, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${buttonClass} focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
    >
      {content}
    </motion.button>
  );
}
