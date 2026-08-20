"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Sparkles, Layers } from "lucide-react";
import { formatINR } from "./EmiCalculatorWidget";

function getTrackBackground(value: number, min: number, max: number, color = "#7c3aed") {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, rgba(148, 163, 184, 0.25) ${percent}%, rgba(148, 163, 184, 0.25) 100%)`;
}

export default function InterestCalculatorWidget() {
  const [mode, setMode] = useState<"simple" | "compound">("compound");
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(18.0);
  const [years, setYears] = useState<number>(5);
  const [compoundingFreq, setCompoundingFreq] = useState<number>(12); // 12 = Monthly default

  const { interestAmount, totalMaturity, principalPct, interestPct } = useMemo(() => {
    const P = Math.max(0, principal);
    const R = Math.max(0, rate);
    const T = Math.max(0.1, years);

    if (P <= 0 || R <= 0 || T <= 0) {
      return { interestAmount: 0, totalMaturity: 0, principalPct: 100, interestPct: 0 };
    }

    if (mode === "simple") {
      // SI = P * R * T / 100
      const si = (P * R * T) / 100;
      const total = P + si;
      return {
        interestAmount: Math.round(si),
        totalMaturity: Math.round(total),
        principalPct: Math.round((P / total) * 100),
        interestPct: Math.round((si / total) * 100),
      };
    } else {
      // CI: A = P * (1 + (R/100)/n)^(n*T)
      const n = compoundingFreq;
      const rDecimal = (R / 100) / n;
      const total = P * Math.pow(1 + rDecimal, n * T);
      const ci = total - P;
      return {
        interestAmount: Math.round(ci),
        totalMaturity: Math.round(total),
        principalPct: Math.round((P / total) * 100),
        interestPct: Math.round((ci / total) * 100),
      };
    }
  }, [mode, principal, rate, years, compoundingFreq]);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-800/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {mode === "simple" ? "Simple Interest (SI)" : "Compound Interest (CI)"} Calculator
            </h2>
            <p className="text-xs text-slate-500 font-medium">Exponential Capital Growth &amp; Yield Engine</p>
          </div>
        </div>

        {/* Mode Pill Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black">
          <button
            onClick={() => setMode("compound")}
            className={`px-4 py-2 rounded-xl transition-all ${
              mode === "compound"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Compound Interest (CI)
          </button>
          <button
            onClick={() => setMode("simple")}
            className={`px-4 py-2 rounded-xl transition-all ${
              mode === "simple"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Simple Interest (SI)
          </button>
        </div>
      </div>

      {/* Grid: Inputs Left, Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* INPUTS COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Principal */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="interest-principal-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Principal Investment / Deposit (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="interest-principal-input"
                  type="number"
                  min={1000}
                  max={2000000}
                  step={5000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-36 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={1000}
              max={2000000}
              step={5000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              aria-label="Principal Investment Amount"
              style={{ background: getTrackBackground(principal, 1000, 2000000, "#7c3aed") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 2: Rate */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="interest-rate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="interest-rate-input"
                  type="number"
                  min={1}
                  max={36}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-28 h-9 px-3 pr-7 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={36}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Annual Interest Rate Percentage"
              style={{ background: getTrackBackground(rate, 1, 36, "#7c3aed") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 3: Duration */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="interest-duration-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Duration (Years)
              </label>
              <div className="relative">
                <input
                  id="interest-duration-input"
                  type="number"
                  min={1}
                  max={40}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24 h-9 px-3 pr-7 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              aria-label="Investment Duration Years"
              style={{ background: getTrackBackground(years, 1, 40, "#7c3aed") }}
              className="range-slider-themed"
            />
          </div>

          {/* Compounding Frequency Dropdown (Compound Mode Only) */}
          {mode === "compound" && (
            <div className="space-y-2 pt-1">
              <label htmlFor="compounding-freq-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                Compounding Frequency
              </label>
              <select
                id="compounding-freq-select"
                value={compoundingFreq}
                onChange={(e) => setCompoundingFreq(Number(e.target.value))}
                aria-label="Compounding Frequency Cycle"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              >
                <option value={1}>Annually (1 time / year)</option>
                <option value={2}>Semi-Annually (2 times / year)</option>
                <option value={4}>Quarterly (4 times / year - Standard FD)</option>
                <option value={12}>Monthly (12 times / year - Recurring)</option>
              </select>
            </div>
          )}
        </div>

        {/* OUTPUTS COLUMN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 to-violet-50/40 dark:from-slate-950 dark:to-violet-950/40 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Total Maturity Value
            </span>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {formatINR(totalMaturity)}
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Principal Deposited:</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatINR(principal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Total Interest Earned:</span>
              <span className="font-bold text-violet-600 dark:text-violet-400">{formatINR(interestAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-bold">
              <span className="text-slate-700 dark:text-slate-300">Effective Annual Yield:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm">
                {principal > 0 && years > 0 ? ((interestAmount / (principal * years)) * 100).toFixed(2) : "0.00"}% p.a.
              </span>
            </div>
          </div>

          {/* Visual Progress Split */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-slate-700 dark:text-slate-300">Principal ({principalPct}%)</span>
              <span className="text-violet-600 dark:text-violet-400">Interest ({interestPct}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${principalPct}%` }} className="h-full bg-slate-400 transition-all duration-300" />
              <div style={{ width: `${interestPct}%` }} className="h-full bg-violet-600 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
