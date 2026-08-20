"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Layers,
  Users,
  Compass,
} from "lucide-react";
import { PillarGuide } from "@/config/resourcesContent";
import CleanAccordion from "@/components/ui/CleanAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

interface Props {
  guide: PillarGuide;
}

export default function GuideDetailView({ guide }: Props) {
  // Schema.org TechArticle microdata
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": guide.title,
    "description": guide.metaDescription,
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
    "url": `https://www.nvit.space/resources/guides/${guide.slug}`,
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Schema.org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* ── HEADER & HERO ────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-violet-500/10 dark:from-indigo-600/20 dark:via-blue-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Guides", href: "/resources/guides" },
              { label: guide.title },
            ]}
          />

          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                Pillar Guide: {guide.pillarTopic}
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {guide.readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {guide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {guide.summary}
            </p>

            {/* Target Audience Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5" /> Target Audience:
              </span>
              {guide.targetAudience.map((aud, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT WITH STICKY SIDEBAR ─────────────────────────── */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* STICKY TABLE OF CONTENTS (4 Cols) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Guide Navigation</span>
              </div>

              <nav className="space-y-1 text-xs font-medium">
                {guide.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors leading-snug"
                  >
                    {sec.title}
                  </a>
                ))}
                <a
                  href="#faq-section"
                  className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </nav>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link href="/contact">
                  <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                    Discuss Architecture <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN EDITORIAL GUIDE CONTENT (8 Cols) */}
          <div className="lg:col-span-8 space-y-12 max-w-3xl">
            {/* Architecture Summary Callout */}
            <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-500 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5" /> Architecture Executive Summary
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {guide.architectureSummary}
              </p>
            </div>

            {/* In-Depth Sections */}
            <div className="space-y-10">
              {guide.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {sec.title}
                  </h2>

                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {sec.content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {sec.keyPoints && sec.keyPoints.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-sm">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                        Key Architectural Rules:
                      </span>
                      <ul className="space-y-2">
                        {sec.keyPoints.map((kp, kpIdx) => (
                          <li key={kpIdx} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <Divider />

            {/* Connected Services & Solutions */}
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Connected Services &amp; Industry Solutions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.connectedServices.map((cs, i) => (
                  <Link
                    key={i}
                    href={cs.href}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 inline-block mb-1">
                        {cs.tag}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {cs.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}

                {guide.connectedSolutions.map((sol, i) => (
                  <Link
                    key={"sol-" + i}
                    href={sol.href}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/30 inline-block mb-1">
                        {sol.badge}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {sol.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </section>

            <Divider />

            {/* Clean FAQ Accordion */}
            <section id="faq-section" className="space-y-6 scroll-mt-28">
              <SectionHeading
                badge="Guide FAQs"
                badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                badgeVariant="blue"
                title={`Frequently Asked Questions: ${guide.pillarTopic}`}
              />

              <CleanAccordion items={guide.faqs} />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
