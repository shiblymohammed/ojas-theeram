"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Send,
} from "lucide-react";
import { clinic } from "@/data/clinic";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: clinic.phone[0],
    secondaryValue: clinic.phone[1],
    href: `tel:${clinic.phone[0].replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${clinic.whatsapp}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: clinic.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`,
  },
  {
    icon: Clock,
    label: "Timings",
    value: "Mon — Sat: 9:00 AM – 7:00 PM",
    secondaryValue: "Sunday: By Appointment",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Ojas Theeram!\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setSubmitted(true);
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
                  "radial-gradient(circle at 70% 30%, rgba(212,200,175,0.3) 0%, transparent 50%)",
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
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-3xl"
          >
            We&apos;d love to
            <br />
            <span className="font-gallient italic text-[var(--brand-sand)]">
              hear
            </span>{" "}
            from you
          </motion.h1>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as any,
                }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-8 rounded-2xl border border-[var(--brand-forest)]/8 hover:border-[var(--brand-forest)]/20 hover:bg-white/60 transition-all duration-500 group h-full"
                  >
                    <div className="w-11 h-11 rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-forest)]/10 transition-colors">
                      <info.icon
                        className="w-5 h-5 text-[var(--brand-forest)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--brand-earth)] mb-2">
                      {info.label}
                    </p>
                    <p className="font-cormorant text-lg text-[var(--text-primary)]">
                      {info.value}
                    </p>
                    {info.secondaryValue && (
                      <p className="text-sm font-light text-[var(--text-secondary)] mt-1">
                        {info.secondaryValue}
                      </p>
                    )}
                  </a>
                ) : (
                  <div className="p-8 rounded-2xl border border-[var(--brand-forest)]/8 h-full">
                    <div className="w-11 h-11 rounded-full bg-[var(--brand-forest)]/5 flex items-center justify-center mb-5">
                      <info.icon
                        className="w-5 h-5 text-[var(--brand-forest)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--brand-earth)] mb-2">
                      {info.label}
                    </p>
                    <p className="font-cormorant text-lg text-[var(--text-primary)]">
                      {info.value}
                    </p>
                    {info.secondaryValue && (
                      <p className="text-sm font-light text-[var(--text-secondary)] mt-1">
                        {info.secondaryValue}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM + MAP ─── */}
      <section className="py-24 bg-[var(--bg-tertiary)]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <motion.div {...fadeUp}>
              <p className="text-[11px] font-space tracking-[0.3em] uppercase text-[var(--brand-earth)] mb-4">
                Send a Message
              </p>
              <h2 className="font-cormorant text-3xl md:text-4xl mb-8">
                Let us know how we can{" "}
                <span className="font-gallient italic text-[var(--brand-forest)]">
                  help
                </span>
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 rounded-2xl bg-white/60 text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-[var(--color-success)]" />
                  </div>
                  <h3 className="font-cormorant text-2xl">Message Sent!</h3>
                  <p className="text-sm font-light text-[var(--text-secondary)]">
                    We&apos;ll get back to you shortly. You can also reach us via
                    WhatsApp for a quicker response.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-space tracking-widest uppercase text-[var(--brand-forest)] hover:underline mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full bg-white/60 border border-[var(--brand-forest)]/10 focus:border-[var(--brand-forest)]/30 rounded-lg px-4 py-3.5 text-sm font-light outline-none transition-colors placeholder-[var(--text-alpha)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-white/60 border border-[var(--brand-forest)]/10 focus:border-[var(--brand-forest)]/30 rounded-lg px-4 py-3.5 text-sm font-light outline-none transition-colors placeholder-[var(--text-alpha)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/60 border border-[var(--brand-forest)]/10 focus:border-[var(--brand-forest)]/30 rounded-lg px-4 py-3.5 text-sm font-light outline-none transition-colors placeholder-[var(--text-alpha)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-space tracking-[0.25em] uppercase text-[var(--text-secondary)]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your health concerns or what you're looking for..."
                      className="w-full bg-white/60 border border-[var(--brand-forest)]/10 focus:border-[var(--brand-forest)]/30 rounded-lg px-4 py-3.5 text-sm font-light outline-none transition-colors resize-none placeholder-[var(--text-alpha)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 text-[10px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:gap-5 transition-all duration-300"
                  >
                    Send via WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map / Location Visual */}
            <motion.div {...fadeUp}>
              <div className="rounded-2xl overflow-hidden h-full min-h-[400px] bg-[var(--brand-forest)]/5 border border-[var(--brand-forest)]/10 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ojas Theeram Location"
                  className="absolute inset-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── QUICK CTA ─── */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="font-cormorant text-3xl md:text-4xl">
              Prefer a direct conversation?
            </h2>
            <p className="text-[var(--text-secondary)] font-light">
              Call us or send a WhatsApp message for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${clinic.phone[0].replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 px-8 py-4 text-[10px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:bg-[var(--brand-forest)]/90 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-[10px] font-space tracking-[0.2em] uppercase border border-[var(--brand-forest)] text-[var(--brand-forest)] rounded-full hover:bg-[var(--brand-forest)] hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 text-[10px] font-space tracking-[0.2em] uppercase border border-[var(--brand-forest)] text-[var(--brand-forest)] rounded-full hover:bg-[var(--brand-forest)] hover:text-white transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Book Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
