"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/providers/MotionProvider";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Pull multiplier (0.1 to 0.5)
  threshold?: number; // Pixel activation radius
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.28,
  threshold = 45,
  className = "",
}: MagneticProps) {
  const { reducedMotion, isTouch } = useMotionConfig();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < threshold) {
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (reducedMotion || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 24,
        mass: 0.8,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
