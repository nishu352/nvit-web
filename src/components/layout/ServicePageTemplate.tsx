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
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* ── HERO HEADER ────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={breadcrumbs} />

          <div className="space-y-4 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{badgeText}</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="#contact-inquiry">
                <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-tight shadow-lg shadow-blue-500/20 cursor-pointer transition-all flex items-center gap-2">
                  Start a Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <Link href="/services">
                <button className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 cursor-pointer transition-all">
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
        <section className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-none">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Engineering Overview
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {overview}
          </p>

          {/* Key Capabilities Bullet Points */}
          {keyFeatures.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Core Capabilities &amp; Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
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
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Specialized Solutions &amp; Sub-Categories
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Explore tailored architectures designed for specific industry requirements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childCards.map((card, idx) => (
                <Link key={idx} href={card.href} className="group">
                  <div className="h-full glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {card.tag && (
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                          {card.tag}
                        </span>
                      )}
                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        {card.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
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
          <section className="glass-card rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Target Industries &amp; Applications
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {useCases.map((uc, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  {uc}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Technologies Grid */}
        {technologies.length > 0 && (
          <section className="glass-card rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/30 text-xs font-bold text-blue-700 dark:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Internal Linking / Related Services */}
        {relatedLinks.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Related Services &amp; Digital Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase block">
                      {link.type}
                    </span>
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Direct Project Inquiry Box */}
        <section id="contact-inquiry" className="pt-6">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/40 inline-block">
                Project Consultation
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {ctaTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {ctaSubtitle}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry Received</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-300">
                  Thank you! Our studio team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nishant Bhardwaj"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Details *</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your requirements or feature wishlist..."
                    className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Project Request <Send className="w-3.5 h-3.5" /></>}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
