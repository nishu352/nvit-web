"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmiCalculator from "@/components/ui/EmiCalculator";
import { apiClient } from "@/services/apiClient";
import { Building2, MapPin, Calculator, Search, Loader2, CheckCircle2, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-900 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>NVIT.SPACE Digital Tools Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Finance &amp; Data Tools Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            Interactive financial calculators, company category checkers, and pincode coverage utilities built by NVIT.SPACE.
          </p>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            <button
              onClick={() => setActiveTab("emi")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "emi"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              <Calculator className="w-4 h-4" />
              EMI Calculator
            </button>

            <button
              onClick={() => setActiveTab("company")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "company"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Company Category Check
            </button>

            <button
              onClick={() => setActiveTab("pincode")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "pincode"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Pincode Checker
            </button>
          </div>
        </div>
      </div>

      {/* Main Tool Render */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {activeTab === "emi" && (
          <div id="emi-calculator">
            <EmiCalculator />
          </div>
        )}

        {activeTab === "company" && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-none">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Inspect Employer Company Category</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
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
                  className="w-full h-14 pl-12 pr-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  disabled={companyLoading}
                  className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50 items-center justify-center transition-all"
                >
                  {companyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Inspect Company</span><Search className="w-4 h-4 sm:hidden" /></>}
                </button>

                <AnimatePresence>
                  {showCompanySuggestions && companySuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 z-50 shadow-2xl space-y-1"
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
                          className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-white flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{item.city || item.state || "Active Record"}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {companySearchRan && !companyLoading && !selectedCompany && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                No exact match found for &quot;{companyQuery}&quot;
              </div>
            )}

            {selectedCompany && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-blue-200 dark:border-blue-900/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">{selectedCompany.companyName}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {selectedCompany.city ? `${selectedCompany.city}, ${selectedCompany.state || ""}` : "Verified Record"}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                    Live Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {selectedCompany.banks?.slice(0, 4).map((b: any) => {
                    const u = String(b.category || "").toUpperCase();
                    let badgeClass = "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-800";
                    if (u.includes("CAT A") || u.includes("PRIME") || u.includes("SUPER A")) badgeClass = "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800";
                    else if (u.includes("CAT B")) badgeClass = "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-800";
                    else if (u.includes("CAT C")) badgeClass = "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-800";
                    else if (u.includes("REJECT") || u.includes("BLOCKED")) badgeClass = "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-400 border-rose-300 dark:border-rose-800";
                    return (
                      <div key={b.bankId} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between shadow-sm dark:shadow-none">
                        <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200 block truncate">{b.bankName}</span>
                        <span className={`text-xs font-black px-2 py-1 rounded-lg border text-center block ${badgeClass}`}>{b.category || "UNLISTED"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "pincode" && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl dark:shadow-none">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Inspect Regional PIN Code Serviceability</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
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
                  className="w-full h-14 pl-12 pr-32 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
                />
                <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  disabled={pincodeLoading || pincodeQuery.length !== 6}
                  className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  {pincodeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Inspect Pincode"}
                </button>
              </div>
              {pincodeError && <p className="text-xs text-rose-500 font-bold">{pincodeError}</p>}
            </form>

            {pincodeResult && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">PIN Code {pincodeResult.pincode} Details</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <div>City: <span className="text-slate-900 dark:text-white font-bold">{pincodeResult.city || "N/A"}</span></div>
                  <div>State: <span className="text-slate-900 dark:text-white font-bold">{pincodeResult.state || "N/A"}</span></div>
                  <div>Status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active Coverage</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

