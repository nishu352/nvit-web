"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Globe,
  Layers,
  Cpu,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface Pillar {
  id: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  connections: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

const PILLARS: Pillar[] = [
  {
    id: "presence",
    index: "01",
    name: "Digital Presence",
    tagline: "Establish Authority & Market Trust",
    summary:
      "Your digital presence is the first lens through which clients, partners, and investors judge your competence. We design architectural web experiences that communicate prestige, speed, and undeniable credibility.",
    deliverables: [
      "Brand-aligned corporate web systems",
      "Sub-second load times & responsive fluid grids",
      "Clean semantic architecture & SEO dominance",
      "Executive storytelling & digital identity",
    ],
    connections: "Feeds verified traffic and inquiries directly into Digital Experiences and Smart Systems.",
    icon: Globe,
    link: "/services/website-development",
  },
  {
    id: "experiences",
    index: "02",
    name: "Digital Experiences",
    tagline: "Engage, Convert & Delight",
    summary:
      "Beyond presentation lies interaction. We build web applications, customer portals, and mobile experiences engineered with buttery-smooth 60fps micro-interactions, intuitive ergonomics, and zero friction.",
    deliverables: [
      "Custom SaaS platforms & client dashboards",
      "Cross-platform iOS & Android mobile apps",
      "Real-time interactive tools & calculators",
      "Design systems with reusable atomic tokens",
    ],
    connections: "Captures user intent and translates it into operational records within Smart Systems.",
    icon: Layers,
    link: "/services/web-application-development",
  },
  {
    id: "systems",
    index: "03",
    name: "Smart Systems",
    tagline: "Automate, Integrate & Accelerate",
    summary:
      "A great front-end requires a bulletproof nervous system. We connect your databases, internal spreadsheets, payment gateways, and partner APIs into autonomous pipelines that run effortlessly without manual intervention.",
    deliverables: [
      "Enterprise REST & GraphQL API gateways",
      "Automated document processing & validation",
      "Multi-tenant data architectures & cloud backends",
      "Intelligent AI workflows & background task queues",
    ],
    connections: "Provides the rock-solid operational backbone that fuels continuous Digital Growth.",
    icon: Cpu,
    link: "/services/business-automation",
  },
  {
    id: "growth",
    index: "04",
    name: "Digital Growth",
    tagline: "Scale Without Breaking",
    summary:
      "Software that cannot adapt becomes technical debt. We build on clean decoupled architectures that scale seamlessly as your business expands across new regions, markets, and product tiers.",
    deliverables: [
      "Scalable cloud infrastructure & CI/CD",
      "Real-time telemetry, analytics & audit trails",
      "Continuous performance optimization",
      "Enterprise security & bank-grade compliance",
    ],
    connections: "Reinvests operational insights back into refining your Digital Presence.",
    icon: TrendingUp,
    link: "/solutions",
  },
];

export default function WhatWeDoSection() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar>(PILLARS[0]);

  return (
    <section id="what-we-do" className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              03 / Connected Ecosystem
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
            We Turn Business Ideas Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Digital Experiences.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            We don't offer disconnected services. We construct a symbiotic digital ecosystem where every layer reinforces and amplifies your business momentum.
          </p>
        </div>

        {/* ── Interactive Ecosystem Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pillar Selector Column (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {PILLARS.map((p) => {
              const isSelected = p.id === selectedPillar.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPillar(p)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 shadow-md shadow-blue-500/5"
                      : "border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {p.index}
                        </span>
                        <h3
                          className={`text-base sm:text-lg font-heading font-bold ${
                            isSelected
                              ? "text-blue-900 dark:text-blue-100"
                              : "text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {p.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-2 h-2 rounded-full transition-transform ${
                      isSelected
                        ? "bg-blue-600 dark:bg-blue-400 scale-125"
                        : "bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Connected Architectural Deep-Dive (Right) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPillar.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md"
              >
                {/* Header Info */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                    Ecosystem Pillar {selectedPillar.index}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    STATUS: ACTIVE ARCHITECTURE
                  </span>
                </div>

                {/* Title & Narrative */}
                <h4 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white mt-6 tracking-tight">
                  {selectedPillar.name}
                </h4>

                <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedPillar.summary}
                </p>

                {/* Deliverables Specs */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
                  <h5 className="text-xs font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 font-semibold mb-4">
                    Core Capabilities &amp; Standards
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPillar.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inter-System Connection Highlight */}
                <div className="mt-8 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider shrink-0 mt-0.5">
                      Interlock:
                    </span>
                    <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
                      {selectedPillar.connections}
                    </p>
                  </div>
                </div>

                {/* Explore Pillar CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <Link
                    href={selectedPillar.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                  >
                    <span>Explore {selectedPillar.name} specifications</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-xs font-mono text-slate-400">
                    NVIT-{selectedPillar.id.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
