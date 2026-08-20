"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { BLOG_ARTICLES } from "@/config/resourcesContent";

export default function BlogIndexPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("All");

  const articles = Object.values(BLOG_ARTICLES);
  const clusters = ["All", "Web & Software", "Backend & APIs", "AI & Automation", "Finance & Fintech"];

  const filteredArticles = selectedCluster === "All"
    ? articles
    : articles.filter((a) => a.cluster === selectedCluster);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Engineering Blog" },
            ]}
          />

          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Engineering Blog</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              NVIT ENGINEERING BLOG.
            </h1>

            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Practical software engineering articles covering full-stack web architecture, Fastify APIs, PostgreSQL database design, Document AI, and fintech calculations.
            </p>

            {/* Cluster Filter Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              {clusters.map((cluster) => (
                <button
                  key={cluster}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCluster === cluster
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {cluster}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none flex flex-col justify-between hover:border-blue-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                    {article.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readingTime}
                  </span>
                </div>

                <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                  <Link href={`/resources/blog/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                  {article.heroExcerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">{article.cluster}</span>
                <Link
                  href={`/resources/blog/${article.slug}`}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Read Article <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
