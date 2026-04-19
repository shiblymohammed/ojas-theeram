"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-forest)] text-[var(--bg-tertiary)] pt-24 pb-8 overflow-hidden relative">
      {/* Decorative large watermark text (Desktop Only) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.03] select-none hidden md:flex justify-center translate-y-1/4">
        <span className="font-cormorant text-[15vw] leading-none whitespace-nowrap">Ojas Theeram</span>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <Link href="/" className="block">
              <span className="font-gallient text-5xl md:text-4xl text-white">Ojas Theeram</span>
            </Link>
            <p className="text-[var(--bg-tertiary)]/80 text-sm leading-relaxed max-w-xs font-light hidden md:block">
              A sanctuary of holistic healing deeply rooted in the ancient traditions of Ayurvedic wisdom.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--brand-forest)] transition-all text-xs font-semibold">
                IG
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--brand-forest)] transition-all text-xs font-semibold">
                FB
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--brand-forest)] transition-all text-xs font-semibold">
                X
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="hidden md:block">
            <h4 className="text-xl font-cormorant text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Treatments', href: '/treatments' },
                { name: 'Packages & Booking', href: '/booking' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="inline-block text-[var(--bg-tertiary)]/80 text-sm hover:text-white transition-colors relative group font-light">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--brand-sand)] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="hidden md:block">
            <h4 className="text-xl font-cormorant text-white mb-6">Get in Touch</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[var(--brand-sand)] shrink-0 mt-0.5" />
                <span className="text-[var(--bg-tertiary)]/80 text-sm leading-relaxed font-light">
                  {clinic.address}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[var(--brand-sand)] shrink-0" />
                <span className="text-[var(--bg-tertiary)]/80 text-sm font-light">{clinic.phone[0]}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[var(--brand-sand)] shrink-0" />
                <span className="text-[var(--bg-tertiary)]/80 text-sm font-light">info@ojastheeram.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="hidden lg:block">
            <h4 className="text-xl font-cormorant text-white mb-6">Newsletter</h4>
            <p className="text-[var(--bg-tertiary)]/80 text-sm mb-6 leading-relaxed font-light">
              Subscribe to receive insights on Ayurvedic living, wellness tips, and exclusive offers.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 px-0 py-3 focus:outline-none focus:border-[var(--brand-sand)] transition-colors text-sm font-light"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--brand-sand)] transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-[var(--bg-tertiary)]/60 text-xs font-light tracking-wide text-center">
            &copy; {currentYear} Ojas Theeram. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[var(--bg-tertiary)]/60 text-[10px] md:text-xs font-light tracking-widest uppercase md:normal-case">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
