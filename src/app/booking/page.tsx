"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { packages } from "@/data/packages";
import { panchakarma, therapies } from "@/data/treatments";
import BookingModal from "@/components/ui/BookingModal";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

const benefits = [
  {
    icon: Shield,
    title: "Authentic Treatments",
    description:
      "Every therapy follows traditional Kerala Ayurvedic protocols under expert physician guidance.",
  },
  {
    icon: Sparkles,
    title: "Premium Experience",
    description:
      "Handcrafted herbal oils, serene ambiance, and personalized attention for a restorative session.",
  },
  {
    icon: CheckCircle,
    title: "Easy Booking",
    description:
      "Select your service, pick a time, and confirm instantly via WhatsApp — no phone tag needed.",
  },
];

export default function BookingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselected, setPreselected] = useState("");

  const openWith = (serviceId: string) => {
    setPreselected(serviceId);
    setModalOpen(true);
  };

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[var(--brand-forest)]">
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 40% 60%, rgba(212,200,175,0.3) 0%, transparent 50%)",
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
            Reserve Your Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-3xl"
          >
            Begin your
            <br />
            <span className="font-gallient italic text-[var(--brand-sand)]">
              healing
            </span>{" "}
            journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 font-light mt-6 max-w-lg text-sm md:text-base"
          >
            Choose from our curated Ayurvedic packages and therapies. Each
            session is tailored to restore balance and vitality.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => {
              setPreselected("");
              setModalOpen(true);
            }}
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 text-[10px] font-space tracking-[0.2em] uppercase bg-[var(--brand-sand)] text-[var(--brand-forest)] rounded-full hover:bg-white transition-all duration-300"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              Curated Packages
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-xl">
              Signature{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                wellness
              </span>{" "}
              packages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
                className="group p-8 rounded-2xl border border-[var(--brand-forest)]/8 hover:border-[var(--brand-forest)]/20 hover:bg-white/50 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] px-3 py-1.5 rounded-full border border-[var(--brand-earth)]/20">
                    Package {pkg.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-[var(--brand-earth)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-light">{pkg.duration}</span>
                  </div>
                </div>

                <h3 className="font-cormorant text-xl md:text-2xl leading-snug mb-4 flex-1">
                  {pkg.title}
                </h3>

                <div className="flex items-end justify-between pt-4 border-t border-[var(--brand-forest)]/5">
                  <div>
                    <span className="font-gallient text-3xl text-[var(--brand-forest)]">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[var(--brand-earth)] ml-1">
                      /session
                    </span>
                  </div>
                  <button
                    onClick={() => openWith(`pkg-${pkg.id}`)}
                    className="text-[10px] font-space tracking-[0.15em] uppercase text-[var(--brand-forest)] hover:text-white hover:bg-[var(--brand-forest)] px-4 py-2 rounded-full border border-[var(--brand-forest)]/20 transition-all duration-300"
                  >
                    Book →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PANCHAKARMA ─── */}
      <section className="py-24 bg-[var(--brand-forest)] text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-sand)] mb-4">
              Panchakarma Detox
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-xl">
              Deep{" "}
              <span className="font-gallient italic text-[var(--brand-sand)]">
                purification
              </span>{" "}
              therapies
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {panchakarma.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-500 flex items-center justify-between gap-6"
              >
                <div>
                  <h3 className="font-cormorant text-xl md:text-2xl mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light">
                    {item.duration} Program
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-gallient text-2xl text-[var(--brand-sand)]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => openWith(`pk-${item.id}`)}
                    className="block mt-2 text-[9px] font-space tracking-[0.15em] uppercase text-[var(--brand-sand)] hover:text-white transition-colors"
                  >
                    Book Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDIVIDUAL THERAPIES ─── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              Individual Therapies
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl max-w-xl">
              Ayurvedic{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                therapeutic
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
                className="group p-6 rounded-xl border border-[var(--brand-forest)]/6 hover:border-[var(--brand-forest)]/15 hover:bg-white/40 transition-all duration-500 cursor-pointer"
                onClick={() => openWith(`th-${therapy.id}`)}
              >
                <h3 className="font-cormorant text-lg mb-1">{therapy.name}</h3>
                {therapy.description && (
                  <p className="text-xs text-[var(--text-secondary)] font-light mb-3">
                    {therapy.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-gallient text-xl text-[var(--brand-forest)]">
                    ₹{therapy.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[9px] font-space tracking-widest uppercase text-[var(--brand-earth)] group-hover:text-[var(--brand-forest)] transition-colors">
                    Select →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BOOK WITH US ─── */}
      <section className="py-24 bg-[var(--bg-tertiary)]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
              Why Book With Us
            </p>
            <h2 className="font-cormorant text-3xl md:text-5xl">
              Your wellness,{" "}
              <span className="font-gallient italic text-[var(--brand-forest)]">
                our priority
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center mb-6">
                  <benefit.icon
                    className="w-6 h-6 text-[var(--brand-forest)]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-cormorant text-xl md:text-2xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
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
