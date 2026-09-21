"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck, Cpu, Database, GitBranch } from "lucide-react";

const PILLARS = [
  {
    icon: GitBranch,
    title: "Decoupled Architecture & Edge Distribution",
    description:
      "Client interfaces live on distributed edge nodes for instant worldwide page rendering, while microservices scale independently behind dedicated application gateways.",
    spec: "Next.js Edge • Fastify Microservices",
  },
  {
    icon: Database,
    title: "Relational Integrity & End-to-End Type Safety",
    description:
      "Every data mutation passes through strict schema validation and normalized database constraints. We eliminate silent runtime failures before code ever reaches production.",
    spec: "TypeScript • PostgreSQL • Prisma Schema",
  },
  {
    icon: Cpu,
    title: "High-Throughput Indexing & Query Optimisation",
    description:
      "From database trigram indexes (pg_trgm) to in-memory caching and debounced network calls, every query is engineered for minimum compute cost and rapid user response.",
  },
  {
    icon: ShieldCheck,
    title: "Production Observability & Full Codebase Ownership",
    description:
      "Containerised deployments, structured audit logs, and clean modular architecture. Your codebase is documented, maintainable, and never locked inside proprietary vendor systems.",
  },
];

export default function TechnicalCredibilitySection() {
  return (
    <section
      id="technical-credibility"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              06 / Technical Credibility
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
            Serious Engineering.{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Uncompromising Standards.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            We engineer software designed to outlast short-term tech trends. Every platform is architected for long-term maintainability, deterministic performance, and enterprise-grade resilience.
          </p>
        </div>

        {/* ── 4 Restrained Engineering Pillars (Architectural Grid, Not Cards) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 border-t border-slate-200/60 dark:border-white/10 pt-16">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-950 dark:text-white tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Deeper Technical Guides Link */}
        <div className="mt-20 pt-8 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            DEEP ARCHITECTURAL DOCUMENTATION AVAILABLE
          </span>
          <Link
            href="/resources/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <span>Read Engineering Guides &amp; Architecture Specs</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
