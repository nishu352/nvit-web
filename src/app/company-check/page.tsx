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
  AlertCircle,
  XCircle,
  HelpCircle,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Filter,
  Sparkles,
  Info,
  ExternalLink,
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero & Search Header */}
      <div className="pt-36 sm:pt-44 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-850 bg-white dark:bg-slate-950 relative z-30">
        {/* Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 to-indigo-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>NVIT.SPACE Enterprise Policy Matrix</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Company Category Checker
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
              Inspect real-time employer company tiering (CAT A, CAT B, CAT C, Superprime, Unlisted) across top Indian banks and NBFCs directly from the master policy database.
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
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-xl dark:shadow-none transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Submit company inspection"
                  className="absolute right-2 top-2 bottom-2 px-5 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-xs font-bold cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Inspect Company</span>
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
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1 text-left max-h-80 overflow-y-auto"
                >
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
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
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/80 hover:text-blue-600 dark:hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.city && (
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0 ml-2">
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
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Listed / Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Caution / Review</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Unlisted / Delisted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Results Body */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Querying Banking Policy Index...</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Scanning 528,000+ indexed companies across 14 financial institutions</p>
            </div>
          </div>
        )}

        {!loading && hasSearched && companies.length === 0 && (
          <div className="glass-card rounded-3xl p-12 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4 shadow-xl dark:shadow-none">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 dark:text-white">No Companies Found</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No matching employer company for &quot;<span className="font-bold text-slate-900 dark:text-white">{searchedQuery}</span>&quot; was found in the policy database.
              </p>
            </div>
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div className="space-y-8">
            {/* Search Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-850">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  Found {companies.length} Match{companies.length > 1 ? "es" : ""}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  for &quot;{searchedQuery}&quot;
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setBankFilter("ALL")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    bankFilter === "ALL"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  All Banks
                </button>
                <button
                  type="button"
                  onClick={() => setBankFilter("LISTED")}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    bankFilter === "LISTED"
                      ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Listed</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBankFilter("NEGATIVE")}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    bankFilter === "NEGATIVE"
                      ? "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-sm"
                      : "text-slate-500 hover:text-rose-600"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
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
                    className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-6 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    {/* Company Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {comp.companyName}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 pl-11">
                          {comp.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-500" />
                              {comp.city}, {comp.state}
                            </span>
                          )}
                          {comp.cin && (
                            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                              CIN: {comp.cin}
                            </span>
                          )}
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            {listedCount} of {totalBanks} Lenders Listed
                          </span>
                        </div>
                      </div>

                      {/* Summary Badges & Loan Apply CTA */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Live Policy Verified</span>
                        </div>

                        <Link
                          href={`/loan-apply?company=${encodeURIComponent(comp.companyName)}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                        >
                          <span>Apply For Loan</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Policy Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Partner Lender Policy Categorization ({filteredBanks.length})
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <span className="text-emerald-600 dark:text-emerald-400 font-black">
                            {listedCount} Listed
                          </span>
                          {cautionCount > 0 && (
                            <span className="text-amber-600 dark:text-amber-400 font-black">
                              • {cautionCount} Caution
                            </span>
                          )}
                          <span className="text-rose-600 dark:text-rose-400 font-black">
                            • {unlistedCount} Unlisted
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {filteredBanks.map((b: any) => {
                          const visual = getCategoryStatus(b.category);
                          const isBank = b.bankType === "BANK" || !b.bankType;

                          return (
                            <div
                              key={b.bankId}
                              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-0.5 min-w-0">
                                  <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {b.bankName}
                                  </div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {isBank ? "Banking Partner" : "NBFC Lender"}
                                  </div>
                                </div>
                                <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 flex items-center justify-center shrink-0 shadow-sm">
                                  <Landmark className="w-3 h-3" />
                                </div>
                              </div>

                              {/* Category Badge */}
                              <div className="space-y-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-850">
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                                  <span>Policy Category</span>
                                  <span className="flex items-center gap-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${visual.dotClass}`} />
                                    <span>{visual.label.split(" / ")[0]}</span>
                                  </span>
                                </div>

                                <div
                                  className={`px-3 py-1.5 rounded-xl border text-center font-black text-xs tracking-wide transition-all shadow-sm ${visual.badgeClass}`}
                                >
                                  {b.category || "UNLISTED"}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {filteredBanks.length === 0 && (
                        <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
                          No partner lenders match the selected &quot;{bankFilter}&quot; filter for this company.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
