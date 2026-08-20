"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  ArrowUpRight,
  Send,
  Loader2,
  Users,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { ChildServiceData } from "@/config/childServicesContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import Timeline from "@/components/ui/Timeline";
import CleanAccordion from "@/components/ui/CleanAccordion";
import TechGrid from "@/components/ui/TechGrid";

interface Props {
  service: ChildServiceData;
}

export default function ChildServiceDetailView({ service }: Props) {
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
    "mainEntity": service.faqs.map((faq) => ({
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
    "serviceType": service.name,
    "name": service.name,
    "provider": {
      "@type": "Organization",
      "name": "NVIT.SPACE",
      "url": "https://www.nvit.space",
    },
    "description": service.overviewSummary,
    "url": `https://www.nvit.space/services/${service.parentSlug}/${service.slug}`,
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.parentName, href: `/services/${service.parentSlug}` },
              { label: service.name },
            ]}
          />

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{service.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {service.h1Title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {service.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#consultation-inquiry">
                <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-tight shadow-md shadow-blue-500/20 cursor-pointer transition-all flex items-center gap-2">
                  Request Architecture Proposal
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
              <Link href={`/services/${service.parentSlug}`}>
                <button className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 cursor-pointer transition-all flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {service.parentName} Hub
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16 sm:space-y-20">
        
        {/* ── SECTION 3: IN-DEPTH SERVICE OVERVIEW (UNBOXED CANVAS) ───── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Specialized Focus"
            badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Specialized Overview & Architectural Focus"
          />

          <div className="max-w-4xl space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {service.overviewSummary}
            </p>
            {service.overviewDetailedParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Target Audience List */}
          <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/70 max-w-4xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{service.targetAudienceHeadline}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {service.targetAudienceList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── SECTION 4: KEY CAPABILITIES ─────────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Key Deliverables"
            badgeIcon={<Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Core Capabilities & Functional Deliverables"
            subtitle={`What we build and integrate within our ${service.name} engineering cycle:`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cap.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 5: PRACTICAL USE CASES ──────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Problem & Resolution"
            badgeIcon={<Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            badgeVariant="indigo"
            title="Real-World Use Cases & Implementations"
            subtitle={`Practical operational problems resolved by our ${service.name} architecture:`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.useCases.map((uc, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-sm"
              >
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                  Target: {uc.targetAudience}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {uc.title}
                </h3>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300">
                    <strong className="text-rose-600 dark:text-rose-400">Challenge:</strong> {uc.challenge}
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100/60 dark:border-blue-900/40 text-blue-900 dark:text-blue-200">
                    <strong className="text-blue-600 dark:text-blue-400">Solution:</strong> {uc.deliveredSolution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 6: TECHNOLOGY STACK ─────────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Engineering Tooling"
            badgeIcon={<Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Technology Stack & Tooling"
            subtitle="Verified frameworks and database technologies used for this discipline:"
          />

          <TechGrid groups={service.techGroups} />
        </section>

        <Divider />

        {/* ── SECTION 7: 7-STEP TIMELINE ROADMAP ──────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Delivery Methodology"
            badgeIcon={<Wrench className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />}
            badgeVariant="violet"
            title="Engineering Process & Project Lifecycle"
            subtitle="Our structured delivery roadmap from requirements gathering to production release:"
          />

          <Timeline steps={service.processSteps} />
        </section>

        <Divider />

        {/* ── SECTION 8: SIBLING CHILD SERVICES ───────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Related Disciplines"
            badgeIcon={<Layers className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
            badgeVariant="slate"
            title={`More ${service.parentName} Specializations`}
            subtitle="Explore sibling specialized sub-categories:"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.siblingServices.map((sib, idx) => (
              <Link
                key={idx}
                href={sib.href}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {sib.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {sib.description}
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
            badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title={`Frequently Asked Questions: ${service.name}`}
          />

          <CleanAccordion items={service.faqs} />
        </section>

        {/* ── SECTION 10: CONSULTATION FORM ───────────────────────────── */}
        <section id="consultation-inquiry" className="pt-4">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Technical Consultation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Schedule an Architecture Consultation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Discuss your {service.name} project requirements directly with our software engineering leadership.
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
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
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
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
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
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Scope &amp; Deliverables *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Tell us about your ${service.name} timeline, stack requirements, and target users...`}
                      className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
