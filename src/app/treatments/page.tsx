"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Activity,
  Heart,
  Scale,
  Wind,
  User,
  Droplets,
  Brain,
  Leaf,
  Moon,
} from "lucide-react";
import {
  panchakarma,
  therapies,
  conditions,
  advancedCare,
} from "@/data/treatments";
import BookingModal from "@/components/ui/BookingModal";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

const iconMap: Record<string, React.ElementType> = {
  Activity,
  Heart,
  Scale,
  Wind,
  User,
  Droplets,
  Brain,
  Leaf,
  Moon,
};

export default function TreatmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselected, setPreselected] = useState("");

  const openWith = (serviceId: string) => {
    setPreselected(serviceId);
    setModalOpen(true);
  };

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[var(--brand-forest)]">
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 70%, rgba(212,200,175,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,200,175,0.2) 0%, transparent 40%)",
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
            Our Treatments
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-4xl"
          >
            Authentic therapies
            <br />
            for{" "}
            <span className="font-gallient italic text-[var(--brand-sand)]">
              complete
            </span>{" "}
            wellness
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/60 font-light mt-6 max-w-lg text-sm md:text-base"
          >
            From Panchakarma detoxification to specialized therapeutic
            treatments — discover the full spectrum of traditional Ayurvedic
            healing.
          </motion.p>
        </div>
      </section>

      {/* ─── PANCHAKARMA ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Introduction */}
            <motion.div {...fadeUp} className="lg:sticky lg:top-32 space-y-6">
              <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)]">
                Panchakarma
              </p>
              <h2 className="font-cormorant text-3xl md:text-5xl leading-tight">
                The five sacred
                <br />
                <span className="font-gallient italic text-[var(--brand-forest)]">
                  purification
                </span>{" "}
                rituals
              </h2>
              <p className="text-[var(--text-secondary)] font-light leading-relaxed">
                Panchakarma is the cornerstone of Ayurvedic detoxification — a
                series of five therapeutic procedures designed to eliminate deep
                seated toxins, restore metabolic balance, and rejuvenate the
                body at the cellular level.
              </p>
              <p className="text-[var(--text-secondary)] font-light leading-relaxed text-sm">
                Each Panchakarma treatment at Ojas Theeram is administered under
                the direct supervision of our B.A.M.S physician, using
                authentic herbal formulations prepared in-house.
              </p>
            </motion.div>

            {/* Right: Cards */}
            <div className="space-y-5">
              {panchakarma.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1] as any,
                  }}
                  className="group p-8 rounded-2xl border border-[var(--brand-forest)]/8 hover:border-[var(--brand-forest)]/20 hover:bg-white/50 transition-all duration-500"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center text-xs font-space font-medium text-[var(--brand-forest)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-cormorant text-xl md:text-2xl">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 mt-3 ml-11">
                        <span className="flex items-center gap-1.5 text-xs text-[var(--brand-earth)]">
                          <Clock className="w-3.5 h-3.5" />
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-gallient text-2xl md:text-3xl text-[var(--brand-forest)]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={() => openWith(`pk-${item.id}`)}
                        className="block mt-2 text-[9px] font-space tracking-[0.15em] uppercase text-[var(--brand-earth)] hover:text-[var(--brand-forest)] transition-colors"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── AYURVEDA THERAPIES ─── */}
      <section className="py-24 bg-[var(--brand-forest)] text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-sand)] mb-4">
              Ayurveda Therapies
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-2xl">
              Therapeutic{" "}
              <span className="font-gallient italic text-[var(--brand-sand)]">
                healing
              </span>{" "}
              sessions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapies.map((therapy, i) => (
              <motion.div
                key={therapy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-7 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-500 cursor-pointer"
                onClick={() => openWith(`th-${therapy.id}`)}
              >
                <h3 className="font-cormorant text-lg md:text-xl mb-1">
                  {therapy.name}
                </h3>
                {therapy.description && (
                  <p className="text-xs text-white/50 font-light mb-4">
                    {therapy.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-white/8">
                  <span className="font-gallient text-xl text-[var(--brand-sand)]">
                    ₹{therapy.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[9px] font-space tracking-widest uppercase text-[var(--brand-sand)]/60 group-hover:text-[var(--brand-sand)] transition-colors">
                    Book →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONDITIONS WE TREAT ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              Conditions We Treat
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-2xl mx-auto">
              Holistic solutions for{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                modern
              </span>{" "}
              ailments
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, i) => {
              const IconComponent = iconMap[condition.icon] || Leaf;
              return (
                <motion.div
                  key={condition.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group p-8 rounded-2xl border border-[var(--brand-forest)]/6 hover:border-[var(--brand-forest)]/15 hover:bg-white/40 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-forest)]/10 transition-colors duration-500">
                    <IconComponent
                      className="w-5 h-5 text-[var(--brand-forest)]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-cormorant text-lg md:text-xl mb-2">
                    {condition.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                    {condition.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ADVANCED CARE ─── */}
      <section className="py-24 bg-[var(--bg-tertiary)]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              Advanced Care
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-2xl">
              Specialized{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                clinical
              </span>{" "}
              programs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedCare.map((care, i) => (
              <motion.div
                key={care.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
                className="group rounded-2xl overflow-hidden bg-white/60 border border-[var(--brand-forest)]/6 hover:border-[var(--brand-forest)]/15 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={care.image}
                    alt={care.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-cormorant text-xl md:text-2xl mb-2">
                    {care.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-light mb-5">
                    {care.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {care.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] font-space tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--brand-forest)]/5 text-[var(--brand-forest)]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <motion.div {...fadeUp} className="space-y-8">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)]">
              Start Healing Today
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl lg:text-6xl leading-tight">
              Every journey begins with a{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                single step
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] font-light max-w-lg mx-auto">
              Consult with our Ayurvedic physician to find the treatment plan
              that&apos;s right for your unique constitution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setPreselected("");
                  setModalOpen(true);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:gap-5 transition-all duration-300"
              >
                Book a Session
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-space tracking-[0.2em] uppercase border border-[var(--brand-forest)] text-[var(--brand-forest)] rounded-full hover:bg-[var(--brand-forest)] hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedTreatment={preselected}
      />
    </main>
  );
}
