"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EmiCalculatorWidget from "@/components/finance-tools/EmiCalculatorWidget";
import { apiClient } from "@/services/apiClient";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Calculator,
  Search,
  Loader2,
  CheckCircle2,
  Wrench,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryStatus } from "@/utils/categoryStatus";
import { FINANCE_TOOLS_CONFIG } from "@/config/siteNavigation";

export default function FinanceToolsPage() {
  const [activeTab, setActiveTab] = useState<"emi" | "company" | "pincode">("emi");

  // Company Search State
  const [companyQuery, setCompanyQuery] = useState("");
  const [companySuggestions, setCompanySuggestions] = useState<any[]>([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [companySearchRan, setCompanySearchRan] = useState(false);
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);

  // Pincode Search State
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  const handleCompanySearchSubmit = (e: React.FormEvent, directQuery?: string) => {
    e.preventDefault();
    const q = (directQuery !== undefined ? directQuery : companyQuery).trim();
    if (!q) return;

    setCompanyLoading(true);
    setCompanySearchRan(true);
    setShowCompanySuggestions(false);
    setCompanySuggestions([]);
    setSelectedCompany(null);

    apiClient
      .get(`/company/search?q=${encodeURIComponent(q)}`)
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          setSelectedCompany(res.data.data[0]);
        } else {
          setSelectedCompany(null);
        }
      })
      .catch(() => setSelectedCompany(null))
      .finally(() => setCompanyLoading(false));
  };

  useEffect(() => {
    if (companyQuery.trim().length < 2) {
      setCompanySuggestions([]);
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      try {
        const res = await apiClient.get(`/company/autocomplete?q=${encodeURIComponent(companyQuery.trim())}`);
        if (active && res.data.success) {
          setCompanySuggestions(res.data.data || []);
        }
      } catch (err) {
        if (active) setCompanySuggestions([]);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [companyQuery]);

  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeQuery.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeError("Please enter a valid 6-digit PIN code.");
      return;
    }
    setPincodeError("");
    setPincodeLoading(true);
    setPincodeResult(null);

    apiClient
      .get(`/pincode/check`, { params: { pincode: cleanPin } })
      .then((res) => {
        if (res.data.success) {
          setPincodeResult(res.data.data);
        } else {
          setPincodeError("Pincode information not found.");
        }
      })
      .catch((err) => {
        setPincodeError(err.response?.data?.message || "Failed to query pincode serviceability.");
      })
      .finally(() => setPincodeLoading(false));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-white/5 bg-hero-gradient relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Finance Tools" }]} />

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Digital Financial Utilities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              FINANCIAL CALCULATORS &amp; DATA TOOLS.
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-base leading-relaxed font-medium">
              Interactive loan repayment calculators, borrowing eligibility estimators, interest growth engines, and verified banking data APIs built by NVIT.SPACE.
            </p>

            {/* Quick-Access Tabs */}
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                onClick={() => setActiveTab("emi")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "emi"
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-white/10"
                }`}
              >
                <Calculator className="w-4 h-4" />
                Universal Loan EMI
              </button>

              <button
                onClick={() => setActiveTab("company")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "company"
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-white/10"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Company Category Check
              </button>

              <button
                onClick={() => setActiveTab("pincode")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "pincode"
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-white/10"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Pincode Checker (19.5k)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tool Render Area */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Interactive Selected Tab Widget */}
        {activeTab === "emi" && (
          <div id="emi-calculator-live" className="glass-card-apple rounded-3xl p-6 sm:p-8">
            <EmiCalculatorWidget />
          </div>
        )}

        {activeTab === "company" && (
          <div className="glass-card-apple rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">Inspect Employer Company Category</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                Type employer name (e.g. &quot;indus&quot;, &quot;tata&quot;, &quot;hcl&quot;) to inspect bank policy categorization using prefix search.
              </p>
            </div>

            <form onSubmit={handleCompanySearchSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={companyQuery}
                  onChange={(e) => {
                    setCompanyQuery(e.target.value);
                    setShowCompanySuggestions(true);
                  }}
                  onFocus={() => setShowCompanySuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setShowCompanySuggestions(false);
                  }}
                  placeholder="Type company name (e.g. indus)..."
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                />
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  disabled={companyLoading}
                  className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center transition-all"
                >
                  {companyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Inspect Company</span><Search className="w-4 h-4 sm:hidden" /></>}
                </button>

                <AnimatePresence>
                  {showCompanySuggestions && companySuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-2 z-50 shadow-2xl space-y-1"
                    >
                      {companySuggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => {
                            setCompanyQuery(item.name);
                            setShowCompanySuggestions(false);
                            handleCompanySearchSubmit(e as any, item.name);
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400">{item.city || item.state || "Active Record"}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {companySearchRan && !companyLoading && !selectedCompany && (
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-center text-xs text-zinc-500 dark:text-zinc-400">
                No exact match found for &quot;{companyQuery}&quot;
              </div>
            )}

            {selectedCompany && (
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white">{selectedCompany.companyName}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {selectedCompany.city ? `${selectedCompany.city}, ${selectedCompany.state || ""}` : "Verified Record"}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-500">Verified</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {selectedCompany.banks?.slice(0, 4).map((b: any) => {
                    const visual = getCategoryStatus(b.category);
                    return (
                      <div key={b.bankId} className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 space-y-2 flex flex-col justify-between shadow-sm">
                        <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-200 block truncate">{b.bankName}</span>
                        <span className={`text-xs font-black px-2 py-1 rounded-lg border text-center block ${visual.badgeClass}`}>{b.category || "UNLISTED"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "pincode" && (
          <div className="glass-card-apple rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">Inspect Regional PIN Code Serviceability</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                Enter a 6-digit Indian PIN code to check regional banking coverage &amp; serviceability metrics.
              </p>
            </div>

            <form onSubmit={handlePincodeSearch} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeQuery}
                  onChange={(e) => setPincodeQuery(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit PIN code (e.g. 201301)..."
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                />
                <MapPin className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  disabled={pincodeLoading || pincodeQuery.length !== 6}
                  className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {pincodeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Inspect Pincode"}
                </button>
              </div>
              {pincodeError && <p className="text-xs text-rose-500 font-bold">{pincodeError}</p>}
            </form>

            {pincodeResult && (
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-3">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white">PIN Code {pincodeResult.pincode} Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <div>City: <span className="text-zinc-900 dark:text-white font-bold">{pincodeResult.city || "N/A"}</span></div>
                  <div>State: <span className="text-zinc-900 dark:text-white font-bold">{pincodeResult.state || "N/A"}</span></div>
                  <div>Status: <span className="text-emerald-500 font-bold">Active Coverage</span></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── COMPLETE CALCULATORS DIRECTORY ─────────────────────────── */}
        <section className="space-y-8 pt-6 border-t border-zinc-200/80 dark:border-white/10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Specialized Financial Calculators
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Explore our dedicated calculators for specific loan categories, borrowing capacity, and interest compounding:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FINANCE_TOOLS_CONFIG.map((tool) => (
              <div
                key={tool.slug}
                className="glass-card-apple rounded-3xl p-7 space-y-4 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10">
                      {tool.badge}
                    </span>
                    <Calculator className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/finance-tools/${tool.slug}`}>{tool.name}</Link>
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                <Link href={`/finance-tools/${tool.slug}`}>
                  <button className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md">
                    Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
