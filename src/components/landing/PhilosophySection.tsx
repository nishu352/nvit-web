"use client";

import React from "react";
import { motion } from "motion/react";

export default function PhilosophySection() {
  return (
    <section className="relative py-32 sm:py-48 lg:py-56 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden flex items-center justify-center bg-white dark:bg-[#060A10]">
      {/* Restrained Architectural Grid Center Node */}
      <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 flex items-center justify-center">
        <div className="w-px h-full bg-slate-400 dark:bg-slate-600" />
        <div className="h-px w-full bg-slate-400 dark:bg-slate-600 absolute" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold block mb-8">
          05 / Our Philosophy
        </span>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.14] text-balance"
        >
          “Technology Should Feel{" "}
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">
            Simple
          </span>
          .<br className="hidden sm:inline" />
          {" "}The Possibilities Should Feel{" "}
          <span className="italic font-serif font-light text-slate-500 dark:text-slate-400">
            Limitless
          </span>
          .”
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
        >
          NVIT.SPACE Engineering Principles
        </motion.p>
      </div>
    </section>
  );
}
