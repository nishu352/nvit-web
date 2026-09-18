"use client";

import React from "react";
import { motion } from "motion/react";

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative py-36 sm:py-52 lg:py-64 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden flex items-center justify-center bg-[var(--bg-base)] transition-colors duration-300"
    >
      {/* A single subtle hairline geometric axis */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[120vw] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent rotate-[-12deg]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold block mb-8">
          07 / Philosophy
        </span>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.035em] leading-[1.15] text-balance"
        >
          Technology Should Feel Simple.
          <br />
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            The Possibilities Should Feel Limitless.
          </span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-12 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500"
        >
          NVIT.SPACE Engineering Principles
        </motion.p>
      </div>
    </section>
  );
}
