"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/services/apiClient";
import {
  Search,
  Building2,
  Loader2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Landmark,
  ShieldCheck,
  ChevronDown,
  Info,
  HelpCircle,
  AlertTriangle,
  Layers,
  Database,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCategoryStatus, CategoryStatusType } from "@/utils/categoryStatus";
import { companySearchClientCache, companyAutocompleteClientCache } from "@/utils/clientCache";
import LiquidGlassOrb from "@/components/ui/LiquidGlassOrb";
import { LiquidRibbon } from "@/components/ui/LiquidRibbon";

interface Suggestion {
  id: string;
  name: string;
  city?: string;
  state?: string;
}

const FAQS = [
  {
    q: 'Can an applicant get a personal loan if their employer is marked "Unlisted"?',
    a: 'Yes. An "Unlisted" categorization simply means the lender does not maintain an active corporate tie-up or pre-indexed policy entry for that organization. Commercial lenders and NBFCs process unlisted company employees through open-market channels, evaluating individual income stability, salary credits, and overall credit history.',
  },
  {
    q: "Why is a company categorized as CAT-A in one bank but CAT-B or Unlisted in another?",
    a: "Each lending institution establishes its own internal risk models, commercial relationships, and payroll portfolio partnerships. A bank that manages an employer's corporate payroll accounts will typically place that organization in a higher internal category than an institution without a banking relationship.",
  },
  {
    q: "Does employer tiering affect loan processing workflows?",
    a: "Some lenders apply automated straight-through processing workflows or streamlined document verification for certain categorized corporate employees. However, processing times vary by lender, applicant documentation completeness, and verification requirements.",
  },
  {
    q: "How often do lenders revise their corporate employer lists?",
    a: "Credit committees review corporate employer lists periodically, adjusting classifications based on corporate financial performance, market capitalization, credit rating changes, and internal portfolio risk parameters.",
  },
];

export default function CompanyCheckPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [bankFilter, setBankFilter] = useState<"ALL" | CategoryStatusType>("ALL");
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isSelectingRef = useRef(false);
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const autocompleteAbortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (overrideTerm?: string, selectedCompanyId?: string) => {
    const q = (overrideTerm !== undefined ? overrideTerm : searchTerm).trim();
    if (!q) return;

    // Abort pending autocomplete immediately
    if (autocompleteAbortControllerRef.current) {
      autocompleteAbortControllerRef.current.abort();
    }

    // Cancel prior in-flight search request
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    setShowSuggestions(false);
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
    setHasSearched(true);

    // Instant client cache check (only serve cached entries if non-empty)
    const clientCacheKey = selectedCompanyId ? `${q}::${selectedCompanyId}` : q;
    const cachedResults = companySearchClientCache.get(clientCacheKey);
    if (cachedResults && cachedResults.length > 0) {
      setCompanies(cachedResults);
      setSearchedQuery(q);
      setPendingQuery(null);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;

    setPendingQuery(q);
    setLoading(true);

    // Only clear companies if none exist yet to prevent jarring layout shift
    if (companies.length === 0) {
      setSearchedQuery(q);
    }

    try {
      const response = await apiClient.get("/company/search", {
        params: {
          q,
          ...(selectedCompanyId ? { companyId: selectedCompanyId } : {}),
        },
        signal: abortController.signal,
      });
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setCompanies(response.data.data);
        setSearchedQuery(q);
        if (response.data.data.length > 0) {
          companySearchClientCache.set(clientCacheKey, response.data.data);
        }
      }
    } catch (err: any) {
      if (axios.isCancel(err) || err.name === "CanceledError" || err.name === "AbortError") {
        return;
      }
      console.error("API search error", err);
    } finally {
      if (searchAbortControllerRef.current === abortController) {
        setLoading(false);
        setPendingQuery(null);
      }
    }
  };

  useEffect(() => {
    // If the searchTerm change was triggered by selecting a suggestion, skip autocomplete
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const term = searchTerm.trim();
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    // Instant client cache check for suggestions
    const cachedSuggestions = companyAutocompleteClientCache.get(term);
    if (cachedSuggestions) {
      setSuggestions(cachedSuggestions);
      return;
    }

    if (autocompleteAbortControllerRef.current) {
      autocompleteAbortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    autocompleteAbortControllerRef.current = abortController;

    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get("/company/autocomplete", {
          params: { q: term },
          signal: abortController.signal,
        });
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setSuggestions(res.data.data);
          companyAutocompleteClientCache.set(term, res.data.data);
        }
      } catch (err: any) {
        // Silently ignore canceled requests
        if (axios.isCancel(err) || err.name === "CanceledError" || err.name === "AbortError") {
          return;
        }
        setSuggestions([]);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [searchTerm]);

  useEffect(() => {
    return () => {
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
      }
      if (autocompleteAbortControllerRef.current) {
        autocompleteAbortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    setActiveSuggestionIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen relative text-[var(--text-primary)] transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white dark:selection:bg-blue-400 dark:selection:text-slate-950 overflow-x-hidden">
      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <Navbar />

      {/* 1. Full-Page Fixed Atmospheric Liquid Gradient Canvas (Never stops when page grows) */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 liquid-atmosphere-canvas" aria-hidden="true" />

      {/* 2. Full-Page Multi-Stop Translucent Liquid Orbs & Ribbons Layer */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Top/Hero Visual Cluster */}
        <LiquidGlassOrb
          tint="blue"
          size={380}
          duration={8.5}
          floatY={10}
          className="absolute -top-16 -right-28 opacity-55 dark:opacity-25"
        />
        <LiquidGlassOrb
          tint="amber"
          size={240}
          duration={7}
          delay={1.2}
          floatY={8}
          className="absolute top-48 -left-20 opacity-40 dark:opacity-20"
        />
        <LiquidRibbon
          variant="hero"
          className="absolute top-6 right-0 w-[580px] h-[500px] opacity-30 dark:opacity-15"
        />

        {/* Mid-Page Results Cluster */}
        <LiquidGlassOrb
          tint="cyan"
          size={300}
          duration={9}
          delay={2}
          floatY={12}
          className="absolute top-[750px] -left-24 opacity-30 dark:opacity-15"
        />
        <LiquidGlassOrb
          tint="amber"
          size={200}
          duration={7.5}
          delay={3}
          floatY={8}
          className="absolute top-[1350px] -right-16 opacity-25 dark:opacity-10"
        />

        {/* Lower Educational & FAQ Cluster */}
        <LiquidRibbon
          variant="solutions"
          className="absolute top-[1900px] right-0 w-[480px] h-[400px] opacity-25 dark:opacity-10"
        />
        <LiquidGlassOrb
          tint="blue"
          size={260}
          duration={8}
          delay={1.5}
          floatY={10}
          className="absolute top-[2500px] -left-20 opacity-25 dark:opacity-10"
        />
      </div>

      {/* Hero & Search Header - Dedicated clearance for 80px navbar */}
      <header className="pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-4xl mx-auto space-y-7 text-center relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 dark:bg-blue-950/40 text-xs font-mono font-medium text-blue-600 dark:text-blue-400 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>Public Reference Tool · Employer Tiering Index</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Company Category Checker
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Inspect corporate employer categorization indicators (CAT A, CAT B, Superprime, Unlisted) compiled from major Indian commercial bank and NBFC underwriting policy references.
            </p>
          </div>

          {/* Premium Liquid-Glass Search Box with Non-Wrapping Flexbox Layout */}
          <div ref={searchContainerRef} className="pt-2 max-w-2xl mx-auto relative z-40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (showSuggestions && activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
                  const selected = suggestions[activeSuggestionIndex];
                  isSelectingRef.current = true;
                  setSearchTerm(selected.name);
                  setShowSuggestions(false);
                  setSuggestions([]);
                  setActiveSuggestionIndex(-1);
                  handleSearch(selected.name, selected.id);
                  return;
                }
                const clean = searchTerm.trim().toLowerCase();
                const matchingSuggestion = suggestions.find(
                  (s) => s.name.trim().toLowerCase() === clean
                );
                handleSearch(undefined, matchingSuggestion?.id);
              }}
              className="relative"
            >
              <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-xl shadow-blue-500/5 ring-1 ring-slate-900/5 dark:ring-white/5 transition-all focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500/50">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {/* Left: Search Icon + Flexible Input */}
                  <div className="relative flex-1 min-w-0 flex items-center">
                    <Search className="w-5 h-5 text-blue-600/70 dark:text-blue-400/80 absolute left-4 pointer-events-none shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      role="combobox"
                      aria-expanded={showSuggestions && suggestions.length > 0}
                      aria-haspopup="listbox"
                      aria-autocomplete="list"
                      aria-controls="company-suggestions-list"
                      aria-activedescendant={
                        activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]
                          ? `company-opt-${suggestions[activeSuggestionIndex].id}`
                          : undefined
                      }
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                        setActiveSuggestionIndex(-1);
                      }}
                      onFocus={() => {
                        if (searchTerm.trim().length >= 2 && suggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          if (showSuggestions && suggestions.length > 0) {
                            e.preventDefault();
                            setActiveSuggestionIndex((prev) =>
                              prev < suggestions.length - 1 ? prev + 1 : 0
                            );
                          }
                        } else if (e.key === "ArrowUp") {
                          if (showSuggestions && suggestions.length > 0) {
                            e.preventDefault();
                            setActiveSuggestionIndex((prev) =>
                              prev > 0 ? prev - 1 : suggestions.length - 1
                            );
                          }
                        } else if (e.key === "Escape") {
                          setShowSuggestions(false);
                          setActiveSuggestionIndex(-1);
                        }
                      }}
                      placeholder="Type employer name (e.g. Tata Consultancy Services, HDFC, Infosys)..."
                      aria-label="Employer company search"
                      className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/60 text-[var(--text-primary)] text-xs sm:text-sm font-medium placeholder:text-[var(--text-tertiary)] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Right: Glossy Liquid Pill Search Button (Guaranteed single line, shrink-0) */}
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Submit company inspection"
                    className="liquid-glass-btn-primary shrink-0 whitespace-nowrap h-12 sm:h-14 px-6 sm:px-7 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 active:scale-[0.98] transition-all"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    ) : (
                      <>
                        <span className="whitespace-nowrap">Inspect Company</span>
                        <span className="w-5 h-5 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* High-Contrast, Isolated Autocomplete Dropdown (Always on top with z-50 & solid glass background) */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  id="company-suggestions-list"
                  role="listbox"
                  aria-label="Employer suggestions"
                  initial={{ opacity: 0, y: 8, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1 text-left max-h-72 overflow-y-auto ring-1 ring-black/5"
                >
                  <div className="px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Database Suggestions</span>
                    <span className="hidden sm:inline">Use ↑ ↓ to navigate · Enter to select</span>
                  </div>
                  {suggestions.map((item, idx) => {
                    const isSelected = activeSuggestionIndex === idx;
                    return (
                      <button
                        key={item.id}
                        id={`company-opt-${item.id}`}
                        role="option"
                        aria-selected={isSelected}
                        type="button"
                        onClick={() => {
                          isSelectingRef.current = true;
                          setSearchTerm(item.name);
                          setShowSuggestions(false);
                          setSuggestions([]);
                          setActiveSuggestionIndex(-1);
                          handleSearch(item.name, item.id);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer text-left ${
                          isSelected
                            ? "bg-blue-500/10 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border-l-2 border-blue-600 dark:border-blue-400 pl-3"
                            : "text-[var(--text-primary)] hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.city && (
                          <span className="text-[10px] text-[var(--text-tertiary)] shrink-0 ml-2 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-[var(--border-subtle)]">
                            {item.city}, {item.state || ""}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Status Legend with Frosted Capsule Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[11px] font-medium text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-emerald-500/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Listed / Available</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-amber-500/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <span className="text-amber-700 dark:text-amber-400 font-semibold">Caution / Review</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-rose-500/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              <span className="text-rose-700 dark:text-rose-400 font-semibold">Unlisted / Delisted</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Results Body - Clean Normal Document Flow with z-10 */}
      <main className="flex-1 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
        {/* Loading Indicator */}
        {loading && companies.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/10">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Querying Banking Policy Index...</h3>
              <p className="text-xs text-[var(--text-secondary)]">Scanning indexed companies across partner financial institutions</p>
            </div>
          </div>
        )}

        {/* Empty / Not Found State */}
        {!loading && hasSearched && companies.length === 0 && (
          <div className="rounded-3xl p-8 sm:p-12 text-center border border-white/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">No Companies Found</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                No matching employer company for &quot;<span className="font-semibold text-blue-600 dark:text-blue-400">{searchedQuery}</span>&quot; was found in the reference database.
              </p>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] max-w-md mx-auto pt-3 border-t border-[var(--border-subtle)] leading-relaxed">
              An unlisted result does not indicate unfavorable credit standing. It simply means the lender does not maintain a pre-indexed corporate partnership; employees are processed through open-market underwriting.
            </p>
          </div>
        )}

        {/* Successful Results View */}
        {companies.length > 0 && (
          <div className="space-y-6">
            {loading && pendingQuery && (
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning policy index for &quot;{pendingQuery}&quot;...</span>
              </div>
            )}

            <div className={`space-y-8 transition-opacity duration-200 ${loading ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
              {/* Search Header Bar with Frosted Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-[var(--text-primary)]">
                    Found {companies.length} Match{companies.length > 1 ? "es" : ""}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)]">•</span>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    for &quot;{searchedQuery}&quot;
                  </span>
                </div>

                {/* Status Filter Tabs with Liquid Pill Highlight */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-white/60 dark:border-white/10 text-[11px] font-medium shadow-xs">
                  <button
                    type="button"
                    onClick={() => setBankFilter("ALL")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      bankFilter === "ALL"
                        ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    All Banks
                  </button>
                  <button
                    type="button"
                    onClick={() => setBankFilter("LISTED")}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      bankFilter === "LISTED"
                        ? "bg-emerald-600 text-white shadow-sm font-bold"
                        : "text-[var(--text-secondary)] hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${bankFilter === "LISTED" ? "bg-white" : "bg-emerald-500"}`} />
                    <span>Listed</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBankFilter("NEGATIVE")}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      bankFilter === "NEGATIVE"
                        ? "bg-rose-600 text-white shadow-sm font-bold"
                        : "text-[var(--text-secondary)] hover:text-rose-600 dark:hover:text-rose-400"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${bankFilter === "NEGATIVE" ? "bg-white" : "bg-rose-500"}`} />
                    <span>Unlisted</span>
                  </button>
                </div>
              </div>

              {/* Company Cards List */}
              <div className="space-y-6">
                {companies.map((comp) => {
                  const totalBanks = comp.banks?.length || 0;
                  const listedCount = comp.banks?.filter(
                    (b: any) => getCategoryStatus(b.category).status === "LISTED"
                  ).length || 0;
                  const unlistedCount = comp.banks?.filter(
                    (b: any) => getCategoryStatus(b.category).status === "NEGATIVE"
                  ).length || 0;
                  const cautionCount = comp.banks?.filter(
                    (b: any) => getCategoryStatus(b.category).status === "CAUTION"
                  ).length || 0;

                  const filteredBanks = comp.banks?.filter((b: any) => {
                    if (bankFilter === "ALL") return true;
                    return getCategoryStatus(b.category).status === bankFilter;
                  }) || [];

                  return (
                    <div
                      key={comp.companyId}
                      className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
                    >
                      {/* Company Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
                              {comp.companyName}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--text-secondary)] pl-1">
                            {comp.city && (
                              <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                                {comp.city}, {comp.state}
                              </span>
                            )}
                            {comp.cin && (
                              <span className="font-mono bg-white/60 dark:bg-slate-950/60 text-[var(--text-secondary)] px-2 py-0.5 rounded-md text-[11px] border border-[var(--border-subtle)]">
                                CIN: {comp.cin}
                              </span>
                            )}
                            <span className="text-[var(--text-tertiary)]">•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                              <span>{listedCount} of {totalBanks} Lenders Listed</span>
                            </span>
                          </div>
                        </div>

                        {/* Header Badge */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider bg-white/60 dark:bg-slate-900/60 px-3 py-1 rounded-full border border-white/60 dark:border-white/10 shadow-xs">
                            Cataloged Reference Record
                          </span>
                        </div>
                      </div>

                      {/* Policy Grid */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                            Institutional Lender Policy Categorization ({filteredBanks.length})
                          </h4>
                          <div className="flex items-center gap-3 text-xs font-semibold">
                            <span className="text-emerald-600 dark:text-emerald-400">
                              {listedCount} Listed
                            </span>
                            {cautionCount > 0 && (
                              <span className="text-amber-600 dark:text-amber-400">
                                • {cautionCount} Caution
                              </span>
                            )}
                            <span className="text-[var(--text-tertiary)]">
                              • {unlistedCount} Unlisted
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          {filteredBanks.map((b: any) => {
                            const visual = getCategoryStatus(b.category);
                            const isBank = b.bankType === "BANK" || !b.bankType;

                            return (
                              <div
                                key={b.bankId}
                                className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/70 backdrop-blur-md border border-white/70 dark:border-white/10 flex flex-col justify-between space-y-3.5 hover:border-blue-500/40 hover:shadow-md transition-all group"
                              >
                                {/* Top Row: Logo & Bank Name */}
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-xs overflow-hidden p-1.5">
                                    {b.logoUrl ? (
                                      <img src={b.logoUrl} alt={b.bankCode || b.bankName} className="w-full h-full object-contain" />
                                    ) : (
                                      <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                      {b.bankName}
                                    </div>
                                    <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                                      {isBank ? "Commercial Bank" : "NBFC Lender"}
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom: Category Badge & Optional Action */}
                                <div className="space-y-2 pt-1 border-t border-[var(--border-subtle)]">
                                  <div
                                    className={`w-full py-1.5 px-3 rounded-xl border text-center font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-xs ${visual.badgeClass}`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${visual.dotClass}`} />
                                    <span className="truncate">{b.category || "UNLISTED"}</span>
                                  </div>

                                  {b.applyEnabled && b.applyUrl && (
                                    <a
                                      href={b.applyUrl}
                                      target={b.applyUrl.startsWith("http") ? "_blank" : undefined}
                                      rel={b.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                      className="liquid-glass-btn-primary w-full py-1.5 px-3 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                                    >
                                      <span>Apply for Loan</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {filteredBanks.length === 0 && (
                          <div className="p-8 text-center rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-tertiary)]">
                            No institutional lenders match the selected &quot;{bankFilter}&quot; filter for this company.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── EDUCATIONAL GUIDE & EMPLOYER CATEGORY MATRIX ────────────────── */}
        <section id="matrix-guide" className="mt-20 pt-16 border-t border-[var(--border-subtle)] space-y-14 scroll-mt-28">
          {/* Section Heading */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Underwriting Matrix Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[var(--text-primary)] tracking-tight">
              Understanding Corporate Employer Category Tiering
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              Commercial banks and NBFCs frequently reference corporate employer directories when evaluating unsecured retail loan applications alongside individual credit bureau scores:
            </p>
          </div>

          {/* Section A & B: Tool Scope & Normalization Methodology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md">
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-primary)]">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>What This Tool Checks</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                The Company Checker searches compiled reference records to indicate whether an employer entity appears on institutional lender policy lists. It displays cataloged policy tiers (such as Category A, B, C, or Unlisted) compiled from lending guideline references.
              </p>
            </div>

            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md">
              <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-primary)]">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>How Matching &amp; Normalization Works</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Search queries are processed using PostgreSQL trigram similarity indexing and string normalization. Entity suffixes (such as &quot;Pvt Ltd&quot;, &quot;Limited&quot;, &quot;LLP&quot;, and &quot;Inc&quot;) and common punctuation marks are normalized to locate matching employer records across spelling variations.
              </p>
            </div>
          </div>

          {/* Section C: 4 Category Explanation Cards (What Category Means) */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-500" />
                <span>Employer Category Tiers Explained</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Category A Card */}
              <div className="liquid-glass-card rounded-3xl p-6 space-y-3.5 shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Tier 1 / Superprime
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Category A (Superprime)
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  Typically includes large multinational enterprises, premier public sector undertakings, and major listed corporations with strong corporate track records. Some institutions may offer preferential rate bands or higher internal borrowing caps to applicants from these employers, subject to full credit evaluation.
                </p>
              </div>

              {/* Category B Card */}
              <div className="liquid-glass-card rounded-3xl p-6 space-y-3.5 shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    Tier 2 / Prime
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Category B (Prime)
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  Established mid-cap organizations, prominent regional corporations, and institutional healthcare or educational bodies. Borrowers are typically processed through standard underwriting channels with competitive product parameters.
                </p>
              </div>

              {/* Category C & D Card */}
              <div className="liquid-glass-card rounded-3xl p-6 space-y-3.5 shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Tier 3 / Growth
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Category C &amp; D
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  Small to medium enterprises, regional businesses, or emerging ventures. Lenders may review additional verification items, such as longer banking history or conservative debt-to-income benchmarks.
                </p>
              </div>

              {/* Unlisted Card */}
              <div className="liquid-glass-card rounded-3xl p-6 space-y-3.5 shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                    Open Market
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Unlisted / Emerging
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                  Entities not explicitly indexed in a lender&apos;s corporate master list. Applications are evaluated through open-market underwriting based on individual income stability, salary credit verification, and credit history.
                </p>
              </div>
            </div>
          </div>

          {/* Section D & E: What Results Do NOT Mean & Illustrative Financial Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md border-l-4 border-l-amber-500">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>What Category Results Do NOT Mean</span>
              </h3>
              <ul className="text-xs sm:text-sm text-[var(--text-secondary)] space-y-2.5 font-normal list-disc list-inside leading-relaxed">
                <li>Does NOT guarantee loan approval or pre-sanctioned credit status.</li>
                <li>Does NOT guarantee a specific interest rate, fee waiver, or loan quantum.</li>
                <li>Does NOT guarantee expedited turnaround or automated document waivers.</li>
                <li>An &quot;Unlisted&quot; result does NOT mean loan rejection or an unfavorable credit rating.</li>
              </ul>
            </div>

            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md border-l-4 border-l-blue-500">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Illustrative Financial Context</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                <em>Illustrative example only — actual interest rates, loan amounts, eligibility criteria and processing times vary by lender and borrower.</em> For instance, while industry marketing often showcases illustrative unsecured rates or processing timelines for prime corporate employees, actual sanction terms depend entirely on individual underwriting, monthly take-home salary, credit score history, and institutional credit policy.
              </p>
            </div>
          </div>

          {/* Section F & G: Limitations & Data Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                <span>Platform Limitations</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Institutional employer lists are updated periodically by lenders. Internal revisions or policy changes made by a bank&apos;s credit committee may not be immediately reflected. Search results reflect reference classifications rather than live credit bureau or core banking systems.
              </p>
            </div>

            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-md">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Data &amp; Source Transparency</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                Classifications are compiled from institutional lender policy circulars, corporate master catalogs, and public underwriting references. NVIT.SPACE is an independent technology utility and is not an agent, loan broker, or affiliate of any financial institution.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions (Section H) with Interactive Liquid Accordions */}
          <div className="space-y-5 pt-4">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Frequently Asked Questions About Company Category Checks</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Essential clarifications regarding bank policy classification, employer lists, and open-market underwriting channels.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = !!openFaqs[idx];
                return (
                  <div
                    key={idx}
                    className="liquid-glass-card rounded-2xl overflow-hidden transition-all duration-200 border border-white/60 dark:border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] pr-2">
                        {faq.q}
                      </h4>
                      <div
                        className={`w-7 h-7 rounded-xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Underwriting & Independence Disclaimer Callout */}
          <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20 space-y-2.5 text-xs text-[var(--text-secondary)] font-normal shadow-md">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Underwriting &amp; Independence Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              Company categorization statuses displayed on this page are compiled for informational and estimation guidance only. NVIT.SPACE is an independent technology platform and is not an authorized lender, banking partner, or financial advisory service. Institutional categories, loan rates, eligibility criteria, and exposure limits are subject to change by respective lending institutions without prior notice. Categorization status does not guarantee loan approval, credit limits, interest rates, or disbursal timelines. Final credit decisions rest exclusively with the respective lending institution following formal underwriting.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
