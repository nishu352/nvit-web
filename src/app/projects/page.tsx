import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Cpu, Globe, Layers, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Featured Engineering Projects & Case Studies",
  description:
    "Explore digital products, enterprise platforms, and open-source fintech tools engineered by NVIT.SPACE.",
  alternates: {
    canonical: "https://www.nvit.space/projects",
  },
};

const FEATURED_PROJECTS = [
  {
    title: "Pan-India Loan Category & Serviceability Engine",
    category: "Fintech Platform",
    badge: "Production Live",
    badgeVariant: "emerald" as const,
    summary:
      "A distributed policy underwriting engine indexing 19,500+ postal PIN codes and multi-bank employer tier matrices for sub-second loan eligibility assessment.",
    highlights: [
      "Sub-20ms lookup across 528,000+ indexed corporate employer records",
      "Unified policy categorization matrix spanning 14 leading Indian banks & NBFCs",
      "Automated fallback normalization handling spelling variances & corporate aliases",
    ],
    tech: ["Next.js", "Fastify", "PostgreSQL", "Prisma", "Redis", "TypeScript"],
    liveHref: "/company-check",
    caseStudyHref: "/resources/case-studies/enterprise-company-category-checker",
    ctaLabel: "Inspect Live Engine",
  },
  {
    title: "Multi-Tenant Loan Origination System (LOS)",
    category: "Banking Technology",
    badge: "Enterprise Platform",
    badgeVariant: "blue" as const,
    summary:
      "An end-to-end digital lending operating system powering KYC ingestion, automated bureau score parsing, multi-tier underwriting, and disbursement reconciliation.",
    highlights: [
      "Modular 7-step borrower onboarding funnel with instant Aadhaar/PAN OCR",
      "Rule-based credit policy engine evaluating bureau XML reports automatically",
      "Role-based administrative dashboards for underwriters, managers, and auditors",
    ],
    tech: ["React", "Node.js", "Fastify", "PostgreSQL", "Docker", "Tailwind CSS"],
    caseStudyHref: "/resources/case-studies/multi-tenant-loan-origination-system",
    ctaLabel: "View Case Study",
  },
  {
    title: "Pan-India Pincode Routing & Banking Intelligence",
    category: "Geospatial Data Engine",
    badge: "Public Utility",
    badgeVariant: "indigo" as const,
    summary:
      "High-speed postal intelligence service aggregating branch coverage, postal zoning, and district-level lender serviceability across India.",
    highlights: [
      "100% coverage of 19,500+ postal PIN codes mapped to district and circle hubs",
      "Instant positive/negative coverage flags for tier-1 and tier-2 financial institutions",
      "Zero-dependency public API endpoint delivering JSON serviceability responses",
    ],
    tech: ["Next.js", "Fastify", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    liveHref: "/pincode-check",
    caseStudyHref: "/resources/case-studies/pan-india-pincode-eligibility-engine",
    ctaLabel: "Check Pincode Tool",
  },
  {
    title: "Financial EMI & Amortization Computation Suite",
    category: "Financial Tooling",
    badge: "Interactive Suite",
    badgeVariant: "violet" as const,
    summary:
      "A client-side financial computation engine delivering instant mathematical amortisation schedules, interest breakdowns, and loan eligibility evaluations.",
    highlights: [
      "Supports Reducing Balance, Personal, Home, and Business loan amortization algorithms",
      "Real-time chart visualization of principal vs interest balance across tenures",
      "Zero-latency mathematical execution without server round-trips",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    liveHref: "/finance-tools",
    ctaLabel: "Launch Calculators",
  },
  {
    title: "NVIT Administrative CMS & Workflow Engine",
    category: "Enterprise Control Panel",
    badge: "Internal System",
    badgeVariant: "slate" as const,
    summary:
      "A high-throughput administrative console managing real-time website CMS draft publishing, AI header mapping, and bulk spreadsheet ETL data ingestion.",
    highlights: [
      "Atomic draft & publish workflow preventing accidental production overrides",
      "Bulk Excel spreadsheet parser mapping columns to normalized database schema",
      "Encrypted session management with granular permission access controls",
    ],
    tech: ["React", "Fastify", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveHref: "/services/web-application-development/admin-dashboard-development",
    ctaLabel: "Explore Architecture",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Projects" }]} />

          <div className="space-y-4 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Engineering Portfolio</p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              ENGINEERED PRODUCTS &amp; PLATFORMS.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Explore key software systems, fintech data engines, and digital platforms engineered by the NVIT.SPACE studio.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Content */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <SectionHeading
          badge="Featured Engineering"
          badgeIcon={<Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          badgeVariant="blue"
          title="Selected Systems & Architectures"
          subtitle="Explore platforms developed for high performance, transactional throughput, and mission-critical reliability:"
        />

        <div className="space-y-8">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-6 hover:border-blue-500/40 transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                      {proj.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {proj.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {proj.summary}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 pt-2 md:pt-0">
                  {proj.liveHref && (
                    <Link href={proj.liveHref}>
                      <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5 whitespace-nowrap">
                        {proj.ctaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  )}
                  {proj.caseStudyHref && (
                    <Link href={proj.caseStudyHref}>
                      <button className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 cursor-pointer transition-all flex items-center justify-center gap-1.5 whitespace-nowrap">
                        Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Engineered Highlights */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                  Engineered Capabilities:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {proj.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 font-mono">
                  Stack:
                </span>
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-semibold text-slate-600 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Consultation CTA Banner */}
        <section className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Have a Mission-Critical System to Engineer?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Discuss your product requirements, cloud architecture, and delivery timeline with our software engineering leads.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-tight shadow-md shadow-blue-500/20 cursor-pointer transition-all flex items-center gap-2">
              Start Technical Consultation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
