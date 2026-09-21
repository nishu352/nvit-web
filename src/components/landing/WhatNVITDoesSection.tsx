"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

interface JourneyStage {
  step: string;
  name: string;
  tagline: string;
  description: string;
  milestones: string[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: "01",
    name: "Understand",
    tagline: "Operational Diagnosis & Domain Immersion",
    description:
      "We dissect existing workflows, user conversion funnels, data bottlenecks, and commercial goals before writing a single line of code.",
    milestones: ["Workflow Audit", "Data Architecture Blueprint", "Stakeholder Alignment"],
  },
  {
    step: "02",
    name: "Imagine",
    tagline: "Interaction Systems & Schema Design",
    description:
      "We architect high-fidelity user journeys, component design systems, and resilient API contracts tailored to human behavior.",
    milestones: ["Interactive Prototype", "API Contract Spec", "Information Architecture"],
  },
  {
    step: "03",
    name: "Build",
    tagline: "Full-Stack Production Engineering",
    description:
      "We construct scalable systems with strict typed contracts, sub-50ms query optimization, automated tests, and resilient edge delivery.",
    milestones: ["Type-Safe Codebase", "Optimized Data Queries", "Zero-Downtime CI/CD"],
  },
  {
    step: "04",
    name: "Evolve",
    tagline: "Continuous Growth & Adaptive Scale",
    description:
      "Launch is day one. We monitor telemetry, optimize performance under real load, and scale platform capabilities as your business expands.",
    milestones: ["Real-Time Telemetry", "Performance Hardening", "Architectural Partnership"],
  },
];

export default function WhatNVITDoesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Calculate dynamic line progress for the path
  const pathWidth = useTransform(smoothProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="what-nvit-does"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              03 / What NVIT Does
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
            We Turn Business Ideas Into{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Digital Experiences.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Every engagement follows a single connected architectural path. We do not jump into code blindly; we systematically move from foundational understanding to compounding digital scale.
          </p>
        </div>

        {/* ── Connected Horizontal Journey Path (Desktop) / Vertical (Mobile) ── */}
        <div className="relative">
          {/* Desktop Horizontal Conduit Line */}
          <div className="hidden lg:block relative mb-16">
            <div className="h-px w-full bg-slate-200 dark:bg-white/10" />
            <motion.div
              style={{ width: pathWidth }}
              className="absolute top-0 left-0 h-px bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
            />
          </div>

          {/* Connected Stages */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {JOURNEY_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStageIndex(idx)}
                className="relative flex flex-col justify-between group pt-2 lg:pt-0"
              >
                {/* Node Beacon on Path */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070B12] flex items-center justify-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stage.step}
                  </div>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-white/10 lg:hidden" />
                </div>

                {/* Stage Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stage.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    {stage.tagline}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Quiet Technical Milestones */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-1.5">
                  {stage.milestones.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-600/60 dark:bg-blue-400/60 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Architectural Cadence Summary ── */}
        <div className="mt-20 pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 dark:text-slate-500">Unbroken path from strategy to production delivery.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
