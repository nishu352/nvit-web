"use client";

import React from "react";
import { motion } from "motion/react";
import { Monitor, FileText, Code2, Rocket, ArrowRight } from "lucide-react";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";

interface ProcessStep {
  step: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Understand",
    description: "We discuss your goals, challenges and requirements to understand the problem in depth.",
    icon: Monitor,
  },
  {
    step: "02",
    name: "Plan",
    description: "We define the solution, architecture and roadmap aligned with your business objectives.",
    icon: FileText,
  },
  {
    step: "03",
    name: "Build",
    description: "We design and engineer a robust, scalable and user-friendly solution.",
    icon: Code2,
  },
  {
    step: "04",
    name: "Deliver & Improve",
    description: "We test, deploy and continue to support and improve the solution over time.",
    icon: Rocket,
  },
];

export default function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* Restrained decorative liquid glass bubbles */}
      <div className="absolute top-12 left-[-20px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={95} tint="amber" delay={0.4} floatY={10} />
      </div>
      <div className="absolute bottom-6 right-[-25px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={110} tint="cyan" delay={1.1} floatY={12} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            <span>OUR PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]">
            How We{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Work.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            A clear and collaborative process to turn complex ideas into reliable digital products.
          </p>
        </div>

        {/* 4 Horizontal Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-6 sm:p-7 flex flex-col justify-between space-y-6 group min-h-[230px]"
              >
                <div>
                  {/* Top: Icon square and arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Step Number + Title */}
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mb-2">
                    <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                      {step.step}
                    </span>
                    <span>{step.name}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  <span>PHASE {step.step}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
