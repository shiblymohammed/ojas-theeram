"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  
  // Main text reveal variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
       opacity: 1, 
       y: 0,
       transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as any } 
    }
  };

  return (
    <div ref={ref} className="sticky top-0 h-screen w-full -z-10 bg-[var(--bg-primary)] overflow-hidden">
      
      {/* ── Background Video with Static Focus ── */}
      <div className="absolute inset-0 w-full h-full transform-gpu origin-top">
        <video
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover object-center w-full h-full"
        />
        {/* Reinforced vignette: Top-heavy linear gradient + Radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* ── Asymmetrical Lower-Third Content ── */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-16 lg:px-24">
        
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          {/* Left Column: Brand Typography */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
            }}
            className="flex flex-col items-start"
          >
            <motion.div variants={textRevealVariants} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[var(--brand-sand)]"></span>
              <span className="font-space font-semibold text-[var(--brand-sand)] text-xs md:text-sm tracking-[0.4em] uppercase shadow-black/50 drop-shadow-md">
                Ayurvedic Sanctuary
              </span>
            </motion.div>
            
            <motion.h1 
              variants={textRevealVariants}
              className="text-6xl sm:text-7xl md:text-[90px] lg:text-[140px] font-gallient text-white leading-[0.85] tracking-wide drop-shadow-2xl mb-8"
            >
              Ojas<br />Theeram
            </motion.h1>

            <motion.h2 
               variants={textRevealVariants}
               className="text-xl md:text-2xl font-cormorant text-white/90 italic tracking-[0.1em] drop-shadow-lg max-w-lg leading-relaxed"
            >
              Experience the purest form of Ayurveda, where ancient wisdom meets modern luxury.
            </motion.h2>
          </motion.div>

          {/* Right Column: Actions & scroll indicator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            className="flex flex-col lg:items-end gap-10"
          >
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
              <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-[var(--brand-sand)] text-[var(--bg-primary)] rounded-full font-space tracking-widest uppercase text-[10px] md:text-xs font-bold transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(212,200,175,0.4)]">
                <span className="relative z-10 w-full text-center">Begin Journey</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>
              
              <button className="px-8 py-4 lg:px-10 lg:py-5 bg-black/20 backdrop-blur-md text-white border border-white/30 hover:bg-black/40 hover:border-white/60 rounded-full font-space tracking-widest uppercase text-[10px] md:text-xs font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
                </span>
                Consult Vaidya
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
