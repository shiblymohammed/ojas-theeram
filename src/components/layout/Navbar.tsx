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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Logic for hiding/showing
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Logic for styling on scroll
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
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      // Standard Height: h-20 (80px) or h-16 (64px)
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 h-transition-all duration-500 
        ${isScrolled 
          ? "bg-[#0a1a14]/90 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
        }`}
    >
      {/* Left: Navigation Links (Optional) */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        <button className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">MENU</button>
        <button className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">RESERVATIONS</button>
      </div>

      {/* Center: Floating Title/Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Ojas Theeram"
            width={160}
            height={50}
            className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>
      </div>

      {/* Right: Floating Button with Glow */}
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#0a1a14] px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg transition-all"
        >
          Book a Table
        </motion.button>
      </div>
    </motion.nav>
  );
}
