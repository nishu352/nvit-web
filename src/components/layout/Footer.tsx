"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Mail, MapPin, Phone, ArrowUpRight, Building2, Users, MessageSquareText } from "lucide-react";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";
import FeedbackModal from "@/components/layout/FeedbackModal";

export default function Footer() {
  const { data: cms } = useWebsiteCMS();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [defaultFeedbackType, setDefaultFeedbackType] = useState<"COMPLAINT" | "FEEDBACK" | "GRIEVANCE" | "SUGGESTION" | "SUPPORT">("FEEDBACK");

  const companyName = cms?.company?.name || "NVIT.SPACE";
  const brandTagline = cms?.company?.tagline || "Digital Engineering Studio";
  const brandDesc =
    cms?.about?.description ||
    "NVIT.SPACE builds high-performance websites, web applications, mobile apps, custom software, and AI-powered digital solutions for forward-thinking modern enterprises.";
  const supportEmail = cms?.brand?.supportEmail || "info@nvit.space";
  const supportPhone = cms?.brand?.supportPhone || "";
  const founderName = cms?.founders?.founder?.name || "Nishant Bhardwaj";
  const founderRole = cms?.founders?.founder?.title || "Director & CEO";
  const coFounderName = cms?.founders?.coFounder?.name || "Vineet";
  const coFounderRole = cms?.founders?.coFounder?.title || "Co-Director & CTO";
  const address = [cms?.company?.address, cms?.company?.city, cms?.company?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-zinc-100/70 dark:bg-[#05070e] text-zinc-600 dark:text-slate-300 pt-16 pb-12 border-t border-zinc-200/80 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      {/* Strategic Glass Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/20 dark:via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 select-none">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                N
              </div>
              <div>
                <span className="text-[18px] tracking-tight text-zinc-900 dark:text-white flex items-center">
                  <span className="font-bold">NVIT</span>
                  <span className="text-zinc-400 dark:text-slate-400 font-bold">.SPACE</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-slate-400 font-bold block mt-[1px]">
                  {brandTagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed font-medium">
              {brandDesc}
            </p>
            <div className="flex items-center space-x-2 text-xs text-zinc-800 dark:text-slate-300 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Technology • Software • AI • Digital Solutions</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Core Navigation</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Services Hub
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Solutions &amp; Digital Products
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Resources &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  About NVIT.SPACE
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Products & Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Engineering Capabilities</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-slate-400">
              <li>
                <Link href="/services/website-development" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Website Development
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/web-application-development" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Web Application Development
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Mobile App Development
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/ai-development" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  AI Solutions &amp; Integration
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/backend-development" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Backend &amp; API Systems
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/business-automation" className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Business Automation
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Finance Tools & Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Finance Tools &amp; Contact</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-slate-400 mb-5">
              <li>
                <Link href="/company-check" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Company Category Check
                </Link>
              </li>
              <li>
                <Link href="/pincode-check" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Pincode Eligibility Checker
                </Link>
              </li>
              <li>
                <Link href="/finance-tools#emi-calculator" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/finance-tools" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  All Financial Calculators
                </Link>
              </li>
            </ul>

            <div className="space-y-2.5 text-xs text-zinc-600 dark:text-slate-400 font-medium pt-2 border-t border-zinc-200/80 dark:border-white/10">
              {address && (
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-zinc-500 dark:text-slate-300 shrink-0 mt-0.5" />
                  <span className="leading-snug">{address}</span>
                </div>
              )}
              {supportEmail && (
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-zinc-500 dark:text-slate-300 shrink-0" />
                  <a
                    href={`mailto:${supportEmail}`}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors font-semibold text-zinc-800 dark:text-slate-200"
                  >
                    {supportEmail}
                  </a>
                </div>
              )}
              {supportPhone && (
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-zinc-500 dark:text-slate-300 shrink-0" />
                  <a
                    href={`tel:${supportPhone}`}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors font-semibold text-zinc-800 dark:text-slate-200"
                  >
                    {supportPhone}
                  </a>
                </div>
              )}

              {/* Directors & Leadership */}
              <div className="pt-2 border-t border-zinc-200/80 dark:border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 dark:text-slate-200">
                  <Users className="w-3.5 h-3.5 text-zinc-900 dark:text-white shrink-0" />
                  <span>Directors &amp; Leadership:</span>
                </div>
                <div className="text-[11px] text-zinc-600 dark:text-slate-400 space-y-0.5 pl-5">
                  <p>
                    <strong className="text-zinc-900 dark:text-white">{founderName}</strong>{" "}
                    <span className="text-zinc-500 dark:text-slate-500">({founderRole})</span>
                  </p>
                  <p>
                    <strong className="text-zinc-900 dark:text-white">{coFounderName}</strong>{" "}
                    <span className="text-zinc-500 dark:text-slate-500">({coFounderRole})</span>
                  </p>
                </div>
              </div>

              {(cms?.company?.cin || cms?.company?.gst) && (
                <div className="text-[10px] text-zinc-500 dark:text-slate-500 pt-1 space-y-0.5">
                  {cms.company.cin && <p>CIN: {cms.company.cin}</p>}
                  {cms.company.gst && <p>GST: {cms.company.gst}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Complaints & Grievances Resolution Banner */}
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#12141a] border border-zinc-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mt-12 shadow-sm">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                Have a Complaint, Feedback, or Service Grievance?
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                Directly routed to <span className="font-semibold text-zinc-900 dark:text-white">support@nvit.space</span> and our administrative oversight desk for guaranteed 24-hour review.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setDefaultFeedbackType("COMPLAINT");
                setFeedbackOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              File a Complaint
            </button>
            <button
              onClick={() => {
                setDefaultFeedbackType("FEEDBACK");
                setFeedbackOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-slate-200 text-white dark:text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Share Feedback
            </button>
          </div>
        </div>

        {/* Legal & Policy Links */}
        <div className="mt-8 pt-8 border-t border-zinc-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 dark:text-slate-500 font-semibold gap-4">
          <p>© {new Date().getFullYear()} NVIT.SPACE ({companyName}). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-zinc-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-zinc-900 dark:hover:text-slate-300 transition-colors">Disclaimer</Link>
            <Link href="/cookie-policy" className="hover:text-zinc-900 dark:hover:text-slate-300 transition-colors">Cookie Policy</Link>
            <button
              onClick={() => {
                setDefaultFeedbackType("GRIEVANCE");
                setFeedbackOpen(true);
              }}
              className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-slate-300 transition-colors font-bold cursor-pointer"
            >
              Complaints &amp; Grievances
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        defaultType={defaultFeedbackType}
      />
    </footer>
  );
}
