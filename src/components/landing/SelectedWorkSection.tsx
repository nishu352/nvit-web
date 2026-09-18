"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";

interface CaseStudyItem {
  number: string;
  category: string;
  title: string;
  problem: string;
  engineered: string;
  result: string;
  technologies: string[];
  liveHref?: string;
  caseStudyHref: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    number: "01",
    category: "Fintech Search & Classification Engine",
    title: "Autocomplete Employer Categorization Engine",
    problem:
      "Lenders classify corporate employers into Category A, B, C, and D tiers to determine personal loan interest rates. Underwriters and loan officers struggled to match company names accurately due to typographical differences, corporate abbreviations, and fragmented multi-bank policy spreadsheets.",
    engineered:
      "NVIT architected a specialized high-speed categorization engine utilizing PostgreSQL trigram indexing (pg_trgm), normalized company alias tables, and an asynchronous Fastify API layer. Queries are debounced on the client side to minimize server strain.",
    result:
      "Sub-50ms autocomplete search latency across hundreds of thousands of registered corporate employer entities, with a unified view displaying partner bank policy tiers in real time.",
    technologies: ["PostgreSQL (pg_trgm)", "Fastify", "TypeScript", "Next.js"],
    liveHref: "/company-check",
    caseStudyHref: "/resources/case-studies/enterprise-company-category-checker",
  },
  {
    number: "02",
    category: "Full-Stack Lending Platform",
    title: "Multi-Tenant Loan Origination System",
    problem:
      "Lending distribution networks and direct selling agents operated across manual paper workflows, physical document drop-offs, and disjointed messaging threads, causing 7-to-10 day turnaround times and lead leakage.",
    engineered:
      "We engineered an end-to-end digital lending operating system combining a mobile-first Next.js borrower onboarding funnel, Document AI neural statement parsing for bank PDFs, and weighted round-robin lead distribution with instant webhook alerts.",
    result:
      "Transitioned a previously manual paper workflow into a paperless digital lending lifecycle with automated applicant pre-qualification and underwriter review consoles.",
    technologies: ["Next.js (App Router)", "Fastify", "PostgreSQL", "Prisma", "Document AI"],
    caseStudyHref: "/resources/case-studies/multi-tenant-loan-origination-system",
  },
  {
    number: "03",
    category: "Geospatial Data Engine",
    title: "Pan-India Pincode Routing & Serviceability Engine",
    problem:
      "Financial institutions lacked a unified, sub-second lookup system to verify whether branches and partner NBFCs serviced specific postal PIN codes across disparate geographical regions in India.",
    engineered:
      "NVIT built a high-speed geospatial indexing engine mapping 19,500+ postal PIN codes to state, district, and circle hubs, cross-referenced with institution-specific lending criteria.",
    result:
      "Zero-latency public lookup service returning positive/negative serviceability flags across tier-1 and tier-2 financial institutions with sub-10ms query execution.",
    technologies: ["Next.js", "Fastify", "PostgreSQL", "TypeScript"],
    liveHref: "/pincode-check",
    caseStudyHref: "/resources/case-studies/pan-india-pincode-eligibility-engine",
  },
];

export default function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              05 / Proof &amp; Selected Work
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
            Engineering Proof.{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Not Capability Claims.
            </span>
          </motion.h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Real production software engineered for high throughput, strict relational integrity, and real business operations.
          </p>
        </div>

        {/* ── Editorial Alternating Case-Study Layouts ── */}
        <div className="space-y-28 sm:space-y-36">
          {CASE_STUDIES.map((study, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={study.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
              >
                {/* Visual / Blueprint Architectural Representation */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#070B12]/80 overflow-hidden">
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-white/10 mb-6">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        // SPEC {study.number}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        ARCHITECTURE PROOF
                      </span>
                    </div>

                    {/* Visual Architectural Diagram */}
                    <div className="py-6 flex flex-col items-center justify-center space-y-4">
                      <div className="w-full h-32 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] flex items-center justify-center p-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:16px_16px]" />
                        <div className="relative z-10 text-center">
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                            {study.category}
                          </span>
                          <span className="text-sm sm:text-base font-heading font-bold text-slate-900 dark:text-white">
                            {study.title}
                          </span>
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 w-full pt-2">
                        {study.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Links */}
                    <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={study.caseStudyHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                      >
                        <span>Read full engineering breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      {study.liveHref && (
                        <Link
                          href={study.liveHref}
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                        >
                          <span>Inspect Live Utility</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative Column (Problem → What NVIT Engineered → Result) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Case Study {study.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white tracking-tight mt-1">
                      {study.title}
                    </h3>
                  </div>

                  <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                    {/* 1. Problem */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-1.5">
                        Problem // What Was Difficult?
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 font-normal">
                        {study.problem}
                      </p>
                    </div>

                    {/* 2. What NVIT Engineered */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-1.5">
                        What NVIT Engineered // Architecture
                      </h4>
                      <p className="text-slate-900 dark:text-slate-100 font-normal">
                        {study.engineered}
                      </p>
                    </div>

                    {/* 3. Result */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-1.5">
                        Result // Operational Impact
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 font-normal">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA to all projects */}
        <div className="mt-24 pt-8 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            ALL CODE AND SCHEMAS TESTED FOR PRODUCTION
          </span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <span>View All Engineering Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
