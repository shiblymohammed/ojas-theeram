"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const advancedTreatments = [
  { id: 1, name: "Chronic Neurological Disorders", subtitle: "Stroke Rehab & Paralysis", detail: "Deep cellular restoration through continuous oil pouring and specialized nerve-stimulation therapies.", color: "from-[#1a231d]" },
  { id: 2, name: "Severe Orthopedic Conditions", subtitle: "Rheumatoid & Osteoarthritis", detail: "Strengthening the skeletal frame using heated herbal poultices and concentrated bone-broth treatments.", color: "from-[#231f1a]" },
  { id: 3, name: "Autoimmune Management", subtitle: "Psoriasis & Systemic Lupus", detail: "Immune system recalibration through rigorous internal detox and specialized dietary protocols.", color: "from-[#1d1f23]" },
  { id: 4, name: "Post-Surgical Rehabilitation", subtitle: "Deep Tissue & Joint Memory", detail: "Accelerated tissue repair using highly-absorbent herbal pastes and gentle joint mobilization techniques.", color: "from-[#231a1a]" }
];

export default function AdvancedCareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stretch the container to 400vh to ensure enough scroll track for 4 overlapping events
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Subtle Background Parallax (Gentle slow scale rather than massive vertical sweep)
  const rawParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgScale = useSpring(rawParallaxScale, { stiffness: 30, damping: 25, mass: 1 });

  return (
    <section 
      ref={containerRef}
      id="advanced-care" 
      // Overlap the Doctor Section & extend scroll space for stacking on desktop only!
      className="relative h-auto md:h-[400vh] md:mt-[-100vh] z-30 bg-[#050806] text-[var(--text-primary)]"
    >
      {/* Sticky Full-Screen Takeover Container (Desktop) / Native block (Mobile) */}
      <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full flex items-center justify-center overflow-hidden bg-[#050806] py-16 md:py-0">
        
        {/* Cinematic Modulated Image Wrapper */}
        <div className="absolute inset-0 z-0 bg-[#050806] overflow-hidden">
          <motion.div className="absolute inset-0 w-full h-full z-0" style={{ scale: bgScale, transformOrigin: 'center center' }}>
            <Image 
              src="/images/BACKGROUND/advanced_care.webp"
              alt="Advanced Specialized Care"
              fill
              className="object-cover object-center opacity-40 mix-blend-luminosity"
              quality={85}
              priority
              sizes="100vw"
            />
          </motion.div>
          {/* Elegant vignette and side-fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050806] via-[#050806]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-[#050806] pointer-events-none z-10" />
        </div>

        {/* Master Layout */}
        <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-24">
          
          {/* Left: Typography Block */}
          <div className="w-full md:w-5/12 h-[35vh] md:h-full flex flex-col justify-start pt-[14vh] md:pt-[25vh]">
            <span className="flex items-center gap-3 md:gap-4 text-[var(--brand-sand)] font-space tracking-widest text-[8px] md:text-xs uppercase mb-3 md:mb-8 drop-shadow-md">
              <span className="w-8 md:w-16 h-[1px] bg-[var(--brand-sand)]"></span>
              Specialized Programs
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-gallient text-white leading-[0.95] md:leading-[0.9] drop-shadow-2xl mb-4 md:mb-10">
              Advanced <br/> Healing Protocols
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-sans font-light text-white/50 leading-relaxed max-w-md md:pl-8 md:border-l border-[var(--brand-sand)]/30 drop-shadow-md">
              For complex, chronic, and severe physiological conditions, our dedicated doctors prescribe intensive 21 to 41-day regimens combining rare herbs, customized dietary isolation, and highly localized therapies.
            </p>
          </div>

          {/* Right: The Interactive Card Stack */}
          <div className="w-full md:w-7/12 h-auto md:h-full relative flex items-start md:items-center justify-center md:justify-end mt-12 md:mt-0 xl:pr-12">
             <div className="w-full max-w-md lg:max-w-xl relative h-auto md:h-[480px] flex flex-col md:block">
               {advancedTreatments.map((item, index) => (
                 <StackedCard 
                   key={item.id} 
                   item={item} 
                   index={index} 
                   scrollYProgress={scrollYProgress} 
                   total={advancedTreatments.length} 
                 />
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Inline Sub-Component handling the individual scroll-triggered stacking physics
function StackedCard({ item, index, scrollYProgress, total }: { item: any, index: number, scrollYProgress: MotionValue<number>, total: number }) {
  // Distribute the entrance events across the scroll timeline.
  // Last card finishes entering near 0.8 to allow dead-scroll window at the end.
  const enterStart = index * 0.18; 
  const enterEnd = enterStart + 0.15; 
  
  // Spring loaded physical vertical swoop from deep off-screen bounding
  const rawY = useTransform(scrollYProgress, [enterStart, enterEnd], [1500, index * 25]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Visually scale background cards down and dim their lighting as new ones override them to simulate 3D depth
  const maxScale = 1;
  const minScale = 1 - ((total - index - 1) * 0.05);
  const scale = useTransform(scrollYProgress, [enterEnd, 0.85], [maxScale, minScale]);

  const maxOpacity = 1;
  const minOpacity = 1 - ((total - index - 1) * 0.2); 
  const opacity = useTransform(scrollYProgress, [enterEnd, 0.85], [maxOpacity, minOpacity]);

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: index, transformOrigin: 'top center' }}
      // Responsive fallback: absolute on desktop for complex overlaps, relative stack natively on mobile avoiding GPU strains.
      className={`relative mb-6 md:mb-0 md:absolute inset-x-0 top-0 h-auto md:h-full min-h-[350px] bg-gradient-to-br ${item.color} to-[#050505] backdrop-blur-3xl border-t border-l border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] p-8 md:p-12 rounded-[2rem] md:rounded-[40px] flex flex-col justify-between overflow-hidden will-change-transform max-md:!transform-none max-md:!opacity-100 max-md:!scale-100`}
    >
      {/* Decorative inner light sweep */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div>
        <span className="text-[var(--brand-sand)] font-space text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4 md:mb-6 block drop-shadow-md">
          Phase 0{item.id}
        </span>
        <h4 className="text-[#f2ebe1] font-gallient text-4xl lg:text-5xl mb-4 leading-tight drop-shadow-xl">
          {item.name}
        </h4>
        <p className="text-white/80 font-space tracking-[0.1em] md:tracking-[0.2em] text-[9px] md:text-[10px] mb-6 md:mb-10 uppercase opacity-90">
          {item.subtitle}
        </p>
      </div>

      <div>
        <p className="text-white/40 text-[11px] md:text-sm font-light leading-relaxed mb-6 md:mb-10 max-w-sm">
          {item.detail}
        </p>
        <Link href="/treatments" className="inline-flex items-center gap-4 text-[9px] md:text-[10px] font-space tracking-[0.2em] uppercase text-white transition-colors hover:text-[var(--brand-sand)] group">
          <span className="border-b border-white/30 group-hover:border-[var(--brand-sand)] pb-1 transition-colors">Explore Regimen</span>
          <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
