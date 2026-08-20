"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Award,
  Clock,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { BLOG_ARTICLES, PILLAR_GUIDES, CASE_STUDIES } from "@/config/resourcesContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

export default function ResourcesHubPage() {
  const [activeTab, setActiveTab] = useState<"all" | "blog" | "guides" | "cases">("all");

  const blogList = Object.values(BLOG_ARTICLES);
  const guideList = Object.values(PILLAR_GUIDES);
  const caseList = Object.values(CASE_STUDIES);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Resources" }]} />

          <div className="space-y-4 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Knowledge Base</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              ENGINEERING INSIGHTS &amp; ARCHITECTURAL GUIDES.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Explore practical developer articles, comprehensive software whitepapers, and real-world system architecture breakdowns from the NVIT.SPACE studio.
            </p>
          </div>
        </div>
      </section>

      {/* Main Knowledge Hub Container */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800"
            }`}
          >
            All Resources ({blogList.length + guideList.length + caseList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guides")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "guides"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Architecture Guides ({guideList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "blog"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Blog ({blogList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "cases"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-slate-800"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Case Studies ({caseList.length})</span>
          </button>
        </div>

        {/* ── SECTION 1: PILLAR GUIDES ──────────────────────────────── */}
        {(activeTab === "all" || activeTab === "guides") && (
          <section className="space-y-6">
            <SectionHeading
              badge="Architecture Guides"
              badgeIcon={<FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              badgeVariant="indigo"
              title="Comprehensive Architecture Guides"
              subtitle="In-depth, 1,500+ word engineering whitepapers detailing real-world cloud architectures:"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guideList.map((g) => (
                <Link key={g.slug} href={`/resources/guides/${g.slug}`} className="group">
                  <div className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/40">
                          {g.pillarTopic}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {g.readingTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {g.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                        {g.summary}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      Read Architecture Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {activeTab === "all" && <Divider />}

        {/* ── SECTION 2: CASE STUDIES ───────────────────────────────── */}
        {(activeTab === "all" || activeTab === "cases") && (
          <section className="space-y-6">
            <SectionHeading
              badge="Client Transformations"
              badgeIcon={<Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              badgeVariant="emerald"
              title="Verified Client Case Studies"
              subtitle="Detailed breakdowns of enterprise problems, engineering decisions, and measurable outcomes:"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseList.map((cs) => (
                <Link key={cs.slug} href={`/resources/case-studies/${cs.slug}`} className="group">
                  <div className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                    <div className="space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/40">
                        {cs.badge}
                      </span>

                      <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cs.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                        {cs.challenge}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {activeTab === "all" && <Divider />}

        {/* ── SECTION 3: TECHNICAL BLOG ARTICLES ────────────────────── */}
        {(activeTab === "all" || activeTab === "blog") && (
          <section className="space-y-6">
            <SectionHeading
              badge="Engineering Articles"
              badgeIcon={<BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              badgeVariant="blue"
              title="Technical Articles & Deep Dives"
              subtitle="Practical development insights on Next.js, Fastify APIs, PostgreSQL indexing, and AI integrations:"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogList.map((art) => (
                <Link key={art.slug} href={`/resources/blog/${art.slug}`} className="group">
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                          {art.cluster}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {art.readingTime}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {art.title}
                      </h2>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                        {art.heroExcerpt}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
