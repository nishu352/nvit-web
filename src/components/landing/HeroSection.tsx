"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yGeometry = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityGeometry = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ── Geometric Background Environment (Transcendent Gap Grid & Axis) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Architectural Substrate Grid */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Soft Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-base)]" />

        {/* Diagonal Transcendent Axis Lines */}
        <motion.div
          style={{ y: yGeometry, opacity: opacityGeometry }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full max-w-7xl object-contain opacity-25 dark:opacity-20 stroke-slate-400 dark:stroke-slate-600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Perspective Construction Rays */}
            <line x1="600" y1="400" x2="100" y2="100" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="600" y1="400" x2="1100" y2="100" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="600" y1="400" x2="200" y2="750" strokeWidth="0.75" strokeDasharray="4 6" />
            <line x1="600" y1="400" x2="1000" y2="750" strokeWidth="0.75" strokeDasharray="4 6" />

            {/* Central Transcendent Geometric Framework */}
            <path
              d="M520 280 L520 520"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* The Diagonal Strut crossing with intentional gap */}
            <path
              d="M520 280 L680 520"
              stroke="#2563EB"
              strokeWidth="2"
            />
            {/* Right Strut terminating early creating the Gap */}
            <path
              d="M680 280 L680 430"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* The Gap Indicator Line */}
            <line
              x1="680"
              y1="450"
              x2="680"
              y2="520"
              stroke="#2563EB"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="opacity-60"
            />

            {/* Traveling Data Node */}
            <circle cx="680" cy="280" r="4.5" fill="#2563EB" />
          </svg>
        </motion.div>
      </div>

      {/* ── Editorial Content Container ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle Category Pill / Monospace Cue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-white/5 mb-8 text-[11px] font-mono tracking-widest uppercase text-slate-600 dark:text-slate-300 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span>Digital Engineering &amp; Strategic Transformation</span>
        </motion.div>

        {/* Primary Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white leading-[1.08] max-w-4xl text-balance"
        >
          Take Your Business Into the{" "}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
              Digital World
            </span>
            {/* Hairline geometric underline */}
            <span className="absolute left-0 bottom-1 w-full h-[2px] bg-blue-600/30 dark:bg-blue-400/30 rounded-full" />
          </span>
          .
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed text-balance"
        >
          We design and build digital experiences, systems, and technology that help businesses move forward.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold transition-all duration-200 shadow-md hover:shadow-blue-500/20 active:scale-[0.98] group"
          >
            <span>Start Your Digital Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#what-we-do"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white/60 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-base font-medium transition-all duration-200 backdrop-blur-sm"
          >
            <span>Explore What We Do</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Link>
        </motion.div>

        {/* Subtle Bottom Architectural Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-20 pt-8 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 w-full max-w-4xl text-left"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
              100%
            </div>
            <div className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">
              Custom Engineering
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
              Enterprise
            </div>
            <div className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">
              Architecture Grade
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
              Connected
            </div>
            <div className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">
              Digital Ecosystem
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
              Zero
            </div>
            <div className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">
              Throwaway Code
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
