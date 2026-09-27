"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileText, Layers, ArrowRight, Sparkles } from "lucide-react";

export default function ResourcesHomeSection() {
  const featuredArticles = [
    {
      title: "SaaS Development Guide: Architecture, Multi-Tenancy & Scale",
      type: "Pillar Guide",
      readingTime: "14 min read",
      description:
        "A practical technical guide for engineering multi-tenant SaaS platforms, subscription billing, RBAC permissions, and cloud deployments.",
      href: "/resources/guides/saas-development-guide",
    },
    {
      title: "Fintech Software Development Guide: Ledgers & Security",
      type: "Pillar Guide",
      readingTime: "16 min read",
      description:
        "Technical blueprint for architecting double-entry accounting ledgers, Fastify banking API integrations, Document AI KYC pipelines, and AES-256 field encryption.",
      href: "/resources/guides/fintech-software-development-guide",
    },
    {
      title: "How Is Loan EMI Calculated? Mathematical Formula & Examples",
      type: "Blog Article",
      readingTime: "6 min read",
      description:
        "A clear breakdown of the reducing-balance EMI formula used by Indian banks, with explicit numerical examples, variables, and amortization concepts.",
      href: "/resources/blog/how-emi-is-calculated",
    },
    {
      title: "What Is Document AI? Neural OCR & Intelligent Document Processing",
      type: "Blog Article",
      readingTime: "6 min read",
      description:
        "Learn how Document AI combines computer vision and neural models to extract structured financial data from bank statements, salary slips, and invoices.",
      href: "/resources/blog/what-is-document-ai",
    },
  ];

  return (
    <section
      id="educational-resources"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/10 overflow-hidden bg-[#FAFAFA] dark:bg-[#050507] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">
                Educational Knowledge Hub
              </span>
              <span className="w-12 h-px bg-slate-300 dark:bg-white/20" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Engineering Guides &amp;{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Technical Insights.
              </span>
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Original educational articles, software architectural blueprints, and financial calculation guides published by the NVIT engineering team.
            </p>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors shrink-0"
          >
            <span>Explore Knowledge Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticles.map((article, idx) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono font-semibold">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/40 font-bold">
                    {article.type}
                  </span>
                  <span className="text-slate-400">{article.readingTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={article.href}>{article.title}</Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {article.description}
                </p>
              </div>

              <Link
                href={article.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
              >
                <span>Read Full Resource</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
