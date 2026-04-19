"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';
const WaterWave = dynamic(() => import('react-water-wave'), { ssr: false, loading: () => <div className="w-full h-full bg-[#050806]" /> });
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValue } from "framer-motion";
import { conditions } from "@/data/treatments";

const STEPS = [
  { id: 1, img: "/images/howItWorks/step1.png", title: "Consultation", desc: "Discover your dosha and unique imbalances." },
  { id: 2, img: "/images/howItWorks/step2.png", title: "Diagnosis", desc: "A personalized ancient assessment." },
  { id: 3, img: "/images/howItWorks/step3.png", title: "Treatment", desc: "Traditional therapies to restore harmony." },
  { id: 4, img: "/images/howItWorks/step4.png", title: "Recovery", desc: "Rest and rejuvenate in natural serenity." },
  { id: 5, img: "/images/howItWorks/step5.png", title: "Balance", desc: "Achieve lasting vitality and peace." },
];

export default function ConditionsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);
  const [isWaterWaveEnabled, setIsWaterWaveEnabled] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Optimized Mouse Parallax without triggering React Re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  
  const womanX = useTransform(smoothMouseX, [-0.5, 0.5], [-60, 60]);
  const womanY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only enable water wave on desktop and when performance is good
      setIsWaterWaveEnabled(!mobile && window.innerWidth >= 1024);
    };
    
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    }
  }, [isMobile, mouseX, mouseY]);

  // Scroll tracking across the HUGE 700vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Strict Mobile Scroll Parallax hooks to compensate for the disabled mouse tracking
  const rawScrollBgY = useTransform(scrollYProgress, [0, 0.45], [0, 80]);
  const rawScrollWomanY = useTransform(scrollYProgress, [0, 0.45], [0, 200]);
  const rawScrollTextY = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  // WRAPPED IN SPRING FOR ZERO MOBILE SCROLL LAG:
  const scrollBgY = useSpring(rawScrollBgY, { stiffness: 80, damping: 20, mass: 0.5 });
  const scrollWomanY = useSpring(rawScrollWomanY, { stiffness: 80, damping: 20, mass: 0.5 });
  const scrollTextY = useSpring(rawScrollTextY, { stiffness: 80, damping: 20, mass: 0.5 });

  // Track the entry so it stays fixed behind Packages
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const entryY = useTransform(entryProgress, [0, 1], ["-100vh", "0vh"]);

  // Transitions: 
  // 0 to 0.25: Conditions Woman showing cleanly.
  // 0.25 to 0.45: SLOW Fade/Blur transition into How It Works.
  // 0.45 to 0.55: Stability - User sees "Path to Wellness" header.
  // 0.55 to 0.88: Slider interactive phases.
  // 0.88 to 1.0: Dead-scrolling overlapping space for next section.
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [1, 1, 0, 0]);
  // Mobile CTA fades out faster — fully gone right as the carousel begins to appear
  const mobileCTAOpacity = useTransform(scrollYProgress, [0, 0.20, 0.38], [1, 1, 0]);
  const womanGhostOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [1, 1, 0.4, 0.4]);
  
  // Massive cinematic blur transition for the backgrounds (DESKTOP ONLY)
  const blurFilter = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], ["blur(0px)", "blur(0px)", "blur(40px)", "blur(40px)"]);
  // Hardware-accelerated dark wash fade for mobile (REPLACES BLUR GPU COST)
  const mobileDarkWashOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [0.1, 0.1, 0.95, 0.95]);
  const scaleEffect = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [1, 1, 1.15, 1.15]);
  
  const howItWorksOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [0, 0, 1, 1]);
  // Prevent any interaction block when opacity is 0
  const howItWorksPointer = useTransform(howItWorksOpacity, (val) => val > 0.5 ? "auto" : "none");

  // PLATEAU MAPPING: Explicitly anchor slide 0 at progress=0.45 (exact moment carousel opacity=1.0)
  // This prevents spring drift from letting slide 1 transition before the carousel is fully visible.
  const rawActiveFloat = useTransform(
    scrollYProgress,
    [  0, 0.45, 0.58, 0.63, 0.67, 0.71, 0.75, 0.79, 0.82, 1.0],
    [  0,    0,    0,    1,    1,    2,    2,    3,    4,   4]
  );
  
  // HIGH PERFORMANCE SPRING: Insanely responsive and tight to eliminate perceived "drag lag"
  const activeFloat = useSpring(rawActiveFloat, { stiffness: 300, damping: 35, mass: 0.8, restDelta: 0.001 });

  return (
    <section
      id="conditions"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[900vh] bg-[#050806] font-sans z-0"
    >
      <motion.div 
        className="sticky top-0 w-full h-screen overflow-hidden p-0 m-0 will-change-transform"
        style={{ y: entryY }}
      >
        {/* === 1. UNIFIED BACKGROUND === */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center transform-gpu will-change-transform"
          style={{ x: isMobile ? 0 : bgX, y: isMobile ? scrollBgY : bgY, scale: scaleEffect, filter: isMobile ? 'none' : blurFilter }}
        >
          {isMobile ? (
            <div className="absolute inset-0 w-full h-full bg-[#050806]">
              <img 
                src="/images/BACKGROUND/bgWOMAN.png" 
                alt="Background" 
                className="w-full h-full object-cover transform-gpu opacity-90"
                loading="lazy"
              />
              <motion.div style={{ opacity: mobileDarkWashOpacity }} className="absolute inset-0 w-full h-full pointer-events-none bg-black transform-gpu will-change-transform" />
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          ) : isWaterWaveEnabled ? (
            <WaterWave
              imageUrl="/images/BACKGROUND/bgWOMAN.png"
              dropRadius={10}
              perturbance={0.01}
              resolution={256}
              className="w-full h-full object-cover"
            >
              {() => (
                <>
                  <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/40" />
                  <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </>
              )}
            </WaterWave>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#050806]">
              <img 
                src="/images/BACKGROUND/bgWOMAN.png" 
                alt="Background" 
                className="w-full h-full object-cover transform-gpu opacity-90"
              />
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/40" />
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          )}
        </motion.div>

        {/* === 2. CONDITIONS WOMAN & TEXT === */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
        >
        {/* Main Woman Subject */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
          style={{ 
            x: isMobile ? 0 : womanX, 
            y: isMobile ? scrollWomanY : womanY, 
            scale: 1.05, 
            opacity: womanGhostOpacity, 
            filter: isMobile ? 'none' : blurFilter 
          }}
        >
          <img
            src="/images/BACKGROUND/WOMAN_ONLY.png"
            alt="Subject"
            className="h-[80vh] md:h-[110vh] w-auto max-w-none object-contain object-bottom md:object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu mt-[15vh] md:mt-0 ml-[18vw] md:ml-[12vw]"
          />
        </motion.div>

          {/* ── EDITORIAL CTA HERO BLOCK (Replaces Conditions List universally across devices) ── */}
          <motion.div
            className="absolute top-[22%] md:top-[30%] right-6 md:right-[12vw] z-30 flex flex-col items-start gap-5 max-w-[220px] md:max-w-lg pointer-events-auto transform-gpu will-change-transform"
            style={{ 
              x: isMobile ? 0 : textX, 
              y: isMobile ? scrollTextY : textY, 
              opacity: isMobile ? mobileCTAOpacity : textOpacity, 
              filter: isMobile ? 'none' : blurFilter 
            }}
          >
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-6 md:w-16 h-[1px] bg-[var(--brand-sand)]/70 md:bg-[var(--brand-sand)]" />
              <span className="text-[var(--brand-sand)] font-space text-[8px] md:text-[11px] tracking-[0.35em] md:tracking-[0.5em] uppercase">
                Ancient Science
              </span>
            </div>
            <h3 className="text-[#f2ebe1] font-gallient text-5xl md:text-[85px] lg:text-[110px] leading-[0.9] md:leading-[0.85] tracking-wide drop-shadow-xl md:drop-shadow-2xl">
              Heal From <br/><span className="italic text-[var(--brand-sand)]">Within</span>
            </h3>
            <p className="text-white/55 md:text-white/70 font-sans text-[11px] md:text-[13px] leading-relaxed tracking-wide md:max-w-sm md:pl-2">
              Personalised Ayurvedic therapies guided by decades of classical wisdom to restore natural balance.
            </p>
            <div className="w-full md:w-auto md:mt-4 md:pl-2">
              <a 
                href="https://wa.me/919353166850?text=Hi%2C%20I%20would%20like%20to%20consult%20regarding%20an%20Ayurvedic%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto text-center inline-block py-4 px-8 md:px-12 border border-white/30 md:border-white/20 text-white text-[10px] md:text-[11px] font-space tracking-[0.35em] md:tracking-[0.4em] uppercase rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-[var(--brand-sand)] hover:text-[var(--brand-sand)] transition-all duration-500 shadow-xl"
              >
                Consult Now
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* === 3. HOW IT WORKS CONTENT === */}
        <motion.div 
          className="absolute inset-0 z-20 font-sans will-change-transform"
          style={{ opacity: howItWorksOpacity, pointerEvents: howItWorksPointer as any }}
        >
           {/* Darken overlay */}
           <div className="absolute inset-0 bg-black/60 md:bg-black/50 pointer-events-none" />

           {/* FILMSTRIP LAYER — Desktop only, skip on mobile to save GPU */}
           {!isMobile && <FilmStripTrack activeFloat={activeFloat} isMobile={false} />}

           {/* ═══════════════════════════════════════════
               DESKTOP: Scroll-driven cinematic layout
           ═══════════════════════════════════════════ */}
           <div className="hidden md:flex absolute inset-0 items-center justify-center">

             {/* Left Typography */}
             <div className="absolute top-1/2 -translate-y-1/2 left-[8vw] lg:left-[10vw] z-30 pointer-events-none flex flex-col items-start text-left">
               <div className="flex items-center gap-4 mb-6">
                 <span className="w-12 h-[1px] bg-[var(--brand-sand)]"></span>
                 <h2 className="text-[var(--brand-sand)] text-sm font-space tracking-[0.4em] uppercase leading-none drop-shadow-md">Step by Step</h2>
               </div>
               <h3 className="text-white text-7xl lg:text-[90px] font-gallient leading-[0.9] drop-shadow-xl tracking-wide">
                 Path to <br/> Wellness
               </h3>
               <p className="mt-8 font-sans font-light text-white/50 max-w-xs text-sm leading-relaxed tracking-wide drop-shadow-sm">
                 Experience the transformative phases of classic Ayurvedic therapy, guiding your body and mind back to their natural state of equilibrium.
               </p>
             </div>

             {/* Scroll-driven Slide Frame */}
             <div
               className="relative border-[1.5px] border-dotted border-[#8c7f70]/40 z-20 p-3 bg-[#0d0905]/40 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] ml-[5vw]"
               style={{ width: "32vw", height: "80vh" }}
             >
               <div className="relative w-full h-full bg-[#050505] overflow-hidden shadow-2xl">
                 {STEPS.map((step, index) => (
                   <Slide key={step.id} step={step} index={index} activeFloat={activeFloat} />
                 ))}
               </div>
             </div>
           </div>

           {/* ═══════════════════════════════════════════
               MOBILE: Native touch swipe carousel
           ═══════════════════════════════════════════ */}
           <div
             className="md:hidden absolute inset-0 flex flex-col"
             onTouchStart={(e) => {
               touchStartX.current = e.touches[0].clientX;
               touchStartY.current = e.touches[0].clientY;
             }}
             onTouchEnd={(e) => {
               const dx = touchStartX.current - e.changedTouches[0].clientX;
               const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
               // Only register horizontal swipe (not scroll)
               if (Math.abs(dx) > 40 && dy < 60) {
                 if (dx > 0) setMobileStep(s => Math.min(s + 1, STEPS.length - 1));
                 else setMobileStep(s => Math.max(s - 1, 0));
               }
             }}
           >
             {/* Step Header */}
             <div className="relative z-30 flex flex-col items-center text-center pt-[8vh] pb-4 pointer-events-none">
               <span className="text-[var(--brand-sand)] font-space text-[8px] tracking-[0.4em] uppercase mb-2">Step by Step</span>
               <h3 className="text-white text-5xl font-gallient leading-tight drop-shadow-xl tracking-wide">
                 Path to<br/><span className="italic text-[var(--brand-sand)]">Wellness</span>
               </h3>
             </div>

             {/* Full-bleed Image Frame */}
             <div className="relative flex-1 mx-5 mb-4 overflow-hidden rounded-sm border border-[#8c7f70]/30">
               {STEPS.map((step, idx) => (
                 <motion.div
                   key={step.id}
                   className="absolute inset-0 will-change-transform transform-gpu"
                   animate={{ x: `${(idx - mobileStep) * 100}%`, opacity: idx === mobileStep ? 1 : 0.3 }}
                   transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
                 >
                   <img
                     src={step.img}
                     alt={step.title}
                     className="absolute inset-0 w-full h-full object-cover object-center transform-gpu"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                   
                   {/* Slide info banner */}
                   <div className="absolute bottom-4 left-4 right-4 z-20">
                     <span className="text-[#8c7f70] font-space font-bold tracking-[0.2em] text-[8px] uppercase block mb-1">Phase 0{idx + 1}</span>
                     <h4 className="text-[#f2ebe1] text-2xl font-gallient tracking-wider leading-none mb-2">{step.title}</h4>
                     <p className="text-white/60 text-[9px] uppercase tracking-[0.15em] leading-relaxed">{step.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>

             {/* Dot Indicators + Swipe Hint */}
             <div className="relative z-30 flex flex-col items-center gap-3 pb-[5vh] pointer-events-none">
               <div className="flex items-center gap-2">
                 {STEPS.map((_, idx) => (
                   <div
                     key={idx}
                     className={`rounded-full transition-all duration-400 ${
                       idx === mobileStep
                         ? 'w-6 h-1.5 bg-[var(--brand-sand)]'
                         : 'w-1.5 h-1.5 bg-white/30'
                     }`}
                   />
                 ))}
               </div>
               <span className="text-[#8c7f70] text-[7px] tracking-[0.25em] uppercase font-bold">
                 {mobileStep < STEPS.length - 1 ? 'Swipe to continue' : 'Scroll down'}
               </span>
             </div>
           </div>

           {/* Desktop scroll hint */}
           <div className="hidden md:flex absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-3 opacity-80">
             <div className="w-[1px] h-12 bg-gradient-to-b from-[#8c7f70] to-transparent" />
             <span className="text-[10px] text-[#8c7f70] tracking-[0.2em] uppercase font-bold">Scroll to continue</span>
           </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

// ==========================================
// Sub-components duplicated from HowItWorks
// ==========================================

function FilmStripTrack({ activeFloat, isMobile }: { activeFloat: MotionValue<number>, isMobile: boolean }) {
  const trackX = useTransform(activeFloat, (v) => {
    const spacing = isMobile ? 45 : 22; 
    const centerIndex = (STEPS.length - 1) / 2;
    return `calc(${(centerIndex - v) * spacing}vw)`;
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div 
        style={{ x: trackX }} 
        className="flex items-center gap-[5vw] md:gap-[6vw] will-change-transform"
      >
        {STEPS.map((step) => {
          return (
            <div 
              key={step.id}
              className="relative overflow-hidden shadow-2xl border border-white/5"
              style={{
                width: isMobile ? "40vw" : "16vw",
                height: isMobile ? "35vh" : "45vh",
              }}
            >
              <img 
                src={step.img} 
                alt={step.title} 
                className="w-full h-full object-cover opacity-100 grayscale-[5%]" 
              />
              <div className="absolute inset-0 bg-[#0d0905]/40" />
            </div>
          )
        })}
      </motion.div>
    </div>
  );
}

function Slide({ step, index, activeFloat }: { step: any, index: number, activeFloat: MotionValue<number> }) {
  // Main container sliding logic 
  const x = useTransform(activeFloat, (v) => `${(index - v) * 100}%`);
  const diff = useTransform(activeFloat, (v) => index - v);
  
  // Banner entrance text physics (Widened bounds drastically to prevent fast-scroll blinking)
  const bannerOpacity = useTransform(diff, [-0.7, 0, 0.7], [0, 1, 0]);
  const textY = useTransform(diff, [-0.8, 0, 0.8], [30, 0, 30]);

  return (
    <motion.div
      style={{ x }}
      className="absolute inset-0 w-full h-full flex flex-col justify-end pointer-events-auto overflow-hidden will-change-transform"
    >
      {/* HARDWARE ACCELERATED IMAGE (Removed heavy inner parallax to secure 60fps) */}
      <img
        src={step.img}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

      <motion.div className="absolute top-8 md:top-10 left-0 right-0 text-center pointer-events-none z-30">
         <span className="text-white/40 font-gallient text-2xl md:text-3xl tracking-widest uppercase mix-blend-overlay">
            {step.title}
         </span>
      </motion.div>

      <motion.div 
        style={{ opacity: bannerOpacity, y: textY }} 
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] bg-[#0d0905]/80 backdrop-blur-md border border-[#8c7f70]/30 flex flex-row items-center justify-between p-4 md:p-5 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.6)]"
      >
        <div className="flex flex-col gap-1 md:gap-[6px]">
          <span className="text-[#8c7f70] font-bold tracking-[0.2em] text-[8px] md:text-[9px] uppercase">
            Phase 0{index + 1}
          </span>
          <h4 className="text-[#f2ebe1] text-lg md:text-2xl font-gallient tracking-wider">
            {step.title}
          </h4>
          <p className="text-white/60 text-[9px] md:text-[10px] sm:w-[90%] uppercase tracking-[0.15em] leading-relaxed mt-1">
            {step.desc}
          </p>
        </div>
        
        <div className="shrink-0 flex items-center justify-center bg-[#8c7f70] hover:bg-[#a69888] transition-colors rounded-full w-9 h-9 md:w-11 md:h-11 cursor-pointer group pointer-events-auto">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0d0905] translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}


