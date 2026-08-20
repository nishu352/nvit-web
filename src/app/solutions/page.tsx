import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SOLUTIONS_CONFIG } from "@/config/siteNavigation";

export const metadata: Metadata = {
  title: "Industry Software Solutions & Architectures",
  description:
    "Explore tailored digital solutions engineered by NVIT.SPACE: Fintech platforms, loan origination systems, eCommerce portals, healthcare apps, and startup MVPs.",
  alternates: {
    canonical: "https://www.nvit.space/solutions",
  },
  openGraph: {
    title: "Industry Software Solutions | NVIT.SPACE",
    description:
      "Enterprise fintech platforms, loan distribution systems, operations ERP, and rapid startup MVPs.",
    url: "https://www.nvit.space/solutions",
  },
};

export default function SolutionsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Solutions" }]} />

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Industry Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              INTEGRATED SOLUTIONS FOR COMPLEX INDUSTRIES.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              We combine web applications, cloud backends, AI document extraction, and business automation into turnkey software systems tailored for specific industries.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUTIONS_CONFIG.map((sol) => (
            <div
              key={sol.slug}
              className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-xl dark:shadow-none hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                    {sol.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    <Link href={`/solutions/${sol.slug}`}>{sol.name}</Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {sol.shortDescription}
                  </p>
                </div>

                {/* Core Capabilities */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Pillars:</p>
                  <div className="space-y-1.5">
                    {sol.coreCapabilities.slice(0, 3).map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href={`/solutions/${sol.slug}`}>
                <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  Explore Solution Architecture <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Custom Solution Scoping */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/40 inline-block">
              Custom Industry Workflows
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Have unique business logic requirements?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl">
              We translate complex manual domain logic into automated full-stack software tailored for your operations.
            </p>
          </div>

          <Link href="/contact">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-xs tracking-tight shadow-xl shadow-blue-500/25 cursor-pointer shrink-0 transition-all flex items-center gap-2">
              Discuss Your Solution →
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
