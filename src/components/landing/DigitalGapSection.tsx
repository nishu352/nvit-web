"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";

export default function DigitalGapSection() {
  const [activeTab, setActiveTab] = useState<"comparison" | "today" | "future">("comparison");

  const todayPoints = [
    {
      title: "Fragmented Operations",
      desc: "Manual handoffs, disconnected spreadsheets, and repetitive administrative bottlenecks that slow growth.",
    },
    {
      title: "Invisible Credibility",
      desc: "An outdated online presence that fails to represent the true caliber, scale, and trustworthiness of your business.",
    },
    {
      title: "Isolated Channels",
      desc: "Customer inquiries, sales leads, and communications lost between disparate emails, messages, and calls.",
    },
    {
      title: "Growth Constraints",
      desc: "Scaling requires hiring linearly rather than leveraging software to multiply output.",
    },
  ];

  const futurePoints = [
    {
      title: "Unified Digital Platforms",
      desc: "Custom web applications and internal tools that consolidate operations into a single real-time command center.",
    },
    {
      title: "Authoritative Digital Presence",
      desc: "Modern digital experiences built with precision typography, instant page loads, and unmatched visual excellence.",
    },
    {
      title: "Autonomous Workflows",
      desc: "Automated pipelines that ingest, validate, and process customer interactions 24/7 without manual intervention.",
    },
    {
      title: "Compounding Scale",
      desc: "A software foundation engineered to handle 10x or 100x transaction volume with zero drop in performance.",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-[#070B12]/80 border-t border-slate-200/60 dark:border-white/10 overflow-hidden">
      {/* Background Transcendent Diagonal Cutting Line */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 flex items-center justify-center">
        <div className="w-[160vw] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-[-22deg] transform" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
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
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.15]"
          >
            The World Is Moving.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Your Business Should Too.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            The space between where your business is today and where it can go is what we call The Digital Gap. Closing that gap is our core craft.
          </p>
        </div>

        {/* ── Visual Transition Architecture (Today → Gap → Future) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-stretch">
          {/* Left Column: Where Your Business Is Today */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                    Current Reality
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">01 / Friction</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
                Where Your Business Is Today
              </h3>

              <div className="space-y-4 mt-6">
                {todayPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                        [0{idx + 1}]
                      </span>
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-slate-800 dark:text-slate-200">
                          {pt.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 text-xs font-mono text-slate-500">
              STATUS: HIGH FRICTION • MANUAL CONSTRAINTS
            </div>
          </motion.div>

          {/* Center Column: The Transcendent Gap (The Diagonal Bridge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 flex flex-col items-center justify-center py-4 lg:py-0 relative"
          >
            {/* The Vertical / Diagonal Incision */}
            <div className="hidden lg:block w-px h-full bg-gradient-to-b from-slate-200 via-blue-500 to-slate-200 dark:from-white/10 dark:via-blue-500 dark:to-white/10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-blue-500/40 bg-white dark:bg-[#070B12] flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              </div>
            </div>

            {/* Mobile Horizontal Bridge */}
            <div className="lg:hidden flex items-center gap-3 py-4 w-full justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40">
                The Digital Gap
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
          </motion.div>

          {/* Right Column: Where Your Business Can Go */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 border border-blue-500/30 dark:border-blue-500/20 bg-gradient-to-b from-blue-50/40 via-white/80 to-white/90 dark:from-blue-950/20 dark:via-slate-900/60 dark:to-slate-900/40 backdrop-blur-md flex flex-col justify-between shadow-lg shadow-blue-500/5"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-blue-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                    NVIT Transformation
                  </span>
                </div>
                <span className="text-xs font-mono text-blue-500 dark:text-blue-400 font-semibold">02 / Scale</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Where Your Business Can Go
              </h3>

              <div className="space-y-4 mt-6">
                {futurePoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-blue-200/60 dark:border-blue-500/20 bg-white/80 dark:bg-slate-900/60 transition-all hover:border-blue-400 duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-slate-900 dark:text-white">
                          {pt.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-blue-100 dark:border-white/10 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              RESULT: ZERO REPEAT FRICTION • COMPOUNDING DIGITAL REACH
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
