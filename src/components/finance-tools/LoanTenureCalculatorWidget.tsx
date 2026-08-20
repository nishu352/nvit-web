"use client";

import { useState, useMemo } from "react";
import { Clock, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { formatINR } from "./EmiCalculatorWidget";

function getTrackBackground(value: number, min: number, max: number, color = "#d97706") {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, rgba(148, 163, 184, 0.25) ${percent}%, rgba(148, 163, 184, 0.25) 100%)`;
}

export default function LoanTenureCalculatorWidget() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(18.0);
  const [desiredEmi, setDesiredEmi] = useState<number>(26000);

  const {
    monthsTotal,
    yearsPart,
    monthsPart,
    totalInterest,
    totalPayment,
    minEmiRequired,
    isEmiTooLow,
  } = useMemo(() => {
    const P = Math.max(0, principal);
    const r = (rate / 12) / 100;
    const E = Math.max(0, desiredEmi);

    const minInterestMonth = Math.round(P * r);

    if (P <= 0 || r <= 0 || E <= 0) {
      return {
        monthsTotal: 0,
        yearsPart: 0,
        monthsPart: 0,
        totalInterest: 0,
        totalPayment: 0,
        minEmiRequired: minInterestMonth,
        isEmiTooLow: false,
      };
    }

    if (E <= P * r) {
      return {
        monthsTotal: 0,
        yearsPart: 0,
        monthsPart: 0,
        totalInterest: 0,
        totalPayment: 0,
        minEmiRequired: minInterestMonth,
        isEmiTooLow: true,
      };
    }

    // Formula: n = [ln(E) - ln(E - P*r)] / ln(1 + r)
    const nExact = (Math.log(E) - Math.log(E - P * r)) / Math.log(1 + r);
    const n = Math.ceil(nExact);

    const totalPay = Math.round(E * n);
    const totalInt = Math.max(0, totalPay - P);
    const yrs = Math.floor(n / 12);
    const mos = n % 12;

    return {
      monthsTotal: n,
      yearsPart: yrs,
      monthsPart: mos,
      totalInterest: totalInt,
      totalPayment: totalPay,
      minEmiRequired: minInterestMonth,
      isEmiTooLow: false,
    };
  }, [principal, rate, desiredEmi]);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Loan Tenure Calculator
            </h2>
            <p className="text-xs text-slate-500 font-medium">Budget-Driven Logarithmic Amortization Engine</p>
          </div>
        </div>


      </div>

      {/* Grid: Inputs Left, Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* INPUTS COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input 1: Loan Principal */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="tenure-principal-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Loan Amount Required (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="tenure-principal-input"
                  type="number"
                  min={10000}
                  max={20000000}
                  step={25000}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-36 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={25000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              aria-label="Loan Amount Required"
              style={{ background: getTrackBackground(principal, 50000, 5000000, "#d97706") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 2: Rate */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="tenure-rate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="tenure-rate-input"
                  type="number"
                  min={5}
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
              min={5}
              max={36}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Annual Interest Rate Percentage"
              style={{ background: getTrackBackground(rate, 5, 36, "#d97706") }}
              className="range-slider-themed"
            />
          </div>

          {/* Input 3: Desired Monthly EMI Budget */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="desired-emi-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Planned Monthly EMI Budget (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                <input
                  id="desired-emi-input"
                  type="number"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={desiredEmi}
                  onChange={(e) => setDesiredEmi(Number(e.target.value))}
                  className="w-36 h-9 pl-6 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-right text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={1000}
              value={desiredEmi}
              onChange={(e) => setDesiredEmi(Number(e.target.value))}
              aria-label="Planned Monthly EMI Budget"
              style={{ background: getTrackBackground(desiredEmi, 5000, 150000, "#d97706") }}
              className="range-slider-themed"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>Min Monthly Interest: {formatINR(minEmiRequired)}</span>
            </div>
          </div>
        </div>

        {/* OUTPUTS COLUMN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/40 dark:from-slate-950 dark:to-amber-950/40 border border-slate-200 dark:border-slate-800 space-y-6">
          {isEmiTooLow ? (
            <div className="space-y-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Monthly EMI Too Low</span>
              </div>
              <p>
                Your planned EMI ({formatINR(desiredEmi)}) is less than the monthly interest cost of <strong>{formatINR(minEmiRequired)}</strong>. To repay the principal, your monthly EMI must exceed {formatINR(minEmiRequired)}.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Required Repayment Tenure
                </span>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  {yearsPart > 0 ? `${yearsPart} Yrs ` : ""}
                  {monthsPart > 0 ? `${monthsPart} Mos` : ""}
                  {yearsPart === 0 && monthsPart === 0 ? "0 Mos" : ""}
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-1">({monthsTotal} total monthly payments)</p>
              </div>

              {/* Breakdown Stats */}
              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Principal Borrowed:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatINR(principal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Interest Payable:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total Repayment Amount:</span>
                  <span className="text-slate-900 dark:text-white text-sm">{formatINR(totalPayment)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 text-[11px] text-slate-500 leading-relaxed font-medium">
                💡 <strong>Prepayment Impact:</strong> Increasing your EMI by even ₹2,000 saves months of interest and clears the principal much faster.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
