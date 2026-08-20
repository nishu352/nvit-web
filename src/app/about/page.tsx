"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Sparkles,
  Code2,
  Cpu,
  Server,
  Compass,
  Target,
  Users,
  Linkedin,
  Building2,
  MapPin,
  FileCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

export default function AboutPage() {
  const { data: cms } = useWebsiteCMS();

  const companyName = cms?.company?.name || "NVIT.SPACE";
  const tagline = cms?.company?.tagline || "Digital Engineering Studio";
  const aboutDescription =
    cms?.about?.description ||
    "NVIT.SPACE is a specialized digital engineering studio building high-performance websites, custom web applications, scalable backend microservices, intelligent AI automation pipelines, and fintech data solutions.";
  const vision =
    cms?.about?.vision ||
    "To democratize advanced digital engineering and intelligent software architectures for businesses of all scales.";
  const mission =
    cms?.about?.mission ||
    "Empower enterprises by engineering high-speed, secure, and modern digital platforms with unmatched user experience.";

  const founder = cms?.founders?.founder;
  const coFounder = cms?.founders?.coFounder;

  const address = [cms?.company?.address, cms?.company?.city, cms?.company?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            WE BUILD SOFTWARE THAT SOLVES REAL PROBLEMS.
          </h1>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            {aboutDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {vision}
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {mission}
            </p>
          </div>
        </div>

        <Divider />

        {/* Core Engineering Pillars */}
        <section className="space-y-6">
          <SectionHeading
            badge="Engineering DNA"
            badgeIcon={<Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Core Engineering Pillars"
            subtitle="The foundational principles guiding every digital product we engineer:"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Clean Engineering</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We write modular, maintainable TypeScript and Python code built on modern frameworks like React, Next.js, and Fastify.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">AI &amp; Automation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Integrating intelligent neural models, document extraction APIs, and automated workflow engines to reduce operational friction.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-violet-50 dark:bg-violet-950/60 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Scalable Architecture</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Decoupled cloud architecture connecting high-speed REST APIs with indexed PostgreSQL databases hosted on modern infrastructure.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Leadership & Founders Section */}
        <section className="space-y-6">
          <SectionHeading
            badge="Leadership"
            badgeIcon={<Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Leadership & Founding Team"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Founder Card */}
            <div className="p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {founder?.name || "Nishant Bhardwaj"}
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {founder?.title || "Founder & CEO"}
                  </span>
                </div>
                {founder?.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {founder?.bio ||
                  "Passionate technologist leading product architecture, full-stack systems engineering, and business strategy at NVIT.SPACE."}
              </p>
            </div>

            {/* Co-Founder Card */}
            <div className="p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {coFounder?.name || "Vineet"}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {coFounder?.title || "Co-Founder & CTO"}
                  </span>
                </div>
                {coFounder?.linkedin && (
                  <a
                    href={coFounder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 hover:bg-emerald-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {coFounder?.bio ||
                  "Engineering leader driving backend infrastructure, cloud architectures, database design, and AI model integrations."}
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Corporate Legal Registration */}
        <section className="p-7 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Corporate Registration &amp; Registered Office
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div>
              <span className="text-slate-400 block text-[11px] font-bold">Legal Entity:</span>
              <strong className="text-slate-900 dark:text-slate-100">{companyName}</strong>
            </div>
            {cms?.company?.cin && (
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">CIN:</span>
                <strong className="text-slate-900 dark:text-slate-100">{cms.company.cin}</strong>
              </div>
            )}
            {address && (
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">Office Address:</span>
                <span className="text-slate-800 dark:text-slate-200">{address}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
