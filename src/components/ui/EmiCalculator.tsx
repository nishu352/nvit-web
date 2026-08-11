"use client";

import { useState, useMemo } from "react";
import { Calculator, ArrowRight, DollarSign, Percent, Calendar, PieChart } from "lucide-react";
import { motion } from "framer-motion";

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(500000);
  const [rate, setRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const { monthlyEmi, totalInterest, totalPayable, principalPercent, interestPercent } =
    useMemo(() => {
      const p = amount;
      const r = rate / 12 / 100;
      const n = tenureYears * 12;

      if (r === 0 || n === 0) {
        return {
          monthlyEmi: Math.round(p / (n || 1)),
          totalInterest: 0,
          totalPayable: p,
          principalPercent: 100,
          interestPercent: 0,
        };
      }

      const emi = Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const payable = emi * n;
      const interest = Math.max(0, payable - p);

      const pPct = Math.round((p / payable) * 100);
      const iPct = 100 - pPct;

      return {
        monthlyEmi: emi,
        totalInterest: interest,
        totalPayable: payable,
        principalPercent: pPct,
        interestPercent: iPct,
      };
    }, [amount, rate, tenureYears]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Interactive Loan EMI Engine
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Calculates exact monthly EMI, total interest &amp; principal repayment schedule
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders & Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                Loan Principal Amount
              </label>
              <div className="text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-800/50">
                {formatINR(amount)}
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={10000000}
              step={25000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>₹50,000</span>
              <span>₹50 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-violet-500" />
                Annual Interest Rate (% p.a.)
              </label>
              <div className="text-sm font-black text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-xl border border-violet-200 dark:border-violet-800/50">
                {rate}%
              </div>
            </div>
            <input
              type="range"
              min={6}
              max={30}
              step={0.25}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>6.0%</span>
              <span>15.0%</span>
              <span>30.0%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                Loan Tenure (Years)
              </label>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                {tenureYears} Years ({tenureYears * 12} Months)
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-xl relative">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-1">
                Estimated Monthly Repayment
              </span>
              <motion.div
                key={monthlyEmi}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-white"
              >
                {formatINR(monthlyEmi)}
              </motion.div>
              <span className="text-[11px] text-slate-400 block mt-1">Per Month</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Principal Amount
                </span>
                <span className="text-sm font-bold text-slate-200 block mt-0.5">
                  {formatINR(amount)}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Interest
                </span>
                <span className="text-sm font-bold text-violet-400 block mt-0.5">
                  {formatINR(totalInterest)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-bold mb-1.5 text-slate-300">
                <span>Total Payment: {formatINR(totalPayable)}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="h-full bg-blue-500 transition-all duration-300"
                  title={`Principal: ${principalPercent}%`}
                />
                <div
                  style={{ width: `${interestPercent}%` }}
                  className="h-full bg-violet-500 transition-all duration-300"
                  title={`Interest: ${interestPercent}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                  Principal ({principalPercent}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />
                  Interest ({interestPercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
