"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Expand clip-path from the bottom over the hero (0% to 30% scroll)
  const clipPathValue = useTransform(scrollYProgress, [0, 0.3], [45, 250]);
  const clipPath = useTransform(clipPathValue, (v) => `circle(${v}% at 50% 185%)`);

  // 2. Cascading Shutters sliding down (30% to 65% scroll)
  const s1 = useTransform(scrollYProgress, [0.30, 0.45], ["-100%", "0%"]);
  const s2 = useTransform(scrollYProgress, [0.35, 0.50], ["-100%", "0%"]);
  const s3 = useTransform(scrollYProgress, [0.40, 0.55], ["-100%", "0%"]);
  const s4 = useTransform(scrollYProgress, [0.45, 0.60], ["-100%", "0%"]);
  const s5 = useTransform(scrollYProgress, [0.50, 0.65], ["-100%", "0%"]);

  // 3. Text fading in and out (65% to 90% scroll)
  const textOpacity = useTransform(scrollYProgress, (v) => {
    if (v < 0.65) return 0;
    if (v < 0.75) return (v - 0.65) * 10; // fade in
    if (v < 0.85) return 1;               // hold
    if (v < 0.95) return 1 - ((v - 0.85) * 10); // fade out
    return 0;
  });

  // 4. Fade out entire container to reveal next section smoothly (90% to 100%)
  const containerOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] -mt-[100vh] z-20">
      <motion.div style={{ opacity: containerOpacity }} className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full pointer-events-auto flex items-center justify-center relative overflow-hidden"
        >
          {/* Main Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/intro/bg.png" 
              alt="Intro Background" 
              fill 
              className="object-cover object-center"
              quality={100}
            />
          </div>

          {/* 5 Shutter Columns mapped to the grid */}
          <div className="absolute inset-0 z-[1] w-full h-full flex">
            <motion.div style={{ y: s1 }} className="w-1/5 h-full bg-[var(--brand-forest)] shadow-2xl" />
            <motion.div style={{ y: s2 }} className="w-1/5 h-full bg-[var(--brand-forest)] shadow-2xl" />
            <motion.div style={{ y: s3 }} className="w-1/5 h-full bg-[var(--brand-forest)] shadow-2xl" />
            <motion.div style={{ y: s4 }} className="w-1/5 h-full bg-[var(--brand-forest)] shadow-2xl" />
            <motion.div style={{ y: s5 }} className="w-1/5 h-full bg-[var(--brand-forest)] shadow-2xl" />
          </div>

          {/* 4 Vertical Grid Lines Overlay (Always visible on top of everything) */}
          <div className="absolute inset-0 z-[2] w-full h-full pointer-events-none flex justify-evenly">
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
            <div className="w-[1px] h-full bg-white/15 mix-blend-overlay" />
          </div>

          {/* Overlay Text */}
          <motion.div 
            style={{ opacity: textOpacity }} 
            className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4 text-center pointer-events-none"
          >
            <h2 className="text-4xl md:text-6xl text-[var(--brand-sand)] font-gallient mb-6 max-w-4xl leading-tight">
              A deeply personalized journey <br/> back to your true nature.
            </h2>
            <p className="text-[var(--bg-primary)] font-space tracking-widest uppercase text-sm">
              Discover authentic healing
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
