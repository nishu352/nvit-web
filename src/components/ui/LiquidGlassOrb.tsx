"use client";

import React from "react";
import { motion } from "motion/react";

interface LiquidGlassOrbProps {
  size?: number;
  className?: string;
  tint?: "blue" | "amber" | "cyan" | "neutral";
  delay?: number;
  duration?: number;
  floatY?: number;
}

export default function LiquidGlassOrb({
  size = 80,
  className = "",
  tint = "blue",
  delay = 0,
  duration = 6,
  floatY = 12,
}: LiquidGlassOrbProps) {
  // Unique gradient IDs per instance based on Math.random or props
  const id = React.useId().replace(/:/g, "");

  const tintStyles = {
    blue: {
      rim: "#38BDF8",
      glow: "rgba(56, 189, 248, 0.25)",
      ambient: "rgba(37, 99, 235, 0.15)",
      specular: "#FFFFFF",
      refract: "rgba(147, 197, 253, 0.35)",
    },
    amber: {
      rim: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.25)",
      ambient: "rgba(217, 119, 6, 0.15)",
      specular: "#FFFFFF",
      refract: "rgba(253, 230, 138, 0.35)",
    },
    cyan: {
      rim: "#06B6D4",
      glow: "rgba(6, 182, 212, 0.25)",
      ambient: "rgba(14, 165, 233, 0.15)",
      specular: "#FFFFFF",
      refract: "rgba(165, 243, 252, 0.35)",
    },
    neutral: {
      rim: "#94A3B8",
      glow: "rgba(148, 163, 184, 0.2)",
      ambient: "rgba(100, 116, 139, 0.1)",
      specular: "#FFFFFF",
      refract: "rgba(226, 232, 240, 0.3)",
    },
  }[tint];

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-floatY, floatY, -floatY] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Main Translucent Body Gradient */}
          <radialGradient
            id={`orbBody_${id}`}
            cx="40%"
            cy="35%"
            r="60%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="25%" stopColor={tintStyles.refract} stopOpacity="0.5" />
            <stop offset="65%" stopColor={tintStyles.ambient} stopOpacity="0.3" />
            <stop offset="90%" stopColor={tintStyles.rim} stopOpacity="0.45" />
            <stop offset="100%" stopColor={tintStyles.rim} stopOpacity="0.8" />
          </radialGradient>

          {/* Inner Caustic Refraction */}
          <radialGradient
            id={`orbCaustic_${id}`}
            cx="65%"
            cy="70%"
            r="35%"
            fx="65%"
            fy="70%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="50%" stopColor={tintStyles.refract} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Primary Sharp Specular Crescent */}
          <linearGradient id={`orbSpecular_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Outer Rim Light */}
          <linearGradient id={`orbRim_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="35%" stopColor={tintStyles.rim} stopOpacity="0.6" />
            <stop offset="70%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor={tintStyles.rim} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Outer Glass Sphere Body */}
        <circle cx="50" cy="50" r="48" fill={`url(#orbBody_${id})`} />

        {/* Rim Light Stroke */}
        <circle
          cx="50"
          cy="50"
          r="47.5"
          stroke={`url(#orbRim_${id})`}
          strokeWidth="1.5"
        />

        {/* Bottom-right internal caustic refraction reflection */}
        <ellipse
          cx="66"
          cy="68"
          rx="18"
          ry="12"
          transform="rotate(-20 66 68)"
          fill={`url(#orbCaustic_${id})`}
        />

        {/* Top-left Primary Specular Highlight */}
        <ellipse
          cx="34"
          cy="28"
          rx="14"
          ry="8"
          transform="rotate(-32 34 28)"
          fill={`url(#orbSpecular_${id})`}
        />

        {/* Secondary micro pinpoint star glint */}
        <circle cx="28" cy="22" r="3" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="44" cy="38" r="1.5" fill="#FFFFFF" fillOpacity="0.6" />
      </svg>
    </motion.div>
  );
}
