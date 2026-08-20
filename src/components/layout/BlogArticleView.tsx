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
  User,
  BookOpen,
  ArrowLeft,
  HelpCircle,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { BlogArticle, BLOG_ARTICLES } from "@/config/resourcesContent";
import CleanAccordion from "@/components/ui/CleanAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

interface Props {
  article: BlogArticle;
}

export default function BlogArticleView({ article }: Props) {
  // Schema.org BlogPosting microdata
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.metaDescription,
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
    "url": `https://www.nvit.space/resources/blog/${article.slug}`,
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const relatedArticles = Object.values(BLOG_ARTICLES)
    .filter((a) => a.slug !== article.slug && a.cluster === article.cluster)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Schema.org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* ── HEADER & HERO ────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Blog", href: "/resources/blog" },
              { label: article.title },
            ]}
          />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 font-mono">
                {article.badge}
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readingTime}
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.publishedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {article.heroExcerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────── */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-12">
        {/* Sections */}
        <article className="space-y-10">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {sec.heading}
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.takeaway && (
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-500 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Key Takeaway:</strong> {sec.takeaway}</span>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Connected Services & Solutions */}
        {((article.connectedServices && article.connectedServices.length > 0) ||
          (article.connectedTools && article.connectedTools.length > 0)) && (
          <section className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Related Capabilities &amp; Software Tools
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {article.connectedServices &&
                article.connectedServices.map((cs, i) => (
                  <Link
                    key={i}
                    href={cs.href}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 inline-block mb-1 font-mono">
                        {cs.tag}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {cs.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}

              {article.connectedTools &&
                article.connectedTools.map((tool, i) => (
                  <Link
                    key={"tool-" + i}
                    href={tool.href}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between group shadow-sm"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/30 inline-block mb-1 font-mono">
                        {tool.badge}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {tool.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
            </div>
          </section>
        )}

        <Divider />

        {/* ── FAQ ACCORDION ───────────────────────────────────────────── */}
        {article.faqs.length > 0 && (
          <section className="space-y-6 scroll-mt-28">
            <SectionHeading
              badge="Article FAQs"
              badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              badgeVariant="blue"
              title="Frequently Asked Questions"
            />

            <CleanAccordion items={article.faqs} />
          </section>
        )}

        {/* ── RELATED ARTICLES ─────────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Related {article.cluster} Articles
              </h2>
              <Link href="/resources/blog" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                All Blog Posts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.slug}
                  href={`/resources/blog/${ra.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-3 group shadow-sm"
                >
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400 font-mono">
                      {ra.badge}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                      {ra.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
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
