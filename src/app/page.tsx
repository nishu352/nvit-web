"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { apiClient } from "@/services/apiClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Building2,
  Search,
  MapPin,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Lock,
  Sparkles,
  Calculator,
  CreditCard,
  Building,
  DollarSign,
  Star,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cmsData, setCmsData] = useState<any>(null);
  const [loadingCms, setLoadingCms] = useState(true);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const loadPublicConfig = async () => {
      try {
        const [cmsRes, marketingRes] = await Promise.all([
          apiClient.get("/cms/published"),
          apiClient.get("/marketing/public"),
        ]);

        if (cmsRes.data.success) {
          setCmsData(cmsRes.data.data);
        }

        if (marketingRes.data.success) {
          const m = marketingRes.data.data;
          
          if (m.seo) {
            document.title = m.seo.title || "NVIT Solution";
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute("content", m.seo.description || "");
            } else {
              metaDesc = document.createElement("meta");
              metaDesc.setAttribute("name", "description");
              metaDesc.setAttribute("content", m.seo.description || "");
              document.head.appendChild(metaDesc);
            }
          }

          if (m.customScripts?.head) {
            const range = document.createRange();
            const documentFragment = range.createContextualFragment(m.customScripts.head);
            document.head.appendChild(documentFragment);
          }

          if (m.analytics?.ga4Id) {
            const script1 = document.createElement("script");
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${m.analytics.ga4Id}`;
            script1.async = true;
            document.head.appendChild(script1);

            const script2 = document.createElement("script");
            script2.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${m.analytics.ga4Id}');
            `;
            document.head.appendChild(script2);
          }

          if (m.analytics?.gtmId) {
            const scriptGTM = document.createElement("script");
            scriptGTM.innerHTML = `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${m.analytics.gtmId}');
            `;
            document.head.appendChild(scriptGTM);
          }

          if (m.meta?.pixelId) {
            const scriptPixel = document.createElement("script");
            scriptPixel.innerHTML = `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${m.meta.pixelId}');
              fbq('track', 'PageView');
            `;
            document.head.appendChild(scriptPixel);
          }
        }
      } catch (err) {
        console.error("Failed to load public settings", err);
      } finally {
        setLoadingCms(false);
      }
    };

    loadPublicConfig();
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      mobile: formData.get("mobile") as string,
      email: formData.get("email") as string,
      city: formData.get("city") as string,
      state: "Delhi",
      company: formData.get("company") as string,
      monthlyIncome: Number(formData.get("monthlyIncome")),
      loanType: formData.get("loanType") as string,
      loanAmount: Number(formData.get("loanAmount")),
      remarks: formData.get("remarks") as string || "",
    };

    try {
      const response = await apiClient.post("/loan/apply", payload);
      if (response.data.success) {
        setFormSubmitted(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit lead inquiry");
    } finally {
      setFormSubmitting(false);
    }
  };

  const services = [
    {
      title: "Personal Loan",
      badge: "CAT A / B / C Eligible",
      icon: Users,
      description: "Unsecured personal loans with fast disbursal based on employer category classification and net monthly income.",
      href: "/loan-apply?type=Personal",
    },
    {
      title: "Business Loan",
      badge: "Unsecured & Secured",
      icon: TrendingUp,
      description: "Customized business loans for corporate entities, SMEs, and self-employed professionals with minimal collateral.",
      href: "/loan-apply?type=Business",
    },
    {
      title: "Home Loan",
      badge: "Lowest Interest Rates",
      icon: Building,
      description: "Tax-efficient home loans and seamless balance transfers to lower existing EMI burdens from major banks.",
      href: "/loan-apply?type=Home",
    },
    {
      title: "Loan Against Property",
      badge: "High LTV Multiplier",
      icon: Building2,
      description: "Leverage residential or commercial real estate assets for maximum capital liquidity and long repayment tenure.",
      href: "/loan-apply?type=LAP",
    },
    {
      title: "Credit Card",
      badge: "Pre-Approved Offers",
      icon: CreditCard,
      description: "Compare premium credit cards with reward multipliers, complimentary lounge access, and zero annual fee offers.",
      href: "/loan-apply?type=CreditCard",
    },
    {
      title: "Working Capital",
      badge: "Flexible Line of Credit",
      icon: DollarSign,
      description: "Overdraft facilities and cash credit accounts to keep business operations funded without equity dilution.",
      href: "/loan-apply?type=WorkingCapital",
    },
  ];

  const bentoGrid = [
    {
      title: "30+ Banking & NBFC Partners",
      description: "Direct tie-ups with HDFC, ICICI, SBI, Axis, Bajaj Finserv, Tata Capital, and Kotak Mahindra for best rate matching.",
      icon: Building2,
      tag: "Institutional Trust",
    },
    {
      title: "Fast Loan Processing",
      description: "Hassle-free documentation checks within 2 hours and rapid loan payouts directly through our partner banking network.",
      icon: Clock,
      tag: "Rapid Turnaround",
    },
    {
      title: "Confidential Data Security",
      description: "Enterprise SSL protection protocols ensuring your corporate credentials and salaries are verified safely.",
      icon: Lock,
      tag: "Bank-Grade Encryption",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Check Category Tiers",
      desc: "Instantly lookup your company classification (CAT A, B, C, Unlisted) to understand bank-specific parameters.",
    },
    {
      step: "02",
      title: "Verify Service Pincode",
      desc: "Check if your office and residential areas fall within the serviceable banking grid boundaries.",
    },
    {
      step: "03",
      title: "Submit Single Form",
      desc: "Submit your details once to inspect multiple bank policies, eligibility parameters, and ROI metrics.",
    },
    {
      step: "04",
      title: "Fast Disbursal",
      desc: "Review match results, complete documentation verified by our consultant, and receive direct bank payouts.",
    },
  ];

  const bankingLogos = [
    "HDFC BANK",
    "ICICI BANK",
    "AXIS BANK",
    "STATE BANK OF INDIA",
    "BAJAJ FINSERV",
    "TATA CAPITAL",
    "KOTAK MAHINDRA",
    "IDFC FIRST BANK",
    "YES BANK",
    "FEDERAL BANK",
  ];

  const testimonials = [
    {
      name: "Anuj Deshmukh",
      city: "Noida",
      review: "NVIT Solution helped me find the best personal loan offer. Their category checker was spot on - my employer was CAT A, and I got approved by HDFC at 10.75% in a single day!",
      avatar: "AD",
    },
    {
      name: "Pooja Singhal",
      city: "New Delhi",
      review: "Checking pincode serviceability saved me days. I verified my residential sector was within ICICI's operational branch radius before applying. Fast support!",
      avatar: "PS",
    },
    {
      name: "Vikram Malhotra",
      city: "Gurugram",
      review: "As a business owner, getting an unsecured business loan is tough. NVIT Solution compared options from 4 lenders and secured a working capital limit easily. Highly professional.",
      avatar: "VM",
    },
  ];

  const faqs = [
    {
      question: "Does checking company category or pincode affect my CIBIL score?",
      answer: "No! All eligibility checkers and policy lookup tools on NVIT Solution are 100% free and perform soft profile matching that NEVER impacts your CIBIL credit score.",
    },
    {
      question: "Which banks are partnered with NVIT Solution?",
      answer: "NVIT Solution partners strictly with RBI-aligned lending institutions, including HDFC Bank, ICICI Bank, State Bank of India, Axis Bank, Bajaj Finserv, Tata Capital, and Kotak Mahindra Bank.",
    },
    {
      question: "How long does loan sanction take through NVIT Solution?",
      answer: "Once eligibility is confirmed, document verification is completed in 2 hours, and disbursals are executed within 24 hours by our partner banks.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION — page-top-offset accounts for floating capsule header */}
      <section className="relative page-top-offset pb-24 lg:pb-32 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#FAFBFC] via-[#F6F8FA] to-white dark:from-[#0B1020] dark:via-[#0F172A] dark:to-[#0B1020] bg-dot-grid dark:bg-dot-grid-dark">
        
        {/* Subtle Decorative Background Blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-250/60 dark:border-slate-700 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>RBI-Aligned Lending Partners • 30+ Banks & NBFCs</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]"
              >
                {cmsData?.hero?.headline || cmsData?.hero?.title || "India's Trusted Lending & Financial Solutions Partner"}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-650 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {cmsData?.hero?.subtitle || "Compare loan options from multiple Banks & NBFCs, check company eligibility, verify serviceable pincodes and apply for loans from one trusted platform."}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link href="/company-check">
                  <Button variant="primary" size="lg" leftIcon={<Search className="w-4 h-4 text-white" />}>
                    Check Company
                  </Button>
                </Link>

                <Link href="/pincode-check">
                  <Button variant="outline" size="lg" className="border-slate-350 hover:border-slate-450 dark:border-slate-700 dark:hover:border-slate-600 text-slate-800 dark:text-slate-300 dark:bg-transparent" leftIcon={<MapPin className="w-4 h-4 text-royal dark:text-royal-light" />}>
                    Check Pincode
                  </Button>
                </Link>

                <Link href="/loan-apply">
                  <Button variant="emerald" size="lg" leftIcon={<FileCheck className="w-4 h-4 text-white" />}>
                    Apply Loan
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column Financial Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-card-light dark:glass-card-dark border border-slate-200/80 dark:border-white/10 rounded-3xl p-7 space-y-6 shadow-xl dark:shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-royal text-white flex items-center justify-center font-bold shadow-md shadow-royal/20">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">NVIT Intelligence</h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">NVIT SOLUTION PVT. LTD.</span>
                    </div>
                  </div>
                  <Badge variant="emerald" pulse>
                    LIVE MATCH
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] font-extrabold uppercase">Lender Partners</span>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">30+ Banks</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] font-extrabold uppercase">Min Interest Rate</span>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">8.40% p.a.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-royal-light/50 dark:bg-slate-800 border border-royal-light/40 dark:border-blue-500/40 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-xs">Instant Pre-Approval Sanction</h5>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300">₹25,00,000 • 24hr Disbursal</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">MATCHED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR SECTION (WHITE) */}
      <section className="py-10 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 shadow-xs">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">30+</p>
              <p className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">Banking Partners</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 shadow-xs">
              <p className="text-3xl sm:text-4xl font-black text-royal dark:text-royal-light">50,000+</p>
              <p className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">Happy Customers</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 shadow-xs">
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">4+</p>
              <p className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">Years Experience</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 shadow-xs">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">24 Hrs</p>
              <p className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">Fast Processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SMART FINANCIAL TOOLS (SOFT NEUTRAL TINT) */}
      <section className="py-24 bg-[#F6F8FA] dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="emerald" pulse>
              NVIT Solution Core USP
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Smart Financial Verification Tools</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium">
              Check company category classifications and pincode serviceability before applying to maximize approval odds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1 */}
            <div className="glass-card-light dark:glass-card-dark p-7 rounded-3xl border border-slate-200/80 dark:border-white/8 shadow-xs flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 ease-out">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-royal dark:text-royal-light flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Company Category Checker</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Search your employer company across multiple Banks & NBFCs to inspect CAT A/B/C tiering.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/company-check" className="block w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Check Company
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="glass-card-light dark:glass-card-dark p-7 rounded-3xl border border-slate-200/80 dark:border-white/8 shadow-xs flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 ease-out">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Pincode Eligibility Checker</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Check bank service availability and branch radius by 6-digit postal code.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/pincode-check" className="block w-full">
                  <Button variant="secondary" size="md" className="w-full">
                    Check Pincode
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="glass-card-light dark:glass-card-dark opacity-75 p-7 rounded-3xl border border-slate-200/80 dark:border-white/8 shadow-xs flex flex-col justify-between relative overflow-hidden hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-out">
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                COMING SOON
              </span>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">EMI Calculator</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Calculate monthly EMI payments, total interest payable, and loan amortization schedule.
                </p>
              </div>
              <div className="pt-6">
                <Button disabled variant="outline" size="md" className="w-full dark:border-slate-800 dark:text-slate-500">
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* Tool 4 */}
            <div className="glass-card-light dark:glass-card-dark opacity-75 p-7 rounded-3xl border border-slate-200/80 dark:border-white/8 shadow-xs flex flex-col justify-between relative overflow-hidden hover:-translate-y-1 hover:shadow-xs transition-all duration-300 ease-out">
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                COMING SOON
              </span>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">CIBIL Eligibility</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Check free credit score match against bank minimum CIBIL score requirements.
                </p>
              </div>
              <div className="pt-6">
                <Button disabled variant="outline" size="md" className="w-full dark:border-slate-800 dark:text-slate-500">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (WHITE) */}
      <section id="services" className="py-24 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="royal">Financial Products</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Our Core Loan Services</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium">
              Explore custom lending solutions tailored to salaried employees, business owners, and corporate entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-[#FAFBFC] dark:bg-[#151C2E] p-8 rounded-3xl border border-slate-200 dark:border-white/8 shadow-xs flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-350 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-[#182033] transition-all duration-300 ease-out">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-royal dark:text-royal-light flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="emerald">{service.badge}</Badge>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-semibold">{service.description}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 mt-6 flex items-center justify-between">
                    <Link href={service.href} className="text-xs font-black text-slate-600 hover:text-royal dark:text-slate-400 dark:hover:text-royal-light">
                      Learn More
                    </Link>
                    <Link href={service.href}>
                      <Button variant="primary" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY FINOLINK (WHITE BACKGROUND / LIGHT BENTO GRID DEFAULT) */}
      <section id="about" className="py-24 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="emerald" pulse>
              Institutional Advantage
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Why Choose NVIT SOLUTION</h2>
            <p className="text-slate-650 dark:text-slate-300 text-sm sm:text-base font-medium">
              Built on trust, speed, and complete transparency for ₹100+ Crore financial product execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoGrid.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-4 shadow-sm dark:shadow-xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-300 ease-out">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-royal dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.tag}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-semibold">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ABOUT & LEADERSHIP SECTION (CMS DRIVEN) */}
      <section id="about" className="py-24 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-855 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* About Company */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Badge variant="royal">About Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {cmsData?.company?.name || "NVIT SOLUTION PVT. LTD."}
            </h2>
            <p className="text-slate-650 dark:text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
              {cmsData?.about?.description || "NVIT SOLUTION PVT. LTD. is a premier financial technology & consultancy firm building state-of-the-art software systems to accelerate credit verification and loan processing across India."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left">
              <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-2">
                <h4 className="text-sm font-extrabold text-royal dark:text-blue-400 uppercase tracking-wider">Our Vision</h4>
                <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
                  {cmsData?.about?.vision || "Real-time policy validation for every financial consultant & DSA in India."}
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-2">
                <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Our Mission</h4>
                <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
                  {cmsData?.about?.mission || "To eliminate friction in loan verification processes by building a single source of truth for bank policies."}
                </p>
              </div>
            </div>
          </div>

          {/* Leadership / Founders */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="emerald">Leadership</Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Meet Our Leadership Team</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Founder */}
              <div className="p-8 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-4 shadow-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
                    {(cmsData?.founders?.founder?.name || "Nishant Bhardwaj").charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      {cmsData?.founders?.founder?.name || "Nishant Bhardwaj"}
                    </h4>
                    <span className="text-xs font-bold text-royal dark:text-blue-400 block">
                      {cmsData?.founders?.founder?.title || "Founder & CEO"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                  {cmsData?.founders?.founder?.bio || "Visionary financial technology entrepreneur driving lending innovation across India."}
                </p>
                {cmsData?.founders?.founder?.linkedin && (
                  <a href={cmsData.founders.founder.linkedin} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline inline-block">
                    LinkedIn Profile →
                  </a>
                )}
              </div>

              {/* Co-Founder */}
              <div className="p-8 rounded-3xl bg-[#FAFBFC] dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-4 shadow-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
                    {(cmsData?.founders?.coFounder?.name || "Vineet").charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      {cmsData?.founders?.coFounder?.name || "Vineet"}
                    </h4>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                      {cmsData?.founders?.coFounder?.title || "Co-Founder & CTO"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                  {cmsData?.founders?.coFounder?.bio || "Technology leader architecting scalable credit verification platforms."}
                </p>
                {cmsData?.founders?.coFounder?.linkedin && (
                  <a href={cmsData.founders.coFounder.linkedin} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline inline-block">
                    LinkedIn Profile →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (SOFT NEUTRAL) */}
      <section className="py-24 bg-[#F6F8FA] dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="royal">4 Simple Steps</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-white dark:bg-[#151C2E] border border-slate-200 dark:border-white/8 space-y-4 shadow-sm">
                <span className="text-4xl font-black text-royal dark:text-royal-light">{step.step}</span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-semibold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BANKING PARTNERS SLIDER (WHITE) */}
      <section className="py-14 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-850 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Official Banking & NBFC Partners</p>
        </div>
        <div className="flex space-x-12 animate-logo-slider">
          {[...bankingLogos, ...bankingLogos].map((bank, index) => (
            <div key={index} className="px-6 py-3.5 bg-[#FAFBFC] dark:bg-[#151C2E] rounded-2xl border border-slate-200 dark:border-white/8 text-xs font-black text-slate-800 dark:text-white shrink-0 shadow-xs">
              {bank}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS (SOFT NEUTRAL) */}
      <section className="py-24 bg-[#F6F8FA] dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="emerald" pulse>
              Borrower Trust
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card-light dark:glass-card-dark p-8 rounded-3xl border border-slate-200/80 dark:border-white/8 shadow-sm space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">"{t.review}"</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-royal text-white font-bold flex items-center justify-center text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{t.name}</h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (WHITE) */}
      <section className="py-24 bg-white dark:bg-[#0B1020] border-b border-slate-200 dark:border-slate-855 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <Badge variant="royal">Help & Clarity</Badge>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-[#FAFBFC] dark:bg-[#151C2E]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left font-extrabold text-slate-900 dark:text-white flex items-center justify-between hover:text-royal dark:hover:text-royal-light focus:outline-none transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform ${openFaq === index ? "rotate-180 text-royal dark:text-royal-light" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs text-slate-650 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3 font-semibold">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LEAD FORM SECTION (DARK DEEP NAVY GRADIENT CALLOUT) */}
      <section id="contact" className="py-24 bg-[#F6F8FA] dark:bg-[#0F172A] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy via-[#0B1528] to-navy-deep text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 border border-white/10 relative overflow-hidden">
            {/* Glowing Accent Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-2 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Request Free Financial Consultation</h2>
              <p className="text-xs text-slate-350 font-semibold">Fill out your information for direct pre-approval options</p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Submitted!</h3>
                <p className="text-xs text-slate-300">
                  Our NVIT Solution loan consultant will review your details and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required name="name" placeholder="Full Name *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <input type="text" required name="mobile" placeholder="Mobile Number *" maxLength={10} className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <input type="email" required name="email" placeholder="Email Address *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <input type="text" required name="city" placeholder="City *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <input type="text" required name="company" placeholder="Company Name *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <input type="number" required name="monthlyIncome" placeholder="Monthly Salary (₹) *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                  <select required name="loanType" className="px-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-semibold focus:outline-none focus:border-royal transition-all cursor-pointer">
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Loan Against Property">Loan Against Property (LAP)</option>
                  </select>
                  <input type="number" required name="loanAmount" placeholder="Loan Amount Required (₹) *" className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                </div>
                <textarea rows={3} name="remarks" placeholder="Additional Message / Remarks" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 font-semibold focus:outline-none focus:border-royal transition-all" />
                <Button variant="primary" size="lg" isLoading={formSubmitting} className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                  Submit Lead Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

