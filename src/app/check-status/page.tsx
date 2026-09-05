"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { apiClient } from "@/services/apiClient";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  Mail,
  User,
  Calendar,
  MessageSquare,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface TicketStatusData {
  ticketNumber: string;
  type: string;
  subject: string;
  status: string;
  maskedName: string;
  maskedEmail: string;
  createdAt: string;
  resolvedAt?: string | null;
  adminNotes?: string | null;
}

function StatusTrackerContent() {
  const searchParams = useSearchParams();
  const initialTicket = searchParams.get("ticket") || searchParams.get("id") || searchParams.get("ref") || "";

  const [query, setQuery] = useState(initialTicket);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<TicketStatusData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchStatus = async (ticketId: string) => {
    const cleanId = ticketId.trim();
    if (!cleanId || cleanId.length < 3) {
      setErrorMessage("Please enter a valid Enquiry or Ticket reference ID (e.g., ENQ-20260905-XXXX or TKT-20260905-XXXX).");
      setTicketData(null);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setHasSearched(true);

    try {
      const res = await apiClient.get(`/feedback/status/${encodeURIComponent(cleanId)}`);
      if (res.data?.success && res.data?.data) {
        setTicketData(res.data.data);
      } else {
        setTicketData(null);
        setErrorMessage(res.data?.error || "No record found with this reference ID.");
      }
    } catch (err: any) {
      setTicketData(null);
      setErrorMessage(
        err.response?.data?.error ||
          "No record found with this reference ID. Please check the ID and try again, or reach out to support@nvit.space."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTicket) {
      fetchStatus(initialTicket);
    }
  }, [initialTicket]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(query);
  };

  const copyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine Stepper Stage
  const isInquiry = ticketData?.type?.toUpperCase() === "INQUIRY" || ticketData?.type?.toUpperCase() === "ENQUIRY";
  const st = (ticketData?.status || "PENDING").toUpperCase();
  const isResolved = st === "RESOLVED";
  const isInReview = st === "IN_REVIEW" || st === "IN_PROGRESS";
  const isPending = st === "PENDING" || st === "OPEN";

  const getStepIndex = () => {
    if (isResolved) return 3;
    if (isInReview) return 2;
    return 1; // Pending
  };

  const currentStep = getStepIndex();

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto w-full">
      {/* Search Bar Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-blue-500/5 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSearchSubmit} className="space-y-4 relative z-10">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Enter Reference Number (Enquiry or Support Ticket)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. ENQ-20260905-4821 or TKT-20260905-1842"
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-semibold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-7 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <p>
              Format: <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">ENQ-YYYYMMDD-XXXX</span> (Project Enquiries) or <span className="font-mono font-semibold text-violet-600 dark:text-violet-400">TKT-YYYYMMDD-XXXX</span> (Complaints/Feedback).
            </p>
            <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy-Encrypted Lookup
            </span>
          </div>
        </form>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center space-y-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Querying studio database for status telemetry...
          </p>
        </div>
      )}

      {/* Error / Not Found State */}
      {!loading && errorMessage && (
        <div className="p-8 sm:p-10 rounded-3xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">
              Reference ID Not Found
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto leading-relaxed">
              {errorMessage}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-colors"
            >
              Submit New Inquiry
            </Link>
            <a
              href="mailto:support@nvit.space"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:text-blue-600"
            >
              Contact Support
            </a>
          </div>
        </div>
      )}

      {/* Success Details & Visual Stepper */}
      {!loading && ticketData && (
        <div className="space-y-8">
          {/* Main Status Container */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 relative overflow-hidden">
            
            {/* Top Bar: ID, Type & Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isInquiry ? "Project Enquiry" : "Support Ticket"} Reference:
                  </span>
                  <span className="font-mono text-base font-extrabold text-blue-600 dark:text-blue-400">
                    #{ticketData.ticketNumber}
                  </span>
                  <button
                    onClick={() => copyRef(ticketData.ticketNumber)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="Copy Reference Number"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {ticketData.subject}
                </h2>
              </div>

              {/* Status Pill */}
              <div className="shrink-0 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
                    isResolved
                      ? "bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                      : isInReview
                      ? "bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                      : "bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>
                    {isResolved
                      ? isInquiry ? "Proposal Dispatched" : "Resolved"
                      : isInReview
                      ? "Under Engineering Review"
                      : "Received & Queued"}
                  </span>
                </span>
              </div>
            </div>

            {/* Visual 3-Stage Progress Pipeline */}
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Workflow Timeline Progression
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* Step 1 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    currentStep >= 1
                      ? "bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-slate-900 dark:text-white"
                      : "bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <span className="text-xs font-bold">
                      {isInquiry ? "Inquiry Logged" : "Ticket Registered"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {isInquiry
                      ? "Logged in studio portal and assigned to software lead."
                      : "Received securely at support@nvit.space desk."}
                  </p>
                </div>

                {/* Step 2 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    currentStep >= 2
                      ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-slate-900 dark:text-white"
                      : "bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        currentStep >= 2 ? "bg-amber-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      2
                    </div>
                    <span className="text-xs font-bold">
                      {isInquiry ? "Architecture & Scope Review" : "Technical Investigation"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {isInquiry
                      ? "Engineering leads evaluate tech stack, timeline, and architectural specifications."
                      : "Technical team actively investigating grievance telemetry."}
                  </p>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    currentStep >= 3
                      ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-900 dark:text-white"
                      : "bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        currentStep >= 3 ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      3
                    </div>
                    <span className="text-xs font-bold">
                      {isInquiry ? "Roadmap / Consultation Ready" : "Resolution Dispatched"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {isInquiry
                      ? "Structured deliverable estimate or meeting schedule dispatched to client."
                      : "Root cause resolved and formal confirmation sent."}
                  </p>
                </div>
              </div>
            </div>

            {/* Official Staff Note / Resolution Message */}
            {ticketData.adminNotes && (
              <div className="p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Official Engineering &amp; Support Update:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 font-medium whitespace-pre-wrap leading-relaxed">
                  {ticketData.adminNotes}
                </p>
              </div>
            )}

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Category Type</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {ticketData.type}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Date Registered</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatDate(ticketData.createdAt)}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Submitter</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {ticketData.maskedName}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Contact Email</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {ticketData.maskedEmail}
                </span>
              </div>
            </div>

          </div>

          {/* Direct Escalation Action Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Have additional notes or need immediate technical escalation?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quote your reference ID <strong className="text-slate-800 dark:text-slate-200">#{ticketData.ticketNumber}</strong> when communicating with our studio engineering team.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`mailto:support@nvit.space?subject=Follow-up regarding ${ticketData.ticketNumber}`}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Engineering Lead</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Default Guide if No Search Performed */}
      {!hasSearched && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Checking Project Enquiries
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              When you submit a consultation request on our Contact Page, you receive a reference ID prefixed with <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">ENQ-</span>. Use it here to verify review status, team assignment, and architecture roadmap preparation.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Checking Complaints &amp; Grievances
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Service complaints and feedback submitted through our footer modal generate a reference number starting with <span className="font-mono font-semibold text-violet-600 dark:text-violet-400">TKT-</span>. All tickets are bound by our 24-hour response protocol.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckStatusPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Track Status" },
            ]}
          />

          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Real-Time Status Telemetry</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              TRACK ENQUIRY &amp; TICKET STATUS
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Check real-time resolution and review progress for your project enquiries, architecture consultations, grievances, and support tickets.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tracker Container */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="max-w-5xl mx-auto py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            </div>
          }
        >
          <StatusTrackerContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
