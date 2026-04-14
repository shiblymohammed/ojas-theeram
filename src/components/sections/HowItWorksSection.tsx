"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const STEPS = [
  { id: 1, img: "/images/howItWorks/step1.png", title: "Consultation" },
  { id: 2, img: "/images/howItWorks/step2.png", title: "Diagnosis" },
  { id: 3, img: "/images/howItWorks/step3.png", title: "Treatment" },
  { id: 4, img: "/images/howItWorks/step4.png", title: "Recovery" },
  { id: 5, img: "/images/howItWorks/step5.png", title: "Balance" },
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
    <section ref={targetRef} id="how-it-works" className="relative h-[400vh] bg-gradient-to-br from-[#1c130b] via-[#0d0905] to-black font-sans">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ORYZO-STYLE LEFT TYPOGRAPHY */}
        <div className="absolute top-[35%] left-[5vw] md:left-[8vw] z-30 pointer-events-none">
          <h2 className="text-[#8c7f70] text-xl md:text-3xl font-bold tracking-tight uppercase leading-none font-sans mb-1">
            SO NATURAL,
          </h2>
          <h3 className="text-[#f2ebe1] text-4xl md:text-[3.5rem] font-extrabold tracking-tight leading-none font-sans">
            it's holistic
          </h3>
        </div>

        {/* ORYZO-STYLE FIXED CENTER DOTTED FRAME WITH SLIDING MASK INSIDE */}
        {/* User requested: exactly slides INTO the frame, no small-to-big effect at all! */}
        <div 
          className="relative border-[1.5px] border-dashed border-[#8c7f70]/40 z-10 transition-all duration-300 p-2 md:p-3"
          style={{
            width: isMobile ? "83vw" : "37vw",
            height: isMobile ? "68vh" : "83vh",
          }}
        >
          {/* THE MASK CONTAINER (overflow-hidden locks the image slice inside perfectly) */}
          <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden group shadow-2xl">
            {STEPS.map((step, index) => (
              <Slide key={step.id} step={step} index={index} activeFloat={activeFloat} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Slide({ step, index, activeFloat }: { step: any, index: number, activeFloat: MotionValue<number> }) {
  // `x` moves linearly according to the distance from activeFloat. 
  // This constructs a mathematically flawless continuous train of identically sized frames that slide within the master mask.
  const x = useTransform(activeFloat, (v) => `${(index - v) * 100}%`);
  
  const diff = useTransform(activeFloat, (v) => index - v);

  // Subtle interior scale parallax effect mimicking high-end scrolling depth
  // When active (diff=0), scale is 1. When out of frame (-1 or 1), it's 1.2
  // We use clamping in the array so it stays at 1.2 beyond 1
  const imageScale = useTransform(diff, [-1, 0, 1], [1.2, 1, 1.2]);

  // The warning banner ONLY drops its opacity precisely when the card is active
  const bannerOpacity = useTransform(diff, [-0.2, 0, 0.2], [0, 1, 0]);

  return (
    <motion.div
      style={{ x }}
      className="absolute inset-0 w-full h-full flex flex-col justify-end pointer-events-auto"
    >
      <motion.img
        style={{ scale: imageScale }}
        src={step.img}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.10]"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Floating Section Title inside the frame */}
      <motion.div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-30">
         <span className="text-white/60 font-gallient text-2xl md:text-4xl tracking-widest uppercase">
            {step.title}
         </span>
      </motion.div>

      {/* WARNING BANNER MIOMICING ORYZO */}
      <motion.div 
        style={{ opacity: bannerOpacity }} 
        className="relative mb-6 md:mb-8 mx-auto w-[90%] bg-[#080808]/80 border border-[#8c7f70]/30 flex items-center p-3 md:p-5 z-30"
      >
        <div className="border border-white/40 px-2 py-1 md:px-4 flex items-center gap-2 mr-3 md:mr-6 shrink-0">
          <span className="text-white text-sm md:text-base">⚠️</span>
          <span className="font-bold text-white tracking-widest text-[9px] md:text-sm">WARNING</span>
        </div>
        <p className="text-white/90 text-[7px] md:text-[10px] uppercase font-bold leading-tight tracking-[0.10em] md:tracking-[0.15em]">
          THIS STUNT WAS PERFORMED BY PROFESSIONALS.<br/>DO NOT ATTEMPT THIS AT HOME.
        </p>
      </motion.div>
    </motion.div>
  );
}