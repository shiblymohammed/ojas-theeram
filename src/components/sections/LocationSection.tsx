"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function LocationSection() {
  const mapCoordinates = "13°00'53.5\"N 77°32'49.2\"E";
  const mapUrl = `https://maps.google.com/maps?q=13°00'53.5"N%2077°32'49.2"E&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="relative w-full min-h-0 lg:h-[120vh] bg-[#050806] overflow-hidden flex items-center py-24 lg:py-0">
      
      {/* 1. FULLSCREEN MAP BACKGROUND (DESKTOP ONLY) */}
      <div className="hidden lg:block absolute inset-x-0 bottom-0 top-0 lg:inset-0 w-full h-[150%] lg:h-full z-0 pointer-events-auto origin-top transition-transform">
        <iframe 
          src={mapUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy"
          className="w-full h-full object-cover saturate-0 sepia-[.3] hue-rotate-[190deg] opacity-70 transition-all duration-[2000ms] ease-out lg:hover:opacity-100 lg:hover:saturate-50 lg:hover:sepia-[.1]" 
        />
        {/* Cinematic shadows to fade out edges and house the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-[#050806] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050806] via-[#050806]/80 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row h-full items-center pointer-events-none">
        
        {/* Left Focus Area: Contact Bento Board */}
        <div className="w-full lg:w-5/12 flex flex-col gap-6 pt-10 pb-20 lg:pb-0 lg:py-0 pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 md:w-12 h-[1px] bg-[var(--brand-sand)]"></span>
              <span className="text-[var(--brand-sand)] tracking-[0.4em] text-[9px] md:text-xs font-bold uppercase">
                Visit Sanctuary
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[85px] text-white font-gallient leading-[0.9] drop-shadow-2xl">
              Journey to <br className="hidden md:block" /> Healing
            </h2>
          </motion.div>

          {/* MOBILE ONLY: INLINE EMBED MAP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:hidden w-full h-[320px] rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/10 mb-2 pointer-events-auto"
          >
             <iframe 
                src={mapUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                className="w-full h-full object-cover saturate-0 sepia-[.2] hue-rotate-[190deg]" 
              />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group relative bg-[#0b0f0c]/80 backdrop-blur-2xl p-8 md:p-10 border border-[var(--brand-sand)]/20 overflow-hidden rounded-[2rem] shadow-2xl"
          >
            {/* Elegant glowing swipe on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-sand)]/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col items-start gap-8">
              <div className="w-14 h-14 rounded-full border border-[var(--brand-sand)]/30 flex items-center justify-center bg-white/5 backdrop-blur-md shadow-inner">
                <MapPin className="w-5 h-5 text-[var(--brand-sand)]" />
              </div>
              
              <div>
                <h3 className="text-3xl text-white font-gallient mb-4 tracking-wide drop-shadow-md">Ojas Theeram</h3>
                <p className="font-sans text-white/50 leading-relaxed text-sm md:text-base pr-8 mb-4">
                  {clinic.address}
                </p>
                <div className="inline-block px-4 py-2 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
                  <span className="font-space text-[10px] tracking-widest text-[var(--brand-sand)] uppercase">
                    {mapCoordinates}
                  </span>
                </div>
              </div>

              <a 
                href={`https://maps.google.com/maps?q=13°00'53.5"N%2077°32'49.2"E`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group/btn mt-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full transition-all duration-300"
              >
                <span className="text-[9px] md:text-[10px] tracking-[0.25em] font-space uppercase text-white/90 group-hover/btn:text-[var(--brand-sand)] transition-colors duration-300">
                  Navigate
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover/btn:text-[var(--brand-sand)] transition-colors duration-300 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Working Hours */}
            <div className="bg-[#0b0f0c]/80 backdrop-blur-xl border border-white/10 px-8 py-10 rounded-[2rem] flex flex-col items-start justify-center transition-all duration-300 hover:border-white/30 shadow-xl">
              <Clock className="w-5 h-5 text-[var(--brand-sand)] mb-5" />
              <h4 className="text-[9px] font-space tracking-[0.25em] uppercase text-white/40 mb-3">Hours</h4>
              <p className="text-white/80 font-sans text-xs tracking-wider mb-2">Mon — Sun</p>
              <p className="text-[var(--brand-sand)] font-gallient text-2xl">08:00 — 19:00</p>
            </div>

            {/* Contact Information */}
            <div className="bg-[#0b0f0c]/80 backdrop-blur-xl border border-white/10 px-8 py-10 rounded-[2rem] flex flex-col items-start justify-center transition-all duration-300 hover:border-white/30 shadow-xl">
              <Phone className="w-5 h-5 text-[var(--brand-sand)] mb-5" />
              <h4 className="text-[9px] font-space tracking-[0.25em] uppercase text-white/40 mb-3">Reach Us</h4>
              <a href={`tel:${clinic.phone[0].replace(/\s/g, '')}`} className="text-white/80 font-sans text-sm tracking-widest hover:text-[var(--brand-sand)] transition-colors mb-2">
                {clinic.phone[0]}
              </a>
              <a href="mailto:namaste@ojastheeram.com" className="text-white/50 font-space text-[10px] tracking-wide hover:underline underline-offset-4 hover:text-white transition-colors">
                namaste@ojastheeram.com
              </a>
            </div>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}
