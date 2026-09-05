"use client";

import { useEffect, useRef } from "react";
import { useMotionConfig } from "@/providers/MotionProvider";

export default function CursorTracker() {
  const { reducedMotion, isTouch } = useMotionConfig();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Accessibility & Touch Device Bailout
    if (
      typeof window === "undefined" ||
      reducedMotion ||
      isTouch ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textSpan = textRef.current;
    if (!dot || !ring || !textSpan) return;

    // Direct numerical state (zero React renders)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let isHoveringLink = false;
    let isHoveringButton = false;
    let customText = "";
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const updatePosition = () => {
      // Smooth ring lerping (0.16 smoothing factor for spatial weight)
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      // Dot: Instant 1:1 hardware translation
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Ring: Interpolated translation
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update CSS variables on root for background illumination
      document.documentElement.style.setProperty("--mouse-x", `${mouseX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${mouseY}px`);

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check Target Under Cursor for State Machine
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      ) as HTMLElement | null;

      const explicitText = interactiveEl?.getAttribute("data-cursor-text") || "";
      const cursorType = interactiveEl?.getAttribute("data-cursor") || "";

      if (cursorType === "view" || explicitText) {
        customText = explicitText || "VIEW";
        textSpan.textContent = customText;
        ring.classList.add("cursor-morph-pill");
        ring.classList.remove("cursor-expand", "cursor-button-snap");
        dot.style.opacity = "0";
      } else if (interactiveEl && (interactiveEl.tagName === "BUTTON" || interactiveEl.getAttribute("role") === "button")) {
        customText = "";
        textSpan.textContent = "";
        ring.classList.add("cursor-button-snap");
        ring.classList.remove("cursor-morph-pill", "cursor-expand");
        dot.style.opacity = "0.7";
      } else if (interactiveEl && interactiveEl.tagName === "A") {
        customText = "";
        textSpan.textContent = "";
        ring.classList.add("cursor-expand");
        ring.classList.remove("cursor-morph-pill", "cursor-button-snap");
        dot.style.opacity = "0.8";
      } else {
        customText = "";
        textSpan.textContent = "";
        ring.classList.remove("cursor-morph-pill", "cursor-expand", "cursor-button-snap");
        dot.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isTouch]);

  if (reducedMotion || isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 transition-opacity duration-200 will-change-transform shadow-[0_0_8px_rgba(59,130,246,0.8)]"
      />

      {/* Spatial Elastic Trailing Ring & Morphing Pill */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/40 dark:border-blue-400/50 bg-blue-500/[0.04] dark:bg-blue-400/[0.06] backdrop-blur-[0.5px] opacity-0 flex items-center justify-center transition-[width,height,border-radius,background-color,border-color] duration-200 ease-out will-change-transform"
      >
        <span
          ref={textRef}
          className="text-[9px] font-black uppercase tracking-widest text-white px-2 opacity-0 transition-opacity duration-150 pointer-events-none"
        />
      </div>
    </div>
  );
}
