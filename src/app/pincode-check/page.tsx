"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/services/apiClient";
import { MapPin, CheckCircle2, Building2, Loader2 } from "lucide-react";

export default function PincodeCheckPage() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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

    try {
      const response = await apiClient.get("/pincode/check", {
        params: { pincode: pin },
      });
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setErrorMsg("Pincode information not found.");
      }
    } catch (err: any) {
      console.error("Pincode check error", err);
      setErrorMsg(err.response?.data?.message || "Failed to query pincode serviceability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-900 bg-white dark:bg-slate-950 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>NVIT.SPACE Location Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Pincode Serviceability Checker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
            Inspect regional serviceability, postal coverage metrics, and operational banking coverage by 6-digit PIN code.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto">
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
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit PIN code (e.g. 201301, 110001)..."
                  className="w-full h-14 pl-12 pr-4 sm:pr-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:border-indigo-500 focus:outline-none shadow-xl dark:shadow-none"
                />
                <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  disabled={loading || pincode.length !== 6}
                  className="flex absolute right-2 top-2 bottom-2 px-4 sm:px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50 transition-colors items-center justify-center"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="hidden sm:inline">Check Pincode</span><MapPin className="w-4 h-4 sm:hidden" /></>}
                </button>
              </div>
            </form>
            {errorMsg && <p className="text-xs text-rose-500 font-bold mt-3 text-center">{errorMsg}</p>}
          </div>
        </div>
      </div>

      {/* Results Display */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {loading && (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-500 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Searching pincode serviceability records...</p>
          </div>
        )}

        {!loading && result && (
          <div className="space-y-8">
            <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">PINCODE: {result.pincode}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">({result.city}, {result.state})</span>
                </div>
                {result.area && <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Area / Zone: {result.area}</p>}
              </div>

              <div className="shrink-0">
                <div className="px-5 py-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="font-extrabold text-xs uppercase">Active Coverage Area</h4>
                    <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Operational Regional Coverage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Serviceable Lenders Grid */}
            {((result.availableBanks?.length > 0) || (result.availableNbfcs?.length > 0)) && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Serviceable Lender Institutions ({(result.availableBanks?.length || 0) + (result.availableNbfcs?.length || 0)})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...(result.availableBanks || []), ...(result.availableNbfcs || [])].map((bank: any) => (
                    <div
                      key={bank.bankId}
                      className="glass-card rounded-2xl p-4 bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm dark:shadow-none"
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{bank.bankName}</h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Tier: {bank.category}</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                        Serviceable
                      </span>
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

