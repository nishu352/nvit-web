"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeExperience from "@/components/landing/WelcomeExperience";
import HeroSection from "@/components/landing/HeroSection";
import VisionSection from "@/components/landing/VisionSection";
import DigitalGapSection from "@/components/landing/DigitalGapSection";
import WhatWeDoSection from "@/components/landing/WhatWeDoSection";
import DigitalJourneySection from "@/components/landing/DigitalJourneySection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* 01 — First-Visit Welcome Experience (4–6s, 1-hr localStorage cache, skip button, reduced-motion aware) */}
      <WelcomeExperience />

      {/* Primary Sticky Translucent Navigation */}
      <Navbar />

      {/* Main Architectural Sections */}
      <main className="flex-1">
        {/* 02 — Hero Section: "Take Your Business Into the Digital World." */}
        <HeroSection />

        {/* 03 — Vision Section: "Every Business Deserves a Place in the Digital Future." */}
        <VisionSection />

        {/* 04 — The Digital Gap (Signature Transition: Today → The Digital Gap → Future) */}
        <DigitalGapSection />

        {/* 05 — What We Do (Connected 4-Pillar Ecosystem) */}
        <WhatWeDoSection />

        {/* 06 — Digital Journey (Continuous Geometric Line Process: Understand, Imagine, Build, Evolve) */}
        <DigitalJourneySection />

        {/* 07 — Philosophy: "Technology Should Feel Simple. The Possibilities Should Feel Limitless." */}
        <PhilosophySection />

        {/* 08 — Final CTA: "Your Next Chapter Is Digital." / "Let's Build Your Digital Future." */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
