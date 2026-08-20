"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
  Zap,
  ExternalLink,
  Award,
} from "lucide-react";
import { CaseStudy } from "@/config/resourcesContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailView({ caseStudy }: Props) {
  // Schema.org Article microdata
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.metaDescription,
    "datePublished": "2026-08-20",
    "dateModified": "2026-08-20",
    "author": {
      "@type": "Organization",
      "name": "NVIT Engineering Team",
      "url": "https://www.nvit.space",
    },
    "publisher": {
      "@type": "Organization",
      "name": "NVIT.SPACE",
      "url": "https://www.nvit.space",
    },
    "url": `https://www.nvit.space/resources/case-studies/${caseStudy.slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Schema.org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <Navbar />

      {/* ── HEADER & HERO ────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-indigo-500/10 dark:from-emerald-600/20 dark:via-blue-600/15 dark:to-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Case Studies", href: "/resources/case-studies" },
              { label: caseStudy.title },
            ]}
          />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 font-mono">
                {caseStudy.badge}
              </span>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                Domain: {caseStudy.clientType}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {caseStudy.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {caseStudy.solution}
            </p>

            {caseStudy.liveToolLink && (
              <div className="pt-2">
                <Link
                  href={caseStudy.liveToolLink.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore Live Utility</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY CONTENT ───────────────────────────────────────── */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
        {/* Technical Highlights / Metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {caseStudy.technicalMetrics.map((metric, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm"
            >
              <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white">
                {metric}
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                Engineering Benchmark
              </span>
            </div>
          ))}
        </section>

        {/* Challenge & Context */}
        <section className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono">
              Operational Problem Context
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Challenge &amp; Bottleneck
            </h2>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <p>{caseStudy.context}</p>
            <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border-l-4 border-rose-600 dark:border-rose-500 text-rose-950 dark:text-rose-200 font-semibold text-xs">
              <strong>Core Bottleneck:</strong> {caseStudy.challenge}
            </div>
          </div>
        </section>

        {/* Architecture Highlights */}
        <section className="space-y-6">
          <SectionHeading
            badge="Architecture Breakdown"
            badgeIcon={<Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Engineered Architecture Highlights"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.architectureHighlights.map((arch, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {arch.split(":")[0]}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {arch.split(":")[1] || arch}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Engineering Decisions & Rationale */}
        <section className="space-y-6">
          <SectionHeading
            badge="Technical Trade-offs"
            badgeIcon={<Wrench className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            badgeVariant="indigo"
            title="Key Engineering Decisions & Rationale"
          />

          <div className="space-y-3.5">
            {caseStudy.engineeringDecisions.map((dec, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {dec.decision}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-medium">
                  <strong>Rationale:</strong> {dec.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Bottom CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Need a Similar High-Throughput System?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Discuss architecture, database scaling, and deployment schedules with our software leads.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-tight shadow-md shadow-blue-500/20 cursor-pointer transition-all flex items-center gap-2">
              Start Technical Consultation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
