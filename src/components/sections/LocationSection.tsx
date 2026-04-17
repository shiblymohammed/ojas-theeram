"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="relative bg-[var(--bg-primary)] pt-12 pb-32 overflow-hidden">
      
      {/* Decorative Brand Watermark */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.02] text-[15vw] leading-none font-gallient text-[var(--brand-forest)] -translate-y-1/2 translate-x-1/4 select-none">
        SANCTUARY
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[var(--brand-sand)]"></span>
            <span className="text-[var(--brand-sand)] tracking-[0.3em] text-xs font-bold uppercase">
              Visit Us
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[90px] text-[var(--brand-forest)] font-gallient leading-none">
            Find Your <br /> Way to Healing
          </h2>
        </motion.div>

        {/* Main Grid: Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Address Card */}
            <div className="group relative bg-[#060a08] p-8 md:p-10 border border-[var(--brand-sand)]/20 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-forest)]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-[var(--brand-sand)]/30 flex items-center justify-center bg-white/5">
                  <MapPin className="w-5 h-5 text-[var(--brand-sand)]" />
                </div>
                
                <div>
                  <h3 className="text-2xl text-[var(--brand-sand)] font-gallient mb-3">Our Location</h3>
                  <p className="font-space text-white/80 leading-relaxed text-sm md:text-base tracking-wide">
                    Ojas Theeram Ayurvedic Sanctuary<br/>
                    123 Healing Waters Lane,<br/>
                    Backwaters Valley, Kerala, India 688001
                  </p>
                </div>

                <a href="#" className="inline-flex items-center gap-2 group/btn mt-4">
                  <span className="text-[10px] md:text-xs tracking-[0.2em] font-space uppercase text-white/60 group-hover/btn:text-[var(--brand-sand)] transition-colors duration-300">
                    Get Directions
                  </span>
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[var(--brand-sand)] transition-colors duration-300">
                    <ArrowUpRight className="w-3 h-3 text-white/60 group-hover/btn:text-[var(--brand-sand)] transition-colors duration-300" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {/* Working Hours */}
              <div className="bg-[#f7f7eb] border border-[var(--brand-earth)]/20 p-8 rounded-3xl flex flex-col items-start justify-center transition-all duration-300 hover:shadow-lg hover:border-[var(--brand-earth)]/50">
                <Clock className="w-5 h-5 text-[var(--brand-forest)] mb-4" />
                <h4 className="text-sm font-space tracking-widest uppercase font-semibold text-[var(--brand-earth)] mb-2">Hours</h4>
                <p className="text-[var(--text-secondary)] font-space text-sm">Mon–Sun</p>
                <p className="text-[var(--brand-forest)] font-gallient text-xl mt-1">08:00 — 19:00</p>
              </div>

              {/* Contact Information */}
              <div className="bg-[#f7f7eb] border border-[var(--brand-earth)]/20 p-8 rounded-3xl flex flex-col items-start justify-center transition-all duration-300 hover:shadow-lg hover:border-[var(--brand-earth)]/50">
                <Phone className="w-5 h-5 text-[var(--brand-forest)] mb-4" />
                <h4 className="text-sm font-space tracking-widest uppercase font-semibold text-[var(--brand-earth)] mb-2">Connect</h4>
                <a href="tel:+919876543210" className="text-[var(--text-secondary)] font-space text-sm hover:text-[var(--brand-forest)] transition-colors">+91 98765 43210</a>
                <a href="mailto:namaste@ojastheeram.com" className="text-[var(--brand-forest)] font-space text-xs mt-2 hover:underline underline-offset-4">namaste@ojastheeram.com</a>
              </div>
            </div>
            
          </motion.div>

          {/* Right Column: Elaborate Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-7 relative min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group"
          >
            {/* The Map */}
            {/* For development, using a high-quality Google Maps embed centered over Kerala, India. 
                Applying CSS filtering drastically improves the design aspect to align strictly with the minimalist look. */}
            <div className="absolute inset-0 w-full h-full bg-[#f3eee8]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d76.5!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzAnMDAuMCJOIDc2wrAzMCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                // Deep customization via CSS filters to map the colors strictly to Ayurvedic tones (Sepia + Grayscale blend)
                className="w-full h-full object-cover saturate-0 sepia-[.3] hue-rotate-[190deg] opacity-70 group-hover:opacity-90 group-hover:sepia-0 group-hover:saturate-100 transition-all duration-1000 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]" 
              />
            </div>

            {/* Custom Overlay Compass HUD */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
              <div className="backdrop-blur-md bg-white/60 p-3 rounded-full border border-white/40 shadow-sm flex items-center justify-center">
                 <Mail className="w-4 h-4 text-[var(--brand-forest)]" />
              </div>
            </div>

            {/* Subliminal Map Grid Lines overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <div className="w-full h-[1px] bg-black/20 absolute top-1/4" />
              <div className="w-full h-[1px] bg-black/20 absolute top-3/4" />
              <div className="w-[1px] h-full bg-black/20 absolute left-1/4" />
              <div className="w-[1px] h-full bg-black/20 absolute left-3/4" />
            </div>

            {/* Coordinates Badge */}
            <div className="absolute bottom-6 left-6 pointer-events-none overflow-hidden rounded-2xl">
              <div className="backdrop-blur-xl bg-[#060a08]/80 text-[var(--brand-sand)] border border-[var(--brand-sand)]/20 px-6 py-4 flex flex-col">
                <span className="font-space text-[9px] tracking-[0.3em] uppercase mb-1 opacity-70">
                  Coordinates
                </span>
                <span className="font-space tracking-wider">
                  9°30'00.0"N 76°30'00.0"E
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
