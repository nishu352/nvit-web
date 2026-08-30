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
} from "lucide-react";
import { BLOG_ARTICLES, PILLAR_GUIDES, CASE_STUDIES } from "@/config/resourcesContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import { motion } from "framer-motion";
import MotionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function ResourcesHubPage() {
  const [activeTab, setActiveTab] = useState<"all" | "blog" | "guides" | "cases">("all");

  const blogList = Object.values(BLOG_ARTICLES);
  const guideList = Object.values(PILLAR_GUIDES);
  const caseList = Object.values(CASE_STUDIES);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Resources" }]} />

          <MotionReveal className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Knowledge Base &amp; Publications</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              ENGINEERING INSIGHTS &amp; ARCHITECTURAL GUIDES.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Explore practical developer articles, comprehensive software whitepapers, and real-world system architecture breakdowns from the NVIT.SPACE studio.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Main Knowledge Hub Container */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-200/80 dark:border-white/10 relative">
          {[
            { id: "all", label: `All Resources (${blogList.length + guideList.length + caseList.length})` },
            { id: "guides", label: `Architecture Guides (${guideList.length})`, icon: FileText },
            { id: "blog", label: `Technical Blog (${blogList.length})`, icon: BookOpen },
            { id: "cases", label: `Case Studies (${caseList.length})`, icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 z-10 ${
                  isSelected
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeResourcesTab"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200/80 dark:border-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── SECTION 1: PILLAR GUIDES ──────────────────────────────── */}
        {(activeTab === "all" || activeTab === "guides") && (
          <section className="space-y-6">
            <MotionReveal>
              <SectionHeading
                badge="Architecture Guides"
                badgeIcon={<FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                badgeVariant="indigo"
                title="Comprehensive Architecture Guides"
                subtitle="In-depth, 1,500+ word engineering whitepapers detailing real-world cloud architectures:"
              />
            </MotionReveal>

            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guideList.map((g) => (
                <StaggerItem key={g.slug}>
                  <Link href={`/resources/guides/${g.slug}`} className="group block h-full">
                    <SpotlightCard className="h-full p-6 sm:p-7 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/40">
                            {g.pillarTopic}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {g.readingTime}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {g.title}
                        </h2>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-2">
                          {g.summary}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        Read Architecture Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </SpotlightCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {activeTab === "all" && <Divider />}

        {/* ── SECTION 2: CASE STUDIES ───────────────────────────────── */}
        {(activeTab === "all" || activeTab === "cases") && (
          <section className="space-y-6">
            <MotionReveal>
              <SectionHeading
                badge="Client Transformations"
                badgeIcon={<Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                badgeVariant="emerald"
                title="Verified Client Case Studies"
                subtitle="Detailed breakdowns of enterprise problems, engineering decisions, and measurable outcomes:"
              />
            </MotionReveal>

            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseList.map((cs) => (
                <StaggerItem key={cs.slug}>
                  <Link href={`/resources/case-studies/${cs.slug}`} className="group block h-full">
                    <SpotlightCard className="h-full p-6 sm:p-7 rounded-3xl hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                      <div className="space-y-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/40">
                          {cs.badge}
                        </span>

                        <h2 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {cs.title}
                        </h2>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-2">
                          {cs.challenge}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </SpotlightCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {activeTab === "all" && <Divider />}

        {/* ── SECTION 3: TECHNICAL BLOG ARTICLES ────────────────────── */}
        {(activeTab === "all" || activeTab === "blog") && (
          <section className="space-y-6">
            <MotionReveal>
              <SectionHeading
                badge="Engineering Articles"
                badgeIcon={<BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                badgeVariant="blue"
                title="Technical Articles & Deep Dives"
                subtitle="Practical development insights on Next.js, Fastify APIs, PostgreSQL indexing, and AI integrations:"
              />
            </MotionReveal>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogList.map((art) => (
                <StaggerItem key={art.slug}>
                  <Link href={`/resources/blog/${art.slug}`} className="group block h-full">
                    <SpotlightCard className="h-full p-6 rounded-3xl hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                            {art.cluster}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-medium">
                            {art.readingTime}
                          </span>
                        </div>

                        <h2 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {art.title}
                        </h2>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-2">
                          {art.heroExcerpt}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </SpotlightCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
