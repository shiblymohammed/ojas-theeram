"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clinic } from "@/data/clinic";

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-32">
      {/* ── Full-bleed Background ── */}
      <Image
        src="/images/hero/leaves.jpg"
        alt="Lush Ayurvedic leaves"
        fill
        className="object-cover"
        quality={100}
        sizes="100vw"
      />

      {/* ── Very light overlay — just enough for text contrast ── */}
      <div className="absolute inset-0 bg-[#0a1a14]/20" />



      {/* ── Top Heading Area ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-16 md:mb-20 px-6"
      >
        <span className="block w-12 h-[1px] bg-[#8B9D83]/60 mx-auto mb-6" />
        <p className="uppercase tracking-[0.35em] text-[#8B9D83] text-[11px] font-barlow mb-5">
          Begin Your Healing Journey
        </p>
        <h2 className="font-gallient text-5xl md:text-7xl lg:text-[82px] text-white/95 leading-[1.05]">
          Get in Touch
        </h2>
      </motion.div>

      {/* ── Glass Cards Grid ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {/* ─── LEFT CARD: Offer / Wellness Guide ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.12] bg-black/25 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#8B9D83] font-barlow mb-5 border border-[#8B9D83]/30 px-3 py-1 rounded-full">
                Free Consultation
              </span>

              <h3 className="font-gallient text-3xl md:text-[42px] text-white leading-[1.15] mb-5">
                Book now &amp; get a<br />
                personalised wellness<br />
                assessment
              </h3>

              <p className="font-barlow text-white/50 text-sm leading-relaxed max-w-sm mb-8">
                Our experienced Ayurvedic physicians will evaluate your prakriti
                (constitution) and create a customised treatment plan tailored
                to your body and mind.
              </p>

              {/* Call buttons */}
              <div className="flex flex-wrap gap-3">
                {clinic.phone.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white/80 font-barlow text-xs uppercase tracking-[0.15em] transition-all duration-400 hover:bg-white/10 hover:border-white/30 hover:text-white"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {num}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative botanical element – bottom-right */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.06] pointer-events-none">
              <Image
                src="/images/elements/flower-line-art.png"
                alt=""
                fill
                className="object-contain rotate-[30deg]"
              />
            </div>
          </motion.div>

          {/* ─── RIGHT CARD: Consultation Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-black/25 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#8B9D83] font-barlow mb-5 border border-[#8B9D83]/30 px-3 py-1 rounded-full">
                  Any Questions?
                </span>

                <h3 className="font-gallient text-3xl md:text-[42px] text-white leading-[1.15] mb-3">
                  Leave your details &amp;<br />
                  we&apos;ll call you back
                </h3>

                <p className="font-barlow text-white/40 text-sm">
                  for a free consultation
                </p>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4 mt-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 font-barlow text-sm tracking-wider outline-none focus:border-[#8B9D83]/50 focus:bg-white/[0.08] transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 font-barlow text-sm tracking-wider outline-none focus:border-[#8B9D83]/50 focus:bg-white/[0.08] transition-all duration-300"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2C4A3B] hover:bg-[#3a6350] text-white font-barlow uppercase tracking-[0.2em] text-sm py-4 rounded-xl transition-all duration-400 mt-2 border border-[#2C4A3B] hover:border-[#8B9D83]/40"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Address Line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-16 text-center px-6"
      >
        <p className="font-barlow text-white/30 text-xs tracking-[0.2em] uppercase">
          {clinic.address}
        </p>
      </motion.div>
    </section>
  );
}
