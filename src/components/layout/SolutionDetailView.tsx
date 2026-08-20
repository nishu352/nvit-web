"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Send,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Wrench,
} from "lucide-react";
import { SolutionData } from "@/config/solutionsContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import Timeline from "@/components/ui/Timeline";
import CleanAccordion from "@/components/ui/CleanAccordion";
import TechGrid from "@/components/ui/TechGrid";

interface Props {
  solution: SolutionData;
}

export default function SolutionDetailView({ solution }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 850);
  };

  // Build JSON-LD structured data for Google FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": solution.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Build JSON-LD structured data for Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": solution.name,
    "name": solution.name,
    "provider": {
      "@type": "Organization",
      "name": "NVIT.SPACE",
      "url": "https://www.nvit.space",
    },
    "description": solution.overviewSummary,
    "url": `https://www.nvit.space/solutions/${solution.slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Schema.org Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />

      {/* ── SECTION 1 & 2: BREADCRUMBS & HERO ───────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-violet-500/10 dark:from-indigo-600/20 dark:via-blue-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Solutions", href: "/solutions" },
              { label: solution.name },
            ]}
          />

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{solution.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {solution.h1Title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {solution.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#consultation-inquiry">
                <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-tight shadow-md shadow-indigo-500/20 cursor-pointer transition-all flex items-center gap-2">
                  Request Solution Blueprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
              <Link href="/solutions">
                <button className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 cursor-pointer transition-all">
                  All Industry Solutions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16 sm:space-y-20">
        
        {/* ── SECTION 3: IN-DEPTH INDUSTRY OVERVIEW (UNBOXED CANVAS) ───── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Digital Transformation"
            badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            badgeVariant="indigo"
            title="Industry Landscape & Digital Transformation"
          />

          <div className="max-w-4xl space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {solution.overviewSummary}
            </p>
            {solution.overviewDetailedParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 4: BUSINESS CHALLENGES → SOLUTIONS MATRIX ───────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Problem & Resolution"
            badgeIcon={<Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
            badgeVariant="rose"
            title="Industry Challenges & Engineered Solutions"
            subtitle="How NVIT.SPACE software engineering directly resolves critical operational bottlenecks:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.challenges.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Operational Challenge 0{idx + 1}
                  </h3>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300">
                    <strong className="text-rose-600 dark:text-rose-400">Industry Challenge:</strong> {item.challenge}
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/60 dark:border-indigo-900/40 text-indigo-900 dark:text-indigo-200">
                    <strong className="text-indigo-600 dark:text-indigo-400">Engineered Solution:</strong> {item.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 5: KEY FUNCTIONAL MODULES ───────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Platform Architecture"
            badgeIcon={<Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Key Modules & Platform Capabilities"
            subtitle="Core components engineered into every enterprise deployment:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                  {mod.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 6: TECHNOLOGY STACK ─────────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Technology Stack"
            badgeIcon={<Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Enterprise Technology & Infrastructure"
            subtitle="Modern stacks selected for high transactional throughput and regulatory security:"
          />

          <TechGrid groups={solution.techGroups} />
        </section>

        <Divider />

        {/* ── SECTION 7: 7-STEP IMPLEMENTATION ROADMAP ────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Implementation Roadmap"
            badgeIcon={<Wrench className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />}
            badgeVariant="violet"
            title="Implementation Lifecycle & Phased Rollout"
            subtitle="A structured 7-step engineering roadmap from initial scoping to enterprise production release:"
          />

          <Timeline steps={solution.processSteps} />
        </section>

        <Divider />

        {/* ── SECTION 8: CONNECTED SERVICES ───────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Underlying Capabilities"
            badgeVariant="blue"
            title="Connected Engineering Capabilities"
            subtitle="Specialized services that power this industry solution:"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solution.connectedServices.map((cs, idx) => (
              <Link
                key={idx}
                href={cs.href}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-0.5">
                    {cs.tag}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {cs.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 9: CLEAN FAQ ACCORDION ──────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Frequently Asked Questions"
            badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            badgeVariant="indigo"
            title={`Frequently Asked Questions: ${solution.name}`}
          />

          <CleanAccordion items={solution.faqs} />
        </section>

        {/* ── SECTION 10: CONSULTATION FORM ───────────────────────────── */}
        <section id="consultation-inquiry" className="pt-4">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Technical Consultation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Schedule an Architecture Consultation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Discuss your {solution.name} project requirements directly with our software engineering leadership.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Consultation Request Received
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                    Our engineering team will review your specifications and reach out within 24 hours with an architecture roadmap.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nishant Sharma"
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Scope &amp; Deliverables *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Tell us about your ${solution.name} timeline, stack requirements, and business goals...`}
                      className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Submit Technical Consultation Request</span><Send className="w-3.5 h-3.5" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
