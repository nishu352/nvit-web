"use client";

import React from "react";
import { motion } from "motion/react";

interface LiquidRibbonProps {
  variant?: "hero" | "services" | "solutions" | "cta";
  className?: string;
}

export function LiquidRibbon({ variant = "hero", className = "" }: LiquidRibbonProps) {
  const id = React.useId().replace(/:/g, "");

  if (variant === "hero") {
    return (
      <div className={`absolute pointer-events-none select-none overflow-hidden ${className}`}>
        <motion.svg
          viewBox="0 0 900 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.08)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <defs>
            {/* Iridescent Glass Flow Gradient */}
            <linearGradient id={`heroRibbonMain_${id}`} x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#93C5FD" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#FDBA74" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id={`heroRibbonRefract_${id}`} x1="85%" y1="15%" x2="15%" y2="85%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7" />
              <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#FED7AA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
            </linearGradient>

            {/* Specular Rim Light */}
            <linearGradient id={`heroRibbonRim_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
            </linearGradient>

            {/* Filter for subtle liquid blur */}
            <filter id={`heroLiquidBlur_${id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sweeping 3D Liquid Glass Curve 1 */}
          <path
            d="M520 80 C680 120, 840 280, 820 440 C800 600, 640 680, 500 660 C380 640, 420 500, 520 440 C620 380, 720 280, 640 180 C580 100, 480 90, 520 80 Z"
            fill={`url(#heroRibbonMain_${id})`}
            filter={`url(#heroLiquidBlur_${id})`}
            className="opacity-90 dark:opacity-75"
          />

          {/* Secondary Interlocking Liquid Ribbon Loop */}
          <path
            d="M580 140 C700 200, 780 340, 740 480 C700 600, 560 640, 460 580 C360 520, 400 400, 500 360 C600 320, 680 240, 620 180 Z"
            fill={`url(#heroRibbonRefract_${id})`}
            className="opacity-70 dark:opacity-50"
          />

          {/* High-Gloss Specular Rim Highlighting */}
          <path
            d="M540 100 C680 160, 810 300, 790 440 C770 560, 650 630, 520 620"
            stroke={`url(#heroRibbonRim_${id})`}
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Delicate internal reflection vein */}
          <path
            d="M600 160 C710 240, 740 380, 690 480"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 16"
            className="opacity-60"
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div className={`absolute pointer-events-none select-none overflow-hidden ${className}`}>
        <motion.svg
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.1)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
        >
          <defs>
            <linearGradient id={`ctaRibbonMain_${id}`} x1="0%" y1="50%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#93C5FD" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#FDBA74" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id={`ctaRibbonRim_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Sweeping Liquid S-Curve at Bottom of CTA */}
          <path
            d="M-50 420 C180 340, 320 480, 540 380 C740 280, 880 360, 1050 260 L1050 600 L-50 600 Z"
            fill={`url(#ctaRibbonMain_${id})`}
            className="opacity-75 dark:opacity-60"
          />

          {/* Crest Specular Highlight */}
          <path
            d="M-40 415 C190 335, 330 475, 545 375 C745 275, 885 355, 1050 255"
            stroke={`url(#ctaRibbonRim_${id})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-80"
          />
        </motion.svg>
      </div>
    );
  }

  // Subtle accent ribbon for Solutions/Services
  return (
    <div className={`absolute pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          <linearGradient id={`subtleRibbon_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#93C5FD" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#FDBA74" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M100 120 C220 60, 360 140, 420 280 C480 420, 380 480, 240 460 C120 440, 160 320, 100 120 Z"
          fill={`url(#subtleRibbon_${id})`}
          className="opacity-60 dark:opacity-40"
        />
      </svg>
    </div>
  );
}
