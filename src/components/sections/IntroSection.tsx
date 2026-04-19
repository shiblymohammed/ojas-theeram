"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import PackagesSection from "./PackagesSection";

// Extracted Text Content to ensure perfectly identical duplicate layers
const TextContent = ({ variant }: { variant: "light" | "dark" }) => {
  const isDark = variant === "dark";
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
      {/* Top Leaf Icon */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-80 mb-1"
        style={{ stroke: isDark ? "#8f7c6b" : "#d4c8af" }}
      >
        <path d="M12 22c4-4 8-8.5 8-13a8 8 0 1 0-16 0c0 4.5 4 9 8 13z"/>
        <path d="M12 22V12"/>
      </svg>

      <span 
        className="font-space tracking-[0.5em] text-[9px] uppercase pl-1"
        style={{ color: isDark ? "rgba(143,124,107,0.8)" : "rgba(255,255,255,0.6)" }}
      >
        Ojas
      </span>
      
      <span 
        className="font-cormorant italic text-lg md:text-xl tracking-[0.2em] mb-2"
        style={{ color: isDark ? "#2C4A3B" : "#ffffff" }}
      >
        Ayurvedic Sanctuary
      </span>

      <h2 
        className="text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-gallient max-w-5xl leading-[1.1] md:leading-[0.9] text-center px-4"
        style={{ 
          color: isDark ? "#2C4A3B" : "#ffffff",
          textShadow: isDark ? "none" : "0 10px 20px rgba(0,0,0,0.8)"
        }}
      >
        Leave your burdens
      </h2>

      <span 
        className="font-space tracking-[0.4em] text-[8px] md:text-[10px] uppercase my-2 pl-1 text-center"
        style={{ 
          color: isDark ? "#8f7c6b" : "#d4c8af",
          textShadow: isDark ? "none" : "0 2px 4px rgba(0,0,0,0.5)"
        }}
      >
        At The Edge Of The Water
      </span>

      <span 
        className="text-3xl sm:text-4xl md:text-6xl font-gallient mb-4 text-center"
        style={{ 
          color: isDark ? "#2C4A3B" : "rgba(255,255,255,0.9)",
          textShadow: isDark ? "none" : "0 10px 20px rgba(0,0,0,0.8)"
        }}
      >
        Time Slows Down
      </span>

      <p 
        className="text-[9px] md:text-[10px] font-space tracking-widest max-w-lg text-center leading-[1.8] mb-6 px-4 uppercase"
        style={{ color: isDark ? "rgba(143,124,107,0.9)" : "rgba(212,200,175,0.8)" }}
      >
        A meticulously designed sanctuary for<br className="hidden md:block" /> deep restorative healing and rejuvenation of the self.
      </p>

      {/* Bottom Badge Icon (Water drop variation) */}
      <div 
        className="w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-sm mt-2"
        style={{ borderColor: isDark ? "rgba(44,74,59,0.2)" : "rgba(255,255,255,0.2)" }}
      >
        <div 
          className="w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ borderColor: isDark ? "rgba(143,124,107,0.3)" : "rgba(212,200,175,0.3)" }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            className="opacity-90"
            style={{ fill: isDark ? "#8f7c6b" : "#d4c8af" }}
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Master scroll progress for the intro animation ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ── Tailwind State to toggle exactly with the color-sweep (0.50 threshold)
  const [showLeaf, setShowLeaf] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.50 && !showLeaf) setShowLeaf(true);
    else if (latest < 0.50 && showLeaf) setShowLeaf(false);
  });

  // 🌿 Cinematic parallax and depth calculations
  const leafY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const leafX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const leafScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // 🌊 Premium Smoothing layer
  const smoothY = useSpring(leafY, { stiffness: 60, damping: 20 });
  const smoothX = useSpring(leafX, { stiffness: 60, damping: 20 });
  const smoothRotate = useSpring(leafRotate, { stiffness: 60, damping: 20 });
  const smoothScale = useSpring(leafScale, { stiffness: 60, damping: 20 });

  // 🌿 Top Right parallax (Inverted direction so it pulls inward)
  const topLeafY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const topLeafX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const smoothTopY = useSpring(topLeafY, { stiffness: 60, damping: 20 });
  const smoothTopX = useSpring(topLeafX, { stiffness: 60, damping: 20 });

  // 🎬 Idle Floating Drift
  const drift = useMotionValue(0);
  useEffect(() => {
    animate(drift, [0, 10, -8, 0], {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut"
    });
  }, [drift]);

  // ── Phase 1: Circle reveal (0% → 20% scroll) ──
  const clipPathValue = useTransform(scrollYProgress, [0, 0.20], [45, 250]);
  const clipPath = useTransform(clipPathValue, (v) => `circle(${v}% at 50% 185%)`);

  // ── Image parallax (0% → 60%) ──
  const imageScale = useTransform(scrollYProgress, [0, 0.60], [1.1, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 0.60], ["0%", "8%"]);

  // ── Phase 2: Pre-Intro Text Opacity ──
  // Fades out both base text and shutters text at the very end
  const preIntroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.85], [0, 1, 1, 0]);

  // ── Phase 3: Shutter clip-path sweep (50% → 70%) ──
  // Ends at -1 to create a 1% seamless overlap that permanently murders grid rendering gaps
  const v1 = useTransform(scrollYProgress, [0.50, 0.66], [100, -1]);
  const v2 = useTransform(scrollYProgress, [0.51, 0.67], [100, -1]);
  const v3 = useTransform(scrollYProgress, [0.52, 0.68], [100, -1]);
  const v4 = useTransform(scrollYProgress, [0.53, 0.69], [100, -1]);
  const v5 = useTransform(scrollYProgress, [0.54, 0.70], [100, -1]);

  const clip1 = useTransform(v1, v => `inset(0% ${v}% 0% 0%)`);
  const clip2 = useTransform(v2, v => `inset(0% ${v}% 0% 0%)`);
  const clip3 = useTransform(v3, v => `inset(0% ${v}% 0% 0%)`);
  const clip4 = useTransform(v4, v => `inset(0% ${v}% 0% 0%)`);
  const clip5 = useTransform(v5, v => `inset(0% ${v}% 0% 0%)`);

  const shutterClips = [clip1, clip2, clip3, clip4, clip5];

  // ── Mobile clip paths (Top to Bottom horizontal rows with -1% bottom bleed)
  const clipH1 = useTransform(v1, v => `inset(0% 0% ${v}% 0%)`);
  const clipH2 = useTransform(v2, v => `inset(0% 0% ${v}% 0%)`);
  const clipH3 = useTransform(v3, v => `inset(0% 0% ${v}% 0%)`);
  const clipH4 = useTransform(v4, v => `inset(0% 0% ${v}% 0%)`);
  const clipH5 = useTransform(v5, v => `inset(0% 0% ${v}% 0%)`);

  const horizontalClips = [clipH1, clipH2, clipH3, clipH4, clipH5];

  // ── Leaf decoration fade in synchronized with shutter sweep (50% → 70%) ──
  const leafOpacity = useTransform(scrollYProgress, [0.49, 0.50, 0.70, 0.71], [0, 0, 1, 1]);

  return (
    <>
      <section ref={containerRef} className="relative -mt-[100vh] z-20">
        
        {/* ── STICKY BACKGROUND LAYER (Mobile-optimized Viewport Handling) ── */}
        <div className="sticky top-0 h-[100svh] lg:h-screen w-full overflow-hidden z-0">
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          >
            {/* Main Background Image with gentle parallax (DESKTOP) */}
            <motion.div 
              className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 hidden sm:block" 
              style={{ scale: imageScale, y: imageY }}
            >
              <Image 
                src="/images/intro/bg.webp" 
                alt="Intro Background" 
                fill 
                sizes="100vw"
                className="object-cover object-center"
                quality={100}
                priority
              />
            </motion.div>

            {/* Main Background Image with gentle parallax (MOBILE 9:16) */}
            <motion.div 
              className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 block sm:hidden" 
              style={{ scale: imageScale, y: imageY }}
            >
              <Image 
                src="/images/intro/bg-mobile.webp" 
                alt="Intro Background Mobile" 
                fill 
                sizes="100vw"
                className="object-cover object-center"
                quality={100}
                priority
              />
            </motion.div>

            {/* 1. Base Light Text Layer (reveals first) */}
            <motion.div 
              style={{ opacity: preIntroOpacity }}
              className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none py-12"
            >
              <TextContent variant="light" />
            </motion.div>

            {/* 2. Sweeping Shutters (DESKTOP: Vertical Columns) */}
            <div className="absolute inset-0 z-[2] w-full h-full hidden md:grid md:grid-cols-5 pointer-events-none">
              {shutterClips.map((clip, index) => (
                <div key={index} className="relative w-full h-full">
                  <motion.div 
                    style={{ clipPath: clip, willChange: "clip-path" }} 
                    className="absolute inset-0 w-full h-full overflow-visible"
                  >
                    {/* Unidirectional 101% width bleed to cover gaps ONLY on the trailing edge */}
                    <div className="absolute top-0 bottom-0 left-0 w-[101%] bg-[#f7f7eb]" />
                    
                    {/* Dark Text perfectly pinned to the viewport via percentage math */}
                    <motion.div 
                      className="absolute top-0 h-full w-[500%] flex items-center justify-center py-12"
                      style={{ left: `-${index * 100}%`, opacity: preIntroOpacity }}
                    >
                      <TextContent variant="dark" />
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* 3. Sweeping Shutters (MOBILE: Horizontal Rows) */}
            <div className="absolute inset-0 z-[2] w-full h-full grid grid-rows-5 md:hidden pointer-events-none">
              {horizontalClips.map((clip, index) => (
                <div key={index} className="relative w-full h-full">
                  <motion.div 
                    style={{ clipPath: clip, willChange: "clip-path" }} 
                    className="absolute inset-0 w-full h-full overflow-visible"
                  >
                    {/* Unidirectional 101% height bleed to cover gaps ONLY on the trailing edge */}
                    <div className="absolute top-0 left-0 right-0 h-[101%] bg-[#f7f7eb]" />

                    {/* Dark Text perfectly pinned to the viewport via height percentage math */}
                    <motion.div 
                      className="absolute left-0 w-full flex items-center justify-center py-12"
                      style={{ top: `-${index * 100}%`, height: "500%", opacity: preIntroOpacity }}
                    >
                      <TextContent variant="dark" />
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* ── Top Right Leaf (Flipped & Inverted Physics) ── */}
          <motion.div
            className={`absolute top-0 right-0 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] z-[999] pointer-events-none drop-shadow-2xl mix-blend-multiply transition-opacity duration-1000 blur-[0.3px] contrast-105 brightness-95 ${
              showLeaf ? "opacity-100" : "opacity-0"
            }`}
             style={{
              y: smoothTopY,
              x: smoothTopX,
              rotate: smoothRotate,
              scale: smoothScale,
              translateY: drift
            }}
          >
            <Image
              src="/images/intro/leaf.png"
              alt="Leaf decoration"
              fill
              className="object-contain object-right-top rotate-180"
              priority
              quality={100}
            />
          </motion.div>

          {/* ── Foreground Leaf (Fast + Cinematic Physics) ── */}
          <motion.div
            className={`absolute bottom-0 left-0 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] z-[999] pointer-events-none drop-shadow-2xl mix-blend-multiply transition-opacity duration-1000 blur-[0.3px] contrast-105 brightness-95 ${
              showLeaf ? "opacity-100" : "opacity-0"
            }`}
            style={{
              y: smoothY,
              x: smoothX,
              rotate: smoothRotate,
              scale: smoothScale,
              translateY: drift
            }}
          >
            <Image
              src="/images/intro/leaf.png"
              alt="Leaf decoration"
              fill
              className="object-contain object-left-bottom"
              priority
              quality={100}
            />
          </motion.div>
        </div>

        {/* ── SCROLL HEIGHT for intro animation phases ── */}
        {/* Lengthened specifically on mobile (300vh) to afford users a smoother thumb-scroll phase speed! */}
        <div className="h-[300vh] md:h-[220vh] relative z-[1] pointer-events-none" />

      </section>

      {/* ── PACKAGES SECTION (separate, normal scroll) ── */}
      <PackagesSection transparentBg={false} />
    </>
  );
}












