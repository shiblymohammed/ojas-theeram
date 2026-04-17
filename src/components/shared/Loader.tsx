"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a minimum loading time for a premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--bg-primary)]"
        >
          <div className="flex flex-col items-center">
            {/* Minimalist Logo/Icon animation */}
            <div className="relative w-24 h-24 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 border border-[var(--brand-sand)]/30 rounded-full" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 border-t-2 border-[var(--brand-sand)] rounded-full"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-gallient text-2xl text-[var(--brand-forest)]">O</span>
              </div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-gallient text-2xl md:text-3xl text-[var(--brand-forest)] tracking-widest uppercase">
                Ojas Theeram
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]/50" />
                <p className="text-[10px] font-space tracking-[0.4em] uppercase text-[var(--brand-earth)]">
                  Ayurvedic Sanctuary
                </p>
                <span className="w-8 h-[1px] bg-[var(--brand-sand)]/50" />
              </div>
            </motion.div>

            {/* Simple progress bar */}
            <div className="mt-12 w-48 h-[1px] bg-[var(--brand-sand)]/10 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-[var(--brand-sand)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
