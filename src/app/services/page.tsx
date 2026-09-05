"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Code2,
  Smartphone,
  Cpu,
  Database,
  Zap,
} from "lucide-react";
import { SERVICES_CONFIG } from "@/config/siteNavigation";
import { motion } from "framer-motion";
import MotionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const ICON_MAP: Record<string, any> = {
  Globe,
  Code2,
  Smartphone,
  Cpu,
  Database,
  Zap,
};

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Services" }]} />

          <MotionReveal className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Full-Stack Engineering Capabilities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              SOFTWARE SERVICES ENGINEERED FOR SCALE.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Explore our core digital engineering services. From high-converting websites and cloud web applications to applied AI systems and robust backend microservices.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* 6 Core Categories Grid */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CONFIG.map((srv) => {
            const Icon = ICON_MAP[srv.iconName] || Globe;
            return (
              <StaggerItem key={srv.slug}>
                <SpotlightCard className="h-full rounded-3xl p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10">
                        {srv.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                        <Link href={`/services/${srv.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {srv.name}
                        </Link>
                      </h2>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {srv.shortDescription}
                      </p>
                    </div>

                    {/* Sub-specialties list */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-white/10 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Sub-Specialties:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.childRoutes.map((child) => (
                          <Link
                            key={child.slug}
                            href={`/services/${srv.slug}/${child.slug}`}
                            className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/60 dark:border-white/5 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href={`/services/${srv.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Explore Category Hub <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Global CTA Box */}
        <MotionReveal>
          <SpotlightCard className="rounded-3xl p-8 sm:p-12 text-zinc-900 dark:text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 inline-block">
                Custom Project Scoping
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Need a tailored multi-discipline solution?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xl">
                We combine web frontend, mobile apps, AI automation, and cloud backends into cohesive turnkey software platforms.
              </p>
            </div>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-tight shadow-xl cursor-pointer shrink-0 transition-all flex items-center gap-2"
              >
                Book Technical Consultation →
              </motion.button>
            </Link>
          </SpotlightCard>
        </MotionReveal>
      </main>

      <Footer />
    </div>
  );
}
