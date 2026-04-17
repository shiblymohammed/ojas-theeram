"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { therapies, panchakarma } from "@/data/treatments";

// Combine a few featured treatments for the preview
const featuredTreatments = [
  { ...panchakarma[0], type: "Panchakarma Detox", image: "/images/packages/package-a.png", desc: "Therapeutic emesis for respiratory and upper gastrointestinal reset." },
  { ...therapies[0], type: "Signature Therapy", image: "/images/packages/package-b.png", desc: "Rhythmic full-body massage using warm medicated oils." },
  { ...therapies[5], type: "Stress & Mind", image: "/images/packages/package-c.png", desc: "Continuous pouring of warm herbal oil over the forehead." },
  { ...therapies[6], type: "Beauty & Skin", image: "/images/packages/package-d.png", desc: "Rejuvenating facial using Navara rice and herbal milk decoctions." },
  { ...therapies[1], type: "Weight Management", image: "/images/packages/package-e.png", desc: "Invigorating dry herbal powder massage to reduce subcutaneous fat." }
];

export default function TreatmentsPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track the entry of this completely independent section to construct the literal screen-split effect!
  // At 'start end', the container is theoretically at the bottom of the viewport
  // At 'start start', the container wraps cleanly onto the viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // SPLIT MATH LOGIC:
  // The left side naturally enters moving up from the bottom because the native container is scrolling up.
  // To make the right side enter from the top perfectly, we counter-offset its physical 
  // presence massively (y:-200vh), so it begins strictly above the user's monitor bezel, 
  // and forces it down to y:0 in synchronous harmony with the downward scroll.
  const rightY = useTransform(entryProgress, [0, 1], ["-200vh", "0vh"]);
  
  // Optional slight drop-shadow overlay transition as they slam shut together
  const curtainShadow = useTransform(entryProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="treatments" 
      // Negative top margin physically overlaps the last 100vh of the Conditions section beneath us!
      className="relative h-[250vh] mt-[-100vh] z-10 bg-transparent text-[var(--text-primary)]"
    >
      {/* Sticky Container for Split Layout - No overflow hiding enables the right side to spawn from space out of bounds! */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-visible">
        
        {/* Left Side: Enters from BOTTOM inherently (Image Layout) */}
        <motion.div 
           className="relative w-full md:w-1/2 h-[40vh] md:h-full bg-[var(--brand-forest)] overflow-hidden flex items-center justify-center pointer-events-auto z-20 shadow-2xl"
        >
          {/* Subtle text watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10">
            <h2 className="text-[20vw] md:text-[15vw] font-gallient text-white -rotate-90 md:rotate-0 tracking-widest whitespace-nowrap">
              HEAL
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={featuredTreatments[activeIdx].image}
                alt={featuredTreatments[activeIdx].name}
                fill
                className="object-cover"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a08]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Image Caption overlay */}
          <div className="absolute bottom-10 left-10 text-white z-10 hidden md:block pointer-events-none">
            <motion.p 
              key={`type-${activeIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-space text-xs tracking-[0.3em] uppercase text-white/70 mb-2"
            >
              {featuredTreatments[activeIdx].type}
            </motion.p>
            <motion.h3
              key={`name-${activeIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-gallient text-4xl"
            >
              {featuredTreatments[activeIdx].name}
            </motion.h3>
          </div>
        </motion.div>

        {/* Right Side: Enters from TOP using extreme negative parallax (Interactive List) */}
        <motion.div 
           style={{ y: rightY, opacity: curtainShadow }}
           className="w-full md:w-1/2 h-[60vh] md:h-full bg-[#f3eee8] flex items-center px-6 md:px-16 lg:px-24 z-30 shadow-2xl drop-shadow-[0_45px_65px_rgba(0,0,0,0.5)]"
        >
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
            
            <div className="mb-12">
              <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-xs uppercase mb-4">
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]"></span>
                Curated Therapies
              </span>
              <h2 className="text-4xl md:text-5xl font-gallient text-[var(--brand-forest)]">
                Ancient Wisdom <br/> Modern Wellness
              </h2>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {featuredTreatments.map((treatment, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div 
                    key={treatment.name}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className="relative group cursor-pointer"
                  >
                    <div className={`flex items-baseline justify-between transition-colors duration-500 ${isActive ? 'text-[var(--brand-forest)]' : 'text-[var(--text-alpha)] group-hover:text-[var(--text-secondary)]'}`}>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-gallient transition-transform duration-500 origin-left">
                        {treatment.name}
                      </h3>
                      {treatment.price && (
                        <span className="font-space text-sm tracking-widest hidden sm:block">
                          ₹{treatment.price}
                        </span>
                      )}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-md">
                        {treatment.desc}
                      </p>
                      <button className="mt-4 text-[10px] font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] border-b border-[var(--brand-forest)] pb-1 hover:text-[var(--brand-sand)] hover:border-[var(--brand-sand)] transition-colors">
                        Discover More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
