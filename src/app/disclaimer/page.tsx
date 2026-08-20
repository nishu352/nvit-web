import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer — NVIT.SPACE",
  description:
    "Legal and financial calculation disclaimer for NVIT.SPACE digital utilities and services.",
  alternates: {
    canonical: "https://www.nvit.space/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Disclaimer" }]} />

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Disclaimer</p>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              DISCLAIMER
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: August 2026 • NVIT.SPACE
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">1. Not Financial or Investment Advice</h2>
          <p>
            The financial tools, EMI calculators, and loan comparison matrices provided on NVIT.SPACE are intended purely for illustrative and estimation purposes. They do not constitute formal credit offers, financial advice, or underwriting commitments by NVIT.SPACE or its affiliated partners.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. Partner Policies &amp; Third-Party Data</h2>
          <p>
            Bank category tiering, interest rates, and loan serviceability boundaries are subject to real-time revision by respective lending institutions without prior notice. Users must confirm terms directly with authorized lender representatives.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
