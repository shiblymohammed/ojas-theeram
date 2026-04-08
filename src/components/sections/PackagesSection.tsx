"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { div } from "framer-motion/client";

export default function PackagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position within this 300vh section to drive both animation and sliding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1: 0% -> 40% scroll (Sunrise enters with a larger radius from further down)
  const clipPathValue = useTransform(scrollYProgress, [0, 0.4], [45, 195]);
  const clipPath = useTransform(clipPathValue, (v) => `circle(${v}% at 50% 185%)`);

  // Phase 1.5: Fade in the Header exactly when circle covers it
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  // Phase 2: 35% -> 100% scroll (Content scrolls upwards natively inside the pinned frame)
  const scrollTrackY = useTransform(scrollYProgress, [0.35, 1], ["0%", "-100%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] -mt-[100vh] z-20">

      {/* Sticky container stays pinned perfectly over the Hero for the entire 300vh journey */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

        {/* The expanding mask element completely fills the screen after 35% scroll */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full bg-[#f3eee8] pointer-events-auto shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]"
        >
          {/* Subtle Background Art */}
          <div className="absolute inset-0 bg-[url('/images/other/dots-shape.png')] opacity-10 bg-repeat pointer-events-none z-0" />

          {/* Internal Content Scroll Track */}
          <motion.div
            style={{ y: scrollTrackY }}
            className="absolute top-0 left-0 w-full pt-[20vh] pb-[40vh]"
          >
            {/* Header Area */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="relative z-10 text-center flex flex-col items-center px-4"
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full border border-[#8B9D83]/40 bg-[#8B9D83]/10 text-[#8B9D83]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-[80px] font-gallient text-[#2C4A3B] leading-[1.1] mb-6 drop-shadow-sm">
                Wellness & <br />
                <span className="text-[#8B9D83]">Rejuvenation</span>
              </h2>

              <div className="flex items-center justify-center gap-4 mb-24">
                <span className="w-12 h-[1px] bg-[#4A5D23]/40" />
                <p className="font-barlow text-[#4A5D23] uppercase tracking-[0.25em] text-xs sm:text-sm">
                  Curated Healing Journeys
                </p>
                <span className="w-12 h-[1px] bg-[#4A5D23]/40" />
              </div>
            </motion.div>

            {/* Empty Packages Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">

                {/* Empty Card 1 */}
                <div className="aspect-[4/5] rounded-3xl bg-[#0a1a14]/5 border border-[#2C4A3B]/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center p-8 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-[#0a1a14]/10 mb-6 animate-pulse" />
                  <div className="h-6 w-3/4 bg-[#0a1a14]/10 rounded mb-4 animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#0a1a14]/10 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-5/6 bg-[#0a1a14]/10 rounded animate-pulse" />
                </div>

                {/* Empty Card 2 */}
                <div className="aspect-[4/5] rounded-3xl bg-[#0a1a14]/5 border border-[#2C4A3B]/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center p-8 backdrop-blur-sm mt-0 md:mt-12">
                  <div className="w-16 h-16 rounded-full bg-[#0a1a14]/10 mb-6 animate-pulse" />
                  <div className="h-6 w-3/4 bg-[#0a1a14]/10 rounded mb-4 animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#0a1a14]/10 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-5/6 bg-[#0a1a14]/10 rounded animate-pulse" />
                </div>

                {/* Empty Card 3 */}
                <div className="aspect-[4/5] rounded-3xl bg-[#0a1a14]/5 border border-[#2C4A3B]/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center p-8 backdrop-blur-sm mt-0 md:mt-24">
                  <div className="w-16 h-16 rounded-full bg-[#0a1a14]/10 mb-6 animate-pulse" />
                  <div className="h-6 w-3/4 bg-[#0a1a14]/10 rounded mb-4 animate-pulse" />
                  <div className="h-3 w-1/2 bg-[#0a1a14]/10 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-5/6 bg-[#0a1a14]/10 rounded animate-pulse" />
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


<div>

</div>