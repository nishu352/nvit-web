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
  Mail,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  Layers,
  Rocket,
  Activity,
} from "lucide-react";
import { getCategoryStatus } from "@/utils/categoryStatus";
import { motion, AnimatePresence } from "framer-motion";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";
import MotionReveal, { StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Counter from "@/components/ui/Counter";

const SERVICES = [
  {
    title: "Website Development",
    description: "High-performance, SEO-optimized digital web experiences built with Next.js, React, and modern web frameworks.",
    icon: Globe,
    tag: "Web & UX",
    href: "/services/website-development",
  },
  {
    title: "Web Application Development",
    description: "Scalable SaaS platforms, custom dashboards, enterprise web portals, and complex cloud applications.",
    icon: Code2,
    tag: "Full-Stack",
    href: "/services/web-application-development",
  },
  {
    title: "Mobile Apps (Android & iOS)",
    description: "Native and cross-platform mobile apps engineered for speed, intuitive UI, and seamless offline sync.",
    icon: Smartphone,
    tag: "Mobile",
    href: "/services/mobile-app-development",
  },
  {
    title: "AI Solutions & Integration",
    description: "Smart AI agents, LLM integrations, automated document extraction, and machine learning workflows.",
    icon: Cpu,
    tag: "AI & ML",
    href: "/services/ai-development",
  },
  {
    title: "Backend & API Systems",
    description: "Robust REST & GraphQL APIs, microservices, PostgreSQL/Supabase database schemas, and cloud architecture.",
    icon: Database,
    tag: "Cloud Backend",
    href: "/services/backend-development",
  },
  {
    title: "Business Automation",
    description: "Custom internal tools, workflow automation engines, CRM/ERP integrations, and data pipelines.",
    icon: Zap,
    tag: "Automation",
    href: "/services/business-automation",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "DISCOVERY & ROADMAP",
    tag: "Phase 01",
    description: "Requirement discovery, tech stack selection, and architecture blueprinting.",
    deliverable: "Tech Spec & Blueprint",
    icon: Compass,
  },
  {
    step: "02",
    title: "UI/UX & DESIGN SYSTEM",
    tag: "Phase 02",
    description: "High-fidelity Figma wireframes, component design, and glassmorphic UI systems.",
    deliverable: "Design System & Tokens",
    icon: Layers,
  },
  {
    step: "03",
    title: "AGILE ENGINEERING",
    tag: "Phase 03",
    description: "Clean-code Next.js/React development, API integrations, and security hardening.",
    deliverable: "Production Codebase",
    icon: Code2,
  },
  {
    step: "04",
    title: "CI/CD & DEPLOYMENT",
    tag: "Phase 04",
    description: "Automated test suites, Vercel/Docker cloud deployment, and production launch.",
    deliverable: "Live Production URL",
    icon: Rocket,
  },
  {
    step: "05",
    title: "MONITORING & SCALE",
    tag: "Phase 05",
    description: "24/7 SLA uptime tracking, database index tuning, and continuous feature expansion.",
    deliverable: "Auto-Scaling System",
    icon: Activity,
  },
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
  const { data: cms } = useWebsiteCMS();
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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden transition-colors duration-300 selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* ── PREMIUM APPLE HERO SECTION ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-hero-gradient">
        
        {/* Subtle ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 dark:from-blue-600/15 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-violet-500/10 dark:from-violet-600/15 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Editorial Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="lg:col-span-5 space-y-8"
            >
              
              {/* Eyebrow Tag */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
                  Digital Engineering Studio
                </span>
              </motion.div>

              {/* Giant Hero Headline */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
                }}
                className="space-y-0"
              >
                <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black tracking-[-0.04em] leading-[0.94] text-zinc-900 dark:text-white">
                  We build<br />
                  <span className="text-zinc-400 dark:text-zinc-500">what</span><br />
                  sells.
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md font-medium"
              >
                From data engineering pipelines to high-converting custom web apps — NVIT.SPACE engineers technology infrastructure designed to outscale your competition.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="flex flex-wrap items-center gap-3"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-sm font-bold tracking-tight shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/case-studies">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 text-sm font-bold tracking-tight border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-white/10 backdrop-blur-xl shadow-sm cursor-pointer"
                  >
                    View Our Work
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Mini Feature Pills */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6 } },
                }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {["Next.js & React", "AI & LLM Integrations", "99.99% Uptime SLA"].map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100/80 dark:bg-white/5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    {feature}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Floating Capsule & Orbital Squircles */}
            <div className="lg:col-span-7 relative flex items-center justify-center py-12 lg:py-6 select-none">
              
              {/* Background Editorial Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
                <span className="text-[clamp(6rem,16vw,12rem)] font-black uppercase tracking-tighter text-zinc-950/[0.035] dark:text-white/[0.035] leading-none whitespace-nowrap select-none">
                  ENGINEERED
                </span>
              </div>

              {/* Orbital Container */}
              <div className="relative w-full max-w-[500px] flex items-center justify-center min-h-[440px]">

                {/* SQUIRCLE ORBIT 1: Top-Left */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-10, -8, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -left-8 sm:-top-14 sm:-left-14 z-20"
                >
                  <div className="squircle-orbit w-28 h-36 sm:w-34 sm:h-42 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/orbit-1.jpg"
                      alt="UI & Frontend Architecture Lead"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">UX Engineering</span>
                    </div>
                  </div>
                </motion.div>

                {/* SQUIRCLE ORBIT 2: Top-Right */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [12, 14, 12] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-10 -right-8 sm:-top-12 sm:-right-14 z-20"
                >
                  <div className="squircle-orbit w-28 h-32 sm:w-34 sm:h-38 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/orbit-3.jpg"
                      alt="Live Analytics Device"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">Sub-45ms Core</span>
                    </div>
                  </div>
                </motion.div>

                {/* SQUIRCLE ORBIT 3: Mid-Left */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [6, 4, 6] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-22 z-20"
                >
                  <div className="squircle-orbit w-28 h-34 sm:w-34 sm:h-40 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/orbit-2.jpg"
                      alt="Software Systems Architect"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">Backend & Cloud</span>
                    </div>
                  </div>
                </motion.div>

                {/* SQUIRCLE ORBIT 4: Mid-Right */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-1/2 -translate-y-1/2 -right-12 sm:-right-22 z-20"
                >
                  <div className="squircle-orbit w-28 h-34 sm:w-34 sm:h-40 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/orbit-4.jpg"
                      alt="Digital Design Director"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">Product Strategy</span>
                    </div>
                  </div>
                </motion.div>

                {/* SQUIRCLE ORBIT 5: Bottom-Left */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [10, 8, 10] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-12 z-20"
                >
                  <div className="squircle-orbit w-28 h-30 sm:w-34 sm:h-36 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/hero-clean-tech-3d.jpg"
                      alt="AI Architecture"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">AI Pipelines</span>
                    </div>
                  </div>
                </motion.div>

                {/* SQUIRCLE ORBIT 6: Bottom-Right */}
                <motion.div
                  animate={{ y: [0, -7, 0], rotate: [-12, -10, -12] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute -bottom-10 -right-6 sm:-bottom-14 sm:-right-12 z-20"
                >
                  <div className="squircle-orbit w-32 h-26 sm:w-40 sm:h-34 relative group cursor-pointer shadow-xl">
                    <img
                      src="/images/hero-dashboard-mockup.jpg"
                      alt="Data Dashboard Engine"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <span className="text-[9px] font-bold text-white leading-tight">PostgreSQL Edge</span>
                    </div>
                  </div>
                </motion.div>

                {/* CENTER: Fourmula Floating Navigation Capsule */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="fourmula-capsule w-full max-w-[290px] sm:max-w-[320px] p-6 sm:p-7 relative z-10 space-y-5 bg-[#E5E5E7] dark:bg-[#15151c]/90 dark:border dark:border-white/10 shadow-2xl"
                >
                  
                  {/* Top Capsule Control Bar */}
                  <div className="flex items-center justify-between bg-zinc-950 dark:bg-black text-white px-3.5 py-2 rounded-full shadow-lg border border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-tight">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>NVIT.CORE</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                      <span>99.9%</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded-full text-white font-bold">LIVE</span>
                    </div>
                  </div>

                  {/* Section Label */}
                  <div className="space-y-2.5 pt-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                      Digital Capabilities
                    </p>

                    {/* Bold Menu List */}
                    <div className="space-y-2 font-black text-zinc-900 dark:text-white text-lg sm:text-xl tracking-tight">
                      <Link href="/services/website-development" className="block hover:translate-x-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all">
                        Web Applications
                      </Link>
                      <Link href="/services/mobile-app-development" className="block hover:translate-x-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all">
                        Mobile Apps (iOS &amp; Android)
                      </Link>
                      <Link href="/services/ai-development" className="block hover:translate-x-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all">
                        AI Pipelines &amp; Agents
                      </Link>
                      <Link href="/services/backend-development" className="block hover:translate-x-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all">
                        Cloud Systems &amp; APIs
                      </Link>
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="h-px w-full bg-zinc-300/80 dark:bg-white/10" />

                  {/* Secondary Links & Footer */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                      Enterprise Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300">
                      <span className="bg-white/80 dark:bg-white/10 px-2.5 py-1 rounded-lg border border-zinc-300/60 dark:border-white/10 shadow-xs">Next.js 15</span>
                      <span className="bg-white/80 dark:bg-white/10 px-2.5 py-1 rounded-lg border border-zinc-300/60 dark:border-white/10 shadow-xs">PostgreSQL</span>
                      <span className="bg-white/80 dark:bg-white/10 px-2.5 py-1 rounded-lg border border-zinc-300/60 dark:border-white/10 shadow-xs">LLM APIs</span>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2">
                    <Link href="/contact" className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-md group">
                      <span>Schedule Architecture Call</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                </motion.div>

              </div>

            </div>
          </div>

          {/* Wide Glass Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-16 sm:mt-24 glass-stats-bar px-6 sm:px-10 py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              {[
                { count: 50, suffix: "+", label: "Projects Shipped" },
                { count: 99.99, suffix: "%", label: "Uptime SLA", isFloat: true },
                { count: 5, suffix: "+", label: "Years of Excellence" },
                { count: 2500000, prefix: "", suffix: "+", label: "Daily API Calls", isRaw: true },
                { count: 100, suffix: "%", label: "On-Time Delivery" },
              ].map((item, i) => (
                <div key={item.label} className={`flex items-center gap-4 ${i > 0 ? "sm:border-l border-zinc-200 dark:border-white/10 sm:pl-6" : ""}`}>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                      {item.isFloat ? (
                        <span>99.99%</span>
                      ) : item.isRaw ? (
                        <span>2.5M+</span>
                      ) : (
                        <Counter value={item.count} suffix={item.suffix} />
                      )}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL SPLIT SECTION ─────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-[#050507] border-t border-zinc-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT: Off-White Editorial Card */}
            <MotionReveal direction="up" className="lg:col-span-6 flex">
              <SpotlightCard className="w-full bg-[#F4F4F5] dark:bg-zinc-900/60 rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-zinc-200/80 dark:border-white/10 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    01 / Architecture & Engineering
                  </span>
                  <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center text-xs font-black">N</span>
                </div>

                <div className="my-10 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-zinc-900 dark:text-white">
                    We provide transparent digital engineering to enable your competitive advantage.
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                    NVIT.SPACE collaborates with growth-stage businesses to design high-performance web applications, mobile experiences, and AI-driven backend infrastructure.
                  </p>
                </div>

                <div className="space-y-6 border-t border-zinc-300/60 dark:border-white/10 pt-6">
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {["Serverless & Edge Systems", "Android & iOS Mobile Apps", "PostgreSQL Data Indexing", "LLM & AI Pipeline Integration"].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="inline-flex items-center justify-between w-full sm:w-auto gap-6 px-6 py-3.5 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-lg">
                    <span>Schedule Architecture Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SpotlightCard>
            </MotionReveal>

            {/* RIGHT: Stats & Intelligence Card */}
            <MotionReveal direction="up" delay={0.15} className="lg:col-span-6 flex">
              <SpotlightCard className="w-full bg-zinc-900 dark:bg-zinc-950/80 rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-zinc-800 dark:border-white/10 text-white shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                    System Performance & Intelligence
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* 4 Stats */}
                <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden my-8">
                  {[
                    { count: 150, suffix: "+", label: "Apps Deployed" },
                    { stat: "99.99%", label: "Cloud SLA" },
                    { stat: "2.5M+", label: "Daily API Calls" },
                    { stat: "<45ms", label: "Response Latency" },
                  ].map((s) => (
                    <div key={s.label} className="bg-zinc-900 dark:bg-zinc-900/90 p-5 space-y-1">
                      <span className="text-2xl font-mono font-black text-white tracking-tight">
                        {s.count ? <Counter value={s.count} suffix={s.suffix} /> : s.stat}
                      </span>
                      <p className="text-xs font-bold text-zinc-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-zinc-400 font-mono">
                  Translating software architecture into measurable business value for enterprises across India and globally.
                </p>
              </SpotlightCard>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-[#FAFAFA] dark:bg-[#08080C] border-t border-zinc-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <MotionReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 inline-block mb-4">
                Engineering Capabilities
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                What We Build<br />at NVIT.SPACE
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xs lg:text-right">
              End-to-end digital solutions designed and engineered to scale modern enterprises.
            </p>
          </MotionReveal>

          {/* Asymmetric Service Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* CARD 1: Website Dev */}
            <div className="lg:col-span-8">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[280px]">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white dark:text-zinc-950" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Web & UX Engineering</span>
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Website Development & Design
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                      High-performance, SEO-optimized digital web experiences built with Next.js, React, and Framer Motion. Engineered for sub-second LCP scores and maximum conversion.
                    </p>
                  </div>
                </div>
                
                {/* Mini code widget */}
                <div className="bg-zinc-900 dark:bg-black rounded-2xl p-4 font-mono text-[11px] space-y-1.5 max-w-sm border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] border-b border-white/10 pb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>page.tsx — 99/100 Speed Score</span>
                  </div>
                  <div className="text-zinc-300 space-y-0.5">
                    <p><span className="text-violet-400">import</span> <span className="text-zinc-100">&#123; NextApp &#125;</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">&#39;nvit/core&#39;</span></p>
                    <p className="text-zinc-500">// Zero-bloat, SSR + ISR enabled</p>
                  </div>
                </div>

                <Link href="/services/website-development" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-4 transition-colors">
                  Explore Web Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </SpotlightCard>
            </div>

            {/* CARD 2: Mobile Apps */}
            <div className="lg:col-span-4">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[280px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-800/40 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-[11px] font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-1 rounded-full border border-violet-100 dark:border-violet-800/40 font-bold">Mobile</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    Mobile Apps (Android & iOS)
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Native Kotlin, Swift, and React Native apps engineered for smooth 60fps animations and offline sync.
                  </p>
                </div>

                <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 rounded-2xl p-3 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>NVIT Mobile</span>
                    <span className="text-emerald-500 font-bold">● Live</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-3/4 rounded-full" />
                  </div>
                </div>

                <Link href="/services/mobile-app-development" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 mt-3 transition-colors">
                  View Mobile Stack <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </SpotlightCard>
            </div>

            {/* CARD 3: AI Solutions */}
            <div className="lg:col-span-4">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[260px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/40 font-bold">AI & ML</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    AI Solutions & Agents
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Custom LLM agents, automated document extraction, vector search embeddings, and OpenAI/Claude workflows.
                  </p>
                </div>

                <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 rounded-2xl p-3 font-mono text-[10px] space-y-1">
                  <div className="text-zinc-500">&gt; Prompt: Generate enterprise API...</div>
                  <div className="text-emerald-500 font-bold">✓ LLM Pipeline Ready (10x faster)</div>
                </div>

                <Link href="/services/ai-development" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-3 transition-colors">
                  Explore AI Pipelines <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </SpotlightCard>
            </div>

            {/* CARD 4: Web App & SaaS */}
            <div className="lg:col-span-8">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[260px]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-white dark:text-zinc-950" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Full-Stack SaaS</span>
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      Web Applications & Enterprise SaaS
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Scalable cloud portals, admin dashboards, multi-tenant SaaS platforms, and enterprise data management tools with robust role-based security.
                    </p>
                    <Link href="/services/web-application-development" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white mt-2 transition-colors">
                      Explore SaaS Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="md:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>Active Sessions</span>
                      <span className="text-zinc-900 dark:text-white font-bold">12,480 Users</span>
                    </div>
                    <div className="h-12 w-full flex items-end justify-between gap-1 pt-1">
                      {[40, 65, 45, 80, 95, 70, 85, 100].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-900 dark:hover:bg-white rounded-t transition-all" />
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* CARD 5: Backend */}
            <div className="lg:col-span-6">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[240px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800/40 flex items-center justify-center">
                      <Database className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-100 dark:border-sky-800/40 font-bold">Cloud Backend</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    Backend Architecture & API Systems
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    High-throughput REST/GraphQL APIs, microservices, Supabase/PostgreSQL indexing, and serverless backends.
                  </p>
                </div>
                <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 rounded-xl p-3 font-mono text-[10px]">
                  <div className="text-zinc-500">POST /api/v1/auth/deploy</div>
                  <div className="text-emerald-500 font-bold mt-1">HTTP 200 OK — 11ms</div>
                </div>
                <Link href="/services/backend-development" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 mt-3 transition-colors">
                  View API Architecture <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </SpotlightCard>
            </div>

            {/* CARD 6: Business Automation */}
            <div className="lg:col-span-6">
              <SpotlightCard className="h-full p-8 group flex flex-col justify-between min-h-[240px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/40 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-800/40 font-bold">Automation</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Business Automation & Workflow Engines
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Custom internal tools, data pipelines, webhook connectors, and CRM/ERP integration workflows that eliminate manual task overhead.
                  </p>
                </div>
                <div className="mt-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 rounded-xl p-3 flex items-center justify-between font-mono text-[10px]">
                  <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 px-2 py-1 rounded-lg">Webhook</span>
                  <span className="text-zinc-400">→</span>
                  <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 px-2 py-1 rounded-lg">Python Engine</span>
                  <span className="text-zinc-400">→</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 px-2 py-1 rounded-lg">Database</span>
                </div>
                <Link href="/services/business-automation" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 mt-3 transition-colors">
                  Explore Workflows <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW WE BUILD (PROCESS) ─────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-[#050507] border-t border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 inline-block mb-4">
                Engineering Workflow
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">How We Build</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xs">A structured 5-step process from concept discovery to continuous scale.</p>
          </MotionReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <StaggerItem key={step.title}>
                  <SpotlightCard className="h-full group p-6 flex flex-col justify-between cursor-default min-h-[280px]">
                    <div className="flex items-start justify-between">
                      <span className="text-5xl font-black tracking-tighter text-zinc-200 dark:text-zinc-800 font-mono leading-none group-hover:text-zinc-300 dark:group-hover:text-zinc-700 transition-colors">
                        {step.step}
                      </span>
                      <div className="w-9 h-9 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-950 group-hover:scale-110 transition-transform">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">{step.tag}</span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">{step.title}</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{step.description}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-white/10 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{step.deliverable}</span>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FINANCE TOOLS SUITE ─────────────────────────────────────── */}
      <section id="finance-tools" className="py-24 bg-[#FAFAFA] dark:bg-[#08080C] border-t border-zinc-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 inline-block mb-4">
                Interactive Digital Utilities
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">Finance Tools<br />&amp; Data Utilities</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xs">Useful tools built by NVIT.SPACE powered by real-time backend API data.</p>
          </MotionReveal>

          {/* Tab Selector with Smooth Animated Pill */}
          <div className="flex gap-2 mb-8 bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-1.5 w-fit border border-zinc-200 dark:border-white/10 relative">
            {(["company", "pincode", "emi"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveToolTab(tab)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer capitalize z-10 ${
                  activeToolTab === tab
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {activeToolTab === tab && (
                  <motion.div
                    layoutId="activeToolTabPill"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200/80 dark:border-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab === "company" ? "Company Check" : tab === "pincode" ? "Pincode Check" : "EMI Calculator"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeToolTab === "company" && (
              <motion.div
                key="company-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="glass-tool-panel max-w-4xl mx-auto space-y-6 p-6 sm:p-8"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Inspect Employer Company Category</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
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
                      className="w-full h-14 pl-12 pr-4 sm:pr-32 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:border-zinc-800 dark:focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    />
                    <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <button
                      type="submit"
                      disabled={companyLoading}
                      className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center transition-all"
                    >
                      {companyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Inspect Company</span><Search className="w-4 h-4 sm:hidden" /></>}
                    </button>

                    {companySuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-2 z-50 shadow-xl space-y-1">
                        {companySuggestions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setCompanyQuery(item.name);
                              setCompanySuggestions([]);
                              handleCompanySearchSubmit({ preventDefault: () => {} } as any);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white flex items-center justify-between cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <span className="text-[10px] text-zinc-400">{item.city || item.state || "Active Record"}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </form>

                {selectedCompany && (
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                      <div>
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{selectedCompany.companyName}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {selectedCompany.city ? `${selectedCompany.city}, ${selectedCompany.state || ""}` : "Verified Database Entity"}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-500">Verified</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {selectedCompany.banks?.slice(0, 4).map((b: any) => {
                        const visual = getCategoryStatus(b.category);
                        return (
                          <div key={b.bankId} className="p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-center space-y-1.5 flex flex-col justify-between">
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block truncate">{b.bankName}</span>
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg border block ${visual.badgeClass}`}>{b.category || "UNLISTED"}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {companySearchRan && !selectedCompany && !companyLoading && (
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    No company matching &quot;{companyQuery}&quot; found in database.
                  </div>
                )}
              </motion.div>
            )}

            {activeToolTab === "pincode" && (
              <motion.div
                key="pincode-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="glass-tool-panel max-w-4xl mx-auto space-y-6 p-6 sm:p-8"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Inspect Regional PIN Code Serviceability</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
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
                      className="w-full h-14 pl-12 pr-4 sm:pr-32 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:border-zinc-800 dark:focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    />
                    <MapPin className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <button
                      type="submit"
                      disabled={pincodeLoading}
                      className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center transition-all"
                    >
                      {pincodeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Inspect Pincode</span><MapPin className="w-4 h-4 sm:hidden" /></>}
                    </button>
                  </div>
                  {pincodeError && <p className="text-xs text-rose-500 font-bold">{pincodeError}</p>}
                </form>

                {pincodeResult && (
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-3">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white">PIN Code {pincodeResult.pincode} Details</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      <div>City: <span className="text-zinc-900 dark:text-white font-bold">{pincodeResult.city || "N/A"}</span></div>
                      <div>State: <span className="text-zinc-900 dark:text-white font-bold">{pincodeResult.state || "N/A"}</span></div>
                      <div>Status: <span className="text-emerald-500 font-bold">Active Service Area</span></div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeToolTab === "emi" && (
              <motion.div
                key="emi-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl mx-auto"
              >
                <EmiCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── WHY NVIT.SPACE ─────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-[#050507] border-t border-zinc-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 inline-block">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Why Engineers &amp; Businesses Choose Us
            </h2>
          </MotionReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => {
              const IconComp = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <SpotlightCard className="h-full rounded-3xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{item.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── TECHNOLOGY STACK ───────────────────────────────────────── */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-[#08080C] border-t border-zinc-200/60 dark:border-white/5 relative">
        <MotionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Powered By Modern Engineering Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {TECH_STACK.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30 transition-colors shadow-sm cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </MotionReveal>
      </section>

      {/* ── ABOUT SECTION PREVIEW ──────────────────────────────────── */}
      <section id="about" className="py-24 bg-white dark:bg-[#050507] border-t border-zinc-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionReveal>
            <SpotlightCard className="rounded-3xl p-8 sm:p-12 lg:p-14 border border-zinc-200/80 dark:border-white/10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-bold border border-zinc-200/80 dark:border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>About NVIT.SPACE</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.08]">
                    WE BUILD SOFTWARE THAT SOLVES REAL PROBLEMS.
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl">
                    NVIT.SPACE is a specialized digital engineering studio focused on creating modern software, enterprise web applications, Android &amp; iOS apps, and AI-powered automation systems. We believe clean architecture, fast UI, and reliable database systems form the backbone of modern enterprise growth.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Production Grade Next.js 15</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Zero-Bloat Microservices</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Sub-45ms Edge APIs</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
                  <Link href="/about" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Read Full About Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </MotionReveal>
        </div>
      </section>

      {/* ── FINAL CTA & CONTACT FORM ───────────────────────────────── */}
      <section id="contact" className="py-24 bg-[#FAFAFA] dark:bg-[#08080C] border-t border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionReveal>
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-3xl p-8 sm:p-12 text-white space-y-8 border border-zinc-800 dark:border-white/10 shadow-2xl">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 inline-block">
                  Start a Conversation
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Have an idea? Let&apos;s turn it into something real.
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-xl mx-auto">
                  Fill out the project inquiry below and our engineering team will connect within 24 hours.
                </p>
              </div>

              {contactSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Project Inquiry Received!</h3>
                  <p className="text-xs text-emerald-300">
                    Thank you! Our engineering studio team has received your message and will respond shortly.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-bold cursor-pointer transition-all shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Nishant Bhardwaj"
                        className="w-full h-12 px-4 rounded-xl bg-zinc-800/90 border border-white/10 text-white text-xs focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full h-12 px-4 rounded-xl bg-zinc-800/90 border border-white/10 text-white text-xs focus:border-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full h-12 px-4 rounded-xl bg-zinc-800/90 border border-white/10 text-white text-xs focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300">Project Type *</label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-zinc-800/90 border border-white/10 text-white text-xs focus:border-white/40 focus:outline-none cursor-pointer"
                      >
                        <option value="Website Development" className="bg-zinc-900 text-white">Website Development</option>
                        <option value="Web Application" className="bg-zinc-900 text-white">Web Application Development</option>
                        <option value="Mobile App" className="bg-zinc-900 text-white">Mobile App (Android/iOS)</option>
                        <option value="AI Solution" className="bg-zinc-900 text-white">AI Solution / Automation</option>
                        <option value="Backend & Database" className="bg-zinc-900 text-white">Backend &amp; Database Architecture</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Project Details / Requirements *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your project, timeline, and key requirements..."
                      className="w-full p-4 rounded-xl bg-zinc-800/90 border border-white/10 text-white text-xs focus:border-white/40 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full h-12 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {contactSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
