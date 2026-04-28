"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUpRight, Mail } from "lucide-react";
import { clinic } from "@/data/clinic";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const MAPS_URL = `https://maps.google.com/maps?q=13%C2%B000'53.5%22N+77%C2%B032'49.2%22E&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const DIRECTIONS_URL = `https://maps.google.com/maps?q=13%C2%B000'53.5%22N+77%C2%B032'49.2%22E`;
const COORDINATES = `13°00'53.5"N  77°32'49.2"E`;

export default function LocationSection() {
  return (
    <section
      id="location"
      className="bg-transparent py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 md:w-12 h-[1px] bg-[var(--brand-sand)]" />
            <span className="text-[var(--brand-sand)] text-[9px] md:text-[10px] tracking-[0.45em] font-space uppercase">
              Visit Us
            </span>
          </div>
          <h2 className="font-gallient text-5xl md:text-7xl lg:text-[90px] text-white leading-[0.9]">
            Journey to <br className="hidden md:block" />
            <span className="text-[var(--brand-sand)] italic">Healing</span>
          </h2>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* LEFT: Info cards (2 cols wide on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Address card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative bg-[#0d1510] border border-white/8 rounded-2xl p-7 md:p-8 overflow-hidden hover:border-[var(--brand-sand)]/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-sand)]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full border border-[var(--brand-sand)]/25 flex items-center justify-center bg-white/4 mb-6">
                  <MapPin className="w-4 h-4 text-[var(--brand-sand)]" />
                </div>
                <h3 className="font-gallient text-2xl text-white mb-3">Ojas Theeram</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed mb-5">
                  {clinic.address}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="font-space text-[9px] tracking-widest text-[var(--brand-sand)]/70 uppercase">
                    {COORDINATES}
                  </span>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[9px] font-space tracking-[0.2em] uppercase text-white/70 hover:text-[var(--brand-sand)] transition-colors duration-300 group/nav"
                  >
                    Navigate
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hours + Phone row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-[#0d1510] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors duration-400"
              >
                <Clock className="w-4 h-4 text-[var(--brand-sand)] mb-4" />
                <p className="font-space text-[8px] tracking-[0.25em] uppercase text-white/35 mb-2">Hours</p>
                <p className="font-sans text-white/70 text-xs mb-1">Mon — Sun</p>
                <p className="font-gallient text-xl text-[var(--brand-sand)]">08:00 — 19:00</p>
              </motion.div>

              <motion.div
                {...fadeUp}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="bg-[#0d1510] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors duration-400"
              >
                <Phone className="w-4 h-4 text-[var(--brand-sand)] mb-4" />
                <p className="font-space text-[8px] tracking-[0.25em] uppercase text-white/35 mb-2">Call Us</p>
                <a
                  href={`tel:${clinic.phone[0].replace(/\s/g, "")}`}
                  className="font-sans text-white/80 text-sm hover:text-[var(--brand-sand)] transition-colors duration-300 block leading-snug"
                >
                  {clinic.phone[0]}
                </a>
              </motion.div>
            </div>

            {/* Email */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-[#0d1510] border border-white/8 rounded-2xl px-7 py-5 flex items-center gap-5 hover:border-white/15 transition-colors duration-400"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-[var(--brand-sand)]" />
              </div>
              <a
                href="mailto:namaste@ojastheeram.com"
                className="font-space text-[11px] tracking-wide text-white/60 hover:text-white transition-colors duration-300 break-all"
              >
                namaste@ojastheeram.com
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Map (3 cols wide on lg) */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60"
            style={{ height: "clamp(280px, 55vw, 580px)" }}
          >
            <iframe
              src={MAPS_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ojas Theeram Location"
              className="w-full h-full saturate-0 sepia-[.25] hue-rotate-[175deg] opacity-80 hover:opacity-100 hover:saturate-[.4] hover:sepia-[.1] transition-all duration-700"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

