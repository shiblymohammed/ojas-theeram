"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { leadPhysician } from "@/data/doctors";

export default function DoctorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Desktop: Left text panel drops from top (-200vh → 0)
  const leftY = useTransform(entryProgress, [0, 1], ["-200vh", "0vh"]);

  // Mobile mirror: top(image) from top, bottom(text) from bottom
  const mobileTopY = useTransform(entryProgress, [0, 1], ["-100vh", "0vh"]);
  const mobileBotY = useTransform(entryProgress, [0, 1], ["200vh", "0vh"]);

  const curtainOpacity = useTransform(entryProgress, [0, 0.5, 1], [0, 0.6, 1]);

  return (
    <section
      ref={containerRef}
      id="doctor"
      className="relative h-[250vh] mt-[-100vh] z-20 bg-transparent text-[var(--text-primary)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">

        {/* LEFT: Text Panel — drops from top on desktop, from bottom on mobile */}
        <motion.div
          style={
            isMobile
              ? { y: mobileBotY, opacity: curtainOpacity }
              : { y: leftY, opacity: curtainOpacity }
          }
          className="w-full md:w-1/2 h-[55vh] md:h-full bg-[#f6f2ee] flex items-center px-6 md:px-16 lg:px-24 z-30 shadow-2xl order-2 md:order-1 overflow-y-auto transform-gpu will-change-transform"
        >
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center py-6 md:py-0">
            <div className="mb-8 md:mb-10">
              <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-xs uppercase mb-4">
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]" />
                Lead Physician
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-gallient text-[var(--brand-forest)] leading-[0.9] mb-4 md:mb-6">
                {leadPhysician.name} <br />
                <span className="text-xl md:text-[2rem] lg:text-[3rem] text-[#8c7f70]">
                  {leadPhysician.qualifications}
                </span>
              </h2>
              <p className="text-xs md:text-sm font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-md">
                {leadPhysician.biography}
              </p>

              <div className="mt-8 md:mt-12 flex gap-6 md:gap-12 pb-6 md:pb-8 border-b border-[var(--brand-forest)]/10">
                {leadPhysician.stats?.map((stat, index) => (
                  <div key={index}>
                    <h4 className="text-2xl md:text-4xl font-gallient text-[var(--brand-forest)]">{stat.value}</h4>
                    <p className="font-space text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-[var(--brand-sand)] mt-1 md:mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8">
                <button className="group flex items-center gap-4 text-[10px] md:text-xs font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] hover:text-[var(--brand-sand)] transition-colors">
                  <span>Consult {leadPhysician.name}</span>
                  <span className="w-8 h-[1px] bg-[var(--brand-forest)] group-hover:bg-[var(--brand-sand)] transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Image Panel — naturally from bottom on desktop, from top on mobile */}
        <motion.div
          style={isMobile ? { y: mobileTopY, opacity: curtainOpacity } : {}}
          className="relative w-full md:w-1/2 h-[45vh] md:h-full bg-[var(--brand-forest)] overflow-hidden flex items-center justify-center z-20 shadow-2xl order-1 md:order-2 transform-gpu will-change-transform"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10">
            <h2 className="text-[20vw] md:text-[15vw] font-gallient text-white -rotate-90 md:rotate-0 tracking-widest whitespace-nowrap">
              TRUST
            </h2>
          </div>

          <div className="absolute inset-0 z-0">
            <Image
              src={leadPhysician.image}
              alt={leadPhysician.name}
              fill
              className="object-cover object-center grayscale-[15%] opacity-90 transform-gpu"
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-forest)]/80 via-transparent to-[var(--brand-forest)]/30 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
