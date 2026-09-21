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
            <li><strong>Contact &amp; Consultation Inquiries:</strong> Full name, corporate email address, phone number, and project specifications submitted voluntarily through our contact forms and feedback portals.</li>
            <li><strong>Platform Usage &amp; Device Telemetry:</strong> Anonymized technical metrics such as browser type, operating system version, referring URLs, access timestamps, and approximate location (country/city level) collected to maintain performance and service reliability.</li>
            <li><strong>Financial Calculators &amp; Utilities:</strong> Numerical inputs (loan amounts, tenure, interest rate assumptions, or PIN codes) entered into our interactive financial calculators and serviceability tools are computed in-session and are not linked to your personal identity without an explicit inquiry submission.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">3. How We Use Information</h2>
          <p>
            We use collected data strictly for legitimate operational and engineering purposes, including:
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Responding to technical consultations, project scoping inquiries, and customer feedback.</li>
            <li>Providing, maintaining, and improving our software tools, APIs, and digital products.</li>
            <li>Detecting, preventing, and mitigating security threats, automated scraping, or platform abuse.</li>
            <li>Analyzing aggregate visitor engagement trends to refine website usability and performance.</li>
            <li>Complying with applicable legal and statutory requirements.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">4. Advertising &amp; Third-Party Technologies (Google AdSense)</h2>
          <p>
            NVIT.SPACE uses Google AdSense and associated Google advertising services to display relevant advertisements on select informational and utility pages. Under Google&apos;s publisher policies, we provide the following required disclosures:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites across the Internet.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to NVIT.SPACE and/or other sites on the Internet.
            </li>
            <li>
              <strong>Personalized Advertising Choices:</strong> Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                https://www.google.com/settings/ads
              </a>.
            </li>
            <li>
              <strong>Network Advertising Opt-Out:</strong> Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                www.aboutads.info
              </a>{" "}
              or the Network Advertising Initiative (NAI) opt-out tool at{" "}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                https://optout.networkadvertising.org/
              </a>.
            </li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">5. Web Analytics &amp; Performance Telemetry</h2>
          <p>
            We utilize privacy-conscious performance analytics (Vercel Analytics) to monitor website health, page latency, and Core Web Vitals. These telemetry tools gather aggregate, de-identified technical metrics without storing raw personal data or cross-site behavioral tracking profiles.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">6. Data Security &amp; Protection</h2>
          <p>
            We enforce industry-standard security safeguards, including HTTPS/TLS 1.3 encryption across all routes, authenticated backend API access, database firewall isolation, and restricted administrative authorization. We do not sell, rent, or trade your personal information to third parties for independent commercial marketing.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">7. User Rights &amp; Data Control</h2>
          <p>
            Depending on your jurisdiction, you have the right to request access to the personal data we hold about you, request corrections or deletion of your contact records, or withdraw consent for non-essential data processing. You may exercise these rights at any time by contacting our support desk.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">8. Policy Revisions &amp; Contact</h2>
          <p>
            We may update this Privacy Policy periodically to reflect technological changes, advertising configurations, or legal updates. Any revisions will be reflected with a refreshed &quot;Last Updated&quot; date above. If you have questions regarding this policy, please contact our data governance team at{" "}
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
