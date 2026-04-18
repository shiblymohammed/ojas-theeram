"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { leadPhysician } from "@/data/doctors";

export default function DoctorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // OPPOSITE SPLIT MATH LOGIC:
  // For Treatments: Left came from bottom natively, Right dropped from top (-200vh).
  // For Doctor: Right comes from bottom natively (Image), Left drops from top (-200vh) (Text Profile).
  const leftY = useTransform(entryProgress, [0, 1], ["-200vh", "0vh"]);
  
  // Subtle shadow transition as they lock together
  const curtainShadow = useTransform(entryProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="doctor" 
      // Negative top margin physically overlaps the last 100vh of the TreatmentsSection beneath us!
      className="relative h-[250vh] mt-[-100vh] z-20 bg-transparent text-[var(--text-primary)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-visible">
        
        {/* Left Side: Enters from TOP using extreme negative parallax (Text Layout) */}
        <motion.div 
           style={{ y: leftY, opacity: curtainShadow }}
           // We use order-2 md:order-1 to keep it on the Left in desktop, but visually consistent on mobile
           className="w-full md:w-1/2 h-[60vh] md:h-full bg-[#f6f2ee] flex items-center px-6 md:px-16 lg:px-24 z-30 shadow-2xl drop-shadow-[45px_0_65px_rgba(0,0,0,0.4)] order-2 md:order-1"
        >
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
            <div className="mb-10 md:mb-12">
              <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-xs uppercase mb-4">
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]"></span>
                Lead Physician
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-gallient text-[var(--brand-forest)] leading-[0.9] mb-6">
                {leadPhysician.name} <br/> <span className="text-[2rem] md:text-[3rem] text-[#8c7f70]">{leadPhysician.qualifications}</span>
              </h2>
              <p className="text-sm md:text-base font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-md">
                {leadPhysician.biography}
              </p>
              
              <div className="mt-10 md:mt-16 flex gap-8 md:gap-12 pb-8 border-b border-[var(--brand-forest)]/10">
                {leadPhysician.stats?.map((stat, index) => (
                  <div key={index}>
                    <h4 className="text-3xl md:text-4xl font-gallient text-[var(--brand-forest)]">{stat.value}</h4>
                    <p className="font-space text-[9px] tracking-[0.2em] uppercase text-[var(--brand-sand)] mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>

               <div className="mt-8">
                  <button className="group flex items-center gap-4 text-[10px] md:text-xs font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] hover:text-[var(--brand-sand)] transition-colors">
                    <span>Consult {leadPhysician.name}</span>
                    <span className="w-8 h-[1px] bg-[var(--brand-forest)] group-hover:bg-[var(--brand-sand)] transition-colors"></span>
                  </button>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Enters from BOTTOM inherently (Image Layout) */}
        <motion.div 
           className="relative w-full md:w-1/2 h-[40vh] md:h-full bg-[var(--brand-forest)] overflow-hidden flex items-center justify-center pointer-events-auto z-20 shadow-2xl order-1 md:order-2"
        >
          {/* Subtle text watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10">
            <h2 className="text-[20vw] md:text-[15vw] font-gallient text-white -rotate-90 md:rotate-0 tracking-widest whitespace-nowrap">
              TRUST
            </h2>
          </div>

          <motion.div className="absolute inset-0 z-0">
            <Image 
              src={leadPhysician.image} 
              alt={leadPhysician.name}
              fill
              className="object-cover object-center grayscale-[15%] opacity-90"
              quality={90}
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-forest)]/80 via-transparent to-[var(--brand-forest)]/30 pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

