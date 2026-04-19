"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { therapies, panchakarma } from "@/data/treatments";

const featuredTreatments = [
  { ...panchakarma[0], type: "Panchakarma Detox",    image: "/images/packages/package-a.png", desc: "Therapeutic emesis for respiratory and upper gastrointestinal reset." },
  { ...therapies[0],   type: "Signature Therapy",    image: "/images/packages/package-b.png", desc: "Rhythmic full-body massage using warm medicated oils." },
  { ...therapies[5],   type: "Stress & Mind",        image: "/images/packages/package-c.png", desc: "Continuous pouring of warm herbal oil over the forehead." },
  { ...therapies[6],   type: "Beauty & Skin",        image: "/images/packages/package-d.png", desc: "Rejuvenating facial using Navara rice and herbal milk decoctions." },
  { ...therapies[1],   type: "Weight Management",    image: "/images/packages/package-e.png", desc: "Invigorating dry herbal powder massage to reduce subcutaneous fat." },
];

export default function TreatmentsPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Entry scroll progress: tracks when section enters viewport
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // ── DESKTOP: Right panel crashes down from above ──
  const rightY = useTransform(entryProgress, [0, 1], ["-200vh", "0vh"]);

  // ── MOBILE: Mirror — top panel from top, bottom panel from bottom ──
  const mobileTopY = useTransform(entryProgress, [0, 1], ["-100vh", "0vh"]);
  const mobileBotY = useTransform(entryProgress, [0, 1], ["200vh",  "0vh"]);

  const curtainOpacity = useTransform(entryProgress, [0, 0.5, 1], [0, 0.6, 1]);

  return (
    <section
      ref={containerRef}
      id="treatments"
      className="relative h-[250vh] mt-[-100vh] z-10 bg-transparent text-[var(--text-primary)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">

        {/* ── LEFT PANEL: Image ── */}
        <motion.div
          className="relative w-full md:w-1/2 h-[45vh] md:h-full bg-[var(--brand-forest)] overflow-hidden flex items-center justify-center z-20 shadow-2xl transform-gpu will-change-transform"
          style={isMobile ? { y: mobileTopY, opacity: curtainOpacity } : {}}
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10">
            <h2 className="text-[20vw] md:text-[15vw] font-gallient text-white -rotate-90 md:rotate-0 tracking-widest whitespace-nowrap">
              HEAL
            </h2>
          </div>

          {/* ── Pre-rendered images (no AnimatePresence, zero mount latency) ── */}
          {featuredTreatments.map((t, idx) => (
            <div
              key={t.image}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out transform-gpu"
              style={{ opacity: idx === activeIdx ? 1 : 0 }}
            >
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover transform-gpu"
                quality={idx === activeIdx ? 80 : 40}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a08]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Image Caption (desktop) */}
          <div className="absolute bottom-8 left-8 text-white z-10 hidden md:block pointer-events-none">
            <p
              key={`type-${activeIdx}`}
              className="font-space text-xs tracking-[0.3em] uppercase text-white/70 mb-2 transition-all duration-500"
            >
              {featuredTreatments[activeIdx].type}
            </p>
            <h3
              key={`name-${activeIdx}`}
              className="font-gallient text-4xl transition-all duration-500"
            >
              {featuredTreatments[activeIdx].name}
            </h3>
          </div>

          {/* Mobile caption (bottom of image) */}
          <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden pointer-events-none">
            <p className="font-space text-[8px] tracking-[0.3em] uppercase text-white/70 mb-1">
              {featuredTreatments[activeIdx].type}
            </p>
            <h3 className="font-gallient text-2xl text-white leading-tight">
              {featuredTreatments[activeIdx].name}
            </h3>
          </div>
        </motion.div>

        {/* ── RIGHT PANEL: Treatment List ── */}
        <motion.div
          className="w-full md:w-1/2 h-[55vh] md:h-full bg-[#f3eee8] flex items-center px-6 md:px-16 lg:px-24 z-30 shadow-2xl drop-shadow-[0_45px_65px_rgba(0,0,0,0.5)] overflow-y-auto transform-gpu will-change-transform"
          style={
            isMobile
              ? { y: mobileBotY, opacity: curtainOpacity }
              : { y: rightY, opacity: curtainOpacity }
          }
        >
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center py-6 md:py-0">

            {/* Header */}
            <div className="mb-8 md:mb-12">
              <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-xs uppercase mb-4">
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]" />
                Curated Therapies
              </span>
              <h2 className="text-3xl md:text-5xl font-gallient text-[var(--brand-forest)] leading-tight">
                Ancient Wisdom <br /> Modern Wellness
              </h2>
            </div>

            {/* Treatment list */}
            <div className="flex flex-col gap-4 md:gap-8">
              {featuredTreatments.map((treatment, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={treatment.name}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="relative group cursor-pointer select-none"
                  >
                    <div className={`flex items-baseline justify-between transition-colors duration-500 ${
                      isActive
                        ? "text-[var(--brand-forest)]"
                        : "text-[var(--text-alpha)] group-hover:text-[var(--text-secondary)]"
                    }`}>
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-gallient transition-transform duration-500 origin-left leading-tight">
                        {treatment.name}
                      </h3>
                      {treatment.price && (
                        <span className="font-space text-xs md:text-sm tracking-widest shrink-0 ml-2">
                          ₹{treatment.price}
                        </span>
                      )}
                    </div>

                    {/* Expandable description */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-32 opacity-100 mt-2 md:mt-3" : "max-h-0 opacity-0"
                    }`}>
                      <p className="text-xs md:text-sm font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-md">
                        {treatment.desc}
                      </p>
                      <button className="mt-3 text-[9px] md:text-[10px] font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] border-b border-[var(--brand-forest)] pb-1 hover:text-[var(--brand-sand)] hover:border-[var(--brand-sand)] transition-colors">
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
