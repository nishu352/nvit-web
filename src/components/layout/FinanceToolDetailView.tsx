"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EmiCalculatorWidget from "@/components/finance-tools/EmiCalculatorWidget";
import LoanEligibilityCalculatorWidget from "@/components/finance-tools/LoanEligibilityCalculatorWidget";
import InterestCalculatorWidget from "@/components/finance-tools/InterestCalculatorWidget";
import LoanTenureCalculatorWidget from "@/components/finance-tools/LoanTenureCalculatorWidget";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  ArrowUpRight,
  Send,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Wrench,
  ShieldAlert,
  BookmarkCheck,
  TrendingUp,
  CreditCard,
  Building2,
  Sparkles,
} from "lucide-react";
import { FinanceToolData } from "@/config/financeToolsContent";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import CleanAccordion from "@/components/ui/CleanAccordion";

interface Props {
  tool: FinanceToolData;
}

export default function FinanceToolDetailView({ tool }: Props) {
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
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Build JSON-LD structured data for WebApplication
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": tool.metaDescription,
    "url": `https://www.nvit.space/finance-tools/${tool.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "NVIT.SPACE",
      "url": "https://www.nvit.space",
    },
  };

  // Render the appropriate specialized interactive widget based on tool type
  const renderCalculatorWidget = () => {
    switch (tool.toolType) {
      case "emi":
        return <EmiCalculatorWidget />;
      case "personal-emi":
        return (
          <EmiCalculatorWidget
            defaultPrincipal={400000}
            defaultRate={12.5}
            defaultTenureYears={3}
            maxPrincipal={2500000}
            maxTenureYears={5}
            minRate={10.0}
            maxRate={28.0}
            labelVariant="Personal Loan"
          />
        );
      case "home-emi":
        return (
          <EmiCalculatorWidget
            defaultPrincipal={5000000}
            defaultRate={8.75}
            defaultTenureYears={20}
            maxPrincipal={100000000}
            maxTenureYears={30}
            minRate={6.5}
            maxRate={15}
            labelVariant="Home Loan"
          />
        );
      case "business-emi":
        return (
          <EmiCalculatorWidget
            defaultPrincipal={1500000}
            defaultRate={14.0}
            defaultTenureYears={4}
            maxPrincipal={50000000}
            maxTenureYears={7}
            minRate={8.5}
            maxRate={24}
            labelVariant="Business Loan"
          />
        );
      case "eligibility":
        return <LoanEligibilityCalculatorWidget />;
      case "interest":
        return <InterestCalculatorWidget />;
      case "tenure":
        return <LoanTenureCalculatorWidget />;
      default:
        return <EmiCalculatorWidget />;
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <Navbar />

      {/* ── SECTION 1 & 2: BREADCRUMBS & HERO ───────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-emerald-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-emerald-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Finance Tools", href: "/finance-tools" },
              { label: tool.name },
            ]}
          />

          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{tool.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {tool.h1Title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {tool.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        
        {/* ── SECTION 3: DIRECT INTERACTIVE CALCULATOR CONTAINER ───────── */}
        <section className="space-y-4">
          {renderCalculatorWidget()}

          {/* Financial Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Estimate Disclaimer:</strong> Calculator results are mathematical estimates for informational and planning purposes only. Actual loan terms, interest rates, processing fees, eligibility, and repayment schedules vary by lender and individual borrower profile.
            </p>
          </div>
        </section>

        <Divider />

        {/* ── SECTION 4: DEFINITION & HOW IT WORKS (UNBOXED CANVAS) ───── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Methodology"
            badgeIcon={<BookmarkCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title={`Understanding ${tool.name}`}
          />

          <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed max-w-4xl">
            {tool.definition}
          </p>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              How the Calculation Works:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.howItWorks.map((step, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── SECTION 5: MATHEMATICAL FORMULA (CLEAN CODE DISPLAY) ─────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Formula"
            badgeIcon={<Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title={tool.formulaName}
            subtitle="The underlying mathematical model evaluated in real-time:"
          />

          {/* Formula Display Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm shadow-inner overflow-x-auto">
            <code>{tool.formulaExpression}</code>
          </div>

          {/* Variables Breakdown */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Variables &amp; Constants:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tool.formulaVariables.map((v, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs shadow-sm">
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block mb-0.5">
                    {v.symbol}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {v.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── SECTION 6: WORKED STEP-BY-STEP EXAMPLE ──────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Worked Example"
            badgeIcon={<TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
            badgeVariant="emerald"
            title={tool.workedExample.scenarioTitle}
            subtitle="Step-by-step numbers demonstrating practical amortisation:"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1 text-xs shadow-sm">
              <span className="text-slate-400 font-semibold block">Input Principal:</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{tool.workedExample.principal}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1 text-xs shadow-sm">
              <span className="text-slate-400 font-semibold block">Interest Rate:</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{tool.workedExample.rate}</span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1 text-xs shadow-sm">
              <span className="text-slate-400 font-semibold block">Tenure / Period:</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{tool.workedExample.tenure}</span>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 space-y-1 text-xs shadow-sm">
              <span className="text-blue-600 dark:text-blue-400 font-bold block">Monthly Result / Payment:</span>
              <span className="text-base font-bold text-blue-700 dark:text-blue-300">{tool.workedExample.monthlyEmiOrInterest}</span>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 space-y-1 text-xs shadow-sm">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold block">Total Accumulated Interest:</span>
              <span className="text-base font-bold text-indigo-700 dark:text-indigo-300">{tool.workedExample.totalInterest}</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-1 text-xs shadow-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold block">Total Repayment Amount:</span>
              <span className="text-base font-bold text-emerald-700 dark:text-emerald-300">{tool.workedExample.totalPayable}</span>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── SECTION 7: INFLUENCING FACTORS ──────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Key Factors"
            badgeIcon={<Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            badgeVariant="blue"
            title="Factors Influencing Calculation Outputs"
            subtitle="Parameters that impact overall borrowing costs and eligibility thresholds:"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tool.influencingFactors.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SECTION 8: CONNECTED TOOLS ──────────────────────────────── */}
        <section className="space-y-6">
          <SectionHeading
            badge="Calculators Suite"
            badgeIcon={<Calculator className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
            badgeVariant="slate"
            title="Explore Other Financial Calculators"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tool.connectedTools.map((sib, idx) => (
              <Link
                key={idx}
                href={sib.href}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-0.5">
                    {sib.badge}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {sib.title}
                  </h3>
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
            title={`Frequently Asked Questions: ${tool.name}`}
          />

          <CleanAccordion items={tool.faqs} />
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
                  Looking to Build Custom Fintech Calculators?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  We engineer bespoke financial computation engines, loan origination systems, and data APIs.
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
                    Our fintech engineering team will reach out within 24 hours to discuss custom computation engines and API integration.
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Requirements *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Tell us about your fintech software requirements, loan calculator APIs, or platform timeline...`}
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
