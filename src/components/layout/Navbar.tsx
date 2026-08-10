"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Building2, PhoneCall, Menu, X, ArrowRight, Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

// Center navigation — NO "Loan Apply" here (it's on the right as CTA)
const NAV_LINKS = [
  { name: "Home",           href: "/" },
  { name: "About",          href: "/#about" },
  { name: "Services",       href: "/#services" },
  { name: "Company Check",  href: "/company-check" },
  { name: "Pincode Check",  href: "/pincode-check" },
  { name: "Contact",        href: "/#contact" },
];

const THEME_OPTIONS = [
  { id: "light",  Icon: Sun,     label: "Light" },
  { id: "dark",   Icon: Moon,    label: "Dark" },
  { id: "system", Icon: Monitor, label: "System" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/" ;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── FLOATING CAPSULE HEADER ─────────────────────────── */}
      <header
        aria-label="Site navigation"
        className="fixed top-5 left-0 right-0 z-[100] px-4 sm:px-6"
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`glass-nav-capsule${scrolled ? " scrolled" : ""} mx-auto flex items-center justify-between rounded-[26px] h-[68px] px-3 sm:px-5 max-w-[1380px] w-full`}
          style={{ pointerEvents: "auto" }}
        >

          {/* ── LEFT: Logo ─────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 select-none group"
            aria-label="NVIT Solution Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Building2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] sm:text-[19px] font-black tracking-wider text-slate-900 dark:text-white">
                NVIT SOLUTION
              </span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-extrabold mt-[2px]">
                PVT. LTD.
              </span>
            </div>
          </Link>

          {/* ── CENTER: Navigation (desktop) ───────────────── */}
          <nav
            className="hidden lg:flex items-center gap-x-0.5 xl:gap-x-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 xl:px-3.5 py-2 rounded-xl text-[12.5px] xl:text-[13px] font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap ${
                    active
                      ? "text-royal dark:text-blue-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-royal dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Phone + Theme + CTA ─────────────────── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">

            {/* Phone */}
            <a
              href="tel:+918510088409"
              className="hidden xl:flex items-center gap-2 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/8 flex items-center justify-center shrink-0">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="tracking-tight">+91-85100-88409</span>
            </a>

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
                        ? "bg-white dark:bg-slate-800 text-royal dark:text-blue-400 shadow-sm"
                        : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>

            {/* Apply Loan CTA — ONE and only */}
            <Link href="/loan-apply" aria-label="Apply for a loan">
              <motion.button
                whileHover={{ y: -1, boxShadow: "0 8px 24px -4px rgba(29,78,216,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-royal hover:bg-royal-hover text-white text-[12.5px] font-bold tracking-tight shadow-md shadow-royal/20 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Apply Loan
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </Link>
          </div>

          {/* ── MOBILE right: theme toggle + hamburger ───── */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick theme toggle on mobile */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/70 dark:bg-white/6 border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100/70 dark:bg-white/6 border border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4.5 h-4.5" /></motion.span>
                  : <motion.span key="hm" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4.5 h-4.5" /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE DRAWER ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[98] bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-down panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
              className="fixed top-[100px] left-4 right-4 z-[99] rounded-3xl glass-card overflow-hidden shadow-2xl border border-[var(--border-default)]"
              style={{ pointerEvents: "auto" }}
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-2xl text-[13px] font-semibold transition-colors ${
                        active
                          ? "bg-royal/10 text-royal dark:bg-blue-500/15 dark:text-blue-300"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="px-4 pb-5 pt-2 border-t border-[var(--border-subtle)] space-y-3">
                <a
                  href="tel:+918510088409"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[12px] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  +91-85100-88409
                </a>

                {/* Full theme control in mobile drawer */}
                <div className="px-3">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-black mb-2 px-1">Theme</p>
                  <div className="flex gap-2">
                    {THEME_OPTIONS.map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id as any)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl text-[10px] font-bold transition-all cursor-pointer ${
                          theme === id
                            ? "bg-royal text-white shadow-md"
                            : "bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Link href="/loan-apply" onClick={() => setMobileOpen(false)}>
                  <button className="w-full h-12 rounded-2xl bg-royal hover:bg-royal-hover text-white text-[13px] font-bold shadow-lg shadow-royal/20 cursor-pointer transition-colors">
                    Apply Loan →
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
