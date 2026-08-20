"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Mail, MapPin, Phone, ArrowUpRight, Building2, Users } from "lucide-react";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";

export default function Footer() {
  const { data: cms } = useWebsiteCMS();

  const companyName = cms?.company?.name || "NVIT SOLUTION PVT. LTD.";
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
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-200 pt-16 pb-12 border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 select-none">
              <img
                src={cms?.brand?.logoUrl || "/brand/nvit-icon.svg"}
                alt={companyName}
                className="w-10 h-10 shrink-0 object-contain"
                width="40"
                height="40"
              />
              <div>
                <span className="text-[20px] tracking-tight text-slate-900 dark:text-white flex items-center">
                  <span className="font-semibold">NVIT</span>
                  <span className="text-blue-600 dark:text-blue-500 font-semibold">.</span>
                  <span className="font-light">SPACE</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-extrabold block mt-[2px]">
                  {brandTagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {brandDesc}
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Technology • Software • AI • Digital Solutions</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Core Navigation</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Solutions &amp; Digital Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  About NVIT.SPACE
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Products & Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Engineering Capabilities</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Website Development
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Web Application Development
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Android &amp; Mobile Apps
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  AI Integration &amp; Automation
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1 group">
                  Backend &amp; Database Architecture
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Finance Tools & Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-4">Finance Tools &amp; Contact</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-5">
              <li>
                <Link href="/company-check" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Company Category Check
                </Link>
              </li>
              <li>
                <Link href="/pincode-check" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pincode Eligibility Checker
                </Link>
              </li>
              <li>
                <Link href="/finance-tools#emi-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
            </ul>

            <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-200 dark:border-slate-800">
              {address && (
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{address}</span>
                </div>
              )}
              {supportEmail && (
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-violet-500 dark:text-violet-400 shrink-0" />
                  <a
                    href={`mailto:${supportEmail}`}
                    className="hover:text-blue-500 transition-colors font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {supportEmail}
                  </a>
                </div>
              )}
              {supportPhone && (
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a
                    href={`tel:${supportPhone}`}
                    className="hover:text-blue-500 transition-colors font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {supportPhone}
                  </a>
                </div>
              )}

              {/* Directors & Leadership */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Directors &amp; Leadership:</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 pl-5">
                  <p>
                    <strong className="text-slate-900 dark:text-slate-100">{founderName}</strong>{" "}
                    <span className="text-slate-400 dark:text-slate-500">({founderRole})</span>
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-slate-100">{coFounderName}</strong>{" "}
                    <span className="text-slate-400 dark:text-slate-500">({coFounderRole})</span>
                  </p>
                </div>
              </div>

              {(cms?.company?.cin || cms?.company?.gst) && (
                <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-1 space-y-0.5">
                  {cms.company.cin && <p>CIN: {cms.company.cin}</p>}
                  {cms.company.gst && <p>GST: {cms.company.gst}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold gap-4">
          <p>© {new Date().getFullYear()} NVIT.SPACE ({companyName}). All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Security Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
