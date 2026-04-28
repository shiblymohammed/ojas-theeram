"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { clinic } from "@/data/clinic";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    const message = `Hello Ojas Theeram! Please call me back for a free consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}`;
    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-0 lg:min-h-screen flex flex-col lg:flex-row w-full overflow-hidden"
    >
      {/* ── Left Column: Form & Content (Solid Dark) ── */}
      <div className="w-full lg:w-1/2 bg-transparent relative z-10 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-20 lg:py-24 shadow-2xl">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1 }}
           className="w-full max-w-lg mx-auto lg:mx-0"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[var(--brand-sand)]"></span>
            <span className="text-[var(--brand-sand)] tracking-[0.3em] text-xs font-bold uppercase">
               Your Journey Begins
            </span>
          </div>
          
          <h2 className="font-gallient text-5xl md:text-7xl text-white leading-[1.05] mb-6">
            Get in Touch
          </h2>
          
          <p className="font-space text-white/60 text-base md:text-lg leading-relaxed mb-12 max-w-md">
            Leave your details for a free consultation. Our experienced Vaidyas will evaluate your prakriti and guide you toward lasting wellness.
          </p>

          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder=" "
                className="block w-full px-0 pt-4 pb-3 bg-transparent border-0 border-b border-white/20 text-white font-space text-lg outline-none focus:ring-0 focus:border-[var(--brand-sand)] transition-colors peer"
              />
              <label className="absolute inset-y-0 left-0 pt-4 pb-3 flex items-center font-space text-white/50 text-lg transition-transform duration-300 origin-left scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--brand-sand)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 pointer-events-none">
                Your Full Name
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder=" "
                className="block w-full px-0 pt-4 pb-3 bg-transparent border-0 border-b border-white/20 text-white font-space text-lg outline-none focus:ring-0 focus:border-[var(--brand-sand)] transition-colors peer"
              />
               <label className="absolute inset-y-0 left-0 pt-4 pb-3 flex items-center font-space text-white/50 text-lg transition-transform duration-300 origin-left scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[var(--brand-sand)] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 pointer-events-none">
                Phone Number
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 group relative inline-flex items-center justify-center px-10 py-5 bg-[var(--brand-forest)] text-white overflow-hidden shadow-xl transition-all hover:-translate-y-1 w-full sm:w-auto self-start"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 font-space text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-3">
                Request Call Back
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </form>

          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
               <span className="text-white/40 text-[10px] uppercase font-space tracking-[0.2em]">Contact Us Directly</span>
               <div className="flex flex-wrap gap-4">
                 {clinic.phone.map((num) => (
                    <a key={num} href={`tel:${num.replace(/\s/g, "")}`} className="font-space text-[var(--brand-sand)] hover:text-white transition-colors tracking-wider">
                      {num}
                    </a>
                 ))}
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Right Column: Imagery (Parallax Full Height) ── */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative overflow-hidden hidden md:block">
        <motion.div 
           style={{ y }}
           className="absolute -inset-[10%] w-[120%] h-[120%]"
        >
          <Image 
            src="/images/BACKGROUND/CTA-bg.webp"
            alt="Ayurvedic Journey"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
          />
          {/* Subtle gradient to blend the edge on desktop */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060a08] to-transparent hidden lg:block" />
        </motion.div>
      </div>

    </section>
  );
}

