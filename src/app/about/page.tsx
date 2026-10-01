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
import MotionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
    "Empower enterprises by engineering high-speed, secure, and modern digital platforms with exceptional user experience.";

  const founderName = cms?.founders?.founder?.name?.trim() || null;
  const founderTitle = cms?.founders?.founder?.title?.trim() || null;
  const founderBio = cms?.founders?.founder?.bio?.trim() || null;
  const founderLinkedin = cms?.founders?.founder?.linkedin?.trim() || null;

  const coFounderName = cms?.founders?.coFounder?.name?.trim() || null;
  const coFounderTitle = cms?.founders?.coFounder?.title?.trim() || null;
  const coFounderBio = cms?.founders?.coFounder?.bio?.trim() || null;
  const coFounderLinkedin = cms?.founders?.coFounder?.linkedin?.trim() || null;

  const hasFounders = Boolean(founderName || coFounderName);

  const address = [cms?.company?.address, cms?.company?.city, cms?.company?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <MotionReveal className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
            WE BUILD SOFTWARE THAT SOLVES REAL PROBLEMS.
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            {aboutDescription}
          </p>
        </MotionReveal>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Vision & Mission Cards */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StaggerItem>
            <SpotlightCard className="h-full rounded-3xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {vision}
              </p>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem>
            <SpotlightCard className="h-full rounded-3xl p-8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {mission}
              </p>
            </SpotlightCard>
          </StaggerItem>
        </StaggerContainer>

        <Divider />

        {/* Core Engineering Pillars */}
        <section className="space-y-6">
          <MotionReveal>
            <SectionHeading
              badge="Engineering DNA"
              badgeIcon={<Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              badgeVariant="blue"
              title="Core Engineering Pillars"
              subtitle="The foundational principles guiding every digital product we engineer:"
            />
          </MotionReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <SpotlightCard className="h-full rounded-2xl p-6 sm:p-7 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Clean Engineering</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  We write modular, maintainable TypeScript and Python code built on modern frameworks like React, Next.js, and Fastify.
                </p>
              </SpotlightCard>
            </StaggerItem>

            <StaggerItem>
              <SpotlightCard className="h-full rounded-2xl p-6 sm:p-7 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">AI &amp; Automation</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Integrating intelligent neural models, document extraction APIs, and automated workflow engines to reduce operational friction.
                </p>
              </SpotlightCard>
            </StaggerItem>

            <StaggerItem>
              <SpotlightCard className="h-full rounded-2xl p-6 sm:p-7 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Scalable Architecture</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Decoupled cloud architecture connecting high-speed REST APIs with indexed PostgreSQL databases hosted on modern infrastructure.
                </p>
              </SpotlightCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        <Divider />

        {hasFounders && (
          <>
            {/* Leadership & Founders Section */}
            <section className="space-y-6">
              <MotionReveal>
                <SectionHeading
                  badge="Leadership"
                  badgeIcon={<Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  badgeVariant="blue"
                  title="Leadership & Founding Team"
                />
              </MotionReveal>

              <StaggerContainer staggerDelay={0.15} className={`grid grid-cols-1 ${founderName && coFounderName ? "sm:grid-cols-2" : "max-w-md mx-auto"} gap-6`}>
                {/* Founder Card */}
                {founderName && (
                  <StaggerItem>
                    <SpotlightCard className="h-full rounded-3xl p-7 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                            {founderName}
                          </h3>
                          {founderTitle && (
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {founderTitle}
                            </span>
                          )}
                        </div>
                        {founderLinkedin && (
                          <a
                            href={founderLinkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {founderBio && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                          {founderBio}
                        </p>
                      )}
                    </SpotlightCard>
                  </StaggerItem>
                )}

                {/* Co-Founder Card */}
                {coFounderName && (
                  <StaggerItem>
                    <SpotlightCard className="h-full rounded-3xl p-7 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                            {coFounderName}
                          </h3>
                          {coFounderTitle && (
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              {coFounderTitle}
                            </span>
                          )}
                        </div>
                        {coFounderLinkedin && (
                          <a
                            href={coFounderLinkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {coFounderBio && (
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                          {coFounderBio}
                        </p>
                      )}
                    </SpotlightCard>
                  </StaggerItem>
                )}
              </StaggerContainer>
            </section>

            <Divider />
          </>
        )}

        {/* Corporate Legal Registration */}
        <MotionReveal>
          <SpotlightCard className="rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-zinc-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Business &amp; Identity Disclosure
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] font-bold">Platform Brand:</span>
                <strong className="text-zinc-900 dark:text-white">{companyName}</strong>
              </div>
              {cms?.company?.cin && (
                <div>
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] font-bold">CIN:</span>
                  <strong className="text-zinc-900 dark:text-white">{cms.company.cin}</strong>
                </div>
              )}
              {address && (
                <div>
                  <span className="text-zinc-400 dark:text-zinc-500 block text-[11px] font-bold">Office Address:</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{address}</span>
                </div>
              )}
            </div>
          </SpotlightCard>
        </MotionReveal>
      </main>

      <Footer />
    </div>
  );
}
