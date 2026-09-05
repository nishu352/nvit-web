"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { TranscendentLogoIcon } from "@/components/brand/TranscendentLogo";

export default function FinalCtaSection() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/60 dark:from-[#060A10] dark:via-[#090E17] dark:to-[#04070D]">
      {/* Background Architectural Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <TranscendentLogoIcon size={640} className="w-full h-full object-contain" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold block mb-6">
          06 / The Invitation
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.035em] leading-[1.1] text-balance"
        >
          Your Next Chapter Is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500">
            Digital
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
        >
          Tell us where your business is today. Let's explore where technology can take it next.
        </motion.p>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold transition-all duration-200 shadow-xl shadow-blue-500/15 active:scale-[0.98] group"
          >
            <span>Let's Build Your Digital Future</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Direct Contact Links */}
        <div className="mt-14 pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
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
            <span>Strict Confidentiality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
