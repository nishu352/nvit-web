"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import EngineeringServicesSection from "@/components/landing/EngineeringServicesSection";
import SelectedWorkSection from "@/components/landing/SelectedWorkSection";
import FreeToolsHomeSection from "@/components/landing/FreeToolsHomeSection";
import HowWeWorkSection from "@/components/landing/HowWeWorkSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col liquid-atmosphere-canvas text-[var(--text-primary)] transition-colors duration-300">
      {/* Primary Navigation */}
      <Navbar />

      {/* Strategic Digital Engineering Narrative */}
      <main className="flex-1">
        {/* Section A: Hero — "We Build Digital Products That Move Businesses Forward." */}
        <HeroSection />

        {/* Section B: Engineering Services — Websites, Custom Software, Backend APIs, Automation */}
        <EngineeringServicesSection />

        {/* Section C: Solutions & Work — Delivered Production Architectures & Case Studies */}
        <SelectedWorkSection />

        {/* Section D: Public Tools — Complementary Utility Products (Company Checker, Pincode, EMI) */}
        <FreeToolsHomeSection />

        {/* Section E: How We Work — 4-Stage Engineering Process */}
        <HowWeWorkSection />

        {/* Section F: Final CTA — Project Inquiry */}
        <FinalCtaSection />
      </main>

      {/* Footer with Complete Navigation & Legal Links */}
      <Footer />
    </div>
  );
}
