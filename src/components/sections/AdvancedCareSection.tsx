"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const advancedTreatments = [
  { id: 1, name: "Chronic Neurological Disorders", subtitle: "Stroke Rehab & Paralysis" },
  { id: 2, name: "Severe Orthopedic Conditions", subtitle: "Rheumatoid & Osteoarthritis" },
  { id: 3, name: "Autoimmune Management", subtitle: "Psoriasis & Systemic Lupus" },
  { id: 4, name: "Post-Surgical Rehabilitation", subtitle: "Deep Tissue & Joint Memory" }
];

export default function AdvancedCareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tracks the internal scrolling while pinned in place (The 150vh locked phase)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Tracks the entry overlap over the Doctor section (The 100vh negative margin phase)
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });


  // Ongoing internal gentle parallax 
  // STAGGERED PARALLAX FIX: We use a heavy, soft spring so the image movement "lags" and floats 
  // behind the user's scroll, creating a highly elegant inertia/staggered effect.
  const rawParallax = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const smoothParallax = useSpring(rawParallax, { stiffness: 40, damping: 25, mass: 1.5 });
  const bgY = useTransform(smoothParallax, (val) => `${val}%`);

  return (
    <section 
      ref={containerRef}
      id="advanced-care" 
      // Overlap the last 100vh of the Doctor Section!
      className="relative h-[250vh] mt-[-100vh] z-30 bg-transparent text-[var(--text-primary)]"
    >
      {/* Sticky Full-Screen Takeover Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050806]">
        
        {/* The Modulated Image Wrapper */}
        <div className="absolute inset-0 z-0 bg-[#050806]">
          {/* Extended bounds physically solve parallax edge bleeding over 140% height. */}
          <motion.div className="absolute w-full h-[140%] -top-[20%] left-0 z-0" style={{ y: bgY }}>
            <Image 
              src="/images/BACKGROUND/advanced_care.png"
              alt="Advanced Specialized Care"
              fill
              // Removed heavy washout filters so the true image color glows behind the text
              className="object-cover object-center opacity-80"
              quality={100}
              priority
            />
          </motion.div>
          {/* Elegant shadow drop to secure text legibility without destroying the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/40 to-transparent pointer-events-none z-10" />
        </div>

        {/* Floating Typography & Content Overlay - Permanently Anchored */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-[10vh] md:pb-[15vh]">
          
          <div className="max-w-4xl">
            <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-[10px] md:text-xs uppercase mb-6 md:mb-8 drop-shadow-md">
              <span className="w-12 h-[1px] bg-[var(--brand-sand)]"></span>
              Specialized Programs
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-gallient text-white leading-[0.9] drop-shadow-2xl mb-8">
              Advanced <br/> Healing Protocols.
            </h2>
            <p className="text-sm md:text-base font-sans font-light text-white/70 leading-relaxed max-w-xl md:pl-16 border-l border-[var(--brand-sand)]/30 drop-shadow-md">
              For complex, chronic, and severe physiological conditions, our dedicated doctors prescribe intensive 21 to 41-day regimens combining rare herbs, customized dietary isolation, and highly localized therapies to reconstruct the body's defensive memory.
            </p>
          </div>

          {/* Staggered List permanently anchored over the lens unroll */}
          <div className="w-full mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {advancedTreatments.map((item) => (
              <div key={item.id} className="border-t border-[#8c7f70]/30 pt-4 flex flex-col group hover:border-[#8c7f70] transition-colors duration-500 cursor-default">
                <span className="text-[#8c7f70] font-space text-[8px] tracking-[0.3em] uppercase mb-3 transition-colors group-hover:text-[var(--brand-sand)]">
                  0{item.id}
                </span>
                <h4 className="text-white font-gallient text-xl md:text-2xl mb-1 tracking-wider drop-shadow-md">
                  {item.name}
                </h4>
                <p className="text-white/50 text-[10px] font-sans uppercase tracking-[0.1em]">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        
        </div>

      </div>
    </section>
  );
}
