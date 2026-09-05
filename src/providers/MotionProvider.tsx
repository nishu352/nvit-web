"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MotionContextType {
  lenis: Lenis | null;
  reducedMotion: boolean;
  isTouch: boolean;
}

const MotionContext = createContext<MotionContextType>({
  lenis: null,
  reducedMotion: false,
  isTouch: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility Check: prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    const updateCapabilities = () => {
      setReducedMotion(motionQuery.matches);
      setIsTouch(touchQuery.matches);
    };

    updateCapabilities();
    motionQuery.addEventListener("change", updateCapabilities);
    touchQuery.addEventListener("change", updateCapabilities);

    // If reduced motion is requested, do not initialize smooth-scroll
    if (motionQuery.matches) {
      ScrollTrigger.config({ limitCallbacks: true });
      return () => {
        motionQuery.removeEventListener("change", updateCapabilities);
        touchQuery.removeEventListener("change", updateCapabilities);
      };
    }

    // 2. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Hook Lenis animation frame loop to GSAP's high-precision internal ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      motionQuery.removeEventListener("change", updateCapabilities);
      touchQuery.removeEventListener("change", updateCapabilities);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, reducedMotion, isTouch }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionConfig() {
  return useContext(MotionContext);
}
