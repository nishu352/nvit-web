"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SOLUTIONS_CONFIG } from "@/config/siteNavigation";
import { motion } from "framer-motion";
import MotionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function SolutionsHubPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Solutions" }]} />

          <MotionReveal className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Industry Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              INTEGRATED SOLUTIONS FOR COMPLEX INDUSTRIES.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              We combine web applications, cloud backends, AI document extraction, and business automation into turnkey software systems tailored for specific industries.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Solutions Grid */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUTIONS_CONFIG.map((sol) => (
            <StaggerItem key={sol.slug}>
              <SpotlightCard className="h-full rounded-3xl p-8 flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10">
                      {sol.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/solutions/${sol.slug}`}>{sol.name}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {sol.shortDescription}
                    </p>
                  </div>

                  {/* Core Capabilities */}
                  <div className="pt-2 border-t border-zinc-100 dark:border-white/10 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Key Pillars:</p>
                    <div className="space-y-1.5">
                      {sol.coreCapabilities.slice(0, 3).map((cap, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href={`/solutions/${sol.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Explore Solution Architecture <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </Link>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Custom Solution Scoping */}
        <MotionReveal>
          <SpotlightCard className="rounded-3xl p-8 sm:p-12 text-zinc-900 dark:text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 inline-block">
                Custom Industry Workflows
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Have unique business logic requirements?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xl">
                We translate complex manual domain logic into automated full-stack software tailored for your operations.
              </p>
            </div>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-tight shadow-xl cursor-pointer shrink-0 transition-all flex items-center gap-2"
              >
                Discuss Your Solution →
              </motion.button>
            </Link>
          </SpotlightCard>
        </MotionReveal>
      </main>

      <Footer />
    </div>
  );
}
