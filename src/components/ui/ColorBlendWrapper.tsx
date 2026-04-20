"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function ColorBlendWrapper({ 
  children, 
  colors = ["#f7f7eb", "#060a08"] 
}: { 
  children: ReactNode, 
  colors?: string[] 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll across the entire height of the children
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Smoothly tween the background color based on scroll percentage
  // We use keyframes if more than 2 colors are passed, defaulting to light->dark
  const backgroundColor = useTransform(
    scrollYProgress, 
    colors.map((_, i) => i / (colors.length > 1 ? colors.length - 1 : 1)), 
    colors
  );

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor }} 
      className="w-full relative transition-colors duration-200"
    >
      {children}
    </motion.div>
  );
}
