"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/providers/MotionProvider";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Max tilt degrees (clamped to 4 by default)
  sheen?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 3.5,
  sheen = true,
  ...rest
}: TiltCardProps) {
  const { reducedMotion, isTouch } = useMotionConfig();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized from -1 to 1
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    // Clamped 3D rotation
    setRotateX(-yPct * maxTilt);
    setRotateY(xPct * maxTilt);

    if (sheen) {
      setSheenPosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    if (sheen) {
      setSheenPosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  if (reducedMotion || isTouch) {
    return (
      <div className={`glass-card ${className}`} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
        mass: 0.8,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={`glass-card relative overflow-hidden transition-colors ${className}`}
      {...(rest as any)}
    >
      {/* Theme-Aware Cursor-Following Sheen */}
      {sheen && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: sheenPosition.opacity,
            background: `radial-gradient(400px circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(59,130,246,0.09), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
