"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
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
                src="/brand/nvit-icon.svg"
                alt="NVIT.SPACE"
                className="w-10 h-10 shrink-0"
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
                  Digital Engineering Studio
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              NVIT.SPACE builds high-performance websites, web applications, mobile apps, custom software, and AI-powered digital solutions for forward-thinking modern enterprises.
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

            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-200 dark:border-slate-800">
              {/* Address removed temporarily for admin integration */}
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-violet-500 dark:text-violet-400 shrink-0" />
                <span>info@nvitsolution.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold">
          <p>© {new Date().getFullYear()} NVIT.SPACE (NVIT SOLUTION PVT. LTD.). All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Security Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
