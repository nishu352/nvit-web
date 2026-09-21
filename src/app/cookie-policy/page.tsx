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
            Cookies and browser local storage items are small data files or key-value entries stored on your device when you visit websites. They help remember your preferences, keep sessions secure, assist site navigation, and enable essential analytics.
          </p>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">2. First-Party Cookies &amp; Local Storage</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Theme Preference:</strong> Storing your preferred visual mode (Light / Dark / System) via browser localStorage (`theme`) to avoid visual flicker during navigation.</li>
            <li><strong>Session &amp; Form Security:</strong> Maintaining transient tokens and CSRF verification state during inquiry and feedback form submissions.</li>
            <li><strong>Welcome Modal State:</strong> Storing a temporary timestamp to avoid repeatedly displaying the introduction banner during active browsing sessions.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">3. Third-Party &amp; Advertising Cookies</h2>
          <p>
            NVIT.SPACE displays advertisements served by Google AdSense on select public pages. When you visit these pages, Google and its advertising partners may place and read cookies on your browser:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>AdSense Advertising Cookies:</strong> Google uses cookies (such as `__gads` or `_gcl_au`) to serve relevant ads based on prior browsing history, limit the frequency of ads shown to you, and combat invalid traffic or ad fraud.</li>
            <li><strong>Performance Telemetry:</strong> Aggregated anonymous latency and Core Web Vitals telemetry (via Vercel Analytics) to ensure rapid loading across devices.</li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">4. Managing &amp; Disabling Cookies</h2>
          <p>
            You have full control over cookies stored on your device:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Browser Settings:</strong> You can configure your browser (Chrome, Safari, Firefox, Edge) to block or delete cookies. Disabling cookies will reset your theme preference upon reload, but all core website pages, tools, and calculators will remain functional.</li>
            <li>
              <strong>Google Personalized Ads Opt-Out:</strong> Manage your ad preferences or opt out of personalized advertising by visiting{" "}
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
              <strong>Industry Opt-Out Portals:</strong> Opt out of third-party advertising cookies across multiple advertising networks via the{" "}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                NAI Consumer Opt-Out Portal
              </a>{" "}
              or{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                AboutAds Choices
              </a>.
            </li>
          </ul>
        </section>

        <section className="glass-card rounded-3xl p-8 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xl dark:shadow-none">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">5. Contact Regarding Cookies</h2>
          <p>
            For inquiries regarding our use of cookies and tracking technologies, please email our engineering team at{" "}
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
