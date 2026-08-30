"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { apiClient } from "@/services/apiClient";
import { MapPin, CheckCircle2, Building2, Loader2, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";

export default function PincodeCheckPage() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedPin, setSearchedPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheck = async () => {
    const pin = pincode.trim();
    if (!pin || pin.length !== 6) {
      setErrorMsg("Please enter a valid 6-digit PIN code.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setResult(null);
    setHasSearched(true);
    setSearchedPin(pin);

    try {
      const response = await apiClient.get("/pincode/check", {
        params: { pincode: pin },
      });
      if (response.data && response.data.success) {
        setResult(response.data.data);
      } else {
        setErrorMsg("Pincode information not found in policy index.");
      }
    } catch (err: any) {
      console.error("Pincode check error", err);
      setErrorMsg(err.response?.data?.message || "Failed to query pincode serviceability records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/60 dark:border-white/5 bg-hero-gradient relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">
          <Breadcrumbs items={[{ label: "Pincode Check" }]} />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Location Intelligence</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              Pincode Serviceability Checker
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
              Inspect regional postal serviceability, district postal zoning, and operational lender coverage across 19,500+ Indian PIN codes.
            </p>
          </div>

          {/* Search Box */}
          <div className="pt-2 max-w-xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheck();
              }}
              className="relative"
            >
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ""));
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Enter 6-digit PIN code (e.g. 110001, 201301)..."
                  aria-label="Enter 6-digit postal PIN code"
                  className="w-full h-14 pl-12 pr-36 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white text-sm font-semibold focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none shadow-sm transition-all"
                />
                <MapPin className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="submit"
                  disabled={loading || pincode.length !== 6}
                  className="absolute right-2 top-2 bottom-2 px-5 sm:px-6 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.98] text-white dark:text-zinc-950 text-xs font-bold cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Check Pincode</span>
                  )}
                </button>
              </div>
            </form>
            {errorMsg && (
              <p className="text-xs text-rose-500 font-bold mt-2.5 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Results Body */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center mx-auto text-zinc-900 dark:text-white">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Querying Postal Serviceability Matrix...</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Checking postal zoning and banking coverage for PIN {searchedPin}</p>
            </div>
          </div>
        )}

        {/* Initial Empty Search State */}
        {!loading && !hasSearched && (
          <div className="p-8 sm:p-12 rounded-3xl glass-card-apple text-center space-y-3 max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Enter a Postal PIN Code</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
              Input any valid 6-digit Indian postal code to instantly verify regional state, district zoning, and active bank coverage.
            </p>
          </div>
        )}

        {/* Not Found State */}
        {!loading && hasSearched && !result && errorMsg && (
          <div className="p-8 sm:p-12 rounded-3xl glass-card-apple text-center space-y-3 max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pincode Not Found</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No serviceability record found for PIN code &quot;{searchedPin}&quot;. Please verify the digits and try again.
            </p>
          </div>
        )}

        {/* Success Result Display */}
        {!loading && result && (
          <div className="space-y-8">
            {/* Postal Info Overview */}
            <div className="p-7 rounded-3xl glass-card-apple shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-white">
                    PINCODE: {result.pincode}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    ({result.city || result.district || ""}, {result.state || ""})
                  </span>
                </div>
                {result.area && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                    Postal Area / Hub: {result.area}
                  </p>
                )}
              </div>

              <div className="shrink-0">
                <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Active Regional Coverage</span>
                </div>
              </div>
            </div>

            {/* Serviceable Lenders Grid */}
            {((result.availableBanks?.length > 0) || (result.availableNbfcs?.length > 0)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Serviceable Financial Institutions ({(result.availableBanks?.length || 0) + (result.availableNbfcs?.length || 0)})
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...(result.availableBanks || []), ...(result.availableNbfcs || [])].map((bank: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl glass-card-apple flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                          {bank.bankName || bank.name || "Commercial Bank"}
                        </h4>
                        <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                          {bank.category || "Serviceable"}
                        </span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  ))}
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
