"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export default function DigitalGapSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Scroll interpolation for the bridging motion
  const bridgeProgress = useTransform(smoothProgress, [0.15, 0.75], [0, 1]);
  const leftOpacity = useTransform(smoothProgress, [0.1, 0.45], [1, 0.4]);
  const rightOpacity = useTransform(smoothProgress, [0.4, 0.8], [0.4, 1]);
  const gapGlow = useTransform(smoothProgress, [0.2, 0.6, 0.9], [0.2, 1, 0.5]);

  const TRANSITIONS = [
    {
      index: "01",
      fragmentTitle: "Disconnected Operations",
      fragmentDesc: "Manual handoffs, isolated spreadsheets, and redundant administrative bottlenecks.",
      unifiedTitle: "Unified Digital Platform",
      unifiedDesc: "Custom internal software and central command consoles that unite team workflows in real time.",
    },
    {
      index: "02",
      fragmentTitle: "Weak Digital Presence",
      fragmentDesc: "Outdated interfaces that fail to communicate the true caliber and trust of your business.",
      unifiedTitle: "Strong Digital Presence",
      unifiedDesc: "Architectural web platforms with sub-second page loads and authoritative typography.",
    },
    {
      index: "03",
      fragmentTitle: "Isolated Channels",
      fragmentDesc: "Customer inquiries, leads, and orders lost between disparate messaging apps and emails.",
      unifiedTitle: "Connected Systems",
      unifiedDesc: "Autonomous API pipelines that automatically capture, validate, and route data 24/7.",
    },
    {
      index: "04",
      fragmentTitle: "Growth Limitations",
      fragmentDesc: "Scaling demands linear hiring and increases operational failure points.",
      unifiedTitle: "Scalable Digital Growth",
      unifiedDesc: "Cloud architecture designed for elastic scale — absorbing increased load without proportional cost or operational complexity.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="digital-gap"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              02 / The Signature Transition
            </span>
            <span className="w-12 h-px bg-slate-300 dark:bg-white/20" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]"
          >
            The Digital Gap: Where Businesses Stall or{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Transform.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Every traditional business begins fragmented—running on disconnected tools, invisible authority, and manual limits. The intentional diagonal gap represents the transition into connected digital systems.
          </p>
        </div>

        {/* ── Signature Visual Canvas: Fragmented → Diagonal Gap → Unified ── */}
        <div className="relative mb-24 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#070B12]/60 overflow-hidden">
          {/* Subtle Background Coordinate Grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-11 gap-8 items-center">
            <motion.div
              style={{ opacity: leftOpacity }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-xs font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
                  Before — Fragmented State
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRANSITIONS.map((item, idx) => (
                  <div
                    key={item.index}
                    className={`p-4 rounded-xl border border-dashed border-slate-200 dark:border-white/[0.06] bg-slate-50/30 dark:bg-white/[0.01] ${
                      idx % 2 === 1 ? "mt-3" : ""
                    }`}
                  >
                    <h4 className="text-sm font-heading font-medium text-slate-500 dark:text-slate-500 mb-1">
                      {item.fragmentTitle}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
                      {item.fragmentDesc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center Zone: The Diagonal Gap (The Transcendent Axis) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-6 lg:py-0 relative">
              <div className="relative h-48 lg:h-72 w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 100 240"
                  className="w-full h-full object-contain overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Diagonal Axis Reference Line */}
                  <line
                    x1="20"
                    y1="220"
                    x2="80"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    className="text-slate-300 dark:text-slate-700"
                  />

                  {/* Dynamic Bridging Line across the Gap */}
                  <motion.path
                    d="M 20 220 L 80 20"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: bridgeProgress }}
                  />

                  {/* Active Traveling Pulse along the Diagonal Gap */}
                  <motion.circle
                    cx="50"
                    cy="120"
                    r="5"
                    fill="#2563EB"
                    style={{ opacity: gapGlow }}
                  />
                  <circle cx="50" cy="120" r="12" stroke="#2563EB" strokeWidth="0.75" className="opacity-30" />
                </svg>

                {/* Gap Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--bg-base)] px-2 py-0.5 rounded border border-blue-500/30 text-[9px] font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  THE GAP
                </div>
              </div>
            </div>

            {/* Right Zone: Digital Business (Unified) */}
            <motion.div
              style={{ opacity: rightOpacity }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500" />
                <span className="text-xs font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 font-semibold">
                  Digital Architecture // Unified State
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRANSITIONS.map((item) => (
                  <div
                    key={item.index}
                    className="p-4 rounded-xl border border-blue-500/30 dark:border-blue-500/20 bg-white dark:bg-slate-900/60 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <h4 className="text-sm font-heading font-semibold text-slate-950 dark:text-white">
                        {item.unifiedTitle}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.unifiedDesc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Editorial Transition Ledger ── */}
        <div className="border-t border-slate-200/60 dark:border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRANSITIONS.map((t) => (
              <div key={t.index} className="space-y-3">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                  [{t.index}]
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 line-through">
                  {t.fragmentTitle}
                </div>
                <div className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {t.unifiedTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {t.unifiedDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
