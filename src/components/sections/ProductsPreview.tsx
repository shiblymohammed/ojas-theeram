"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";

export default function ProductsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax constraints for layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const rawProductY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  
  // Hardware-accelerated smooth spring to eliminate mobile touch-scroll jitter
  const bgScale = useSpring(rawBgScale, { stiffness: 80, damping: 20, mass: 0.5 });
  const productImageY = useSpring(rawProductY, { stiffness: 80, damping: 20, mass: 0.5 });
  
  // Currently displaying the first product out of the array
  const product = products[0];

  if (!product) return null;

  return (
    <section 
      ref={containerRef} 
      id="products" 
      className="relative w-full h-[100svh] lg:h-screen overflow-hidden flex items-center justify-center lg:justify-start"
    >
      {/* 1. Base Background Image (Full Screen) */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 w-full h-full z-0 transform-gpu will-change-transform"
      >
        {/* Desktop Background */}
        <Image 
          src="/images/products/proucts_base_bg.webp"
          alt="Product Background Environment"
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          quality={100}
          priority
        />
        {/* Mobile Background */}
        <Image 
          src="/images/products/products_base_mobile_bg.webp"
          alt="Product Background Environment Mobile"
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          quality={100}
          priority
        />
        {/* Soft gradient overlay to ensure text readability on the left (Desktop only) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a08]/80 via-[#060a08]/40 to-transparent hidden md:block z-10 pointer-events-none" />
        {/* Subtle dark wash for mobile contrast */}
        <div className="absolute inset-0 bg-[#050806]/50 md:hidden z-10 pointer-events-none" />
      </motion.div>

      {/* 2. MOBILE ONLY: Underlayered Text (Sits behind the product cutout) */}
      <div className="absolute inset-x-0 top-[12vh] z-[5] md:hidden flex flex-col items-center text-center px-6 pointer-events-none">
        
        {/* Massive 3D Stroke Typography (Floats deep in the background) */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[150vw] flex flex-col items-center justify-center opacity-40 z-0">
           <span className="text-[140px] leading-[0.75] font-gallient text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] whitespace-nowrap">
             {product.name.toUpperCase()}
           </span>
           <span className="text-[140px] leading-[0.75] font-gallient text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap -ml-[20vw]">
             {product.name.toUpperCase()}
           </span>
        </div>

        {/* Primary Foreground Info */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-space text-[9px] tracking-[0.4em] uppercase text-[var(--brand-sand)] font-bold mb-3 drop-shadow-md">
            Signature Product
          </span>
          <h3 className="text-[75px] font-gallient text-white/90 leading-[0.85] drop-shadow-2xl mb-4">
            {product.name}
          </h3>
          <p className="text-white/60 font-sans text-[11px] leading-relaxed max-w-[260px] drop-shadow-md mb-6">
            {product.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 gap-y-3 max-w-[280px]">
            {product.highlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5 backdrop-blur-sm">
                <div className="w-1 h-1 rounded-full bg-[var(--brand-sand)]" />
                <span className="font-space text-[7px] tracking-widest uppercase text-white/80">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Product Cutout Image (Full Screen Layer) */}
      <motion.div 
        style={{ y: productImageY }}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_50px_30px_rgba(0,0,0,0.95)] md:drop-shadow-[0_70px_40px_rgba(0,0,0,0.95)] transform-gpu will-change-transform"
      >
        {/* Desktop Product Cutout */}
        <Image 
          src="/images/products/herbal_tea.webp"
          alt={product.name}
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          quality={100}
          priority
        />
        {/* Mobile Product Cutout (Scaled up aggressively for depth) */}
        <Image 
          src="/images/products/herbal_tea_mobile.webp"
          alt={product.name}
          fill
          className="object-cover object-bottom scale-[1.2] transform-gpu translate-y-[2%] md:hidden"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          priority
        />
      </motion.div>

      {/* 3. Product Content Overlay (Hidden entirely on mobile as requested) */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 hidden md:flex flex-col justify-center h-full">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2 }}
           className="max-w-xl"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--brand-sand)] animate-pulse" />
            <span className="font-space text-xs tracking-[0.3em] uppercase text-[var(--brand-sand)] font-bold">
              Signature Product
            </span>
          </div>

          <h3 className="text-6xl md:text-7xl lg:text-[90px] font-gallient text-white leading-[0.9] mb-8 drop-shadow-lg">
            {product.name}
          </h3>
          
          <p className="text-[#f7f7eb]/80 font-space text-lg md:text-xl leading-relaxed mb-10 max-w-md drop-shadow-md">
            {product.description}
          </p>

          <div className="space-y-4 mb-12">
            {product.highlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-sand)] shadow-sm" />
                <span className="font-space text-sm tracking-widest uppercase text-white/90 font-medium">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          <a 
            href={`https://wa.me/919353166850?text=${encodeURIComponent(product.whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-[var(--brand-sand)] text-[var(--text-primary)] overflow-hidden shadow-xl shadow-black/20 transition-all hover:shadow-black/40 hover:-translate-y-1 rounded-full w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-[#c3b69b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 font-space text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-3">
              Order via WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* 5. MOBILE ONLY: Bottom CTA Button */}
      <div className="absolute inset-x-0 bottom-[6vh] z-30 md:hidden flex justify-center px-6 pointer-events-none">
        <a 
          href={`https://wa.me/919353166850?text=${encodeURIComponent(product.whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center pointer-events-auto px-8 py-5 bg-[var(--brand-sand)]/90 backdrop-blur-md border border-white/20 text-[var(--text-primary)] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-full w-full max-w-[280px]"
        >
          <span className="relative z-10 font-space text-[10px] tracking-[0.25em] uppercase font-bold flex items-center gap-3">
            Order via WhatsApp
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

    </section>
  );
}
