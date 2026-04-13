"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Expand from the bottom so it curves over the hero
  const clipPathValue = useTransform(scrollYProgress, [0, 0.6], [45, 250]);
  const clipPath = useTransform(clipPathValue, (v) => `circle(${v}% at 50% 185%)`);

  return (
    <section ref={containerRef} className="relative h-[200vh] -mt-[100vh] z-20">
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full pointer-events-auto flex items-center justify-center relative overflow-hidden bg-bg-primary"
        >
          {/* Corner Elements */}
          <div className="absolute top-0 left-0 pointer-events-none opacity-40 mix-blend-multiply w-64 h-64 md:w-96 md:h-96">
            <Image 
              src="/images/other/b-s-1-3.png" 
              alt="Corner Decoration" 
              fill 
              className="object-contain object-top object-left" 
            />
          </div>
          
          <div className="absolute bottom-0 right-0 pointer-events-none opacity-40 mix-blend-multiply w-64 h-64 md:w-96 md:h-96">
            <Image 
              src="/images/other/b-s-1-4.png" 
              alt="Corner Decoration" 
              fill 
              className="object-contain object-bottom object-right" 
            />
          </div>

          {/* Intro section redesign pending */}
          <div className="text-center relative z-10">
            <h2 className="text-4xl text-[var(--brand-forest)] font-gallient">Intro Section Placeholder</h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
