"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/60 backdrop-blur-xl border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between w-full px-6 md:px-12">
          {/* Left: Logo + Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo_only.png"
              alt="Ojas Theeram"
              width={38}
              height={38}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-gallient text-xl text-white tracking-wide">
                Ojas Theeram
              </span>
              <span className="text-[9px] font-space tracking-[0.25em] uppercase text-[var(--brand-sand)]/80 mt-0.5">
                Ayurveda Wellness
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] font-space tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[var(--brand-sand)]/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-[var(--brand-sand)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Book Now CTA + Mobile Hamburger */}
          <div className="flex items-center gap-5">
            <Link
              href="/booking"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-space tracking-[0.2em] uppercase text-[var(--brand-forest)] bg-[var(--brand-sand)] rounded-full hover:bg-white transition-all duration-300 font-medium"
            >
              Book Now
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-7 h-5 flex flex-col justify-between"
              aria-label="Toggle menu"
            >
              <span
                className={`h-[1px] bg-[var(--brand-sand)] block transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`h-[1px] bg-[var(--brand-sand)] block transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`h-[1px] bg-[var(--brand-sand)] block transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[var(--brand-forest)]/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {[{ label: "Home", href: "/" }, ...navLinks, { label: "Book Now", href: "/booking" }].map(
                (link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-cormorant text-3xl md:text-4xl transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--brand-sand)]"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                }
              )}
            </nav>

            {/* Mobile menu footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[var(--brand-sand)]/60 text-xs font-space tracking-widest uppercase mb-2">
                Ayurveda Wellness Clinic
              </p>
              <p className="text-white/50 text-xs font-light">
                +91 93351 66850
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
