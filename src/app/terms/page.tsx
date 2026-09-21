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
            By accessing or using the NVIT.SPACE website, digital tools, APIs, calculators, and associated engineering services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue platform use immediately.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. Scope of Services &amp; Engagements</h2>
          <p>
            NVIT.SPACE operates as a specialized digital engineering studio providing custom software development, web &amp; mobile application engineering, AI automation integrations, and financial calculation tools. Specific enterprise development engagements are governed by separate Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">3. Acceptable Use Policy</h2>
          <p>
            Users agree to use NVIT.SPACE solely for lawful informational and technical consultation purposes. You agree not to:
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Engage in automated scraping, data mining, or extraction of website content or underlying database records without prior written consent.</li>
            <li>Attempt to probe, scan, or breach the security, authentication, or infrastructure of our web servers or backend APIs.</li>
            <li>Transmit malicious code, viruses, automated bots, or participate in denial-of-service (DoS) attacks against our services.</li>
            <li>Misrepresent your identity or submit fraudulent project inquiries or feedback requests.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">4. Calculators &amp; Digital Tools Limitations</h2>
          <p>
            Our public calculators (including the Loan EMI Calculator, Loan Eligibility Calculator, Pincode Checker, and Company Policy Checker) are provided solely for illustrative, mathematical, and estimation purposes:
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Outputs do not constitute official credit approvals, binding quotes, or underwriting decisions by NVIT.SPACE or any lending institution.</li>
            <li>Calculated values are estimates based on standard mathematical models (such as reducing balance amortization) and may differ from final lender sanction letters due to rounding, fee structures, processing charges, or tax adjustments.</li>
            <li>Bank company categorization matrices and postal PIN code serviceability boundaries are based on compiled reference indexes and are subject to real-time revision by respective banks and NBFCs.</li>
            <li>Users must verify all financial calculations directly with authorized lending institutions before executing credit agreements.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">5. Intellectual Property Rights</h2>
          <p>
            All website design systems, graphic assets, typography hierarchies, brand trademarks, logos, custom software codebases, and architectural documentation created directly by NVIT.SPACE are the proprietary intellectual property of NVIT.SPACE, protected by copyright and intellectual property laws. Content may not be copied, reproduced, or distributed without explicit written permission.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">6. Third-Party Links &amp; Advertisements</h2>
          <p>
            The website may contain advertisements served by Google AdSense and links to third-party websites or services. NVIT.SPACE does not endorse, guarantee, or assume responsibility for any products, services, or information offered by third-party advertisers or external websites linked from our platform. Accessing third-party resources is done at your own discretion and risk.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, NVIT.SPACE, its founders, directors, and developers shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this website, digital tools, or reliance on any calculations or technical content presented herein.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">8. Modifications &amp; Governing Law</h2>
          <p>
            NVIT.SPACE reserves the right to modify these Terms of Service at any time without prior individual notice. Revisions become effective immediately upon publication on this page with an updated date. These terms are governed by the laws of India, and any disputes relating to general website usage shall be subject to the jurisdiction of competent courts in the jurisdiction of the company&apos;s registered operations.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">9. Contact Information</h2>
          <p>
            For questions or legal inquiries regarding these Terms of Service, please contact our legal desk at{" "}
            <a href="mailto:info@nvit.space" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              info@nvit.space
            </a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
