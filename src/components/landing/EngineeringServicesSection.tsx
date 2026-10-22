"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Monitor,
  Package,
  Layers,
  Zap,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  href: string;
  linkText: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-apps",
    name: "Websites & Web Applications",
    description: "Modern, responsive websites and web applications tailored to your business goals.",
    icon: Monitor,
    iconBg: "bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    href: "/services/web-application-development",
    linkText: "Learn More",
  },
  {
    id: "custom-software",
    name: "Custom Software & Product Development",
    description: "Build custom software, internal tools and full-fledged products for your unique requirements.",
    icon: Package,
    iconBg: "bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    href: "/services/web-application-development/custom-web-app-development",
    linkText: "Learn More",
  },
  {
    id: "backend-api",
    name: "Backend Engineering & API Systems",
    description: "Robust backend systems, APIs and integrations to power your digital ecosystem.",
    icon: Layers,
    iconBg: "bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    href: "/services/backend-development",
    linkText: "Learn More",
  },
  {
    id: "automation-ai",
    name: "Workflow Automation & AI Integration",
    description: "Streamline operations with automation and practical AI integrations where it adds value.",
    icon: Zap,
    iconBg: "bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    href: "/services/business-automation",
    linkText: "Learn More",
  },
];

export default function EngineeringServicesSection() {
  return (
    <section
      id="capabilities"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
    >
      {/* Restrained decorative liquid shapes at section boundaries */}
      <div className="absolute top-12 left-[-30px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={110} tint="amber" delay={0.8} floatY={12} />
      </div>
      <div className="absolute bottom-6 right-[-20px] pointer-events-none hidden lg:block">
        <LiquidGlassOrb size={90} tint="cyan" delay={1.4} floatY={10} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header: Left Eyebrow & Headline, Right Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              <span>WHAT WE DO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-heading font-extrabold text-slate-950 dark:text-white tracking-[-0.03em] leading-[1.12]">
              Software Solutions Built for <br />
              <span className="text-blue-600 dark:text-blue-500">
                Business Impact.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              We combine technical expertise with a practical approach to solve real business problems. From customer-facing applications to internal systems, we build solutions that are reliable, scalable and easy to use.
            </p>
          </div>
        </div>

        {/* 2x2 Grid of 4 Frosted Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-8 sm:p-10 flex flex-col justify-between group min-h-[260px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Soft Glass Icon Container */}
                    <div className={`w-14 h-14 rounded-2xl ${srv.iconBg} flex items-center justify-center ${srv.iconColor} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Corner Diagonal Link */}
                    <Link
                      href={srv.href}
                      aria-label={srv.name}
                      className="w-10 h-10 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    {srv.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>{srv.linkText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
