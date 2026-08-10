"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { apiClient } from "@/services/apiClient";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { FileCheck, CheckCircle2, Send, Building2, User, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const loanApplySchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  company: z.string().min(2, "Company Name is required"),
  monthlyIncome: z.coerce.number().positive("Monthly salary must be greater than 0"),
  loanType: z.string().min(2, "Loan Type is required"),
  loanAmount: z.coerce.number().positive("Loan amount must be greater than 0"),
  remarks: z.string().optional(),
});

type LoanApplyFormData = z.infer<typeof loanApplySchema>;

export default function LoanApplyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanApplyFormData>({
    resolver: zodResolver(loanApplySchema),
    defaultValues: {
      loanType: "Personal Loan",
      monthlyIncome: 75000,
      loanAmount: 1000000,
      state: "Uttar Pradesh",
      city: "Noida",
    },
  });

  const onSubmit = async (data: LoanApplyFormData) => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.post("/loan/apply", data);
      if (response.data.success) {
        setSubmittedData(response.data.data);
        reset();
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Loan application submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-royal selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="page-top-offset pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#FAFBFC] via-[#F6F8FA] to-white dark:from-[#0B1020] dark:via-slate-900 dark:to-[#0B1020] bg-dot-grid dark:bg-dot-grid-dark relative">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <Badge variant="emerald" pulse>
            NVIT SOLUTION Institutional Sanction Portal
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Apply for Multi-Bank Loan
          </h1>
          <p className="text-slate-300 max-w-2xl text-xs sm:text-sm leading-relaxed font-semibold">
            Fill out your application details to receive pre-approval quotes from 30+ partner banks & NBFCs with zero obligation.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          {submittedData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="glass" hoverEffect={false} className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Loan Inquiry Received!</h2>
                  <p className="text-xs text-[var(--text-muted)] font-medium">
                    Your application reference ID is{" "}
                    <span className="font-mono font-extrabold text-royal dark:text-blue-400">{submittedData.applicationId}</span>
                  </p>
                </div>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto leading-relaxed font-medium">
                  Our NVIT Solution loan consultant will review your employer category tier and contact you within 2 hours for documentation.
                </p>
                <Button variant="primary" size="md" onClick={() => setSubmittedData(null)}>
                  Submit Another Inquiry
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="glass" hoverEffect={false} className="p-6 sm:p-10">
                <div className="flex items-center space-x-3 mb-8 border-b border-[var(--border-default)] pb-5">
                  <div className="w-10 h-10 rounded-2xl bg-royal/10 text-royal dark:text-blue-400 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-[var(--text-primary)]">NVIT Solution Application Lead Form</h2>
                    <p className="text-xs text-[var(--text-muted)]">100% confidential and SSL encrypted</p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 text-rose-700 dark:text-rose-400 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <Input
                      label="Full Name *"
                      placeholder="e.g. Rajesh Sharma"
                      leftIcon={<User className="w-4 h-4" />}
                      error={errors.name?.message}
                      {...register("name")}
                    />

                    {/* Mobile */}
                    <Input
                      label="Mobile Number *"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      leftIcon={<Phone className="w-4 h-4" />}
                      error={errors.mobile?.message}
                      {...register("mobile")}
                    />

                    {/* Email */}
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="rajesh.sharma@example.com"
                      leftIcon={<Mail className="w-4 h-4" />}
                      error={errors.email?.message}
                      {...register("email")}
                    />

                    {/* Company */}
                    <Input
                      label="Employer Company *"
                      placeholder="Employer Company Name"
                      leftIcon={<Building2 className="w-4 h-4" />}
                      error={errors.company?.message}
                      {...register("company")}
                    />

                    {/* City */}
                    <Input
                      label="City *"
                      placeholder="e.g. Noida / New Delhi / Mumbai"
                      error={errors.city?.message}
                      {...register("city")}
                    />

                    {/* State */}
                    <Input
                      label="State *"
                      placeholder="e.g. Uttar Pradesh"
                      error={errors.state?.message}
                      {...register("state")}
                    />

                    {/* Monthly Income */}
                    <Input
                      label="Monthly Salary (₹) *"
                      type="number"
                      placeholder="75000"
                      error={errors.monthlyIncome?.message}
                      {...register("monthlyIncome")}
                    />

                    {/* Loan Product */}
                    <div className="space-y-1.5 w-full">
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                        Loan Product *
                      </label>
                      <select
                        {...register("loanType")}
                        className="w-full rounded-xl border border-[var(--border-default)] py-3.5 px-4 text-xs font-semibold focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
                        style={{ backgroundColor: "var(--bg-input)", color: "var(--text-primary)" }}
                      >
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Business Loan">Business Loan</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Loan Against Property">Loan Against Property (LAP)</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Working Capital">Working Capital Facility</option>
                      </select>
                    </div>

                    {/* Loan Amount */}
                    <div className="md:col-span-2">
                      <Input
                        label="Required Loan Amount (₹) *"
                        type="number"
                        placeholder="1000000"
                        error={errors.loanAmount?.message}
                        {...register("loanAmount")}
                      />
                    </div>

                    {/* Remarks */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                        Message / Remarks (Optional)
                      </label>
                      <textarea
                        rows={3}
                        {...register("remarks")}
                        placeholder="Existing loan obligations, preferred bank, or specific requirements..."
                        className="w-full rounded-xl border border-[var(--border-default)] py-3 px-4 text-xs font-semibold focus:border-[var(--border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--text-placeholder)]"
                        style={{ backgroundColor: "var(--bg-input)", color: "var(--text-primary)" }}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      isLoading={submitting}
                      variant="primary"
                      size="lg"
                      className="w-full"
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Lead Inquiry
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

