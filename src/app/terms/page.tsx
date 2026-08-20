import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — NVIT.SPACE",
  description:
    "Terms of Service governing the use of websites, digital tools, and engineering services provided by NVIT.SPACE.",
  alternates: {
    canonical: "https://www.nvit.space/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Terms of Service</p>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              TERMS OF SERVICE
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: August 2026 • NVIT.SPACE
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the NVIT.SPACE website, digital tools, APIs, and associated engineering services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platforms.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. Scope of Services</h2>
          <p>
            NVIT.SPACE operates as a specialized digital engineering studio providing custom software development, web &amp; mobile application engineering, AI automation integrations, and financial calculation tools. Specific project engagements are governed by individual Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">3. Intellectual Property</h2>
          <p>
            All website visual assets, brand trademarks, logos, custom software codebases, and architectural design systems developed directly by NVIT.SPACE are the intellectual property of NVIT.SPACE unless explicitly transferred via written client contract.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">4. Disclaimer of Warranties</h2>
          <p>
            Our public calculators and tools are provided &quot;as is&quot; for informational and estimation purposes. While we strive for absolute mathematical precision, financial calculations should be verified with official lending institutions prior to taking borrowing decisions.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
