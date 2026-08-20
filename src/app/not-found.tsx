"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Wrench, Sparkles, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">404 — Page Not Found</p>

          <div className="space-y-3">
            <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-200">
              The page you are looking for does not exist.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
              The URL might be mistyped, moved to a new route, or is temporarily unavailable. Explore our core services or return home below.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
            <Link
              href="/"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors space-y-1 shadow-sm group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 text-blue-500" />
                <span>Home Page</span>
              </div>
              <p className="text-[11px] text-slate-500">Return to the main landing experience</p>
            </Link>

            <Link
              href="/services"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors space-y-1 shadow-sm group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                <Compass className="w-4 h-4 text-emerald-500" />
                <span>All Services</span>
              </div>
              <p className="text-[11px] text-slate-500">Explore full-stack engineering capabilities</p>
            </Link>

            <Link
              href="/finance-tools"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors space-y-1 shadow-sm group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                <Wrench className="w-4 h-4 text-violet-500" />
                <span>Finance Tools</span>
              </div>
              <p className="text-[11px] text-slate-500">Access loan checks and EMI calculators</p>
            </Link>
          </div>

          <div className="pt-2">
            <Link href="/">
              <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
