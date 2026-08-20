"use client";

import { useState, useMemo } from "react";
import { Calculator, PieChart, Table, ArrowRight, ChevronDown, Sparkles } from "lucide-react";

interface Props {
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultTenureYears?: number;
  minPrincipal?: number;
  maxPrincipal?: number;
  minRate?: number;
  maxRate?: number;
  minTenureYears?: number;
  maxTenureYears?: number;
  labelVariant?: string;
}

export function formatINR(val: number): string {
  if (isNaN(val) || !isFinite(val)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

function getTrackBackground(value: number, min: number, max: number, color = "#2563eb") {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, rgba(148, 163, 184, 0.25) ${percent}%, rgba(148, 163, 184, 0.25) 100%)`;
}

export default function EmiCalculatorWidget({
  defaultPrincipal = 500000,
  defaultRate = 18,
  defaultTenureYears = 5,
  minPrincipal = 10000,
  maxPrincipal = 50000000,
  minRate = 5,
  maxRate = 36,
  minTenureYears = 1,
  maxTenureYears = 30,
  labelVariant = "Loan",
}: Props) {
  const [principal, setPrincipal] = useState<number>(defaultPrincipal);
  const [rate, setRate] = useState<number>(defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(defaultTenureYears);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // EMI Calculation logic: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const { emi, totalInterest, totalPayment, principalPercent, interestPercent, schedule } = useMemo(() => {
    const P = Math.max(0, principal);
    const r = (rate / 12) / 100;
    const n = Math.max(1, tenureYears * 12);

    if (P <= 0 || r <= 0 || n <= 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercent: 100,
        interestPercent: 0,
        schedule: [],
      };
    }

    const calculatedEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = calculatedEmi * n;
    const totalInt = totalPay - P;

    const pPct = totalPay > 0 ? (P / totalPay) * 100 : 100;
    const iPct = totalPay > 0 ? (totalInt / totalPay) * 100 : 0;

    // Build yearly amortization schedule
    let remainingBalance = P;
    const yearlySchedule: { year: number; principalPaid: number; interestPaid: number; endingBalance: number }[] = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;

      for (let m = 1; m <= 12; m++) {
        const monthInterest = remainingBalance * r;
        const monthPrincipal = calculatedEmi - monthInterest;
        yrInterest += monthInterest;
        yrPrincipal += monthPrincipal;
        remainingBalance = Math.max(0, remainingBalance - monthPrincipal);
      }

      yearlySchedule.push({
        year: yr,
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        endingBalance: Math.round(remainingBalance),
      });
    }

    return {
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      principalPercent: Math.round(pPct),
      interestPercent: Math.round(iPct),
      schedule: yearlySchedule,
    };
  }, [principal, rate, tenureYears]);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {labelVariant} EMI Calculator
            </h2>
            <p className="text-xs text-slate-500 font-medium">Standard Reducing Balance Model</p>
          </div>
        </div>


      </div>

      {/* Grid: Inputs Left, Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* INPUTS COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Principal */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="principal-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {labelVariant} Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="principal-input"
                  type="number"
                  min={minPrincipal}
                  max={maxPrincipal}
                  step={10000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-36 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={minPrincipal}
              max={maxPrincipal}
              step={10000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              aria-label={`${labelVariant} Amount`}
              style={{ background: getTrackBackground(principal, minPrincipal, maxPrincipal, "#2563eb") }}
              className="range-slider-themed"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{formatINR(minPrincipal)}</span>
              <span>{formatINR(maxPrincipal)}</span>
            </div>
          </div>

          {/* Input 2: Rate */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="rate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="rate-input"
                  type="number"
                  min={minRate}
                  max={maxRate}
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
              min={minRate}
              max={maxRate}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Annual Interest Rate Percentage"
              style={{ background: getTrackBackground(rate, minRate, maxRate, "#2563eb") }}
              className="range-slider-themed"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{minRate}%</span>
              <span>{maxRate}%</span>
            </div>
          </div>

          {/* Input 3: Tenure */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="tenure-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Loan Tenure (Years)
              </label>
              <div className="relative">
                <input
                  id="tenure-input"
                  type="number"
                  min={minTenureYears}
                  max={maxTenureYears}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-28 h-9 px-3 pr-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min={minTenureYears}
              max={maxTenureYears}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              aria-label="Loan Tenure in Years"
              style={{ background: getTrackBackground(tenureYears, minTenureYears, maxTenureYears, "#2563eb") }}
              className="range-slider-themed"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{minTenureYears} Yr ({minTenureYears * 12} Mos)</span>
              <span>{maxTenureYears} Yrs ({maxTenureYears * 12} Mos)</span>
            </div>
          </div>
        </div>

        {/* OUTPUTS COLUMN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-950 dark:to-blue-950/40 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Calculated Monthly Payment
            </span>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {formatINR(emi)}
              <span className="text-xs text-slate-400 font-semibold ml-1">/ month</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Principal Amount:</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatINR(principal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Total Interest:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-bold">
              <span className="text-slate-700 dark:text-slate-300">Total Amount Payable:</span>
              <span className="text-slate-900 dark:text-white text-sm">{formatINR(totalPayment)}</span>
            </div>
          </div>

          {/* Visual Progress Split */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-blue-600 dark:text-blue-400">Principal ({principalPercent}%)</span>
              <span className="text-indigo-600 dark:text-indigo-400">Interest ({interestPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${principalPercent}%` }}
                className="h-full bg-blue-600 transition-all duration-300"
              />
              <div
                style={{ width: `${interestPercent}%` }}
                className="h-full bg-indigo-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AMORTIZATION SCHEDULE TOGGLE */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          <Table className="w-4 h-4" />
          <span>{showAmortization ? "Hide Yearly Amortization Table" : "View Complete Yearly Amortization Schedule"}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAmortization ? "rotate-180" : ""}`} />
        </button>

        {showAmortization && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Principal Paid (₹)</th>
                  <th className="p-3">Interest Paid (₹)</th>
                  <th className="p-3">Ending Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Year {row.year}</td>
                    <td className="p-3">{formatINR(row.principalPaid)}</td>
                    <td className="p-3 text-indigo-600 dark:text-indigo-400">{formatINR(row.interestPaid)}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{formatINR(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
