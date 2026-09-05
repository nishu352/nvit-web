"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function VisionSection() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden">
      {/* Background Architectural Mark Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-5 dark:opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-current" fill="none">
          <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="80" y1="0" x2="80" y2="100" strokeWidth="0.5" />
          <circle cx="80" cy="16" r="6" fill="#2563EB" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Index & Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
            01 / Vision &amp; Purpose
          </span>
          <span className="w-12 h-px bg-slate-300 dark:bg-white/20" />
        </div>

        {/* Large Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.1] max-w-4xl text-balance"
        >
          Every Business Deserves a Place in the{" "}
          <span className="text-slate-400 dark:text-slate-500 font-normal">
            Digital Future.
          </span>
        </motion.h2>

        {/* Spacious Typographic Manifesto */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xl sm:text-2xl font-heading font-medium text-slate-900 dark:text-slate-100 leading-snug">
              Most businesses do not fail from a lack of ambition. They stall at the edge of the digital divide—struggling with disconnected tools, sluggish legacy workflows, and products that fail to communicate value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            <p>
              At NVIT, we reject the generic agency model. We do not deliver superficial templates or bloated retainers. We engineer durable digital infrastructure: websites that command authority, web applications that drive real operational revenue, and intelligent systems that multiply your human capacity.
            </p>
            <p>
              Our role is to eliminate the friction between your real-world business excellence and the immense reach of modern digital platforms.
            </p>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                <span>Read our founding thesis and principles</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
