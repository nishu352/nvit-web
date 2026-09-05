"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { apiClient } from "@/services/apiClient";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "COMPLAINT" | "FEEDBACK" | "GRIEVANCE" | "SUGGESTION" | "SUPPORT";
}

const CATEGORIES = [
  { key: "FEEDBACK",   label: "Feedback",   emoji: "💬" },
  { key: "COMPLAINT",  label: "Complaint",  emoji: "⚠️" },
  { key: "GRIEVANCE",  label: "Grievance",  emoji: "🔔" },
  { key: "SUGGESTION", label: "Suggestion", emoji: "💡" },
];

export default function FeedbackModal({
  isOpen,
  onClose,
  defaultType = "FEEDBACK",
}: FeedbackModalProps) {
  const [type, setType]           = useState<string>(defaultType);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg]   = useState("");
  const [ticketResult, setTicketResult] = useState<{ ticketNumber: string } | null>(null);
  const [copied, setCopied]       = useState(false);

  // Blur navbar while open — must stay above any early return
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("feedback-modal-open");
    } else {
      document.body.classList.remove("feedback-modal-open");
    }
    return () => {
      document.body.classList.remove("feedback-modal-open");
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await apiClient.post("/feedback", {
        type,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (response.data && response.data.success) {
        setTicketResult({
          ticketNumber: response.data.data?.ticketNumber || "TKT-LOGGED",
        });
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(response.data?.error || "Failed to submit ticket. Please try again.");
      }
    } catch (err: any) {
      console.error("Feedback submit error", err);
      setErrorMsg(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Network error submitting grievance. Please email support@nvit.space directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setTicketResult(null);
    setErrorMsg("");
    setCopied(false);
    onClose();
  };

  const copyTicket = () => {
    if (ticketResult) {
      navigator.clipboard.writeText(ticketResult.ticketNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inputClass =
    "w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium";

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Fixed overlay wrapper ── */
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">

          {/* Backdrop — fades in/out */}
          <motion.div
            key="fb-backdrop"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            onClick={resetAndClose}
          />

          {/* Modal card — slides up + fades in, slides down + fades out */}
          <motion.div
            key="fb-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Feedback and complaints form"
            className="relative z-[111] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 max-w-lg w-full shadow-2xl shadow-black/20 overflow-hidden"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600" />

            <div className="p-6 sm:p-7 space-y-5 max-h-[88vh] overflow-y-auto">

              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    NVIT.SPACE
                  </p>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    Feedback &amp; Complaints
                  </h2>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed pt-0.5">
                    Your submission is encrypted and routed directly to{" "}
                    <a
                      href="mailto:support@nvit.space"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      support@nvit.space
                    </a>
                  </p>
                </div>

                <button
                  onClick={resetAndClose}
                  className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer mt-0.5"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── SUCCESS STATE ── */}
              <AnimatePresence mode="wait">
                {ticketResult ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm border border-emerald-200 dark:border-emerald-800/60">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        Ticket Registered
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Your reference number is:
                      </p>

                      <div className="inline-flex items-center gap-2 mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5">
                        <span className="font-mono font-black text-sm text-slate-900 dark:text-white tracking-widest">
                          {ticketResult.ticketNumber}
                        </span>
                        <button
                          onClick={copyTicket}
                          className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                          aria-label="Copy ticket number"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Our team will respond from{" "}
                      <strong className="text-slate-800 dark:text-slate-200">support@nvit.space</strong>{" "}
                      within <strong className="text-slate-800 dark:text-slate-200">24 hours</strong>.
                    </p>

                    <div className="space-y-2 pt-2">
                      <a
                        href={`/check-status?ticket=${ticketResult.ticketNumber}`}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                      >
                        <span>Track Ticket Status</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={resetAndClose}
                        className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer transition-all"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Error banner */}
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    {/* Category selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Category
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => setType(cat.key)}
                            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              type === cat.key
                                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700"
                                : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                          >
                            <span className="block text-base leading-none mb-0.5">{cat.emoji}</span>
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Phone <span className="text-slate-400 font-medium">(optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Subject <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Brief subject..."
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe your issue, feedback, or suggestion in detail..."
                          className="w-full pl-10 pr-3.5 pt-3 pb-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium resize-none"
                        />
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>SSL encrypted · routed to support@nvit.space</span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        id="feedback-submit-btn"
                        className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <span>Send</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
