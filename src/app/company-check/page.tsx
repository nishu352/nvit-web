"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryStatus, CategoryStatusType } from "@/utils/categoryStatus";

interface Suggestion {
  id: string;
  name: string;
  city?: string;
  state?: string;
}

export default function CompanyCheckPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [bankFilter, setBankFilter] = useState<"ALL" | CategoryStatusType>("ALL");

  const handleSearch = async (overrideTerm?: string) => {
    const q = (overrideTerm !== undefined ? overrideTerm : searchTerm).trim();
    if (!q) return;

    setLoading(true);
    setShowSuggestions(false);
    setHasSearched(true);
    setSearchedQuery(q);
    setCompanies([]);

    try {
      const response = await apiClient.get("/company/search", {
        params: { q },
      });
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setCompanies(response.data.data);
      }
    } catch (err) {
      console.error("API search error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const term = searchTerm.trim();
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get("/company/autocomplete", {
          params: { q: term },
        });
        if (active && res.data && res.data.success && Array.isArray(res.data.data)) {
          setSuggestions(res.data.data);
        }
      } catch (err) {
        if (active) setSuggestions([]);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can an applicant get a personal loan if their employer is marked \"Unlisted\"?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. An \"Unlisted\" categorization simply means the lender does not maintain an active corporate tie-up or pre-indexed policy entry for that organization. Commercial lenders and NBFCs process unlisted company employees through open-market channels, evaluating individual income stability, salary credits, and overall credit history."
                }
              },
              {
                "@type": "Question",
                "name": "Why is a company categorized as CAT-A in one bank but CAT-B or Unlisted in another?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each lending institution establishes its own internal risk models, commercial relationships, and payroll portfolio partnerships. A bank that manages an employer's corporate payroll accounts will typically place that organization in a higher internal category than an institution without a banking relationship."
                }
              },
              {
                "@type": "Question",
                "name": "Does employer tiering affect loan processing workflows?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Some lenders apply automated straight-through processing workflows or streamlined document verification for certain categorized corporate employees. However, processing times vary by lender, applicant documentation completeness, and verification requirements."
                }
              },
              {
                "@type": "Question",
                "name": "How often do lenders revise their corporate employer lists?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Credit committees review corporate employer lists periodically, adjusting classifications based on corporate financial performance, market capitalization, credit rating changes, and internal portfolio risk parameters."
                }
              }
            ]
          }),
        }}
      />

      <Navbar />

      {/* Hero & Search Header */}
      <div className="pt-36 sm:pt-44 pb-14 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-white/5 bg-hero-gradient relative z-30">
        {/* Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-purple-600/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              Company Category Checker
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
              Inspect employer company tiering indicators (CAT A, CAT B, Superprime, Unlisted) compiled from major Indian commercial bank and NBFC underwriting policy matrices.
            </p>
          </div>

          {/* Search Box */}
          <div className="pt-3 max-w-2xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="relative"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setShowSuggestions(false);
                  }}
                  placeholder="Type employer name (e.g. hdfc, tata capital, infosys)..."
                  aria-label="Employer company search"
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white text-sm font-semibold focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none shadow-xl dark:shadow-none transition-all"
                />
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Submit company inspection"
                  className="absolute right-2 top-2 bottom-2 px-3 sm:px-6 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 sm:hidden" />
                      <span className="hidden sm:inline">Inspect Company</span>
                      <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-2 z-50 shadow-2xl space-y-1 text-left max-h-80 overflow-y-auto"
                >
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between">
                    <span>Database Suggestions</span>
                    <span>Exact Relevance</span>
                  </div>
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchTerm(item.name);
                        setShowSuggestions(false);
                        handleSearch(item.name);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.city && (
                        <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 ml-2">
                          {item.city}, {item.state || ""}
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Legend Indicators */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
              <span>Listed / Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm" />
              <span>Caution / Review</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
              <span>Unlisted / Delisted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Results Body */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center mx-auto text-zinc-900 dark:text-white">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Querying Banking Policy Index...</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Scanning indexed companies across partner financial institutions</p>
            </div>
          </div>
        )}

        {!loading && hasSearched && companies.length === 0 && (
          <div className="rounded-3xl p-12 text-center glass-card-apple max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/10 text-zinc-400 flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-zinc-900 dark:text-white">No Companies Found</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No matching employer company for &quot;<span className="font-bold text-zinc-900 dark:text-white">{searchedQuery}</span>&quot; was found in the policy database.
              </p>
            </div>
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div className="space-y-8">
            {/* Search Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-zinc-900 dark:text-white">
                  Found {companies.length} Match{companies.length > 1 ? "es" : ""}
                </span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  for &quot;{searchedQuery}&quot;
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setBankFilter("ALL")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    bankFilter === "ALL"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-black"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  All Banks
                </button>
                <button
                  type="button"
                  onClick={() => setBankFilter("LISTED")}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    bankFilter === "LISTED"
                      ? "bg-emerald-500 text-white shadow-sm font-black"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-500"
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
                      ? "bg-rose-500 text-white shadow-sm font-black"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-rose-500"
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
                    className="rounded-3xl p-6 sm:p-8 glass-card-apple space-y-6 transition-all"
                  >
                    {/* Company Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-white/10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                            {comp.companyName}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pl-1">
                          {comp.city && (
                            <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                              <MapPin className="w-3.5 h-3.5 text-blue-500" />
                              {comp.city}, {comp.state}
                            </span>
                          )}
                          {comp.cin && (
                            <span className="font-mono bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded text-[11px] border border-zinc-200 dark:border-white/10">
                              CIN: {comp.cin}
                            </span>
                          )}
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <span className="text-emerald-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{listedCount} of {totalBanks} Lenders Listed</span>
                          </span>
                        </div>
                      </div>

                      {/* Header Badge */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[11px] font-semibold text-emerald-500">Live Verified</span>
                      </div>
                    </div>

                    {/* Policy Grid */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Institutional Lender Policy Categorization ({filteredBanks.length})
                        </h4>
                        <div className="flex items-center gap-3 text-xs font-bold">
                          <span className="text-emerald-500 font-black">
                            {listedCount} Listed
                          </span>
                          {cautionCount > 0 && (
                            <span className="text-amber-500 font-black">
                              • {cautionCount} Caution
                            </span>
                          )}
                          <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
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
                              className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 flex flex-col justify-between space-y-3.5 hover:border-zinc-400 dark:hover:border-white/30 transition-all group"
                            >
                              {/* Top Row: Logo & Bank Name */}
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1">
                                  {b.logoUrl ? (
                                    <img src={b.logoUrl} alt={b.bankCode || b.bankName} className="w-full h-full object-contain" />
                                  ) : (
                                    <Landmark className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-black text-zinc-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {b.bankName}
                                  </div>
                                  <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    {isBank ? "Commercial Bank" : "NBFC Lender"}
                                  </div>
                                </div>
                              </div>

                              {/* Bottom: Category Badge */}
                              <div className="space-y-2 pt-1 border-t border-zinc-200/60 dark:border-white/10">
                                <div
                                  className={`w-full py-1.5 px-3 rounded-xl border text-center font-black text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-sm ${visual.badgeClass}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${visual.dotClass}`} />
                                  <span className="truncate">{b.category || "UNLISTED"}</span>
                                </div>

                                {b.applyEnabled && b.applyUrl && (
                                  <a
                                    href={b.applyUrl}
                                    target={b.applyUrl.startsWith("http") ? "_blank" : undefined}
                                    rel={b.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="w-full py-1.5 px-3 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
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
                        <div className="p-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-500">
                          No institutional lenders match the selected &quot;{bankFilter}&quot; filter for this company.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EDUCATIONAL GUIDE & EMPLOYER CATEGORY MATRIX ────────────────── */}
        <section className="mt-16 pt-12 border-t border-zinc-200/80 dark:border-white/10 space-y-12">
          {/* Section Heading */}
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Understanding Corporate Employer Category Tiering in Banking
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Commercial banks and NBFCs often reference internal corporate employer directories when evaluating unsecured retail loan applications alongside individual credit bureau scores:
            </p>
          </div>

          {/* Section A & B: Tool Scope & Normalization Methodology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>What This Tool Checks</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                The Company Checker searches compiled reference records to indicate whether an employer entity appears on institutional lender policy lists. It displays cataloged policy tiers (such as Category A, B, C, or Unlisted) compiled from lending guideline references.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>How Matching &amp; Normalization Works</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Search queries are processed using PostgreSQL trigram similarity indexing and string normalization. Entity suffixes (such as &quot;Pvt Ltd&quot;, &quot;Limited&quot;, &quot;LLP&quot;, and &quot;Inc&quot;) and common punctuation marks are normalized to locate matching employer records across spelling variations.
              </p>
            </div>
          </div>

          {/* Section C: 4 Category Explanation Cards (What Category Means) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Employer Category Tiers Explained
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/40">Tier 1 / Superprime</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Category A (Superprime)</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Typically includes large multinational enterprises, premier public sector undertakings, and major listed corporations with strong corporate track records. Some institutions may offer preferential rate bands or higher internal borrowing caps to applicants from these employers, subject to full credit evaluation.
                </p>
              </div>

              <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800/40">Tier 2 / Prime</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Category B (Prime)</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Established mid-cap organizations, prominent regional corporations, and institutional healthcare or educational bodies. Borrowers are typically processed through standard underwriting channels with competitive product parameters.
                </p>
              </div>

              <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/80 dark:border-amber-800/40">Tier 3 / Growth</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Category C &amp; D</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Small to medium enterprises, regional businesses, or emerging ventures. Lenders may review additional verification items, such as longer banking history or conservative debt-to-income benchmarks.
                </p>
              </div>

              <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200/80 dark:border-rose-800/40">Open Market</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Unlisted / Emerging</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Entities not explicitly indexed in a lender&apos;s corporate master list. Applications are evaluated through open-market underwriting based on individual income stability, salary credit verification, and credit history.
                </p>
              </div>
            </div>
          </div>

          {/* Section D & E: What Results Do NOT Mean & Illustrative Financial Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm border-l-4 border-l-amber-500">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>What Category Results Do NOT Mean</span>
              </h3>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 font-medium list-disc list-inside">
                <li>Does NOT guarantee loan approval or pre-sanctioned credit status.</li>
                <li>Does NOT guarantee a specific interest rate, fee waiver, or loan quantum.</li>
                <li>Does NOT guarantee expedited turnaround or automated document waivers.</li>
                <li>An &quot;Unlisted&quot; result does NOT mean loan rejection or an unfavorable credit rating.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm border-l-4 border-l-blue-500">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Illustrative Financial Context</span>
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                <em>Illustrative example only — actual interest rates, loan amounts, eligibility criteria and processing times vary by lender and borrower.</em> For instance, while industry marketing often showcases illustrative unsecured rates or processing timelines for prime corporate employees, actual sanction terms depend entirely on individual underwriting, monthly take-home salary, credit score history, and institutional credit policy.
              </p>
            </div>
          </div>

          {/* Section F & G: Limitations & Data Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                Platform Limitations
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Institutional employer lists are updated periodically by lenders. Internal revisions or policy changes made by a bank&apos;s credit committee may not be immediately reflected. Search results reflect reference classifications rather than live credit bureau or core banking systems.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card-apple space-y-3 shadow-sm">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                Data &amp; Source Transparency
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Classifications are compiled from institutional lender policy circulars, corporate master catalogs, and public underwriting references. NVIT.SPACE is an independent technology utility and is not an agent, loan broker, or affiliate of any financial institution.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions (Section H) */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions About Company Category Checks
            </h3>

            <div className="space-y-3.5">
              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Can an applicant get a personal loan if their employer is marked &quot;Unlisted&quot;?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Yes. An &quot;Unlisted&quot; categorization simply means the lender does not maintain an active corporate tie-up or pre-indexed policy entry for that organization. Commercial lenders and NBFCs process unlisted company employees through open-market channels, evaluating individual income stability, salary credits, and overall credit history.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Why is a company categorized as CAT-A in one bank but CAT-B or Unlisted in another?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Each lending institution establishes its own internal risk models, commercial relationships, and payroll portfolio partnerships. A bank that manages an employer&apos;s corporate payroll accounts will typically place that organization in a higher internal category than an institution without a banking relationship.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Does employer tiering affect loan processing workflows?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Some lenders apply automated straight-through processing workflows or streamlined document verification for certain categorized corporate employees. However, processing times vary by lender, applicant documentation completeness, and verification requirements.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  How often do lenders revise their corporate employer lists?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Credit committees review corporate employer lists periodically, adjusting classifications based on corporate financial performance, market capitalization, credit rating changes, and internal portfolio risk parameters.
                </p>
              </div>
            </div>
          </div>

          {/* Informational Notice Callout */}
          <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Underwriting &amp; Independence Disclaimer:</span>
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
