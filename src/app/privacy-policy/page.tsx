import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — NVIT.SPACE",
  description:
    "Privacy Policy for NVIT.SPACE, outlining our data collection, processing, and protection commitments.",
  alternates: {
    canonical: "https://www.nvit.space/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Privacy Policy</p>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              PRIVACY POLICY
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: August 2026 • NVIT.SPACE
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            At NVIT.SPACE (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to safeguarding the privacy and security of visitors, clients, and platform users. This Privacy Policy details how we collect, handle, store, and protect information when you visit our website, use our financial tools, or engage our digital engineering services.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. Information We Collect</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Contact Details:</strong> Name, email address, phone number, and project details submitted through our contact and inquiry forms.</li>
            <li><strong>Platform Usage Data:</strong> Anonymized telemetry such as browser type, operating system, pages visited, and IP addresses collected for service performance optimization.</li>
            <li><strong>Finance Tools Input:</strong> Loan amounts, tenures, or interest values entered in our client-side calculators are computed locally and not stored without explicit user submission.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">3. How We Use Information</h2>
          <p>
            We strictly use collected information to:
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Respond to project inquiries and schedule technical consultations.</li>
            <li>Provide, maintain, and optimize our software services and web applications.</li>
            <li>Detect and prevent security threats, unauthorized access, and malicious activities.</li>
            <li>Comply with applicable legal obligations and enterprise regulatory requirements.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">4. Data Security &amp; Protection</h2>
          <p>
            We implement industry-standard SSL/TLS encryption, secure database access governance, and strict firewall policies. We never sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">5. Contact Privacy Team</h2>
          <p>
            If you have questions or concerns regarding our privacy practices, please contact our data governance team at <a href="mailto:info@nvit.space" className="text-blue-600 font-bold hover:underline">info@nvit.space</a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
