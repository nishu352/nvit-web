"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Database,
  Zap,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Send,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, any> = {
  Globe,
  Code2,
  Smartphone,
  Cpu,
  Database,
  Zap,
  Layers,
};

interface ServicePageTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  badgeText: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  keyFeatures?: string[];
  technologies?: string[];
  useCases?: string[];
  childCards?: {
    title: string;
    description: string;
    href: string;
    tag?: string;
  }[];
  relatedLinks?: {
    title: string;
    href: string;
    type: "Service" | "Solution" | "Tool";
  }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export default function ServicePageTemplate({
  breadcrumbs,
  badgeText,
  heroTitle,
  heroSubtitle,
  overview,
  keyFeatures = [],
  technologies = [],
  useCases = [],
  childCards = [],
  relatedLinks = [],
  ctaTitle = "Ready to build scalable software?",
  ctaSubtitle = "Connect with our digital engineering studio to discuss your project requirements.",
}: ServicePageTemplateProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* ── HERO HEADER ────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="#contact-inquiry">
                <button className="px-6 py-3.5 rounded-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-tight shadow-md cursor-pointer transition-all flex items-center gap-2">
                  Start a Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <Link href="/services">
                <button className="px-6 py-3.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs border border-zinc-200/80 dark:border-white/10 cursor-pointer transition-all shadow-sm">
                  Browse All Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Overview Box */}
        <section className="glass-card-apple rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Engineering Overview
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            {overview}
          </p>

          {/* Key Capabilities Bullet Points */}
          {keyFeatures.length > 0 && (
            <div className="pt-4 border-t border-zinc-100 dark:border-white/10 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Core Capabilities &amp; Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Child Sub-Service / Route Grid */}
        {childCards.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  Specialized Solutions &amp; Sub-Categories
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                  Explore tailored architectures designed for specific industry requirements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childCards.map((card, idx) => (
                <Link key={idx} href={card.href} className="group">
                  <div className="h-full glass-card-apple rounded-3xl p-7 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {card.tag && (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10">
                          {card.tag}
                        </span>
                      )}
                      <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        {card.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Use Cases Grid */}
        {useCases.length > 0 && (
          <section className="glass-card-apple rounded-3xl p-8 sm:p-10 space-y-4 shadow-sm">
            <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
              Target Industries &amp; Applications
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {useCases.map((uc, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  {uc}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Technologies Grid */}
        {technologies.length > 0 && (
          <section className="glass-card-apple rounded-3xl p-8 sm:p-10 space-y-4 shadow-sm">
            <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-xs font-bold text-zinc-800 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Internal Linking / Related Services */}
        {relatedLinks.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-white/10">
            <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Related Services &amp; Digital Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {relatedLinks.map((rel, idx) => (
                <Link
                  key={idx}
                  href={rel.href}
                  className="p-4 rounded-2xl glass-card-apple hover:border-blue-500/40 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mb-0.5">{rel.type}</span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{rel.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Consultation Form CTA Box */}
        <section id="contact-inquiry" className="pt-4">
          <div className="glass-card-apple rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/10 px-3.5 py-1 rounded-full border border-zinc-200 dark:border-white/10 inline-block">
                  Project Consultation
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {ctaTitle}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {ctaSubtitle}
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Project Request Received!
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                    Thank you for connecting with NVIT.SPACE. Our senior engineering leads will review your inquiry and follow up within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nishant Sharma"
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Project Specifications *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your project requirements, goals, and estimated timeline..."
                      className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Submit Project Scope</span><Send className="w-3.5 h-3.5" /></>}
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
