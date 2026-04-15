"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const STEPS = [
  { id: 1, img: "/images/howItWorks/step1.png", title: "Consultation", desc: "Discover your dosha and unique imbalances." },
  { id: 2, img: "/images/howItWorks/step2.png", title: "Diagnosis", desc: "A personalized ancient assessment." },
  { id: 3, img: "/images/howItWorks/step3.png", title: "Treatment", desc: "Traditional therapies to restore harmony." },
  { id: 4, img: "/images/howItWorks/step4.png", title: "Recovery", desc: "Rest and rejuvenate in natural serenity." },
  { id: 5, img: "/images/howItWorks/step5.png", title: "Balance", desc: "Achieve lasting vitality and peace." },
];

export default function HowItWorksSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeFloat = useTransform(smoothProgress, [0, 1], [0, STEPS.length - 1]);

  return (
    <section ref={targetRef} id="how-it-works" className="relative h-[500vh] bg-gradient-to-br from-[#1c130b] via-[#0d0905] to-[#050302] font-sans">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* FILMSTRIP LAYER (BEHIND EVERYTHING) */}
        <FilmStripTrack activeFloat={activeFloat} isMobile={isMobile} />

        {/* ORYZO-STYLE LEFT TYPOGRAPHY */}
        <div className="absolute top-[20%] md:top-1/2 md:-translate-y-1/2 left-[5vw] md:left-[8vw] z-30 pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          <h2 className="text-[#8c7f70] text-xl md:text-2xl font-bold tracking-[0.2em] uppercase leading-none font-sans mb-2 md:mb-3 opacity-90">
            The Journey,
          </h2>
          <h3 className="text-[#f2ebe1] text-[2.5rem] md:text-[4.5rem] font-extrabold tracking-tight leading-none font-sans">
            to Healing
          </h3>
        </div>

        {/* CENTER FIXED FRAME */}
        <div 
          className="relative border-[1.5px] border-dotted border-[#8c7f70]/40 z-20 transition-all duration-300 p-2 md:p-3 bg-[#0d0905]/40 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          style={{
            width: isMobile ? "88vw" : "32vw",
            height: isMobile ? "65vh" : "80vh",
            marginTop: isMobile ? "10vh" : "0", 
          }}
        >
          {/* THE MASK CONTAINER (overflow-hidden locks the image slice inside perfectly) */}
          <div className="relative w-full h-full bg-[#050505] overflow-hidden shadow-2xl">
            {STEPS.map((step, index) => (
              <Slide key={step.id} step={step} index={index} activeFloat={activeFloat} />
            ))}
          </div>
        </div>

        {/* SCROLL HINT */}
        <div className="absolute bottom-[4vh] md:bottom-[5vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 md:gap-3 opacity-80">
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#8c7f70] to-transparent" />
          <span className="text-[9px] md:text-[10px] text-[#8c7f70] tracking-[0.2em] uppercase font-bold">
            Scroll to continue
          </span>
        </div>

      </div>
    </section>
  );
}

function FilmStripTrack({ activeFloat, isMobile }: { activeFloat: MotionValue<number>, isMobile: boolean }) {
  // Translate the entire track horizontally to keep the active index centered
  const trackX = useTransform(activeFloat, (v) => {
    const spacing = isMobile ? 45 : 22; // vw (thumbnail width + gap)
    const centerIndex = (STEPS.length - 1) / 2;
    return `calc(${(centerIndex - v) * spacing}vw)`;
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div 
        style={{ x: trackX }} 
        className="flex items-center gap-[5vw] md:gap-[6vw] transition-transform duration-75"
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
                className="w-full h-full object-cover opacity-60 grayscale-[15%]" 
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
  const x = useTransform(activeFloat, (v) => `${(index - v) * 100}%`);
  const diff = useTransform(activeFloat, (v) => index - v);
  
  // Opacity & entry effects for the content card
  const bannerOpacity = useTransform(diff, [-0.3, 0, 0.3], [0, 1, 0]);
  const textY = useTransform(diff, [-0.5, 0, 0.5], [20, 0, 20]);

  return (
    <motion.div
      style={{ x }}
      className="absolute inset-0 w-full h-full flex flex-col justify-end pointer-events-auto"
    >
      <motion.img
        src={step.img}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-contain"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

      {/* Floating Section Title inside the frame */}
      <motion.div className="absolute top-8 md:top-10 left-0 right-0 text-center pointer-events-none z-30">
         <span className="text-white/30 font-gallient text-2xl md:text-3xl tracking-widest uppercase mix-blend-overlay">
            {step.title}
         </span>
      </motion.div>

      {/* CLEAN BRANDED CARD REPLACING THE WARNING BANNER */}
      <motion.div 
        style={{ opacity: bannerOpacity, y: textY }} 
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] bg-[#0d0905]/80 backdrop-blur-md border border-[#8c7f70]/30 flex flex-row items-center justify-between p-4 md:p-5 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
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
        
        {/* Minimal CTA Arrow */}
        <div className="shrink-0 flex items-center justify-center bg-[#8c7f70] hover:bg-[#a69888] transition-colors rounded-full w-9 h-9 md:w-11 md:h-11 cursor-pointer group pointer-events-auto">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0d0905] translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}