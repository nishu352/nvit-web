"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import VisionSection from "@/components/landing/VisionSection";
import DigitalGapSection from "@/components/landing/DigitalGapSection";
import WhatNVITDoesSection from "@/components/landing/WhatNVITDoesSection";
import CapabilitiesEcosystemSection from "@/components/landing/CapabilitiesEcosystemSection";
import SelectedWorkSection from "@/components/landing/SelectedWorkSection";
import FreeToolsHomeSection from "@/components/landing/FreeToolsHomeSection";
import ResourcesHomeSection from "@/components/landing/ResourcesHomeSection";
import TechnicalCredibilitySection from "@/components/landing/TechnicalCredibilitySection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Primary Clean Navigation */}
      <Navbar />

      {/* Continuous Architectural Story */}
      <main className="flex-1">
        {/* 01 — Hero: "Take Your Business Into The Digital World." */}
        <HeroSection />

        {/* 02 — Vision: "Every Business Deserves a Place in the Digital Future." */}
        <VisionSection />

        {/* 03 — The Digital Gap: Traditional Business → Digital Platform */}
        <DigitalGapSection />

        {/* 04 — What NVIT Does: Software Development & Business Systems */}
        <WhatNVITDoesSection />

        {/* 05 — Capabilities / Digital Ecosystem */}
        <CapabilitiesEcosystemSection />

        {/* 06 — Interactive Utilities & Banking Data APIs */}
        <FreeToolsHomeSection />

        {/* 07 — Proof / Selected Work: Engineered Production Systems */}
        <SelectedWorkSection />

        {/* 08 — Educational Resources & Technical Guides */}
        <ResourcesHomeSection />

        {/* 09 — Technical Credibility */}
        <TechnicalCredibilitySection />

        {/* 10 — Philosophy */}
        <PhilosophySection />

        {/* 11 — Final CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

