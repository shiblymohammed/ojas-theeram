"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { packages } from "@/data/packages";

const packageImages = [
  "/images/packages/package-a.webp",
  "/images/packages/package-b.webp",
  "/images/packages/package-c.webp",
  "/images/packages/package-d.webp",
  "/images/packages/package-e.webp",
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
export default function PackagesSection({ transparentBg = false }: { transparentBg?: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Safely assess viewport limits on mount for layout disabling on restricted devices
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom Cursor Logic purely for the "Explore" hover badge
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 200 });

  // Background color logic: transparent mode (over blurred intro BG) vs standalone
  const getBgColor = () => {
    if (transparentBg) {
      return hoveredIdx !== null ? '#060a08' : 'rgba(247, 247, 235, 0.85)';
    }
    return hoveredIdx !== null ? '#060a08' : '#f7f7eb';
  };

  return (
    <section
      ref={containerRef}
      id="packages"
      className={`relative min-h-screen pt-16 md:pt-20 pb-32 transition-colors duration-1000 ease-in-out border-b border-black/5 overflow-hidden group/layer z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.08)] ${transparentBg ? 'backdrop-blur-xl max-md:backdrop-blur-none' : ''}`}
      style={{ backgroundColor: getBgColor() }}
      onPointerMove={(e) => {
        cursorX.set(e.clientX - 40); // center the 80px circle
        cursorY.set(e.clientY - 40);
      }}
    >

      {/* ── Custom View Cursor ── */}
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className={`fixed top-0 left-0 w-20 h-20 rounded-full flex items-center justify-center pointer-events-none z-[100] transition-opacity duration-500 mix-blend-exclusion will-change-transform transform-gpu
          ${hoveredIdx !== null ? 'opacity-0 scale-50' : 'opacity-0 group-hover/layer:opacity-100 scale-100'}
        `}
      >
        <span className="text-white text-[10px] uppercase tracking-widest font-space absolute leading-none">
          Explore
        </span>
        <div className="absolute inset-0 border border-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-spin-slow" />
      </motion.div>


      {/* ── Seamless Top Intersection Mask (Blurs the harsh line between sections) ── */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10" />

      {/* ── Hover Background Image Transition (Pre-rendered for Instant Performance) ── */}
      {/* 
        By continuously rendering all hover variants into the DOM at opacity-0, 
        we aggressively force the browser to cache and load the images before the user even hovers. 
        This eliminates the 500ms flash latency that plagues standard AnimatePresence mounts.
      */}
      {packageImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-[800ms] ease-in-out ${
            hoveredIdx === idx ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt="Dynamic Background"
            fill
            sizes="100vw"
            className="object-cover scale-105 transform-gpu"
            quality={60} // Lower bit depth for high-speed bg loading
            loading="lazy"
          />
          {/* Aesthetic Shadow Overlays */}
          <div className="absolute inset-0 bg-[#060a08]/40 md:bg-[#060a08]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-transparent to-transparent" />
        </div>
      ))}

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Editorial Header Reveal ── */}
        <div className="mb-16 md:mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16 transition-colors duration-700 ${
              hoveredIdx !== null ? 'text-white' : 'text-[var(--brand-forest)]'
            }`}
          >
            {/* Col 1: Monumental Typographic Title */}
            <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-gallient leading-[0.9] tracking-tight">
              Signature <br />
              <span className="italic opacity-90 text-[var(--brand-earth)]">Journeys</span>
            </h2>

            {/* Col 2: Contextual Manifesto & Hints */}
            <div className="flex flex-col gap-6 md:max-w-sm lg:max-w-md pb-2">
              <p className="font-space text-[10px] md:text-xs tracking-[0.2em] leading-[1.8] uppercase opacity-80">
                A meticulously curated collection of immersive therapies, combining ancient Ayurvedic science with profound holistic rituals to completely restore structural harmony to your mind, body, and spirit.
              </p>
              
              {/* Intelligent Swipe Hint (Mobile Only) */}
              <div className="flex md:hidden items-center gap-4 mt-2 opacity-60">
                <span className={`w-12 h-[1px] transition-colors duration-700 ${hoveredIdx !== null ? 'bg-white' : 'bg-[var(--brand-earth)]'}`} />
                <span className="font-space text-[9px] tracking-[0.3em] uppercase font-semibold">Swipe to Explore</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Scattered Editorial Grid (Desktop) & Swipe Carousel (Mobile) ── */}
        <div className="flex md:grid md:grid-cols-12 flex-nowrap overflow-x-auto snap-x snap-mandatory md:overflow-visible gap-6 md:gap-x-8 md:gap-y-16 pb-12 md:pb-20 relative w-full -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ scrollPaddingLeft: "1.5rem" }}>
          {packages.map((pkg, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: isMobile ? 0 : idx * 0.1 }}
                className={`flex-none w-[68vw] sm:w-[50vw] md:w-auto snap-center transform-gpu ${getLayoutClasses(idx)}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* ── The Card Container ── */}
                <div
                  className={`w-full h-full relative transition-[background-color,transform,box-shadow] duration-700 ease-out cursor-pointer group transform-gpu
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
                    
                    {/* Dark gradient mapping purely to enhance the button layout */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />

                    {/* Mobile Tap Hint Overlay (Disappears seamlessly when clicked/hovered) */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center md:hidden z-10 pointer-events-none">
                      <div className="bg-white/20 backdrop-blur-md max-md:backdrop-blur-none border border-white/40 text-white px-5 py-2 rounded-full font-space text-[8px] uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
                        <span>Tap to View</span>
                      </div>
                    </div>
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
                    ${hoveredIdx !== null ? 'text-white drop-shadow-md max-md:drop-shadow-none' : 'text-[var(--text-primary)]'}
                  `}>
                    {pkg.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer Navigation Action ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`flex justify-center w-full mt-8 md:mt-16 transition-colors duration-700 ${
            hoveredIdx !== null ? 'text-white' : 'text-[var(--brand-forest)]'
          }`}
        >
          <MagneticButton>
            Explore All Curations
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
