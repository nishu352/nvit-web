"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Calculator,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function FreeToolsHomeSection() {
  const tools = [
    {
      title: "Company Category Checker",
      badge: "Employer Policy Tiering",
      description:
        "Inspect corporate employer categorization (Cat A, Cat B, Superprime, Unlisted) across top Indian banks and NBFCs directly from indexed policy data.",
      href: "/company-check",
      icon: <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      cta: "Inspect Company Tiers",
    },
    {
      title: "Pincode Serviceability Checker",
      badge: "19,500+ Indian Postal Codes",
      description:
        "Verify regional banking coverage, district postal zoning, and operational lender serviceability across 19,500+ Indian PIN codes.",
      href: "/pincode-check",
      icon: <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      cta: "Check Pincode Coverage",
    },
    {
      title: "Universal Loan EMI Calculator",
      badge: "Financial Calculation Engine",
      description:
        "Compute monthly loan repayments, interest rates, and total payable amounts with reducing-balance formulas and mathematical breakdowns.",
      href: "/finance-tools/emi-calculator",
      icon: <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      cta: "Open EMI Calculator",
    },
    {
      title: "Fintech Tools & Calculators Suite",
      badge: "Calculators Directory",
      description:
        "Explore personal loan, home loan, business loan EMI calculators, loan eligibility tools, and interest compounding utilities.",
      href: "/finance-tools",
      icon: <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      cta: "Browse All Tools",
    },
  ];

  return (
    <section
      id="free-tools"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-white dark:bg-[#070B12] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
              Free Utilities &amp; APIs
            </span>
            <span className="w-12 h-px bg-slate-300 dark:bg-white/20" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            Interactive Financial Tools &amp;{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Banking Data Utilities.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Free public digital tools built by NVIT.SPACE to help individuals and businesses inspect employer category tiers, verify postal pincode serviceability, and calculate exact loan terms.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl p-6 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shadow-sm">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-white/10">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={tool.href}>{tool.title}</Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {tool.description}
                </p>
              </div>

              <Link href={tool.href}>
                <button className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
