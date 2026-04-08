"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clinic } from "@/data/clinic";

export default function HeroSection() {
  return (
    <div className="sticky top-0 h-screen w-full -z-10">
      <section className="relative w-full h-full flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* ── Full-bleed Lush Background ── */}
        <Image
          src="/images/hero/cloud-forest-landscape.jpg"
          alt="Cloud Forest Landscape"
          fill
          className="object-cover scale-105"
          quality={100}
          priority
          sizes="100vw"
        />
      
      {/* ── Dark Overlay for Contrast ── */}
      <div className="absolute inset-0 bg-[#0a1a14]/80" />

      {/* ── Floating Particles/Dust (subtle) ── */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/other/dots-shape.png')] opacity-10 bg-repeat animate-pulse" />

      {/* ── Main Content Grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* ── Left Content: Typography & List ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full pt-10"
        >
          <div className="mb-8">
            <span className="block w-12 h-[1px] bg-[#8B9D83] mb-6" />
            <h1 className="font-gallient text-[40px] sm:text-[50px] lg:text-[70px] text-[#f3eee8] leading-[1.05] uppercase tracking-wide">
              Authentic Kerala <br />
              <span className="text-[#8B9D83]">Ayurvedic</span> <br />
              Healing
            </h1>
          </div>
          
          <ul className="space-y-6 font-barlow text-sm sm:text-base tracking-[0.08em] text-[#f3eee8]/80 max-w-md">
            <li className="flex items-start gap-4 group">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9D83] flex-shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#8B9D83]" />
              <p>Natural herbal ingredients and therapies brought straight from Kerala.</p>
            </li>
            <li className="flex items-start gap-4 group">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9D83] flex-shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#8B9D83]" />
              <p>Personalised Ayurvedic treatment plans for detox and rejuvenation.</p>
            </li>
            <li className="flex items-start gap-4 group">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9D83] flex-shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#8B9D83]" />
              <p>Award-winning holistic spa care for profound mind and body wellness.</p>
            </li>
          </ul>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
            <button className="bg-[#8B9D83]/20 hover:bg-[#8B9D83] text-[#f3eee8] border border-[#8B9D83]/50 hover:border-[#8B9D83] px-8 py-3 rounded-full font-barlow uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-[0_0_15px_rgba(139,157,131,0.15)] hover:shadow-[0_0_25px_rgba(139,157,131,0.4)]">
              Discover Our Retreat
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right Content: Glassmorphism Framed Display ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full max-w-lg lg:max-w-none"
        >
          {/* Outer Glass Frame */}
          <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square w-full p-2 lg:p-4 rounded-xl bg-black/20 backdrop-blur-md border border-white/[0.12] shadow-2xl shadow-black/50 group">
            
            {/* Corner Accents (subtle design details) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#8B9D83] rounded-tl-xl opacity-50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#8B9D83] rounded-tr-xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#8B9D83] rounded-bl-xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#8B9D83] rounded-br-xl opacity-50" />

            {/* Inner Image Container */}
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10">
              <Image
                src="/images/packages/rejuvenation.png"
                alt="Ayurvedic Spa Treatment"
                fill
                className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Inner Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14]/90 via-transparent to-transparent" />
              
              {/* Logo / Text overlay at bottom of the frame */}
              <div className="absolute bottom-6 inset-x-0 w-full text-center">
                <p className="font-barlow text-[#8B9D83] text-[10px] uppercase tracking-[0.3em] mb-2">
                  Est. Tradition
                </p>
                <h3 className="font-gallient text-2xl text-[#f3eee8] uppercase tracking-widest drop-shadow-lg">
                  Ojas Theeram
                </h3>
              </div>
            </div>
            
            {/* Glowing orb effect behind the frame */}
            <div className="absolute -inset-10 bg-[#8B9D83] opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-1000 -z-10" />
          </div>
        </motion.div>
      </div>
      </section>
    </div>
  );
}
