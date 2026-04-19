"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Shield, Sparkles, ArrowRight } from "lucide-react";
import { leadPhysician } from "@/data/doctors";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

const values = [
  {
    icon: Leaf,
    title: "Rooted in Tradition",
    description:
      "Our treatments follow the Ashtanga Hridaya and Charaka Samhita — the foundational texts of Ayurvedic medicine passed down through millennia.",
  },
  {
    icon: Heart,
    title: "Personalized Healing",
    description:
      "Every individual is unique. We assess your Prakriti (constitution) and Vikriti (imbalance) to craft treatments tailored specifically to your body.",
  },
  {
    icon: Shield,
    title: "Clinical Expertise",
    description:
      "Our team combines traditional knowledge with modern clinical practices, ensuring safety and efficacy in every therapeutic session.",
  },
  {
    icon: Sparkles,
    title: "Holistic Wellness",
    description:
      "Beyond treating symptoms, we address the root cause — balancing mind, body, and spirit for lasting transformation and vitality.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[var(--brand-forest)]">
          {/* Subtle decorative pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(212,200,175,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,200,175,0.2) 0%, transparent 40%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pb-20 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-sand)] mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-3xl"
          >
            Where ancient
            <br />
            <span className="font-gallient italic text-[var(--brand-sand)]">
              wisdom
            </span>{" "}
            meets
            <br />
            modern care
          </motion.h1>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div {...fadeUp} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--brand-forest)]/5">
                <Image
                  src="/images/other/intro-main.webp"
                  alt="Ayurvedic therapy session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-float"
              >
                <span className="font-gallient text-4xl text-[var(--brand-forest)]">
                  5000+
                </span>
                <p className="text-[10px] font-space tracking-[0.2em] uppercase text-[var(--brand-earth)] mt-1">
                  Years of Tradition
                </p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="space-y-8">
              <motion.p
                {...fadeUp}
                className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)]"
              >
                Our Philosophy
              </motion.p>
              <motion.h2
                {...fadeUp}
                className="font-cormorant text-3xl md:text-4xl lg:text-5xl leading-tight"
              >
                Healing is not just the absence of disease — it is the presence
                of{" "}
                <span className="font-gallient italic text-[var(--brand-forest)]">
                  vitality
                </span>
              </motion.h2>
              <motion.p
                {...fadeUp}
                className="text-[var(--text-secondary)] leading-relaxed font-light text-base md:text-lg"
              >
                At Ojas Theeram, we believe that true wellness emerges when the
                body, mind, and spirit are in harmony. Our name itself carries
                this vision —{" "}
                <strong className="font-medium">&quot;Ojas&quot;</strong> meaning
                vital life energy, and{" "}
                <strong className="font-medium">&quot;Theeram&quot;</strong>{" "}
                meaning the shore or destination.
              </motion.p>
              <motion.p
                {...fadeUp}
                className="text-[var(--text-secondary)] leading-relaxed font-light"
              >
                We are the destination where your vital energy is restored
                through authentic Panchakarma detoxification, therapeutic
                massages, and personalized Ayurvedic consultations — all guided
                by experienced physicians trained in traditional Kerala
                Ayurveda.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

// ... existing code ...

      {/* ─── DOCTOR SECTION ─── */}
      <section className="py-24 bg-[var(--brand-forest)] text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <motion.p
                {...fadeUp}
                className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-sand)]"
              >
                Meet Our Doctor
              </motion.p>
              <motion.h2
                {...fadeUp}
                className="font-cormorant text-3xl md:text-4xl lg:text-5xl leading-tight"
              >
                {leadPhysician.name},
                <br />
                <span className="font-gallient italic text-[var(--brand-sand)]">
                  {leadPhysician.role}
                </span>
              </motion.h2>
              <motion.p
                {...fadeUp}
                className="text-white/80 leading-relaxed font-light"
              >
                {leadPhysician.biography}
              </motion.p>
              <motion.div {...fadeUp} className="flex flex-wrap gap-6 pt-4">
                <div className="space-y-1">
                  <span className="font-gallient text-3xl text-[var(--brand-sand)]">
                    {leadPhysician.qualifications}
                  </span>
                  <p className="text-[10px] font-space tracking-widest uppercase text-white/60">
                    Qualified Physician
                  </p>
                </div>
                {leadPhysician.stats?.map((stat, index) => (
                  <div key={index} className="flex gap-6 items-center">
                    <div className="w-px bg-white/20 h-8" />
                    <div className="space-y-1">
                      <span className="font-gallient text-3xl text-[var(--brand-sand)]">
                        {stat.value}
                      </span>
                      <p className="text-[10px] font-space tracking-widest uppercase text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              {...fadeUp}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden order-1 lg:order-2"
            >
              <Image
                src={leadPhysician.image}
                alt={leadPhysician.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-forest)]/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ─── VALUES ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              What Guides Us
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
              The pillars of our{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                practice
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
                className="group p-8 md:p-10 rounded-2xl border border-[var(--brand-forest)]/8 hover:border-[var(--brand-forest)]/20 hover:bg-white/50 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center mb-6 group-hover:bg-[var(--brand-forest)]/10 transition-colors duration-500">
                  <value.icon
                    className="w-5 h-5 text-[var(--brand-forest)]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-cormorant text-xl md:text-2xl mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-light text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 bg-[var(--bg-tertiary)]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <motion.div {...fadeUp} className="space-y-8">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)]">
              Begin Your Journey
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl lg:text-6xl leading-tight">
              Ready to experience
              <br />
              <span className="font-gallient italic text-[var(--brand-forest)]">
                authentic Ayurveda?
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] font-light max-w-lg mx-auto leading-relaxed">
              Book a consultation with our physician and take the first step
              toward a balanced, vibrant life.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:gap-5 transition-all duration-300"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
