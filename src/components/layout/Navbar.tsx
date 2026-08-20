"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Building2,
  MapPin,
  Calculator,
  Wrench,
  Layers,
  Cpu,
  Globe,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";

const FINANCE_TOOLS = [
  {
    name: "Company Check",
    description: "Verify bank policy tiering & company status",
    href: "/company-check",
    icon: Building2,
  },
  {
    name: "Pincode Check",
    description: "Inspect regional serviceability matrix",
    href: "/pincode-check",
    icon: MapPin,
  },
  {
    name: "EMI Calculator",
    description: "Interactive loan breakdown & amortization engine",
    href: "/finance-tools#emi-calculator",
    icon: Calculator,
  },
  {
    name: "All Finance Tools",
    description: "Explore complete suite of financial utilities",
    href: "/finance-tools",
    icon: Wrench,
  },
];

const THEME_OPTIONS = [
  { id: "light", Icon: Sun, label: "Light" },
  { id: "dark", Icon: Moon, label: "Dark" },
  { id: "system", Icon: Monitor, label: "System" },
] as const;

export default function Navbar() {
  const { data: cms } = useWebsiteCMS();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── FLOATING CAPSULE HEADER ─────────────────────────── */}
      <header
        aria-label="Site navigation"
        className="fixed top-4 sm:top-5 left-0 right-0 z-[100] px-3 sm:px-6"
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`glass-nav-capsule${scrolled ? " scrolled" : ""} mx-auto flex items-center justify-between rounded-[26px] h-[64px] sm:h-[68px] px-3.5 sm:px-5 max-w-[1380px] w-full`}
          style={{ pointerEvents: "auto" }}
        >
          {/* ── LEFT: Logo ─────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 select-none group"
            aria-label="NVIT.SPACE Home"
          >
            <img
              src={cms?.brand?.logoUrl || "/brand/nvit-icon-animated.svg"}
              alt="NVIT.SPACE"
              className="nvit-logo h-[34px] w-[34px] sm:h-9 sm:w-9 shrink-0 object-contain"
              width="36"
              height="36"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[17px] sm:text-[19px] tracking-tight text-slate-900 dark:text-white flex items-center">
                <span className="font-semibold">NVIT</span>
                <span className="text-blue-600 dark:text-blue-500 font-semibold">.</span>
                <span className="font-light">SPACE</span>
              </span>
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mt-[2px]">
                {cms?.company?.tagline || "Digital Studio"}
              </span>
            </div>
          </Link>

          {/* ── CENTER: Navigation (desktop) ───────────────── */}
          <nav
            className="hidden lg:flex items-center gap-x-0.5 xl:gap-x-1"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap ${
                isActive("/") && pathname === "/"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/services"
              className={`px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                pathname.startsWith("/services")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Services
            </Link>

            <Link
              href="/solutions"
              className={`px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                pathname.startsWith("/solutions")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Solutions
            </Link>

            {/* Finance Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap cursor-pointer ${
                  pathname.startsWith("/finance-tools") || pathname.startsWith("/company-check") || pathname.startsWith("/pincode-check")
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <span>Finance Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : "opacity-60"}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl glass-card bg-white/95 dark:bg-slate-950/95 p-2 shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
                  >
                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5 mb-1">
                      Digital Financial Tools
                    </div>
                    {FINANCE_TOOLS.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          onClick={() => setToolsDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[12.5px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {tool.name}
                              </span>

                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {tool.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/resources"
              className={`px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                pathname.startsWith("/resources")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Resources
            </Link>

            <Link
              href="/about"
              className={`px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                pathname === "/about"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                pathname === "/contact"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* ── RIGHT: Theme Switcher + CTA Button ─────────────────── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Switcher Capsule */}
            <div
              className="theme-switcher-capsule flex items-center gap-0.5"
              role="group"
              aria-label="Theme selector"
            >
              {THEME_OPTIONS.map(({ id, Icon, label }) => {
                const active = theme === id;
                return (
                  <button
                    key={id}
                    onClick={() => setTheme(id as any)}
                    title={`${label} mode`}
                    aria-pressed={active}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer text-[11px] ${
                      active
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>

            {/* Let's Build CTA */}
            <Link href="/contact" aria-label="Start a project with NVIT.SPACE">
              <motion.button
                whileHover={{ y: -1, boxShadow: "0 8px 25px -4px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-[12.5px] font-bold tracking-tight shadow-md shadow-blue-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap border border-white/20"
              >
                Let&apos;s Build
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </Link>
          </div>

          {/* ── MOBILE: Theme + Hamburger ─────────────────── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/70 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/70 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4.5 h-4.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="hm"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4.5 h-4.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
              className="fixed top-[90px] left-3 right-3 z-[99] rounded-3xl glass-card bg-white/95 dark:bg-slate-950/95 overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 max-h-[85vh] overflow-y-auto"
              style={{ pointerEvents: "auto" }}
            >
              <div className="p-4 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/solutions"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Solutions &amp; Digital Products
                </Link>
                <div className="pt-2 pb-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-black px-4 mb-2">
                    Finance Tools
                  </p>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {FINANCE_TOOLS.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                      >
                        <div className="flex items-center gap-2.5">
                          <tool.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>{tool.name}</span>
                        </div>

                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/resources"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Resources &amp; Insights
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  About NVIT.SPACE
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="px-4 pb-5 pt-3 border-t border-slate-100 dark:border-white/5 space-y-3">
                <div className="px-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-black mb-2">
                    Theme Preference
                  </p>
                  <div className="flex gap-2">
                    {THEME_OPTIONS.map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id as any)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl text-[10.5px] font-bold transition-all cursor-pointer ${
                          theme === id
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                            : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white text-[13px] font-bold shadow-lg shadow-blue-500/25 cursor-pointer transition-colors mt-2">
                    Start a Project →
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
