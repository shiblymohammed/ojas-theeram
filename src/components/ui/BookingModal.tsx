"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, ChevronDown } from "lucide-react";
import { panchakarma, therapies } from "@/data/treatments";
import { packages } from "@/data/packages";
import { clinic } from "@/data/clinic";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: string;
}

const allServices = [
  ...packages.map((p) => ({
    id: `pkg-${p.id}`,
    name: p.title,
    price: p.price,
    category: "Packages",
  })),
  ...panchakarma.map((p) => ({
    id: `pk-${p.id}`,
    name: p.name,
    price: p.price,
    category: "Panchakarma",
  })),
  ...therapies.map((t) => ({
    id: `th-${t.id}`,
    name: t.name,
    price: t.price,
    category: "Therapies",
  })),
];

export default function BookingModal({
  isOpen,
  onClose,
  preselectedTreatment,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: preselectedTreatment || "",
    date: "",
    time: "",
    notes: "",
  });

  const [step, setStep] = useState(1);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Update preselected treatment
  useEffect(() => {
    if (preselectedTreatment) {
      setFormData((prev) => ({ ...prev, service: preselectedTreatment }));
    }
  }, [preselectedTreatment]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedService = allServices.find((s) => s.id === formData.service);
    const serviceName = selectedService ? selectedService.name : formData.service;

    const message = `Hello Ojas Theeram! I'd like to book an appointment.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Service:* ${serviceName}\n*Preferred Date:* ${formData.date}\n*Preferred Time:* ${formData.time}${formData.notes ? `\n*Notes:* ${formData.notes}` : ""}`;

    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onClose();
  };

  const canProceed =
    step === 1
      ? formData.name && formData.phone
      : formData.service && formData.date && formData.time;

  // Group services by category
  const grouped = allServices.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof allServices>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            className="relative w-full max-w-lg bg-[var(--bg-primary)] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative px-8 pt-8 pb-4 border-b border-[var(--brand-forest)]/10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--brand-forest)]/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-[var(--text-primary)]" />
              </button>
              <h2 className="font-cormorant text-2xl md:text-3xl text-[var(--brand-forest)]">
                Book Your Session
              </h2>
              <p className="text-xs font-space tracking-widest uppercase text-[var(--brand-earth)] mt-1">
                Step {step} of 2 — {step === 1 ? "Your Details" : "Select Service"}
              </p>

              {/* Progress indicator */}
              <div className="flex gap-2 mt-4">
                <div
                  className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                    step >= 1 ? "bg-[var(--brand-forest)]" : "bg-[var(--brand-forest)]/15"
                  }`}
                />
                <div
                  className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                    step >= 2 ? "bg-[var(--brand-forest)]" : "bg-[var(--brand-forest)]/15"
                  }`}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        <User className="w-3.5 h-3.5" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] placeholder-[var(--text-alpha)] py-3 outline-none transition-colors font-light text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        <Phone className="w-3.5 h-3.5" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] placeholder-[var(--text-alpha)] py-3 outline-none transition-colors font-light text-sm"
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special requests or conditions..."
                        rows={3}
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] placeholder-[var(--text-alpha)] py-3 outline-none transition-colors font-light text-sm resize-none"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Service Selection */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        <ChevronDown className="w-3.5 h-3.5" />
                        Select Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] py-3 outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Choose a treatment or package...</option>
                        {Object.entries(grouped).map(([category, services]) => (
                          <optgroup key={category} label={category}>
                            {services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name} — ₹{s.price.toLocaleString("en-IN")}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        <Calendar className="w-3.5 h-3.5" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] py-3 outline-none transition-colors font-light text-sm"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-space tracking-widest uppercase text-[var(--text-secondary)]">
                        <Clock className="w-3.5 h-3.5" />
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b-2 border-[var(--brand-forest)]/15 focus:border-[var(--brand-forest)] text-[var(--text-primary)] py-3 outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select a time slot...</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-[var(--brand-forest)]/10 flex items-center justify-between gap-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-space tracking-widest uppercase text-[var(--brand-earth)] hover:text-[var(--brand-forest)] transition-colors"
                >
                  ← Back
                </button>
              )}
              <div className="flex-1" />
              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceed}
                  className="px-8 py-3 text-[10px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:bg-[var(--brand-forest)]/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  className="px-8 py-3 text-[10px] font-space tracking-[0.2em] uppercase bg-[var(--brand-forest)] text-white rounded-full hover:bg-[var(--brand-forest)]/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Book via WhatsApp
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
