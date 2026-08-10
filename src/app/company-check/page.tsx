"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/services/apiClient";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search, Building2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  id: string;
  name: string;
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

    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get("/company/autocomplete", {
          params: { q: searchTerm },
        });
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setSuggestions(res.data.data);
        }
      } catch (err) {
        console.error("Autocomplete error", err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getCategoryBadgeVariant = (cat: string): "emerald" | "royal" | "amber" | "rose" | "slate" => {
    const uppercase = String(cat || "").toUpperCase();
    if (uppercase.includes("CAT A") || uppercase.includes("PRIME")) return "emerald";
    if (uppercase.includes("CAT B")) return "royal";
    if (uppercase.includes("CAT C")) return "amber";
    if (uppercase.includes("REJECT") || uppercase.includes("BLOCKED")) return "rose";
    return "slate";
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-royal selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="page-top-offset pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#FAFBFC] via-[#F6F8FA] to-white dark:from-[#0B1020] dark:via-slate-900 dark:to-[#0B1020] bg-dot-grid dark:bg-dot-grid-dark relative">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <Badge variant="emerald" pulse>
            NVIT SOLUTION Institutional Category Matrix
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Company Category Checker
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-xs sm:text-sm leading-relaxed font-semibold">
            Inspect employer company tiering (CAT A, CAT B, CAT C, Unlisted, Reject) across 30+ leading partner banks & NBFCs including ABFL, ICICI, HDFC, SBI, Axis, and Bajaj Finserv.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 w-full z-20 relative">
        <div className="glass-card rounded-3xl p-5 shadow-xl relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
          >
            <div className="relative flex-1 w-full">
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter Employer Company Name (e.g. Tata Consultancy Services, Infosys, Reliance, Aditya Birla...)"
                leftIcon={<Search className="w-5 h-5 text-royal" />}
                className="bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-royal transition-colors"
              />

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-2xl py-2 z-30 max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSearchTerm(s.name);
                          handleSearch(s.name);
                        }}
                        className="w-full px-5 py-2.5 text-left text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-colors cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 inline-block mr-2 text-slate-400" />
                        {s.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              variant="primary"
              size="lg"
              className="h-12 shrink-0 shadow-lg shadow-royal/20"
            >
              Check Company
            </Button>
          </form>
        </div>
      </div>

      {/* Results Display */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8 relative z-10">
        {loading ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : !hasSearched ? (
          <div className="max-w-2xl mx-auto text-center py-16 px-6 glass-card rounded-3xl border border-[var(--border-default)] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-royal dark:text-blue-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[var(--text-primary)]">Search Your Employer Company</h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
              Type your employer company name in the search bar above to inspect bank policy categories (CAT A, CAT B, CAT C, or Unlisted) across all 30+ partner lenders.
            </p>
          </div>
        ) : companies.length === 0 ? (
          <EmptyState
            title={`No Match Found for "${searchedQuery}"`}
            description="Unlisted companies are treated with standard CAT B / CAT C policy approval across partner banks."
            actionText="Try Searching TCS"
            onAction={() => {
              setSearchTerm("TCS");
              handleSearch("TCS");
            }}
          />
        ) : (
          <div className="space-y-8">
            {companies.map((comp) => (
              <motion.div
                key={comp.companyId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border-default)]">
                  {/* Company Header */}
                  <div className="px-6 py-5 border-b border-[var(--border-default)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-subtle)" }}>
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-royal text-white flex items-center justify-center font-bold shadow-lg shadow-royal/30">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{comp.companyName}</h2>
                        {comp.cin && <span className="text-[10px] font-mono text-[var(--text-muted)]">CIN / REF: {comp.cin}</span>}
                      </div>
                    </div>
                    <Badge variant="emerald" pulse>
                      NVIT SOLUTION VERIFIED MATRIX
                  </Badge>
                  </div>

                  {/* High Contrast Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[var(--text-muted)] text-[11px] uppercase font-black tracking-wider border-b border-[var(--border-default)]" style={{ backgroundColor: "var(--bg-muted)" }}>
                          <th className="py-4 px-6">Bank / Lender</th>
                          <th className="py-4 px-6">Type</th>
                          <th className="py-4 px-6">Category Tier</th>
                          <th className="py-4 px-6">Approval Status</th>
                          <th className="py-4 px-6">Policy Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-bold text-slate-750 dark:text-slate-200">
                        {comp.banks.map((b: any) => (
                          <tr key={b.bankId} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-muted)] transition-colors">
                            <td className="py-4.5 px-6 font-extrabold text-[var(--text-primary)]">{b.bankName}</td>
                            <td className="py-4.5 px-6 text-[var(--text-muted)] font-semibold">{b.bankType}</td>
                            <td className="py-4.5 px-6">
                              <Badge variant={getCategoryBadgeVariant(b.category)}>
                                {b.category}
                              </Badge>
                            </td>
                            <td className="py-4.5 px-6">
                              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-extrabold gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                {b.status}
                              </span>
                            </td>
                            <td className="py-4.5 px-6 text-[var(--text-secondary)] font-semibold">{b.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

