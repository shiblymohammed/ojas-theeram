"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import PackagesSection from "./PackagesSection";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Master scroll progress for the entire combined section ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The intro animation phases happen in the first portion of scroll.
  // With PackagesSection appended, the total height is larger,
  // so the intro sequence is compressed to the first ~40% of scroll.
  // Remaining 40-100% is the packages section scrolling over the BG.

  // ── Phase 1: Circle reveal (0% → 8% scroll) ──
  const clipPathValue = useTransform(scrollYProgress, [0, 0.08], [45, 250]);
  const clipPath = useTransform(clipPathValue, (v) => `circle(${v}% at 50% 185%)`);

  // ── Image parallax (0% → 30%) ──
  const imageScale = useTransform(scrollYProgress, [0, 0.30], [1.1, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 0.30], ["0%", "8%"]);

  // ── Phase 2: Pre-Intro Scrolling Text (0% → 18%) ──
  const preIntroY = useTransform(scrollYProgress, [0, 0.18], ["30vh", "-100vh"]);
  const preIntroOpacity = useTransform(scrollYProgress, [0, 0.02, 0.14, 0.18], [0, 1, 1, 0]);

  // ── Phase 3: Shutter cascade (20% → 32%) ──
  const s1 = useTransform(scrollYProgress, [0.20, 0.24], ["-100%", "0%"]);
  const s2 = useTransform(scrollYProgress, [0.22, 0.26], ["-100%", "0%"]);
  const s3 = useTransform(scrollYProgress, [0.24, 0.28], ["-100%", "0%"]);
  const s4 = useTransform(scrollYProgress, [0.26, 0.30], ["-100%", "0%"]);
  const s5 = useTransform(scrollYProgress, [0.28, 0.32], ["-100%", "0%"]);

  // ── Phase 4: Final text on blurred bg (32% → 40%) ──
  const textOpacity = useTransform(scrollYProgress, (v) => {
    if (v < 0.32) return 0;
    if (v < 0.34) return (v - 0.32) * 50;   // fade in
    if (v < 0.36) return 1;                  // hold
    if (v < 0.40) return 1 - ((v - 0.36) * 25); // fade out
    return 0;
  });

  // ── Phase 5: Light overlay fades in for packages section (40% → 48%) ──
  // Transitions the dark blurred BG into a warm cream tone before packages scroll in
  const lightOverlayOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 0.88]);

  return (
    <section ref={containerRef} className="relative -mt-[100vh] z-20">
      
      {/* ── STICKY BACKGROUND LAYER ── 
          This stays pinned at top while user scrolls through 
          both the intro animation AND the packages section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
        >
          {/* Main Background Image with gentle parallax */}
          <motion.div 
            className="absolute inset-0 w-full h-[120%] -top-[10%] z-0" 
            style={{ scale: imageScale, y: imageY }}
          >
            <Image 
              src="/images/intro/bg.png" 
              alt="Intro Background" 
              fill 
              className="object-cover object-center"
              quality={100}
            />
          </motion.div>

          {/* 5 Glass Shutter Columns */}
          <div className="absolute inset-0 z-[1] w-full h-full flex overflow-hidden">
            <motion.div style={{ y: s1 }} className="w-1/5 h-full backdrop-blur-[24px] bg-[#050806]/40 shadow-2xl border-x border-white/5" />
            <motion.div style={{ y: s2 }} className="w-1/5 h-full backdrop-blur-[24px] bg-[#050806]/40 shadow-2xl border-x border-white/5" />
            <motion.div style={{ y: s3 }} className="w-1/5 h-full backdrop-blur-[24px] bg-[#050806]/40 shadow-2xl border-x border-white/5" />
            <motion.div style={{ y: s4 }} className="w-1/5 h-full backdrop-blur-[24px] bg-[#050806]/40 shadow-2xl border-x border-white/5" />
            <motion.div style={{ y: s5 }} className="w-1/5 h-full backdrop-blur-[24px] bg-[#050806]/40 shadow-2xl border-x border-white/5" />
          </div>

          {/* 4 Vertical Grid Lines */}
          <div className="absolute inset-0 z-[2] w-full h-full pointer-events-none flex justify-evenly">
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
          </div>

          {/* ── Light Cream Overlay (fades in for packages section) ──
              Sits on top of the dark shutters, transforming the BG
              from dark/moody to a warm white tone for the packages cards */}
          <motion.div 
            style={{ opacity: lightOverlayOpacity }}
            className="absolute inset-0 z-[2] bg-[#f7f7eb] pointer-events-none"
          />

          {/* Pre-Intro Scrolling Text */}
          <motion.div 
            style={{ opacity: preIntroOpacity, y: preIntroY }}
            className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl text-white font-gallient mb-8 max-w-5xl leading-[1.1] drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
              Leave your burdens at the edge of the water. <br className="hidden md:block" />
              <span className="text-[var(--brand-sand)]">Step into a space where time slows down.</span>
            </h2>
            <p className="text-sm md:text-base font-space tracking-widest uppercase text-white/80 drop-shadow-md">
              A meticulously designed sanctuary for deep restorative healing.
            </p>
          </motion.div>

          {/* Final Overlay Text (Appears AFTER shutters) */}
          <motion.div 
            style={{ opacity: textOpacity }} 
            className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-4 text-center pointer-events-none"
          >
            <h2 className="text-4xl md:text-6xl text-[var(--brand-sand)] font-gallient mb-6 max-w-4xl leading-tight">
              A deeply personalized journey <br/> back to your true nature.
            </h2>
            <p className="text-[var(--bg-primary)] font-space tracking-widest uppercase text-sm">
              Discover authentic healing
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL HEIGHT for intro animation phases ──
          This invisible spacer drives the intro animation.
          User scrolls through this while the sticky BG animates. */}
      <div className="h-[300vh] relative z-[1] pointer-events-none" />

      {/* ── PACKAGES SECTION ──
          Scrolls up OVER the persistent blurred background.
          The sticky layer behind continues showing the blurred image. */}
      <div className="relative z-[5]">
        <PackagesSection transparentBg />
      </div>
    </section>
  );
}
