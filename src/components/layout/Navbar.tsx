"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide navbar only when scrolling down past 150px
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Apply glass effect if significantly scrolled from top
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Treatments", href: "/treatments" },
    { name: "Packages", href: "/#packages" },
    { name: "Products", href: "/products" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-20 h-24 md:h-28 transition-all duration-500 
          ${isScrolled 
            ? "bg-[#0a1a14]/60 backdrop-blur-xl border-b border-white/10 shadow-lg h-20 md:h-24" 
            : "bg-transparent"
          }`}
      >
        {/* Left: Desktop Links */}
        <div className="hidden lg:flex items-center gap-12 flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="font-barlow text-[11px] tracking-[0.25em] uppercase text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(139,157,131,0.5)] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Left: Mobile Menu Toggle */}
        <div className="lg:hidden flex-1 flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-[#8B9D83] transition-colors p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Floating Title/Logo */}
        <div className="flex justify-center flex-1 py-4">
          <Link href="/" className="relative block group">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/logo.png"
                alt="Ojas Theeram"
                width={170}
                height={55}
                className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Right: CTA Button */}
        <div className="flex-1 flex justify-end items-center">
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex bg-[#8B9D83]/20 hover:bg-[#8B9D83] text-[#f3eee8] border border-[#8B9D83]/50 hover:border-[#8B9D83] px-8 py-3 rounded-full font-barlow text-[11px] tracking-[0.2em] uppercase transition-all duration-400 shadow-[0_0_15px_rgba(139,157,131,0.1)] hover:shadow-[0_0_20px_rgba(139,157,131,0.3)]"
            >
              Consultation
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#0a1a14]/90 flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-white/50 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={36} strokeWidth={1} />
            </button>

            {/* Links Block */}
            <div className="flex flex-col items-center gap-10 mt-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-gallient text-[45px] text-[#f3eee8] hover:text-[#8B9D83] transition-colors leading-none"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-[1px] w-16 bg-[#8B9D83]/60 my-2" 
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link 
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-barlow text-sm uppercase tracking-[0.3em] text-[#8B9D83] hover:text-white transition-colors"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}