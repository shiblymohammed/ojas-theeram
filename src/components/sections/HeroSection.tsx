"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  
  // Parallax & slow zoom for the background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="sticky top-0 h-screen w-full -z-10 bg-[var(--bg-primary)] overflow-hidden">
      
      {/* ── Background Image with Parallax & Slow Zoom ── */}
      <motion.div 
        className="absolute inset-0 w-full h-full transform-gpu"
        style={{ y, scale }}
      >
        <Image
          src="/images/hero/leaves.jpg"
          alt="Ayurvedic Nature Background"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        {/* Soft overlay for readability and premium vibe */}
        <div className="absolute inset-0 bg-[#060a08]/40 backdrop-blur-[2px]" />
        
        {/* Gradient that fades to background color at the bottom to transition smoothly into the scroll reveal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </motion.div>

      {/* ── Floating Leaf Animations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
           animate={{
             y: [0, -30, 0],
             rotate: [0, 10, -5, 0],
             x: [0, 20, 0]
           }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute top-[20%] left-[10%] md:left-[15%] w-24 h-24 md:w-32 md:h-32 opacity-40 mix-blend-screen brightness-150"
        >
          <Image src="/images/other/leaf-1-3.png" alt="Leaf Background Element" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </motion.div>
        
        <motion.div
           animate={{
             y: [0, 40, 0],
             rotate: [0, -15, 10, 0],
             x: [0, -30, 0]
           }}
           transition={{
             duration: 14,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute bottom-[25%] right-[5%] md:right-[15%] w-32 h-32 md:w-48 md:h-48 opacity-30 mix-blend-screen brightness-150"
        >
          <Image src="/images/other/shape-2.png" alt="Shape Background Element" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
        </motion.div>
      </div>

      {/* ── Main Content ── */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-10"
      >
        <div className="text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex flex-col items-center"
          >
            {/* Logo Graphic */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 mb-8 flex flex-col items-center justify-center bg-white/[0.03] backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.1)] relative before:absolute before:inset-2 before:border before:border-white/10 before:rounded-full">
               <span className="text-white font-gallient text-4xl md:text-5xl leading-none pt-1 text-shadow-md">O</span>
            </div>
            
            {/* Main Brand Header */}
            <h1 className="text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-gallient text-white leading-[0.9] tracking-wider drop-shadow-2xl mb-6">
              Ojas Theeram
            </h1>
            
            {/* Tagline */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[var(--brand-sand)]/60"></span>
              <h2 className="text-xl md:text-3xl font-cormorant text-[var(--brand-sand)] italic tracking-[0.15em] drop-shadow-md">
                “Holistic Healing for Mind & Body”
              </h2>
              <span className="w-12 h-[1px] bg-[var(--brand-sand)]/60"></span>
            </div>
          </motion.div>

          {/* Short Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mb-14 max-w-2xl"
          >
            <p className="text-sm md:text-lg font-space font-light text-white/80 tracking-[0.3em] uppercase leading-relaxed drop-shadow-sm">
              Experience authentic Ayurvedic healing <br className="hidden md:block" /> rooted in tradition
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-5 md:gap-8"
          >
            <button className="group relative px-10 py-4 lg:px-12 lg:py-5 bg-[var(--brand-forest)] text-white rounded-full font-space tracking-widest uppercase text-xs lg:text-sm font-medium transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(44,74,59,0.4)] hover:shadow-[0_0_40px_rgba(44,74,59,0.8)]">
              <span className="relative z-10">Book Appointment</span>
              <div className="absolute inset-0 bg-[#3a614d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>
            
            <button className="px-10 py-4 lg:px-12 lg:py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 hover:bg-white/10 hover:border-white/40 rounded-full font-space tracking-widest uppercase text-xs lg:text-sm font-medium transition-all duration-500 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18f05e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1ebd52]"></span>
              </span>
              WhatsApp
            </button>
          </motion.div>

        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs font-space uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-white/80"
          />
        </div>
      </motion.div>

    </div>
  );
}
