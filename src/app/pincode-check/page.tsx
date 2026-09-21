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

        {/* ── EDUCATIONAL GUIDE & SERVICEABILITY INTELLIGENCE ────────────── */}
        <section className="mt-16 pt-12 border-t border-zinc-200/80 dark:border-white/10 space-y-12">
          {/* Section Heading */}
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Location Policy Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              How Postal PIN Code Serviceability Works in Banking &amp; Lending
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              In retail banking and unsecured credit underwriting, an applicant&apos;s residential and employment postal code is a primary policy filter. Here is how financial institutions evaluate location data:
            </p>
          </div>

          {/* 3 Core Explanation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl glass-card-apple space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm font-mono">
                01
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Six-Digit Postal Index Decoding
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                India&apos;s postal PIN code system uses a 6-digit hierarchical structure. The 1st digit identifies the geographical region, the 2nd the sub-region or state circle, the 3rd the sorting district, and the final 3 digits the specific delivery post office.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl glass-card-apple space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm font-mono">
                02
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Physical Verification Reach (CPV)
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Before sanctioning personal loans or corporate credit cards, lenders conduct Contact Point Verification (CPV). If an applicant resides in a PIN code beyond the operational radius of agency field executives, the application cannot proceed.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl glass-card-apple space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-200/80 dark:border-violet-800/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm font-mono">
                03
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Negative &amp; Caution Pincode Lists
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Risk committees at commercial banks maintain internal negative pincode lists based on localized delinquency rates, legal jurisdiction limits, or logistical constraints. These lists are reviewed and updated on a regular cycle.
              </p>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions About Pincode Eligibility
            </h3>

            <div className="space-y-3.5">
              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Why is my PIN code serviceable by one lender but rejected by another?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Each financial institution establishes its own network of physical branch offices and third-party verification agencies. A regional bank or NBFC with strong local presence in a particular district will service postal codes that a centralized private lender might exclude.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Can I apply for credit using my office address if my residence PIN is unserviceable?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Many lenders allow an application if either the current residence or permanent corporate employer address falls within a serviceable postal code, provided one of the two locations can be physically verified by field representatives.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Does querying a pincode on this tool impact my credit score?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  No. This serviceability check queries public postal zoning and partner institution coverage indices. It does not pull your credit report (CIBIL/Experian) and has zero impact on your credit rating.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-apple space-y-2 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  How often is the 19,500+ pincode database updated?
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Our database syncs with official Indian postal directory updates and lending institution policy revisions periodically to ensure high geographic fidelity across urban and semi-urban clusters.
                </p>
              </div>
            </div>
          </div>

          {/* Informational Disclaimer Callout */}
          <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Informational Notice:</span>
            <p className="leading-relaxed">
              Pincode serviceability metrics displayed here are based on compiled reference indexes for informational purposes. Individual lender branch boundaries and credit policies may change without prior notice. Final loan approval remains subject to borrower credit assessment, KYC documentation, and lender underwriting criteria.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
