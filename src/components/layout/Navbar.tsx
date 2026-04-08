"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Hide when scrolling down past 100px, show when scrolling up
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-center py-2 transition-all duration-500 bg-[#0a1a14]/80 backdrop-blur-md border-b border-white/[0.06] ${
        hidden ? "" : ""
      }`}
    >
      {/* Centered Logo */}
      <Image
        src="/logo.png"
        alt="Ojas Theeram"
        width={180}
        height={60}
        className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        priority
      />
    </motion.nav>
  );
}
