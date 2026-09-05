"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "nvit_welcome_animation_last_seen";
const ONE_HOUR_MS = 60 * 60 * 1000;

interface WelcomeExperienceProps {
  onComplete?: () => void;
}

export default function WelcomeExperience({ onComplete }: WelcomeExperienceProps) {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldShow(false);
      return;
    }

    // 2. Frequency Check: localStorage 1-hour window
    try {
      const lastSeen = localStorage.getItem(STORAGE_KEY);
      if (lastSeen) {
        const lastSeenTime = parseInt(lastSeen, 10);
        if (!isNaN(lastSeenTime) && Date.now() - lastSeenTime < ONE_HOUR_MS) {
          setShouldShow(false);
          return;
        }
      }
    } catch (_) {
      // If localStorage is blocked, allow animation once
    }

    // Qualified to show
    setShouldShow(true);

    // Timeline Sequence (approx 4.8 seconds total)
    // Step 0 (0ms): Empty space
    // Step 1 (400ms): Geometric lines begin drawing N structure
    // Step 2 (1800ms): Connection points & gap react
    // Step 3 (2600ms): Light / data beam travels through structure
    // Step 4 (3500ms): NVIT.SPACE logotype reveals
    // Step 5 (4600ms): Smooth dissolve into homepage
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(() => setStep(3), 2600);
    const t4 = setTimeout(() => setStep(4), 3500);
    const t5 = setTimeout(() => {
      finish();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (_) {}
    setShouldShow(false);
    if (onComplete) onComplete();
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="nvit-welcome"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[9999] bg-[#05080E] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        role="dialog"
        aria-label="NVIT.SPACE Welcome Experience"
      >
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Diagonal Axis Reference Line (The Transcendent Angle) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="w-[200vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-35deg]" />
        </div>

        {/* Skip Action */}
        <button
          type="button"
          onClick={finish}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Skip intro and enter website"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Center Geometric Canvas */}
        <div className="relative flex flex-col items-center justify-center max-w-sm sm:max-w-md w-full px-6">
          {/* SVG Animated Transcendent Gap N Structure */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="welcomeBlue" x1="20" y1="15" x2="82" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Left Vertical Strut (Architectural Construction) */}
              <motion.path
                d="M18 18 C18 16.9 18.9 16 20 16 H38 C39.1 16 40 16.9 40 18 V82 C40 83.1 39.1 84 38 84 H20 C18.9 84 18 83.1 18 82 V18Z"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                fill={step >= 2 ? "#E2E8F0" : "transparent"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={step >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* 2. Diagonal Vector (Crosses The Digital Gap) */}
              <motion.path
                d="M20 16 H40 L82 84 H62 L20 30 V16Z"
                stroke="#3B82F6"
                strokeWidth="1.8"
                fill={step >= 2 ? "url(#welcomeBlue)" : "transparent"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={step >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* 3. Right Vertical Strut (Terminates at V54 to form intentional diagonal gap) */}
              <motion.path
                d="M60 16 H80 C81.1 16 82 16.9 82 18 V82 C82 83.1 81.1 84 80 84 H62 C60.9 84 60 83.1 60 82 V54 L60 16Z"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                fill={step >= 2 ? "#E2E8F0" : "transparent"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={step >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* 4. The Digital Node (Connection Point) */}
              <motion.circle
                cx="80"
                cy="16"
                r="5"
                fill="#3B82F6"
                initial={{ scale: 0, opacity: 0 }}
                animate={step >= 2 ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* 5. Light Pulse Traveling Through Structure */}
              {step >= 3 && (
                <motion.circle
                  r="3.5"
                  fill="#93C5FD"
                  filter="url(#subtleGlow)"
                  initial={{ cx: 20, cy: 16, opacity: 0 }}
                  animate={{
                    cx: [20, 40, 80, 80],
                    cy: [16, 30, 84, 16],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
            </svg>

            {/* Subtle Ambient Backlight */}
            <motion.div
              className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={step >= 2 ? { scale: 1.2, opacity: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
          </div>

          {/* Typography Reveal */}
          <div className="mt-8 text-center overflow-hidden">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={step >= 4 ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-heading tracking-tight"
            >
              <span className="font-bold text-white">NVIT</span>
              <span className="text-blue-500 font-bold">.</span>
              <span className="font-light text-slate-300 tracking-widest">SPACE</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={step >= 4 ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-400"
            >
              Take Your Business Into The Digital World
            </motion.p>
          </div>
        </div>

        {/* Bottom subtle progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.6, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
