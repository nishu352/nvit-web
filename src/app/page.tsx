"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeExperience from "@/components/landing/WelcomeExperience";
import HeroSection from "@/components/landing/HeroSection";
import VisionSection from "@/components/landing/VisionSection";
import DigitalGapSection from "@/components/landing/DigitalGapSection";
import WhatNVITDoesSection from "@/components/landing/WhatNVITDoesSection";
import CapabilitiesEcosystemSection from "@/components/landing/CapabilitiesEcosystemSection";
import SelectedWorkSection from "@/components/landing/SelectedWorkSection";
import TechnicalCredibilitySection from "@/components/landing/TechnicalCredibilitySection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* 00 — First-Visit Lightweight Welcome Experience (1-hr localStorage cache, skip button, reduced-motion aware) */}
      <WelcomeExperience />

      {/* Primary Clean Navigation */}
      <Navbar />

      {/* Continuous Architectural Story */}
      <main className="flex-1">
        {/* 01 — Hero: "Take Your Business Into The Digital World." */}
        <HeroSection />

        {/* 02 — Vision: "Every Business Deserves a Place in the Digital Future." */}
        <VisionSection />

        {/* 03 — The Digital Gap: Signature Transition (Traditional Business → Digital Gap → Digital Platform) */}
        <DigitalGapSection />

        {/* 04 — What NVIT Does: "We Turn Business Ideas Into Digital Experiences." (Understand → Imagine → Build → Evolve) */}
        <WhatNVITDoesSection />

        {/* 05 — Capabilities / Digital Ecosystem (Presence / Experiences / Systems / Growth) */}
        <CapabilitiesEcosystemSection />

        {/* 06 — Proof / Selected Work: Problem → Engineered → Result (Real Production Software) */}
        <SelectedWorkSection />

        {/* 07 — Technical Credibility: Serious Engineering. Uncompromising Standards. */}
        <TechnicalCredibilitySection />

        {/* 08 — Philosophy: "Technology Should Feel Simple. The Possibilities Should Feel Limitless." */}
        <PhilosophySection />

        {/* 09 — Final CTA: "Your Next Chapter Is Digital." / "Let's Build Your Digital Future." */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
