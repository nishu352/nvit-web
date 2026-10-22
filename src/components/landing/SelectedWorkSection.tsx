"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";

interface ProjectShowcase {
  id: string;
  title: string;
  tags: string[];
  caseStudyHref: string;
  theme: "dark" | "light";
  dashboardType: "loan" | "pincode";
}

const PROJECTS: ProjectShowcase[] = [
  {
    id: "loan-origination",
    title: "Multi-Tenant Loan Origination System",
    tags: ["Web App", "Multi-Tenant", "Automation"],
    caseStudyHref: "/resources/case-studies/multi-tenant-loan-origination-system",
    theme: "dark",
    dashboardType: "loan",
  },
  {
    id: "pincode-engine",
    title: "Pincode Routing & Serviceability Engine",
    tags: ["API System", "Data Processing", "Production"],
    caseStudyHref: "/resources/case-studies/pan-india-pincode-eligibility-engine",
    theme: "light",
    dashboardType: "pincode",
  },
];

export default function SelectedWorkSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      id="selected-work"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* Liquid background accent */}
      <div className="absolute top-1/3 right-[-40px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={120} tint="amber" delay={0.6} floatY={12} />
      </div>
      <div className="absolute bottom-10 left-[-30px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={80} tint="blue" delay={1.2} floatY={10} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header with Carousel Arrows at Top Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              <span>DELIVERED SOLUTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]">
              Delivered Solutions &amp; <br />
              <span className="text-blue-600 dark:text-blue-500">
                Production Systems.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Real-world projects and systems built to solve practical business needs.
            </p>
          </div>

          {/* Circular Glass Carousel Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : 0))}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev < 3 ? prev + 1 : 3))}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => {
            return (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-6 sm:p-8 flex flex-col justify-between group overflow-hidden"
              >
                {/* Browser Device Preview Frame */}
                <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-950 shadow-md mb-6 relative">
                  {/* Browser Bar */}
                  <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="mx-auto w-1/2 h-3.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-mono text-slate-400 flex items-center justify-center px-2 truncate">
                      https://app.nvit.space/{proj.id}
                    </div>
                  </div>

                  {/* High-Fidelity UI Interface Graphic */}
                  {proj.dashboardType === "loan" ? (
                    <div className="p-4 sm:p-6 bg-[#0B0F19] text-white min-h-[220px] sm:min-h-[260px] flex flex-col justify-between select-none">
                      {/* Sub-header tabs */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-xs font-semibold text-slate-200">Loan Origination Console</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                          Live Sync
                        </span>
                      </div>

                      {/* Metrics row */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3">
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-[9px] text-slate-400 block">Active Files</span>
                          <span className="text-sm sm:text-base font-bold text-white">1,420</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-[9px] text-slate-400 block">Approval Rate</span>
                          <span className="text-sm sm:text-base font-bold text-emerald-400">94.2%</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-[9px] text-slate-400 block">Disbursed</span>
                          <span className="text-sm sm:text-base font-bold text-blue-400">₹48.2 Cr</span>
                        </div>
                      </div>

                      {/* Mock Chart & Table Lines */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="h-2 rounded bg-white/10 w-full" />
                        <div className="h-2 rounded bg-white/5 w-4/5" />
                        <div className="h-2 rounded bg-blue-500/20 w-3/5" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-6 bg-slate-50 text-slate-900 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between select-none">
                      {/* Sub-header */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-semibold text-slate-800">Pan-India Postal Serviceability</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700">
                          19,100+ Pincodes
                        </span>
                      </div>

                      {/* Interactive Map Visual Metaphor */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 my-2 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Selected Postal Hub</span>
                          <div className="text-xs font-bold text-slate-900">110001 — New Delhi GPO</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          Tier-1 Serviceable
                        </span>
                      </div>

                      {/* Geographic bars */}
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        <div className="h-8 rounded bg-blue-100/60 border border-blue-200/40" />
                        <div className="h-8 rounded bg-emerald-100/60 border border-emerald-200/40" />
                        <div className="h-8 rounded bg-amber-100/60 border border-amber-200/40" />
                        <div className="h-8 rounded bg-indigo-100/60 border border-indigo-200/40" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Title & Bottom Details */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
                    {proj.title}
                  </h3>

                  {/* Pills and Corner Link */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={proj.caseStudyHref}
                      aria-label={`View ${proj.title}`}
                      className="w-10 h-10 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-200 shadow-sm shrink-0 ml-3"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setActiveSlide(dot)}
              aria-label={`Go to slide ${dot + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dot ? "w-6 bg-blue-600" : "w-2 bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
