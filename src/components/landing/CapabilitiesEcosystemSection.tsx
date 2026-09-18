"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Layers, Cpu, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";
import { TranscendentLogoIcon } from "@/components/brand/TranscendentLogo";

type CapabilityKey = "presence" | "experiences" | "systems" | "growth";

interface Capability {
  id: CapabilityKey;
  position: "top" | "left" | "right" | "bottom";
  name: string;
  tagline: string;
  description: string;
  scope: string[];
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CAPABILITIES: Record<CapabilityKey, Capability> = {
  presence: {
    id: "presence",
    position: "top",
    name: "Digital Presence",
    tagline: "Establish Authority & Online Stature",
    description: "Websites, digital identity and platforms that establish authority online.",
    scope: [
      "Corporate web platforms & brand-aligned design systems",
      "Sub-second page performance & global edge distribution",
      "Semantic architecture, clean metadata & SEO dominance",
    ],
    link: "/services/website-development",
    icon: Globe,
  },
  experiences: {
    id: "experiences",
    position: "left",
    name: "Digital Experiences",
    tagline: "Ergonomics Centered on Human Behavior",
    description: "Interfaces and experiences designed around how people actually use them.",
    scope: [
      "Customer portals, web applications & client dashboards",
      "Fluid 60fps micro-interactions with responsive layout grids",
      "Zero-friction onboarding and authenticated self-service tools",
    ],
    link: "/services/web-application-development",
    icon: Layers,
  },
  systems: {
    id: "systems",
    position: "right",
    name: "Smart Systems",
    tagline: "Autonomous Orchestration & Data Pipes",
    description: "Connected software, automation and intelligent workflows.",
    scope: [
      "Enterprise REST & GraphQL API gateways with type safety",
      "Automated document validation, OCR pipelines & queue workers",
      "Multi-tenant data schemas with PostgreSQL relational integrity",
    ],
    link: "/services/business-automation",
    icon: Cpu,
  },
  growth: {
    id: "growth",
    position: "bottom",
    name: "Digital Growth",
    tagline: "Compounding Scale Without Architectural Debt",
    description: "Technology foundations designed to support long-term digital growth.",
    scope: [
      "Resilient cloud infrastructure with CI/CD deployment pipelines",
      "Real-time operational telemetry, error reporting & audit trails",
      "Sub-50ms indexed search and modular decoupled codebases",
    ],
    link: "/solutions",
    icon: TrendingUp,
  },
};

export default function CapabilitiesEcosystemSection() {
  const [activeCap, setActiveCap] = useState<CapabilityKey>("presence");

  const current = CAPABILITIES[activeCap];

  return (
    <section
      id="capabilities"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              04 / Capabilities &amp; Ecosystem
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
            A Connected Digital{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Ecosystem.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            NVIT does not deliver disconnected one-off assets. Every layer—from public presence to intelligent systems—functions as an interdependent architectural whole.
          </p>
        </div>

        {/* ── Desktop Architectural Cross-Topology (Hidden on Mobile) ── */}
        <div className="hidden lg:block relative my-12">
          {/* Outer Framework Grid Container */}
          <div className="relative max-w-4xl mx-auto h-[540px] flex items-center justify-center">
            {/* SVG Connecting Conduit Network */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 540"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Coordinate Axis */}
              <line x1="400" y1="40" x2="400" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" className="text-slate-200 dark:text-slate-800" />
              <line x1="60" y1="270" x2="740" y2="270" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" className="text-slate-200 dark:text-slate-800" />

              {/* Active Conduit Lines */}
              <line
                x1="400"
                y1="270"
                x2="400"
                y2="70"
                stroke={activeCap === "presence" ? "#2563EB" : "currentColor"}
                strokeWidth={activeCap === "presence" ? "2.5" : "1"}
                className={activeCap === "presence" ? "" : "text-slate-300 dark:text-slate-800"}
              />
              <line
                x1="400"
                y1="270"
                x2="100"
                y2="270"
                stroke={activeCap === "experiences" ? "#2563EB" : "currentColor"}
                strokeWidth={activeCap === "experiences" ? "2.5" : "1"}
                className={activeCap === "experiences" ? "" : "text-slate-300 dark:text-slate-800"}
              />
              <line
                x1="400"
                y1="270"
                x2="700"
                y2="270"
                stroke={activeCap === "systems" ? "#2563EB" : "currentColor"}
                strokeWidth={activeCap === "systems" ? "2.5" : "1"}
                className={activeCap === "systems" ? "" : "text-slate-300 dark:text-slate-800"}
              />
              <line
                x1="400"
                y1="270"
                x2="400"
                y2="470"
                stroke={activeCap === "growth" ? "#2563EB" : "currentColor"}
                strokeWidth={activeCap === "growth" ? "2.5" : "1"}
                className={activeCap === "growth" ? "" : "text-slate-300 dark:text-slate-800"}
              />
            </svg>

            {/* Central Nexus: NVIT.SPACE */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080C14] shadow-md">
              <TranscendentLogoIcon size={44} />
              <span className="text-xs font-heading font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
                NVIT.SPACE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                ARCHITECTURAL CORE
              </span>
            </div>

            {/* 01 TOP NODE: Digital Presence */}
            <button
              type="button"
              onMouseEnter={() => setActiveCap("presence")}
              onClick={() => setActiveCap("presence")}
              className={`absolute top-2 left-1/2 -translate-x-1/2 z-20 px-6 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeCap === "presence"
                  ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-md scale-105"
                  : "border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className={`w-4 h-4 ${activeCap === "presence" ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                <div>
                  <h4 className="text-sm font-heading font-bold text-slate-950 dark:text-white">
                    Digital Presence
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Websites &amp; Platforms
                  </p>
                </div>
              </div>
            </button>

            {/* 02 LEFT NODE: Digital Experiences */}
            <button
              type="button"
              onMouseEnter={() => setActiveCap("experiences")}
              onClick={() => setActiveCap("experiences")}
              className={`absolute top-1/2 -translate-y-1/2 left-2 z-20 px-6 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer max-w-[240px] ${
                activeCap === "experiences"
                  ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-md scale-105"
                  : "border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className={`w-4 h-4 ${activeCap === "experiences" ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                <div>
                  <h4 className="text-sm font-heading font-bold text-slate-950 dark:text-white">
                    Digital Experiences
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Human Interaction &amp; SaaS
                  </p>
                </div>
              </div>
            </button>

            {/* 03 RIGHT NODE: Smart Systems */}
            <button
              type="button"
              onMouseEnter={() => setActiveCap("systems")}
              onClick={() => setActiveCap("systems")}
              className={`absolute top-1/2 -translate-y-1/2 right-2 z-20 px-6 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer max-w-[240px] ${
                activeCap === "systems"
                  ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-md scale-105"
                  : "border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Cpu className={`w-4 h-4 ${activeCap === "systems" ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                <div>
                  <h4 className="text-sm font-heading font-bold text-slate-950 dark:text-white">
                    Smart Systems
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    APIs &amp; Autonomous Workflows
                  </p>
                </div>
              </div>
            </button>

            {/* 04 BOTTOM NODE: Digital Growth */}
            <button
              type="button"
              onMouseEnter={() => setActiveCap("growth")}
              onClick={() => setActiveCap("growth")}
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 px-6 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeCap === "growth"
                  ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-md scale-105"
                  : "border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className={`w-4 h-4 ${activeCap === "growth" ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                <div>
                  <h4 className="text-sm font-heading font-bold text-slate-950 dark:text-white">
                    Digital Growth
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Compounding Scale &amp; Infra
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Ordered Ecosystem Progression (Shown on Mobile / Tablet) ── */}
        <div className="lg:hidden space-y-4 my-8">
          {(["presence", "experiences", "systems", "growth"] as CapabilityKey[]).map((key) => {
            const item = CAPABILITIES[key];
            const Icon = item.icon;
            const isSelected = activeCap === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCap(key)}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-300 dark:bg-white/20"}`} />
              </button>
            );
          })}
        </div>

        {/* ── Active Capability Architectural Detail Panel ── */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#070B12] p-6 sm:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                    Active Pillar // {current.name}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white tracking-tight">
                  {current.tagline}
                </h3>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {current.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={current.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                  >
                    <span>Explore {current.name} specifications</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:dark:border-white/5 lg:pl-8 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block">
                  Engineering Scope
                </span>
                {current.scope.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
