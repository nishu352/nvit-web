"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Sparkles, Mail, Phone, MapPin, Send, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useWebsiteCMS } from "@/hooks/useWebsiteCMS";
import { motion } from "framer-motion";
import MotionReveal from "@/components/ui/MotionReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function ContactPage() {
  const { data: cms } = useWebsiteCMS();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Website Development");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supportEmail = cms?.brand?.supportEmail || "info@nvit.space";
  const supportPhone = cms?.brand?.supportPhone || "";
  const address = [cms?.company?.address, cms?.company?.city, cms?.company?.state]
    .filter(Boolean)
    .join(", ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050507] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-950">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient border-b border-zinc-200/60 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs items={[{ label: "Contact" }]} />

          <MotionReveal className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold shadow-sm backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Project Consultation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              LET&apos;S BUILD SOMETHING EXTRAORDINARY.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Connect directly with our engineering team to scope your software architecture, timeline, and deliverables.
            </p>
          </MotionReveal>
        </div>
      </section>

      {/* Main Contact Container */}
      <main className="flex-1 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Studio Contact */}
          <MotionReveal direction="left" className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Studio Communication
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Direct Engineering Line
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                We work directly with founders, CTOs, and product directors. Every inquiry is reviewed by senior software engineering leads.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Email Consultation</p>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {supportEmail}
                  </a>
                </div>
              </div>

              {supportPhone && (
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Direct Line / WhatsApp</p>
                    <a
                      href={`tel:${supportPhone}`}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {supportPhone}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Corporate Registered Office</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">{address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Response Guarantee Callout */}
            <SpotlightCard className="rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>24-Hour Response Protocol</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                You will receive a structured technical reply and architecture roadmap estimate within one business day.
              </p>
            </SpotlightCard>
          </MotionReveal>

          {/* Right Column: Consultation Form Container */}
          <MotionReveal direction="right" className="lg:col-span-7">
            <SpotlightCard className="rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                  Start a Project Conversation
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tell us about your technical goals, timeline, and architectural specifications.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Project Inquiry Received
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                    Thank you! Our engineering studio team has received your message and will reach out with a technical roadmap within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-bold cursor-pointer transition-colors shadow-md"
                  >
                    Submit Another Inquiry
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nishant Sharma"
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Project Discipline *
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none cursor-pointer"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="Web Application Development">Web Application Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI & Automation">AI &amp; Automation</option>
                        <option value="Fintech & Banking Technology">Fintech &amp; Banking Technology</option>
                        <option value="Custom Software Architecture">Custom Software Architecture</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Project Scope &amp; Deliverables *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your product goals, required tech stack, estimated launch timeline, and target audience..."
                      className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-white/40 focus:outline-none resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Submit Project Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </SpotlightCard>
          </MotionReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
