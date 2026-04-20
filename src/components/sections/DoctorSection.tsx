"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { leadPhysician } from "@/data/doctors";
import { Award, GraduationCap } from "lucide-react";

export default function DoctorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCertificates, setShowCertificates] = useState(false);
  
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // OPPOSITE SPLIT MATH LOGIC:
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
      <div className="sticky top-0 h-[100svh] lg:h-screen w-full flex flex-col md:flex-row overflow-visible">
        
        {/* Left Side: Enters from TOP using extreme negative parallax (Text Layout) */}
        <motion.div 
           style={{ y: leftY, opacity: curtainShadow }}
           className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#f6f2ee] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-0 z-30 shadow-2xl drop-shadow-[45px_0_65px_rgba(0,0,0,0.4)] order-2 md:order-1"
        >
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
            <div>
              <span className="flex items-center gap-3 sm:gap-4 text-[var(--brand-sand)] font-space tracking-widest text-[10px] sm:text-xs uppercase mb-3 sm:mb-4">
                <span className="w-6 sm:w-8 h-[1px] bg-[var(--brand-sand)]"></span>
                Lead Physician
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gallient text-[var(--brand-forest)] leading-[0.9] mb-3 sm:mb-4">
                {leadPhysician.name}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#8c7f70] font-gallient mb-4 sm:mb-6">
                {leadPhysician.qualifications}
              </p>
              <p className="text-xs sm:text-sm md:text-base font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-md mb-6 sm:mb-8">
                A BAMS graduate with extensive knowledge in Ayurveda, dedicated to delivering excellent patient care through authentic Ayurvedic practices.
              </p>
              
              {/* Specialties */}
              {leadPhysician.specialties && leadPhysician.specialties.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--brand-forest)]" />
                    <p className="font-space text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--brand-earth)]">
                      Specializations
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {leadPhysician.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] sm:text-[10px] font-space tracking-wider uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[var(--brand-forest)]/5 text-[var(--brand-forest)] border border-[var(--brand-forest)]/10"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8 md:gap-10 pb-6 sm:pb-8 border-b border-[var(--brand-forest)]/10 mb-6 sm:mb-8">
                {leadPhysician.stats?.map((stat, index) => (
                  <div key={index}>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-gallient text-[var(--brand-forest)]">{stat.value}</h4>
                    <p className="font-space text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[var(--brand-sand)] mt-1 sm:mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Certificates Section - Desktop Only */}
              {leadPhysician.certificates && leadPhysician.certificates.length > 0 && (
                <div className="hidden md:block mb-6">
                  <button
                    onClick={() => setShowCertificates(!showCertificates)}
                    className="group flex items-center gap-2 text-[10px] sm:text-xs font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] hover:text-[var(--brand-sand)] transition-colors mb-3"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Certifications</span>
                    <motion.span
                      animate={{ rotate: showCertificates ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {showCertificates && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {leadPhysician.certificates.slice(0, 3).map((cert, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2.5 rounded-lg bg-white/50 border border-[var(--brand-forest)]/5"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-forest)] mt-1.5 shrink-0" />
                            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                              {cert}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div>
                <Link href="/booking" className="inline-flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] hover:text-[var(--brand-sand)] transition-colors group">
                  <span>Book Consultation</span>
                  <span className="w-6 sm:w-8 h-[1px] bg-[var(--brand-forest)] group-hover:bg-[var(--brand-sand)] transition-colors"></span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Enters from BOTTOM inherently (Image Layout) */}
        <motion.div 
           className="relative w-full md:w-1/2 h-[50vh] md:h-full bg-[var(--brand-forest)] overflow-hidden flex items-center justify-center pointer-events-auto z-20 shadow-2xl order-1 md:order-2"
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
              quality={85}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-forest)]/80 via-transparent to-[var(--brand-forest)]/30 pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
