import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { CASE_STUDIES } from "@/config/resourcesContent";

export const metadata: Metadata = {
  title: "Case Studies & Architecture Blueprints | NVIT.SPACE",
  description:
    "Explore authentic technical case studies on high-scale systems engineered by NVIT.SPACE: Pan-India Pincode Engines, Company Search APIs, and Multi-Tenant Lending Platforms.",
  alternates: {
    canonical: "https://www.nvit.space/resources/case-studies",
  },
  openGraph: {
    title: "Engineering Case Studies | NVIT.SPACE",
    description: "Authentic software engineering case studies, architecture decisions, and demonstrable systems.",
    url: "https://www.nvit.space/resources/case-studies",
  },
};

export default function CaseStudiesIndexPage() {
  const caseStudies = Object.values(CASE_STUDIES);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-indigo-500/10 dark:from-emerald-600/20 dark:via-blue-600/15 dark:to-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Case Studies" },
            ]}
          />

          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Case Studies</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              SYSTEM CASE STUDIES.
            </h1>

            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Explore authentic technical architectures, database indexing decisions, and measurable engineering highlights from systems built by NVIT.SPACE.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.slug}
              className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30">
                    {cs.badge}
                  </span>
                  <Cpu className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">
                  <Link href={`/resources/case-studies/${cs.slug}`}>{cs.title}</Link>
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                  {cs.solution}
                </p>

                {/* Key Metrics */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  {cs.technicalMetrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/resources/case-studies/${cs.slug}`}>
                <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  View Full Case Study <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
