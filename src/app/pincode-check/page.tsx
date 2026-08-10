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
import { MapPin, Search, CheckCircle2, AlertTriangle, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PincodeCheckPage() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (pinToCheck?: string) => {
    const pin = pinToCheck || pincode;
    if (!pin || pin.length !== 6) return;

    setLoading(true);
    try {
      const response = await apiClient.get("/pincode/check", {
        params: { pincode: pin },
      });
      if (response.data.success) {
        setResult(response.data.data);
      }
    } catch (err) {
      console.error("Pincode check error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-royal selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="page-top-offset pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#FAFBFC] via-[#F6F8FA] to-white dark:from-[#0B1020] dark:via-slate-900 dark:to-[#0B1020] bg-dot-grid dark:bg-dot-grid-dark relative">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <Badge variant="emerald" pulse>
            NVIT Solution Location Coverage Matrix
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Pincode Eligibility Checker
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-xs sm:text-sm leading-relaxed font-semibold">
            Check bank service availability and branch radius by 6-digit postal code. Identify positive coverage areas and restricted zones.
          </p>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 w-full z-20 relative">
        <div className="glass-card-light dark:glass-card-dark rounded-3xl p-5 shadow-2xl border border-slate-200/80 dark:border-white/8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheck();
            }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full"
          >
            <div className="relative flex-1 w-full">
              <Input
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN Code (e.g. 110001, 400001, 201301)"
                leftIcon={<MapPin className="w-5 h-5 text-royal dark:text-royal-light" />}
                className="bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-royal transition-colors"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              disabled={pincode.length !== 6}
              variant="primary"
              size="lg"
              className="h-12 shrink-0 shadow-lg shadow-royal/20"
            >
              Check Pincode
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
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Status Summary Banner */}
            <div className="glass-card-light dark:glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl border border-slate-200/80 dark:border-white/8">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-wider">PINCODE: {result.pincode}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">({result.city}, {result.state})</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-350 font-semibold">Area: {result.area}</p>
              </div>

              <div className="shrink-0">
                {result.serviceStatus === "FULL_SERVICEABLE" ? (
                  <div className="px-5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-250 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center space-x-3 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h4 className="font-extrabold text-xs uppercase">Full Serviceable</h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{result.totalServiceable} Lenders Operational</p>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-250 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center space-x-3 shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h4 className="font-extrabold text-xs uppercase">Partial Coverage</h4>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{result.totalServiceable} Lenders Operational</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Available Lenders */}
            <div className="space-y-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-royal dark:text-royal-light" />
                <span>Serviceable Lenders & Banks ({result.availableBanks.length + result.availableNbfcs.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...result.availableBanks, ...result.availableNbfcs].map((bank: any, idx) => (
                  <motion.div
                    key={bank.bankId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="glass-card-light dark:glass-card-dark rounded-2xl p-5 flex items-center justify-between shadow-sm dark:shadow-xl hover:-translate-y-1 hover:border-slate-350 dark:hover:border-slate-700/60 border border-slate-200/80 dark:border-white/8 transition-all duration-300 ease-out">
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{bank.bankName}</h4>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Tier: {bank.category}</span>
                      </div>
                      <Badge variant="emerald" pulse>
                        Active Coverage
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

