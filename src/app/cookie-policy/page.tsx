import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy — NVIT.SPACE",
  description:
    "Cookie Policy for NVIT.SPACE, explaining our essential cookie and local preference storage policies.",
  alternates: {
    canonical: "https://www.nvit.space/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Cookie Policy</p>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              COOKIE POLICY
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: August 2026 • NVIT.SPACE
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">1. What Are Cookies</h2>
          <p>
            Cookies and browser local storage items are small data fragments saved to your device to store user preferences, maintain session state, and enhance site responsiveness.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. How NVIT.SPACE Uses Cookies</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Theme Preference:</strong> Storing your preferred visual mode (Light / Dark / System) via localStorage.</li>
            <li><strong>Essential Operations:</strong> Preserving session tokens and CSRF security headers during form submissions.</li>
            <li><strong>Performance Telemetry:</strong> Aggregated anonymous latency tracking for Next.js Core Web Vitals optimization.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
