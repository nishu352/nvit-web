"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Layers, ShieldCheck, Sparkles, Mail, Headphones } from "lucide-react";
import LiquidButton from "@/components/ui/LiquidButton";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";
import { LiquidRibbon } from "@/components/ui/LiquidRibbon";

export default function FinalCtaSection() {
  const BADGES = [
    { label: "Scalable Solutions", icon: Layers },
    { label: "Reliable Engineering", icon: ShieldCheck },
    { label: "Long-Term Partnership", icon: Headphones },
  ];

  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* ── Flowing Liquid Glass Ribbon & Floating Orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-gradient-to-r from-blue-100/30 via-orange-100/20 to-blue-50/20 dark:from-blue-950/25 dark:via-orange-950/15 dark:to-transparent blur-3xl opacity-75" />

        {/* The Sweeping Liquid Ribbon across the bottom */}
        <LiquidRibbon
          variant="cta"
          className="bottom-0 left-0 right-0 w-full h-[400px] sm:h-[480px]"
        />

        {/* Ambient 3D Glass Orbs */}
        <div className="absolute top-12 left-[10%] hidden sm:block">
          <LiquidGlassOrb size={75} tint="cyan" delay={0.3} floatY={10} />
        </div>
        <div className="absolute top-16 right-[14%] hidden sm:block">
          <LiquidGlassOrb size={85} tint="amber" delay={0.9} floatY={12} />
        </div>
        <div className="absolute bottom-16 right-[8%] hidden lg:block">
          <LiquidGlassOrb size={120} tint="blue" delay={1.4} floatY={15} />
        </div>
        <div className="absolute bottom-20 left-[16%] hidden lg:block">
          <LiquidGlassOrb size={60} tint="amber" delay={0.6} floatY={8} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          <span>LET'S BUILD TOGETHER</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.035em] leading-[1.08] text-balance"
        >
          Ready to Build Your <br />
          Next{" "}
          <span className="text-blue-600 dark:text-blue-500">
            Digital Product?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
        >
          From performance-driven websites to complex software systems and automation, we're here to turn your ideas into reality.
        </motion.p>

        {/* Dual Liquid Glass CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <LiquidButton href="/contact" variant="primary" size="lg">
            Discuss Your Project
          </LiquidButton>

          <LiquidButton href="/projects" variant="secondary" size="lg">
            Explore Our Work
          </LiquidButton>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Icon className="w-3 h-3" />
                </span>
                <span>{badge.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
