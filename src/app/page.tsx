"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmiCalculator from "@/components/ui/EmiCalculator";
import { apiClient } from "@/services/apiClient";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Cpu,
  Database,
  Zap,
  CheckCircle2,
  Building2,
  MapPin,
  Search,
  Lock,
  Terminal,
  Send,
  Loader2,
  Server,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description: "High-performance, SEO-optimized digital web experiences built with Next.js, React, and modern web frameworks.",
    tag: "Web & UX",
  },
  {
    icon: Code2,
    title: "Web Application Development",
    description: "Scalable SaaS platforms, custom dashboards, enterprise web portals, and complex cloud applications.",
    tag: "Full-Stack",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps (Android & iOS)",
    description: "Native and cross-platform mobile apps engineered for speed, intuitive UI, and seamless offline sync.",
    tag: "Mobile",
  },
  {
    icon: Cpu,
    title: "AI Solutions & Integration",
    description: "Smart AI agents, LLM integrations, automated document extraction, and machine learning workflows.",
    tag: "AI & ML",
  },
  {
    icon: Database,
    title: "Backend & API Systems",
    description: "Robust REST & GraphQL APIs, microservices, PostgreSQL/Supabase database schemas, and cloud architecture.",
    tag: "Cloud Backend",
  },
  {
    icon: Zap,
    title: "Business Automation",
    description: "Custom internal tools, workflow automation engines, CRM/ERP integrations, and data pipelines.",
    tag: "Automation",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "IDEA", description: "Requirement discovery, technical roadmap & architecture planning" },
  { step: "02", title: "DESIGN", description: "High-fidelity UI/UX wireframing, component design & design systems" },
  { step: "03", title: "DEVELOP", description: "Agile clean-code engineering, API integrations & security hardening" },
  { step: "04", title: "LAUNCH", description: "Automated CI/CD deployment, cloud hosting setup & production launch" },
  { step: "05", title: "SCALE", description: "Continuous monitoring, performance tuning & feature scaling" },
];

const WHY_US = [
  {
    title: "Performance First",
    description: "Zero-bloat code architecture designed for sub-second page loads and maximum Lighthouse scores.",
    icon: Zap,
  },
  {
    title: "Secure by Design",
    description: "Enterprise-grade SSL/TLS encryption, JWT authentication, and strict OWASP security standards.",
    icon: Lock,
  },
  {
    title: "AI & Cloud Ready",
    description: "Future-proof microservices designed to integrate LLMs, neural models, and scalable serverless APIs.",
    icon: Cpu,
  },
  {
    title: "High Scalability",
    description: "Decoupled frontend and PostgreSQL cloud database architecture supporting high concurrent throughput.",
    icon: Server,
  },
];

const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Fastify",
  "Prisma",
  "AI / LLMs",
  "Android",
  "REST APIs",
  "Docker",
];

export default function HomePage() {
  const [activeToolTab, setActiveToolTab] = useState<"company" | "pincode" | "emi">("company");

  // Company Search State
  const [companyQuery, setCompanyQuery] = useState("");
  const [companySuggestions, setCompanySuggestions] = useState<any[]>([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [companySearchRan, setCompanySearchRan] = useState(false);

  // Pincode Search State
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [projectType, setProjectType] = useState("Website Development");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setCompanyQuery(q);
    setSelectedCompany(null);
    setCompanySearchRan(false);

    if (q.trim().length >= 2) {
      setCompanyLoading(true);
      apiClient
        .get(`/company/autocomplete?q=${encodeURIComponent(q.trim())}`)
        .then((res) => {
          if (res.data.success) {
            setCompanySuggestions(res.data.data || []);
          }
        })
        .catch(() => setCompanySuggestions([]))
        .finally(() => setCompanyLoading(false));
    } else {
      setCompanySuggestions([]);
    }
  };

  const handleCompanySearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyQuery.trim()) return;
    setCompanyLoading(true);
    setCompanySearchRan(true);
    setCompanySuggestions([]);

    apiClient
      .get(`/company/search?q=${encodeURIComponent(companyQuery.trim())}`)
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setSelectedCompany(res.data.data[0]);
        } else {
          setSelectedCompany(null);
        }
      })
      .catch(() => setSelectedCompany(null))
      .finally(() => setCompanyLoading(false));
  };

  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeQuery.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeError("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    setPincodeError("");
    setPincodeLoading(true);
    setPincodeResult(null);

    apiClient
      .get(`/pincode/check`, { params: { pincode: cleanPin } })
      .then((res) => {
        if (res.data.success) {
          setPincodeResult(res.data.data);
        } else {
          setPincodeError("Pincode information not found");
        }
      })
      .catch((err) => {
        setPincodeError(err.response?.data?.message || "Failed to query pincode serviceability");
      })
      .finally(() => setPincodeLoading(false));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      <Navbar />

      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-slate-200/80 dark:border-slate-900">
        {/* Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-violet-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>Next-Gen Digital Engineering Studio</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                BUILD DIGITAL. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  BUILD SMART.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                We build high-performance websites, web applications, mobile apps, and AI-powered digital solutions for modern forward-thinking businesses.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link href="#contact" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 12px 35px -6px rgba(59,130,246,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-sm tracking-tight shadow-xl shadow-blue-500/25 transition-all cursor-pointer border border-white/20"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <Link href="#services" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-white/10 shadow-sm transition-all cursor-pointer">
                    Explore Services
                  </button>
                </Link>
              </div>

              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Custom Software</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>AI &amp; Cloud Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Production Tested</span>
                </div>
              </div>
            </div>

            {/* Right Code Visual Window */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-3xl p-6 bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-blue-400" />
                    nvit.space/studio
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1.5">
                    <p className="text-blue-400 font-bold">// Initializing NVIT Digital Stack</p>
                    <p className="text-emerald-400">const studio = new NVITSpace();</p>
                    <p className="text-slate-400">await studio.deployProduct(&#123;</p>
                    <p className="pl-4 text-amber-300">type: &quot;Full-Stack Web &amp; AI Platform&quot;,</p>
                    <p className="pl-4 text-purple-300">security: &quot;Enterprise SSL &amp; JWT&quot;,</p>
                    <p className="pl-4 text-blue-300">database: &quot;PostgreSQL + Supabase&quot;,</p>
                    <p className="text-slate-400">&#125;);</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-800/40">
                      <span className="text-[10px] uppercase font-bold text-blue-400 block">Performance Score</span>
                      <span className="text-2xl font-black text-white block mt-0.5">100 / 100</span>
                      <span className="text-[10px] text-emerald-400 font-bold block mt-1">✓ Lighthouse Optimized</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-violet-800/40">
                      <span className="text-[10px] uppercase font-bold text-violet-400 block">Security Rating</span>
                      <span className="text-2xl font-black text-white block mt-0.5">A+ Enterprise</span>
                      <span className="text-[10px] text-violet-300 font-bold block mt-1">✓ Encrypted APIs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ───────────────────────────────────── */}
      <section id="services" className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/40 inline-block">
              Engineering Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              What We Build at NVIT.SPACE
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
              End-to-end digital solutions designed and engineered to scale modern enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.4)" }}
                  className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-none transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500">
                    <span>Explore Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILD (PROCESS) ─────────────────────────────── */}
      <section className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60 px-3.5 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/40 inline-block">
              Engineering Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              HOW WE BUILD
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              A structured 5-step engineering process from concept discovery to continuous scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="glass-card rounded-2xl p-5 bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 relative space-y-3"
              >
                <span className="text-2xl font-black font-mono text-blue-600/40 dark:text-blue-500/40 block">
                  {step.step}
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{step.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{step.description}</p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                    <ArrowRight className="w-5 h-5 text-blue-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS & DIGITAL PRODUCTS ───────────────────────── */}
      <section id="solutions" className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/40 inline-block">
              Featured Digital Products
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Products Built By NVIT.SPACE
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Demonstrating our full-stack engineering capabilities through high-performance tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                Company Intelligence
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Company Category Check</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Inserts company prefix queries directly into Supabase/PostgreSQL index to retrieve real-time bank policy categorization.
              </p>
              <Link href="/company-check" className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 pt-2">
                Launch Tool →
              </Link>
            </div>

            <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block">
                Location Intelligence
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pincode Serviceability Check</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Instant 6-digit Indian PIN code verification lookup mapped against regional banking coverage metrics.
              </p>
              <Link href="/pincode-check" className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 pt-2">
                Launch Tool →
              </Link>
            </div>

            <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
                Financial Engines
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">EMI &amp; Amortization Engine</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Interactive real-time monthly payment calculation engine supporting custom principal and interest rates.
              </p>
              <Link href="/finance-tools#emi-calculator" className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 pt-2">
                Launch Calculator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCE TOOLS SUITE ──────────────── */}
      <section id="finance-tools" className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/40 inline-block">
              Interactive Digital Utilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Finance Tools &amp; Data Utilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Useful tools built by NVIT.SPACE powered by real-time backend API data.
            </p>

            <div className="flex justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveToolTab("company")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeToolTab === "company"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                Company Check
              </button>
              <button
                onClick={() => setActiveToolTab("pincode")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeToolTab === "pincode"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                Pincode Check
              </button>
              <button
                onClick={() => setActiveToolTab("emi")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeToolTab === "emi"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                EMI Calculator
              </button>
            </div>
          </div>

          {activeToolTab === "company" && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Inspect Employer Company Category</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Type employer name (e.g. &quot;indus&quot;, &quot;tata&quot;, &quot;hcl&quot;) to inspect bank policy categorization using prefix search.
                </p>
              </div>

              <form onSubmit={handleCompanySearchSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={companyQuery}
                    onChange={handleCompanyChange}
                    placeholder="Type company name (e.g. indus)..."
                    className="w-full h-14 pl-12 pr-4 sm:pr-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="submit"
                    disabled={companyLoading}
                    className="hidden sm:flex absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center"
                  >
                    {companyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Inspect Company"}
                  </button>

                  {companySuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1">
                      {companySuggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setCompanyQuery(item.name);
                            setCompanySuggestions([]);
                            handleCompanySearchSubmit({ preventDefault: () => {} } as any);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-white flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <span className="text-[10px] text-slate-400">{item.city || item.state || "Active Record"}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </form>

              {selectedCompany && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-blue-200 dark:border-blue-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">{selectedCompany.companyName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {selectedCompany.city ? `${selectedCompany.city}, ${selectedCompany.state || ""}` : "Verified Database Entity"}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                      Verified Production Record
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {selectedCompany.banks?.slice(0, 4).map((b: any) => (
                      <div key={b.bankId} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block truncate">{b.bankName}</span>
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 block">{b.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {companySearchRan && !selectedCompany && !companyLoading && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  No company matching &quot;{companyQuery}&quot; found in database.
                </div>
              )}
            </div>
          )}

          {activeToolTab === "pincode" && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Inspect Regional PIN Code Serviceability</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Enter a 6-digit Indian PIN code to check regional banking coverage &amp; serviceability metrics.
                </p>
              </div>

              <form onSubmit={handlePincodeSearch} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeQuery}
                    onChange={(e) => setPincodeQuery(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit PIN code (e.g. 201301)..."
                    className="w-full h-14 pl-12 pr-4 sm:pr-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="submit"
                    disabled={pincodeLoading}
                    className="hidden sm:flex absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center"
                  >
                    {pincodeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Inspect Pincode"}
                  </button>
                </div>
                {pincodeError && <p className="text-xs text-rose-500 font-bold">{pincodeError}</p>}
              </form>

              {pincodeResult && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">PIN Code {pincodeResult.pincode} Details</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <div>City: <span className="text-slate-900 dark:text-white font-bold">{pincodeResult.city || "N/A"}</span></div>
                    <div>State: <span className="text-slate-900 dark:text-white font-bold">{pincodeResult.state || "N/A"}</span></div>
                    <div>Status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active Service Area</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeToolTab === "emi" && (
            <div className="max-w-4xl mx-auto">
              <EmiCalculator />
            </div>
          )}
        </div>
      </section>

      {/* ── WHY NVIT.SPACE ─────────────────────────────────────── */}
      <section className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/60 px-3.5 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/40 inline-block">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Why Engineers &amp; Businesses Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="glass-card rounded-3xl p-6 bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY STACK ───────────────────────────────────── */}
      <section className="py-16 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Powered By Modern Engineering Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ──────────────────────────────────────── */}
      <section id="about" className="py-20 relative border-b border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                About NVIT.SPACE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                WE BUILD SOFTWARE THAT SOLVES REAL PROBLEMS.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                NVIT.SPACE is a digital engineering studio focused on creating modern software, enterprise web applications, Android apps, and AI-powered systems. We believe clean architecture, fast UI, and reliable database systems form the backbone of modern business growth.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/about">
                <button className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-md shadow-blue-500/20">
                  Read Full About Story →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA & CONTACT FORM ────────────────────────────── */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/40 inline-block">
                Start a Conversation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Have an idea? Let&apos;s turn it into something real.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                Fill out the project inquiry below and our engineering team will connect within 24 hours.
              </p>
            </div>

            {contactSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Project Inquiry Received!</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-300">
                  Thank you! Our engineering studio team has received your message and will respond shortly.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Nishant Bhardwaj"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Type *</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Web Application">Web Application Development</option>
                      <option value="Mobile App">Mobile App (Android/iOS)</option>
                      <option value="AI Solution">AI Solution / Automation</option>
                      <option value="Backend & Database">Backend &amp; Database Architecture</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Details / Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your project, timeline, and key requirements..."
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-sm tracking-tight shadow-xl shadow-blue-500/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  {contactSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Start a Project →
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
