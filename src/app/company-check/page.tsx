"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/services/apiClient";
import { Search, Building2, Loader2, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleSearch = async (queryToSearch?: string) => {
    const q = (queryToSearch !== undefined ? queryToSearch : searchTerm).trim();
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
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get("/company/autocomplete", {
          params: { q: searchTerm.trim() },
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

  const getCategoryBadgeClass = (cat: string) => {
    const u = String(cat || "").toUpperCase();
    if (u.includes("CAT A") || u.includes("PRIME") || u.includes("SUPER A")) {
      return "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800";
    }
    if (u.includes("CAT B")) {
      return "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-800";
    }
    if (u.includes("CAT C")) {
      return "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-800";
    }
    if (u.includes("REJECT") || u.includes("BLOCKED")) {
      return "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-400 border-rose-300 dark:border-rose-800";
    }
    return "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-900 bg-white dark:bg-slate-950 relative z-40">
        {/* Ambient Orb Wrapper to prevent horizontal scroll without clipping dropdown */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>NVIT.SPACE Digital Intelligence Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Company Category Checker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            Inspect employer company tiering (CAT A, CAT B, CAT C, Unlisted) across 30+ partner banking institutions directly powered by live database indexing.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-2xl mx-auto relative">
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
                  placeholder="Type employer name (e.g. indus, tata, hcl)..."
                  aria-label="Employer company search"
                  className="w-full h-14 pl-12 pr-4 sm:pr-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-xl dark:shadow-none"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Submit company inspection"
                  className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50 transition-colors items-center justify-center"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Inspect Company</span><Search className="w-4 h-4 sm:hidden" /></>}
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
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1 text-left"
                >
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchTerm(item.name);
                        setShowSuggestions(false);
                        handleSearch(item.name);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/80 hover:text-blue-600 dark:hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{item.name}</span>
                      </div>
                      {item.city && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {item.city}, {item.state || ""}
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {loading && (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-500 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Querying Supabase production database...</p>
          </div>
        )}

        {!loading && hasSearched && companies.length === 0 && (
          <div className="glass-card rounded-3xl p-12 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-3 shadow-xl dark:shadow-none">
            <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Companies Found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              No matching employer company starting with &quot;{searchedQuery}&quot; was found in our database records.
            </p>
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Found {companies.length} Match{companies.length > 1 ? "es" : ""} for &quot;{searchedQuery}&quot;
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-Time Bank Policy Index</span>
            </div>

            <div className="space-y-6">
              {companies.map((comp) => (
                <div
                  key={comp.companyId}
                  className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">{comp.companyName}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                        {comp.city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            {comp.city}, {comp.state}
                          </span>
                        )}
                        {comp.cin && <span>CIN: {comp.cin}</span>}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Live Database Verified</span>
                    </div>
                  </div>

                  {/* Bank Categories Grid */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                      Partner Lender Policy Categorization
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {comp.banks?.map((b: any) => (
                        <div
                          key={b.bankId}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between"
                        >
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block truncate">{b.bankName}</span>
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border text-center block ${getCategoryBadgeClass(
                              b.category
                            )}`}
                          >
                            {b.category || "UNLISTED"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

