"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";

export default function ProductsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax constraints for layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const productImageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  
  // Currently displaying the first product out of the array
  const product = products[0];

  if (!product) return null;

  return (
    <section 
      ref={containerRef} 
      id="products" 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center lg:justify-start"
    >
      {/* 1. Base Background Image (Full Screen) */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image 
          src="/images/products/proucts_base_bg.png"
          alt="Product Background Environment"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
          priority
        />
        {/* Soft gradient overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a08]/80 via-[#060a08]/40 to-transparent" />
      </motion.div>

      {/* 2. Product Cutout Image (Full Screen Layer) */}
      <motion.div 
        style={{ y: productImageY }}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-2xl"
      >
        <Image 
          src="/images/products/herbal_tea.png"
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
          priority
        />
      </motion.div>

      {/* 3. Product Content Overlay */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 flex flex-col justify-center h-full">
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
            href={`https://wa.me/yourwhatsappnumber?text=${encodeURIComponent(product.whatsappText)}`}
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

    </section>
  );
}
