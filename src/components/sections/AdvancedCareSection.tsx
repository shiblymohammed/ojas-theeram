"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const advancedTreatments = [
  { id: 1, name: "Neurological Disorders",    subtitle: "Stroke Rehab & Paralysis" },
  { id: 2, name: "Orthopedic Conditions",     subtitle: "Rheumatoid & Osteoarthritis" },
  { id: 3, name: "Autoimmune Management",     subtitle: "Psoriasis & Systemic Lupus" },
  { id: 4, name: "Post-Surgical Rehab",       subtitle: "Deep Tissue & Joint Memory" },
];

export default function AdvancedCareSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Lightweight single-axis parallax — no spring, no stagger, pure GPU transform
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={containerRef}
      id="advanced-care"
      className="relative h-[200vh] mt-[-100vh] z-30 bg-transparent text-[var(--text-primary)]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050806]">

        {/* ── Background Image with lightweight parallax ── */}
        <motion.div
          className="absolute w-full h-[116%] -top-[8%] left-0 z-0 transform-gpu will-change-transform"
          style={{ y: bgY }}
        >
          <Image
            src="/images/BACKGROUND/advanced_care.png"
            alt="Advanced Specialized Care"
            fill
            className="object-cover object-center opacity-75 transform-gpu"
            quality={75}
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* ── Gradient overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050806]/60 via-transparent to-transparent z-10 pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-12 md:pb-20">

          {/* Header block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl mb-10 md:mb-16"
          >
            <span className="flex items-center gap-4 text-[var(--brand-sand)] font-space tracking-widest text-[10px] md:text-xs uppercase mb-4 md:mb-6">
              <span className="w-10 h-[1px] bg-[var(--brand-sand)]" />
              Specialized Programs
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-gallient text-white leading-[0.9] drop-shadow-2xl mb-6 md:mb-8">
              Advanced <br /> Healing<br className="md:hidden" /><span className="hidden md:inline"> </span>Protocols.
            </h2>
            <p className="text-xs md:text-sm font-sans font-light text-white/65 leading-relaxed max-w-lg md:pl-12 border-l border-[var(--brand-sand)]/30">
              For complex, chronic, and severe conditions — our physicians prescribe intensive 21 to 41-day regimens combining rare herbs, dietary isolation, and localized therapies to rebuild the body's defensive memory.
            </p>
          </motion.div>

          {/* ── Treatment cards grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {advancedTreatments.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="border-t border-[#8c7f70]/30 pt-4 flex flex-col group hover:border-[#8c7f70] transition-colors duration-500 cursor-default"
              >
                <span className="text-[#8c7f70] font-space text-[8px] tracking-[0.3em] uppercase mb-2 md:mb-3 transition-colors group-hover:text-[var(--brand-sand)]">
                  0{item.id}
                </span>
                <h4 className="text-white font-gallient text-base md:text-xl lg:text-2xl mb-1 tracking-wide leading-tight">
                  {item.name}
                </h4>
                <p className="text-white/45 text-[9px] font-sans uppercase tracking-[0.1em] mt-auto pt-2">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
