"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Building2,
  MapPin,
  Calculator,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";

interface PublicToolItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  ctaText: string;
}

export default function FreeToolsHomeSection() {
  const tools: PublicToolItem[] = [
    {
      id: "company-check",
      title: "Company Category Checker",
      description: "Search and explore company categories and related information.",
      href: "/company-check",
      icon: Building2,
      iconBg: "bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      ctaText: "Open Company Checker",
    },
    {
      id: "pincode-check",
      title: "Pincode Serviceability Checker",
      description: "Check lender serviceability and eligibility by pincode.",
      href: "/pincode-check",
      icon: MapPin,
      iconBg: "bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-500/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      ctaText: "Open Pincode Checker",
    },
    {
      id: "emi-calculator",
      title: "Universal Loan EMI Calculator",
      description: "Calculate EMIs, compare loan options and plan your finances.",
      href: "/finance-tools/emi-calculator",
      icon: Calculator,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      ctaText: "Open EMI Calculator",
    },
  ];

  return (
    <section
      id="public-tools"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* Restrained liquid orb background accent */}
      <div className="absolute top-10 right-[-30px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={100} tint="cyan" delay={0.9} floatY={12} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header: Left Eyebrow & Title, Right Pill CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              <span>PUBLIC TOOLS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]">
              Public Tools Engineered <br />
              by{" "}
              <span className="text-blue-600 dark:text-blue-500">
                NVIT.SPACE.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Useful tools and resources to help businesses, professionals and individuals make informed decisions.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/finance-tools"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm group active:scale-95"
            >
              <span>View All Tools</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Tinted Glass Icon Square */}
                  <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} flex items-center justify-center ${tool.iconColor} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                {/* Glossy Dark Liquid Pill CTA Button */}
                <div className="pt-2">
                  <Link href={tool.href} className="block w-full">
                    <button
                      type="button"
                      className="liquid-glass-btn-primary w-full py-3 px-5 text-xs font-semibold flex items-center justify-center gap-2 group-hover:shadow-lg transition-all"
                    >
                      <span>{tool.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
