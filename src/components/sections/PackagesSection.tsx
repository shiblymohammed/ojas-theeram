"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { packages } from "@/data/packages";

const packageImages = [
  "/images/packages/package-a.png",
  "/images/packages/package-b.png",
  "/images/packages/package-c.png",
  "/images/packages/package-d.png",
  "/images/packages/package-e.png",
];

const getLayoutClasses = (index: number) => {
  switch (index) {
    case 0:
      return "col-span-12 md:col-span-5 aspect-[4/5] relative";
    case 1:
      return "col-span-12 md:col-span-4 md:col-start-6 md:mt-32 aspect-square relative";
    case 2:
      return "col-span-12 md:col-span-3 md:mt-12 aspect-[4/5] relative";
    case 3:
      return "col-span-12 md:col-span-6 md:col-start-2 md:mt-24 aspect-[4/3] relative";
    case 4:
      return "col-span-12 md:col-span-4 md:col-start-9 md:-mt-32 aspect-[3/4] relative z-10";
    default:
      return "col-span-12 md:col-span-4 aspect-square relative";
  }
};

// ── Magnetic Button Component ──
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="border border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[#f7f7eb] px-6 py-3 tracking-widest text-[10px] uppercase font-space transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
}

// ── Main Section ──
export default function PackagesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Assign different vertical speeds for staggered parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const parallaxY = [y1, y2, y3, y4, y5];

  // Custom Cursor Logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 200 });

  return (
    <section
      ref={containerRef}
      id="packages"
      className="relative min-h-screen py-32 transition-colors duration-1000 ease-in-out border-b border-black/5 overflow-hidden group/layer"
      style={{ backgroundColor: hoveredIdx !== null ? '#060a08' : 'var(--bg-secondary)' }}
      onPointerMove={(e) => {
        cursorX.set(e.clientX - 40); // center the 80px circle
        cursorY.set(e.clientY - 40);
      }}
    >
      {/* ── Gradient Blurred Background Elements (Non-Hover State) ── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${hoveredIdx !== null ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Green/Forest Blob top right */}
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[var(--brand-forest)] rounded-full blur-[120px] md:blur-[160px] opacity-[0.12] translate-x-1/4 -translate-y-1/4" />

        {/* Brand Sand Blob bottom left */}
        <div className="absolute bottom-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[var(--brand-sand)] rounded-full blur-[120px] md:blur-[160px] opacity-[0.15] -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* ── Custom View Cursor ── */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className={`fixed top-0 left-0 w-20 h-20 rounded-full flex items-center justify-center pointer-events-none z-[100] transition-opacity duration-500 mix-blend-exclusion
          ${hoveredIdx !== null ? 'opacity-0 scale-50' : 'opacity-0 group-hover/layer:opacity-100 scale-100'}
        `}
      >
        <span className="text-white text-[10px] uppercase tracking-widest font-space absolute leading-none">
          Explore
        </span>
        <div className="absolute inset-0 border border-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-spin-slow" />
      </motion.div>

      {/* ── Floating Watermark ── */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-opacity duration-1000 ${hoveredIdx !== null ? 'opacity-0' : 'opacity-[0.03]'}`}>
        <h2 className="text-[25vw] leading-none font-gallient text-[var(--brand-forest)] whitespace-nowrap transform -rotate-12 mt-20">
          AYURVEDA
        </h2>
      </div>

      {/* ── Hover Background Image Transition ── */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src={packageImages[hoveredIdx]}
              alt="Dynamic Background"
              fill
              className="object-cover scale-105"
              quality={100}
            />
            {/* Soft overlay without blur for crisp background */}
            <div className="absolute inset-0 bg-[#060a08]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header Reveal ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col items-center text-center gap-6"
        >
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-gallient transition-colors duration-700 ${hoveredIdx !== null ? 'text-white' : 'text-[var(--brand-forest)]'}`}>
            Signature Journeys
          </h2>
        </motion.div>

        {/* ── Scattered Editorial Grid ── */}
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-16 pb-20 relative">
          {packages.map((pkg, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <motion.div
                key={pkg.id}
                style={{ y: parallaxY[idx] }} // Parallax attach
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} // Reveal trigger
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={getLayoutClasses(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* ── The Card Container ── */}
                <div
                  className={`w-full h-full relative transition-all duration-700 ease-out cursor-pointer group
                    ${isHovered ? 'bg-[#f7f7eb] shadow-2xl scale-[1.02] z-20' : 'bg-transparent'}
                    ${isOtherHovered ? 'border border-white/50 border-solid' : 'border border-transparent'}
                  `}
                >
                  {/* Image State */}
                  <div
                    className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ease-in-out
                      ${isHovered || isOtherHovered ? 'opacity-0' : 'opacity-100'}
                    `}
                  >
                    <Image
                      src={packageImages[idx]}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Details State (White Box) */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10 text-center transition-opacity duration-700 delay-100 ease-out
                      ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}
                  >
                    <h3 className="text-2xl md:text-3xl font-gallient text-[var(--brand-forest)] mb-4 uppercase tracking-wider">
                      {pkg.title}
                    </h3>
                    <div className="w-8 h-[1px] bg-[var(--brand-earth)] mb-4" />

                    <div className="flex flex-col gap-2 font-space text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-8">
                      <span>{pkg.duration}</span>
                      <span className="font-semibold text-[var(--brand-forest)]">₹{pkg.price}</span>
                    </div>

                    {/* Magnetic Button */}
                    <MagneticButton>Discover</MagneticButton>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="absolute -bottom-8 md:-bottom-10 left-0 right-0 flex items-start justify-between pointer-events-none z-0">
                  <p className={`font-space tracking-[0.15em] uppercase text-[10px] md:text-xs font-semibold transition-colors duration-700 max-w-[85%] leading-tight
                    ${hoveredIdx !== null ? 'text-white drop-shadow-md' : 'text-[var(--text-primary)]'}
                  `}>
                    {pkg.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}