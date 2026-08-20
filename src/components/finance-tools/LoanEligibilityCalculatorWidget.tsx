"use client";

import { useState, useMemo } from "react";
import { Calculator, Sparkles, UserCheck, AlertCircle } from "lucide-react";
import { formatINR } from "./EmiCalculatorWidget";

function getTrackBackground(value: number, min: number, max: number, color = "#2563eb") {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, rgba(148, 163, 184, 0.25) ${percent}%, rgba(148, 163, 184, 0.25) 100%)`;
}

export default function LoanEligibilityCalculatorWidget() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [existingEmis, setExistingEmis] = useState<number>(15000);
  const [foir, setFoir] = useState<number>(50); // 50% FOIR default
  const [rate, setRate] = useState<number>(18.0); // 18% default interest
  const [tenureYears, setTenureYears] = useState<number>(5); // 5 years default tenure

  const { maxEmiCapacity, eligibleLoanAmount, totalRepayment, isNegativeCapacity } = useMemo(() => {
    const income = Math.max(0, monthlyIncome);
    const existing = Math.max(0, existingEmis);
    const foirDecimal = foir / 100;
    const r = (rate / 12) / 100;
    const n = Math.max(1, tenureYears * 12);

    const totalAllowedObligation = income * foirDecimal;
    const disposableEmi = totalAllowedObligation - existing;

    if (disposableEmi <= 0 || r <= 0 || n <= 0) {
      return {
        maxEmiCapacity: 0,
        eligibleLoanAmount: 0,
        totalRepayment: 0,
        isNegativeCapacity: true,
      };
    }

    // Reverse EMI formula: P = E * ((1+r)^n - 1) / (r * (1+r)^n)
    const principal = (disposableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    const totalRepay = disposableEmi * n;

    return {
      maxEmiCapacity: Math.round(disposableEmi),
      eligibleLoanAmount: Math.round(principal),
      totalRepayment: Math.round(totalRepay),
      isNegativeCapacity: false,
    };
  }, [monthlyIncome, existingEmis, foir, rate, tenureYears]);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Loan Eligibility Calculator
            </h2>
            <p className="text-xs text-slate-500 font-medium">Income &amp; FOIR Borrowing Capacity Model</p>
          </div>
        </div>


      </div>

      {/* Grid: Inputs Left, Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* INPUTS COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Net Monthly Salary */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="income-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Net Monthly Take-Home Salary (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="income-input"
                  type="number"
                  min={10000}
                  max={2000000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-36 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={5000}
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              aria-label="Net Monthly Salary"
              style={{ background: getTrackBackground(monthlyIncome, 10000, 1000000, "#059669") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 2: Existing EMIs */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="existing-emis-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Existing Ongoing Monthly EMIs (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="existing-emis-input"
                  type="number"
                  min={0}
                  max={500000}
                  step={1000}
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(Number(e.target.value))}
                  className="w-32 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={300000}
              step={1000}
              value={existingEmis}
              onChange={(e) => setExistingEmis(Number(e.target.value))}
              aria-label="Existing Monthly EMIs"
              style={{ background: getTrackBackground(existingEmis, 0, 300000, "#059669") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 3: FOIR Ratio */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="foir-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Lender FOIR Threshold (%)
              </label>
              <div className="relative">
                <input
                  id="foir-input"
                  type="number"
                  min={30}
                  max={70}
                  step={5}
                  value={foir}
                  onChange={(e) => setFoir(Number(e.target.value))}
                  className="w-24 h-9 px-3 pr-7 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>
            <input
              type="range"
              min={30}
              max={70}
              step={5}
              value={foir}
              onChange={(e) => setFoir(Number(e.target.value))}
              aria-label="Lender FOIR Threshold Percentage"
              style={{ background: getTrackBackground(foir, 30, 70, "#059669") }}
              className="range-slider-themed"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>30% (Conservative)</span>
              <span>50% (Standard)</span>
              <span>70% (High Income)</span>
            </div>
          </div>

          {/* Input 4: Rate with Slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="elig-rate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="elig-rate-input"
                  type="number"
                  min={5}
                  max={36}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-24 h-9 px-3 pr-7 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>
            <input
              type="range"
              min={5}
              max={36}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Interest Rate"
              style={{ background: getTrackBackground(rate, 5, 36, "#059669") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 5: Tenure with Slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="elig-tenure-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Desired Tenure (Years)
              </label>
              <div className="relative">
                <input
                  id="elig-tenure-input"
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-24 h-9 px-3 pr-7 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Yr</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              aria-label="Desired Tenure Years"
              style={{ background: getTrackBackground(tenureYears, 1, 30, "#059669") }}
              className="range-slider-themed"
            />
          </div>
        </div>

        {/* OUTPUTS COLUMN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-950 dark:to-emerald-950/40 border border-slate-200 dark:border-slate-800 space-y-6">
          {isNegativeCapacity ? (
            <div className="space-y-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Existing EMIs Exceed FOIR Limit</span>
              </div>
              <p>
                Your existing ongoing EMIs ({formatINR(existingEmis)}) exceed {foir}% of your monthly take-home income ({formatINR(monthlyIncome * (foir / 100))}). Closing existing debts will restore loan eligibility.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Estimated Maximum Loan Amount
                </span>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  {formatINR(eligibleLoanAmount)}
                </div>
              </div>

              {/* Breakdown Stats */}
              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Max Monthly EMI Capacity:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatINR(maxEmiCapacity)} / mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Monthly Obligation Cap:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatINR(monthlyIncome * (foir / 100))}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total Repayment Amount:</span>
                  <span className="text-slate-900 dark:text-white text-sm">{formatINR(totalRepayment)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 text-[11px] text-slate-500 leading-relaxed font-medium">
                💡 <strong>Tip:</strong> Adding an earning co-applicant (spouse or parent) combines both monthly incomes, significantly expanding your total borrowing limit.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
