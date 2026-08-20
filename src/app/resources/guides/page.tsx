import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { Compass, Clock, ArrowRight, CheckCircle2, Users } from "lucide-react";
import { PILLAR_GUIDES } from "@/config/resourcesContent";

export const metadata: Metadata = {
  title: "Engineering Guides & Pillar Resources | NVIT.SPACE",
  description:
    "Comprehensive engineering blueprints and pillar guides on SaaS development, fintech architectures, loan platforms, and full-stack web applications.",
  alternates: {
    canonical: "https://www.nvit.space/resources/guides",
  },
  openGraph: {
    title: "Engineering Guides & Architecture Blueprints | NVIT.SPACE",
    description: "In-depth guides on SaaS multi-tenancy, fintech ledgers, and digital lending platform engineering.",
    url: "https://www.nvit.space/resources/guides",
  },
};

export default function GuidesIndexPage() {
  const guides = Object.values(PILLAR_GUIDES);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-violet-500/10 dark:from-indigo-600/20 dark:via-blue-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Engineering Guides" },
            ]}
          />

          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Architectural Blueprints</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              ENGINEERING PILLAR GUIDES.
            </h1>

            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              In-depth technical blueprints designed for CTOs, product founders, and software architects planning mission-critical digital platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.slug}
              className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-none flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/30">
                    {guide.pillarTopic}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {guide.readingTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-snug">
                  <Link href={`/resources/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {guide.summary}
                </p>

                {/* Target Audience */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">Written For:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.targetAudience.map((aud, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link href={`/resources/guides/${guide.slug}`}>
                <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  Explore Comprehensive Guide <ArrowRight className="w-3.5 h-3.5" />
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
