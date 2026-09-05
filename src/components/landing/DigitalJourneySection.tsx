"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const STAGES = [
  {
    step: "01",
    name: "Understand",
    sub: "Discovery & Operational Diagnosis",
    desc: "We immerse ourselves in your domain. We analyze your customer conversion funnels, operational bottlenecks, technology limitations, and commercial goals before writing a single line of code.",
    outputs: ["Stakeholder Alignment", "Workflow Audit", "System Architecture Blueprint"],
  },
  {
    step: "02",
    name: "Imagine",
    sub: "Strategic Direction & Interaction Design",
    desc: "We define the ideal digital state. We architect high-fidelity user journeys, fluid interaction models, and unified data schemas that solve real operational friction.",
    outputs: ["Interactive Design System", "API Contract Specifications", "Milestone Roadmap"],
  },
  {
    step: "03",
    name: "Build",
    sub: "Production Engineering & Hardening",
    desc: "We construct your digital platform with enterprise-grade TypeScript, robust Fastify/Next.js architectures, automated test suites, and sub-second query performance.",
    outputs: ["Modular Codebase", "Zero-Downtime Deployment", "Security & Pen-Testing"],
  },
  {
    step: "04",
    name: "Evolve",
    sub: "Compounding Growth & Scale",
    desc: "Launch is merely the inception. We monitor telemetry, observe real customer usage, optimize bottlenecks, and deploy evolutionary upgrades that keep your business ahead.",
    outputs: ["Live Performance Telemetry", "Feature Scaling", "Strategic Technical Partnership"],
  },
];

export default function DigitalJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              04 / The Digital Journey
            </span>
            <span className="w-12 h-px bg-slate-300 dark:bg-white/20" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]"
          >
            A Systematic Path From Idea to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Compounding Digital Scale.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Every engagement follows a deliberate, transparent architectural cadence that eliminates surprises and delivers durable software.
          </p>
        </div>

        {/* ── Continuous Geometric Timeline ── */}
        <div className="relative pl-6 sm:pl-12 lg:pl-16">
          {/* Static Background Rail Line */}
          <div className="absolute left-2 sm:left-4 top-4 bottom-8 w-px bg-slate-200 dark:bg-white/10" />

          {/* Dynamic Scroll Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-2 sm:left-4 top-4 bottom-8 w-px bg-blue-600 dark:bg-blue-500 origin-top shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          />

          {/* Stages */}
          <div className="space-y-16 sm:space-y-24">
            {STAGES.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-16 group"
              >
                {/* Milestone Node on Line */}
                <div className="absolute -left-6 sm:-left-12 lg:-left-16 top-1 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white dark:border-[#070B12] bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#070B12]" />
                  </div>
                </div>

                {/* Left: Step Index & Title */}
                <div className="lg:w-1/3">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                    Stage {s.step}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white tracking-tight mt-1">
                    {s.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                    {s.sub}
                  </p>
                </div>

                {/* Right: Narrative & Deliverables */}
                <div className="lg:w-2/3 space-y-4">
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {s.outputs.map((out, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-xs font-mono text-slate-600 dark:text-slate-300"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
