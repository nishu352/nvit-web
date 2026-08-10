"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { apiClient } from "@/services/apiClient";

export default function Footer() {
  const [cms, setCms] = useState<any>(null);

  useEffect(() => {
    apiClient
      .get("/cms/published")
      .then((res: any) => {
        if (res.data.success) setCms(res.data.data);
      })
      .catch(() => {});
  }, []);

  const companyName = cms?.company?.name || "NVIT SOLUTION PVT. LTD.";
  const tagline =
    cms?.company?.tagline ||
    "NVIT SOLUTION PVT. LTD. is India's trusted DSA loan consultancy and financial technology marketplace. Compare real loan offers from 30+ RBI-aligned banking partners.";
  const address =
    cms?.company?.address ||
    cms?.footer?.address ||
    "Sector 8, E-14, 3rd Floor, near Java Showroom, Sector 15 Metro, Noida, UP 201301";
  const phone = cms?.brand?.supportPhone || "+91-85100-88409";
  const email = cms?.footer?.contactEmail || cms?.brand?.supportEmail || "info@nvitsolution.com";
  const copyright =
    cms?.footer?.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-royal flex items-center justify-center text-white font-bold shadow-lg shadow-royal/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  {companyName.replace(/ PVT\.? LTD\.?/i, "")}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-extrabold block">
                  PVT. LTD.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {tagline}
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-extrabold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>RBI-Aligned Partner Lenders Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Financial Services
                </Link>
              </li>
              <li>
                <Link href="/company-check" className="hover:text-white transition-colors">
                  Company Category Check
                </Link>
              </li>
              <li>
                <Link href="/pincode-check" className="hover:text-white transition-colors">
                  Pincode Eligibility Checker
                </Link>
              </li>
              <li>
                <Link href="/loan-apply" className="hover:text-white transition-colors">
                  Apply for Loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">Financial Products</h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
              <li>
                <Link href="/loan-apply?type=Personal" className="hover:text-white transition-colors">
                  Personal Loans (CAT A/B/C)
                </Link>
              </li>
              <li>
                <Link href="/loan-apply?type=Business" className="hover:text-white transition-colors">
                  Business Loan &amp; Overdraft
                </Link>
              </li>
              <li>
                <Link href="/loan-apply?type=Home" className="hover:text-white transition-colors">
                  Home Loan &amp; Balance Transfer
                </Link>
              </li>
              <li>
                <Link href="/loan-apply?type=LAP" className="hover:text-white transition-colors">
                  Loan Against Property (LAP)
                </Link>
              </li>
              <li>
                <Link href="/loan-apply?type=WorkingCapital" className="hover:text-white transition-colors">
                  Working Capital Facility
                </Link>
              </li>
              <li>
                <Link href="/loan-apply?type=CreditCard" className="hover:text-white transition-colors">
                  Credit Card Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">Registered Office</h4>
            <div className="space-y-3.5 text-xs text-slate-300 font-semibold">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-semibold">
          <p>{copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-white transition-colors">RBI Compliance Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
