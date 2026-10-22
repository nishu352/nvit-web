"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Globe,
  Code2,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Wrench,
  Headphones,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import LiquidButton from "@/components/ui/LiquidButton";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";
import { LiquidRibbon } from "@/components/ui/LiquidRibbon";

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

  const cardY = useTransform(smoothProgress, [0, 1], [0, 40]);

  const VALUE_PROPS = [
    { label: "Custom Solutions", icon: Layers },
    { label: "Reliable Engineering", icon: ShieldCheck },
    { label: "Practical Tools", icon: Wrench },
    { label: "Long-Term Support", icon: Headphones },
  ];

  const CAPABILITY_PILLS = [
    { name: "Web Applications", href: "/services/web-application-development", icon: Globe },
    { name: "Custom Software", href: "/services/web-application-development/custom-web-app-development", icon: Code2 },
    { name: "API & Integrations", href: "/services/backend-development", icon: Database },
    { name: "Automation & AI", href: "/services/business-automation", icon: Cpu },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* ── Ambient Liquid Atmosphere & Vector Ribbons ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Cool Radial Lighting */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent dark:from-blue-950/20 dark:via-transparent dark:to-transparent blur-3xl opacity-80" />

        {/* Dynamic Sweeping Liquid Ribbon (Right Side behind Hero Graphic) */}
        <LiquidRibbon
          variant="hero"
          className="right-[-120px] sm:right-[-40px] top-[10%] w-[600px] sm:w-[780px] lg:w-[920px] h-[550px] sm:h-[700px]"
        />

        {/* Ambient 3D Glass Orbs positioned around the hero */}
        <div className="absolute top-[18%] right-[12%] sm:right-[16%] hidden sm:block">
          <LiquidGlassOrb size={95} tint="amber" delay={0.5} floatY={14} />
        </div>
        <div className="absolute top-[8%] right-[32%] sm:right-[38%] hidden lg:block">
          <LiquidGlassOrb size={64} tint="blue" delay={1.2} floatY={10} />
        </div>
        <div className="absolute bottom-[20%] right-[6%] hidden sm:block">
          <LiquidGlassOrb size={130} tint="cyan" delay={0.2} floatY={16} />
        </div>
        <div className="absolute bottom-[10%] right-[38%] hidden lg:block">
          <LiquidGlassOrb size={50} tint="amber" delay={1.8} floatY={8} />
        </div>
      </div>

      {/* ── Main Two-Column Composition ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange-200/80 dark:border-orange-500/20 bg-orange-50/60 dark:bg-orange-950/25 text-xs font-mono font-semibold text-orange-600 dark:text-orange-400 mb-6 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
              <span className="tracking-widest uppercase">Digital Engineering Studio</span>
            </motion.div>

            {/* Primary Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-6xl lg:text-[4.75rem] font-heading font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white leading-[1.06] text-balance"
            >
              We Build Digital <br className="hidden sm:inline" />
              Products That <br className="hidden sm:inline" />
              Move Businesses <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-blue-500">Forward.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              From business websites and custom software to backend systems and intelligent automation, we help turn complex ideas into useful digital products.
            </motion.p>

            {/* Dual Liquid Glass CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <LiquidButton href="/contact" variant="primary" size="lg">
                Discuss Your Project
              </LiquidButton>

              <LiquidButton href="/projects" variant="secondary" size="lg">
                Explore Our Work
              </LiquidButton>
            </motion.div>

            {/* Micro Value Propositions Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10 w-full grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              {VALUE_PROPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Icon className="w-3 h-3" />
                    </span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Prominent Liquid Glass Architecture Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Liquid Orbs Framed directly around the Card */}
            <div className="absolute -top-10 -right-4 sm:-right-8 z-20">
              <LiquidGlassOrb size={84} tint="blue" delay={0.3} floatY={12} />
            </div>
            <div className="absolute -bottom-8 -left-6 z-20">
              <LiquidGlassOrb size={100} tint="amber" delay={0.8} floatY={14} />
            </div>
            <div className="absolute top-1/2 -right-12 z-0 hidden sm:block">
              <LiquidGlassOrb size={54} tint="cyan" delay={1.5} floatY={8} />
            </div>

            {/* The Main Floating Frosted Glass Panel */}
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-[32px] p-6 sm:p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.08),0_4px_16px_rgba(15,23,42,0.02)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
            >
              {/* Header Comment & Code Metaphor */}
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-6 border-b border-slate-200/60 dark:border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-slate-500">// Building</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>// Scalable</div>
                <div className="text-slate-700 dark:text-slate-200 font-semibold">// Digital Products</div>
              </div>

              {/* 4 Interactive Capability Pills */}
              <div className="space-y-3">
                {CAPABILITY_PILLS.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <Link
                      key={cap.name}
                      href={cap.href}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 hover:border-blue-500/50 hover:bg-white dark:hover:bg-white/10 transition-all duration-200 shadow-sm active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cap.name}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Tagline Capsule */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">&gt;</span>
                  <span>Ideas &rarr; Products &rarr; Real Impact</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
