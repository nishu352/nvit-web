"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Sparkles, Code2, Cpu, Server } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Digital Engineering Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            WE BUILD SOFTWARE THAT SOLVES REAL PROBLEMS.
          </h1>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed font-medium">
            NVIT.SPACE is a technology and software development studio engineering websites, enterprise web applications, Android apps, and AI-powered automation systems.
          </p>
        </div>
      </section>

      {/* Core Engineering Philosophy */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xl dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Clean Engineering</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We write modular, maintainable TypeScript and Python code built on modern frameworks like React, Next.js, and Fastify.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xl dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">AI &amp; Automation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Integrating intelligent neural models, document extraction APIs, and automated workflow engines to reduce operational friction.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-7 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xl dark:shadow-none">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Scalable Architecture</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Decoupled cloud architecture connecting high-speed REST APIs with indexed PostgreSQL databases hosted on modern infrastructure.
            </p>
          </div>
        </div>

        {/* Detailed Story Box */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-none">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Engineering Modern Digital Solutions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              At NVIT.SPACE, our primary mission is to build robust, beautiful, and intuitive software products for modern businesses. Whether designing consumer-facing web experiences, enterprise cloud software, mobile applications, or custom automation pipelines, we focus on engineering speed, security, and exceptional user experience.
            </p>
            <p>
              Our team works directly with clients to translate complex business workflows into high-performance software systems. From initial architecture design and UI/UX prototyping to full-stack code implementation and cloud deployment, we handle the entire product lifecycle.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/#contact">
              <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs cursor-pointer shadow-lg shadow-blue-500/20">
                Start a Project With Us →
              </button>
            </Link>
            <Link href="/#services">
              <button className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-white/10 cursor-pointer">
                Explore Engineering Services
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
