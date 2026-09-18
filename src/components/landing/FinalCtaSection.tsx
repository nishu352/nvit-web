"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { TranscendentLogoIcon } from "@/components/brand/TranscendentLogo";

export default function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="relative py-32 sm:py-44 lg:py-52 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      {/* ── Converging Geometric Loop Canvas (Network -> N) ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30 dark:opacity-40">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full max-w-4xl object-contain"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Converging Geometric Vectors */}
          <line x1="80" y1="80" x2="360" y2="240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" className="text-slate-300 dark:text-slate-700" />
          <line x1="720" y1="80" x2="440" y2="240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" className="text-slate-300 dark:text-slate-700" />
          <line x1="80" y1="520" x2="360" y2="360" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" className="text-slate-300 dark:text-slate-700" />
          <line x1="720" y1="520" x2="440" y2="360" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 5" className="text-slate-300 dark:text-slate-700" />

          {/* Central Transcendent N Framework Target */}
          {/* Left Strut */}
          <path d="M360 220 V380" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />
          {/* Diagonal Strut across gap */}
          <path d="M360 220 L440 380" stroke="#2563EB" strokeWidth="2.5" />
          {/* Right Strut with intentional gap */}
          <path d="M440 220 V310" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />
          {/* Gap Indicator */}
          <line x1="440" y1="320" x2="440" y2="380" stroke="#2563EB" strokeWidth="1" strokeDasharray="2 3" />
          {/* Accent Node */}
          <circle cx="440" cy="220" r="4.5" fill="#2563EB" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Converged Brand Mark Watermark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#070B12] shadow-sm">
            <TranscendentLogoIcon size={40} />
          </div>
        </motion.div>

        <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold block mb-4">
          08 / The Next Step
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.035em] leading-[1.08] text-balance"
        >
          Your Next Chapter Is{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Digital.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
        >
          Tell us where your business is today. Let's design and engineer the digital architecture that takes it forward.
        </motion.p>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-base font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] group"
          >
            <span>Let's Build Your Digital Future</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Studio Confidentiality and Contact Direct */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link
            href="mailto:info@nvit.space"
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>info@nvit.space</span>
          </Link>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Strict Client Confidentiality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
