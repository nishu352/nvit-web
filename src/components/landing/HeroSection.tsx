"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yParallax = useTransform(smoothProgress, [0, 1], [0, 90]);
  const opacityParallax = useTransform(smoothProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      {/* ── Architectural Construction Canvas (Transcendent Gap Geometry) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Subtle Architectural Coordinate Grid */}
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Soft Radial Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[var(--bg-base)]/80 to-[var(--bg-base)]" />

        {/* Interactive Transcendent Gap Geometric Framework */}
        <motion.div
          style={{ y: yParallax, opacity: opacityParallax }}
          className="relative w-full max-w-5xl h-[520px] sm:h-[640px] flex items-center justify-center opacity-70 dark:opacity-85"
        >
          <svg
            viewBox="0 0 1000 640"
            className="w-full h-full object-contain"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroAccentGrad" x1="420" y1="160" x2="580" y2="480" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>

            {/* Architectural Baseline Axis Rays */}
            <line x1="80" y1="160" x2="920" y2="160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-slate-300 dark:text-slate-800" />
            <line x1="80" y1="480" x2="920" y2="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-slate-300 dark:text-slate-800" />
            <line x1="420" y1="80" x2="420" y2="560" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-slate-300 dark:text-slate-800" />
            <line x1="580" y1="80" x2="580" y2="560" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-slate-300 dark:text-slate-800" />

            {/* Diagonal Construction Guideline (The Transcendent Angle) */}
            <line
              x1="260"
              y1="40"
              x2="740"
              y2="600"
              stroke="#2563EB"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              className="opacity-40 dark:opacity-50"
            />

            {/* 1. Authentic Left Strut */}
            <path
              d="M420 160 V480"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-slate-800 dark:text-slate-300 transition-colors"
            />

            {/* 2. Diagonal Strut — The Bridge Across the Gap */}
            <path
              d="M420 160 L580 480"
              stroke="url(#heroAccentGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* 3. Authentic Right Strut (Terminates early leaving intentional diagonal gap) */}
            <path
              d="M580 160 V330"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-slate-800 dark:text-slate-300 transition-colors"
            />

            {/* 4. The Intentional Gap Marker Line */}
            <line
              x1="580"
              y1="345"
              x2="580"
              y2="480"
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              className="opacity-60"
            />

            {/* 5. Primary Connection Node (The Digital Destination) */}
            <circle cx="580" cy="160" r="6" fill="#2563EB" />
            <circle cx="580" cy="160" r="14" stroke="#2563EB" strokeWidth="0.75" className="opacity-40 animate-ping" />

            {/* Complementary Structural Intersections */}
            <circle cx="420" cy="160" r="3" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
            <circle cx="420" cy="480" r="3" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
            <circle cx="580" cy="480" r="3" fill="#2563EB" className="opacity-80" />
            <circle cx="580" cy="330" r="3.5" fill="#2563EB" />


          </svg>
        </motion.div>
      </div>

      {/* ── Main Editorial Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center my-auto">
        {/* Subtle Architectural Category Index */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] mb-8 text-[11px] font-mono tracking-widest uppercase text-slate-600 dark:text-slate-400 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
          <span>Digital Architecture &amp; Technology Studio</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-heading font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white leading-[1.07] max-w-4xl text-balance"
        >
          Take Your Business Into The{" "}
          <span className="text-slate-950 dark:text-white relative inline-block">
            Digital World.
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600/40 dark:bg-blue-500/40" />
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed text-balance"
        >
          We design and build digital experiences, systems, and technology that help businesses move forward.
        </motion.p>

        {/* Primary and Secondary Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-base font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] group"
          >
            <span>Start Your Digital Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#what-nvit-does"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-transparent hover:bg-slate-100/50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-base font-medium transition-all duration-200"
          >
            <span>Explore What We Do</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </Link>
        </motion.div>
      </div>

      {/* ── Subdued Bottom Anchor ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 flex items-center justify-center text-xs font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200/50 dark:border-white/5">
        <span className="tracking-widest uppercase">NVIT.SPACE · Digital Architecture Studio</span>
      </div>
    </section>
  );
}
