"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Building2,
  MapPin,
  Calculator,
  Wrench,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

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
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
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

  const isToolsActive =
    pathname.startsWith("/finance-tools") ||
    pathname.startsWith("/company-check") ||
    pathname.startsWith("/pincode-check");

  return (
    <>
      {/* ── FLOATING PILL CAPSULE HEADER (Apple Style) ─────────────────────────── */}
      <header
        aria-label="Site navigation"
        className="fixed top-4 left-0 right-0 z-[100] px-4 pointer-events-none transform-gpu"
      >
        <div className="mx-auto max-w-5xl w-full pointer-events-auto">
          <div
            className={`flex items-center justify-between h-[58px] px-4 sm:px-6 rounded-full transition-colors duration-200 transition-shadow duration-200 ${
              scrolled
                ? "bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/12 shadow-[0_10px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.75)]"
                : "bg-white/85 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 shadow-[0_6px_28px_rgba(0,0,0,0.05)] dark:shadow-[0_6px_32px_rgba(0,0,0,0.55)]"
            }`}
          >
            {/* ── LEFT: Logo ─────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 select-none group"
              aria-label="NVIT.SPACE Home"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black text-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm shrink-0">
                N
              </div>
              <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center">
                NVIT<span className="text-zinc-400 dark:text-zinc-500 font-bold">.SPACE</span>
              </span>
            </Link>

            {/* ── CENTER: Navigation Pills (Desktop) ───────────────── */}
            <nav
              className="hidden lg:flex items-center gap-x-1 bg-zinc-100/80 dark:bg-white/[0.06] rounded-full p-1 border border-zinc-200/60 dark:border-white/10"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  isActive("/") && pathname === "/"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/services"
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  pathname.startsWith("/services")
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Services
              </Link>

              <Link
                href="/solutions"
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  pathname.startsWith("/solutions")
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Solutions
              </Link>

              {/* Finance Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  className={`flex items-center gap-1 px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap cursor-pointer border ${
                    isToolsActive
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <span>Finance Tools</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      toolsDropdownOpen ? "rotate-180 text-zinc-900 dark:text-white" : "opacity-60"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {toolsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-2 shadow-2xl border border-zinc-200/80 dark:border-white/10 overflow-hidden z-50"
                    >
                      <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/5 mb-1">
                        Digital Financial Tools
                      </div>
                      {FINANCE_TOOLS.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            onClick={() => setToolsDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 group-hover:scale-105 transition-transform">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[12.5px] font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {tool.name}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
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
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  pathname.startsWith("/resources")
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Resources
              </Link>

              <Link
                href="/about"
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  pathname === "/about"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                About us
              </Link>

              <Link
                href="/contact"
                className={`px-3.5 py-1 text-[12.5px] font-bold tracking-tight rounded-full transition-colors whitespace-nowrap border ${
                  pathname === "/contact"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200/90 dark:border-white/15 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* ── RIGHT: Stable Theme Toggle & Pill CTA Button ─────────────────── */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {/* Stable Sized Theme Switcher Toggle (Zero Layout Shift) */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-zinc-100/80 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 border border-zinc-200/70 dark:border-white/10 transition-colors cursor-pointer"
                aria-label="Toggle light/dark theme"
                title={mounted ? `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode` : "Toggle Theme"}
              >
                {!mounted ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-zinc-400/40" />
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    {resolvedTheme === "dark" ? (
                      <motion.span
                        key="sun"
                        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Moon className="w-4 h-4 text-zinc-700" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </button>

              {/* Get Started CTA */}
              <Link href="/contact" aria-label="Start a project with NVIT.SPACE">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-tight shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/80 dark:text-zinc-950/80" />
                </button>
              </Link>
            </div>

            {/* ── MOBILE: Theme + Hamburger ─────────────────── */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <span className="w-3 h-3 rounded-full bg-zinc-400/40" />
                ) : resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-700" />
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 cursor-pointer"
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
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hm"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
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
              className="fixed top-[84px] left-3 right-3 z-[99] rounded-3xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 max-h-[85vh] overflow-y-auto"
              style={{ pointerEvents: "auto" }}
            >
              <div className="p-4 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/solutions"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  Solutions &amp; Digital Products
                </Link>
                <div className="pt-2 pb-1">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-black px-4 mb-2">
                    Finance Tools
                  </p>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {FINANCE_TOOLS.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
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
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  Resources &amp; Insights
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  About NVIT.SPACE
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="px-4 pb-5 pt-3 border-t border-zinc-100 dark:border-white/5 space-y-3">
                <div className="px-2">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-black mb-2">
                    Theme Preference
                  </p>
                  <div className="flex gap-2">
                    {THEME_OPTIONS.map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id as any)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl text-[10.5px] font-bold transition-all cursor-pointer ${
                          theme === id
                            ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md"
                            : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full h-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[13px] font-bold shadow-lg cursor-pointer transition-colors mt-2">
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
