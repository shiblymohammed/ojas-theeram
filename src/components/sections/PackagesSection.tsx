"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Leaf } from "lucide-react";
import Container from "@/components/shared/Container";
import { clinic } from "@/data/clinic";

const packages = [
  {
    id: "detox",
    title: "Deep Detoxification",
    subtitle: "Panchakarma",
    duration: "14-21 Days",
    description: "A complete physical and mental cleansing to eliminate deep-rooted toxins and restore your body's natural healing capacity.",
    image: "/images/packages/detox.png",
  },
  {
    id: "rejuvenation",
    title: "Rejuvenation",
    subtitle: "Rasayana",
    duration: "7-14 Days",
    description: "Restore vitality, rebuild energy, and delay the aging process with deeply nourishing herbal oil therapies and diet.",
    image: "/images/packages/rejuvenation.png",
  },
  {
    id: "stress",
    title: "Stress Relief",
    subtitle: "Shanti",
    duration: "3-7 Days",
    description: "Soothe an overworked nervous system and find deep calm through Shirodhara, meditation, and gentle massages.",
    image: "/images/packages/stress-relief.png",
  },
];

export default function PackagesSection() {
  const leafStyles = [
    // 1st Card: Original position (left anchored)
    "top-[-10%] left-[-15%] w-[130%] md:w-[150%] max-w-[600px] aspect-square -rotate-12",
    
    // 2nd Card: From above center (straight down)
    "top-[-15%] left-1/2 -translate-x-1/2 w-[130%] md:w-[150%] max-w-[600px] aspect-square rotate-[5deg]",
    
    // 3rd Card: Exact opposite of 1st (right anchored & horizontally flipped)
    "top-[-10%] right-[-15%] w-[130%] md:w-[150%] max-w-[600px] aspect-square -scale-x-100 rotate-12",
  ];

  return (
    <section className="pt-32 pb-[30vh] bg-bg-primary overflow-hidden">
      
      {/* Classic Stacked Logo Header Segment */}
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center w-full mb-32 md:mb-[20vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Massive Centered Line Art Logo */}
            <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 mb-4 md:mb-8">
              <Image
                src="/images/elements/logo-line-art.png"
                alt="Logo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>

            {/* Clinic Name */}
            <h2 className="font-gallient text-5xl md:text-7xl lg:text-[90px] text-[#2C4A3B] uppercase tracking-widest m-0 mb-4 md:mb-6">
              {clinic.name}
            </h2>

            {/* Subtitle with Flanking Lines */}
            <div className="flex items-center gap-4 mb-5 md:mb-8 text-[#4A5D23] uppercase tracking-[0.25em] text-xs md:text-sm font-barlow font-medium">
              <span className="w-10 md:w-20 h-[1px] bg-[#4A5D23]/60"></span>
              <span>{clinic.subtitle}</span>
              <span className="w-10 md:w-20 h-[1px] bg-[#4A5D23]/60"></span>
            </div>

            {/* Tagline */}
            <p className="font-barlow text-lg md:text-2xl text-[#292929] tracking-wider mb-6">
              Holistic Healing for <span className="text-[#8B9D83] font-semibold">Mind & Body</span>
            </p>
            
            {/* Subtle Decorative Leaf */}
            <Leaf size={20} className="text-[#8B9D83] opacity-60 rotate-[135deg]" strokeWidth={1} />
          </motion.div>
        </div>
      </Container>

      {/* Cards Grid - Stretched almost fully edge-to-edge */}
      <div className="w-full px-1 md:px-2 mb-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-2">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative flex flex-col items-center justify-center h-[90vh] md:h-[96vh] rounded-full overflow-hidden border border-text-primary/40 bg-transparent transition-all duration-500"
            >
              {/* Background Image & Gradient (Reveals on Hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>



              {/* Botanical Line Art (Hidden on Hover, Randomly Placed) */}
              <div className={`absolute z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000 ${leafStyles[index % leafStyles.length]}`}>
                <Image
                  src="/images/elements/flower-line-art.png"
                  alt="Botanical Art"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain opacity-80"
                />
              </div>

              {/* Text Content Overlay */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center p-8 pointer-events-none w-full max-w-[80%]">
                <span className="text-sm font-barlow tracking-widest text-[#8B9D83] group-hover:text-[#dadbd5] uppercase mb-4 transition-colors duration-1000">
                  {pkg.subtitle}
                </span>
                <h3 className="font-gallient text-[55px] md:text-[85px] font-normal leading-[1.05] md:leading-[90px] text-text-primary group-hover:text-white transition-colors duration-1000">
                  {pkg.title}
                </h3>
              </div>


            </motion.div>
          ))}
        </div>
      </div>

      <Container>
        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 md:mt-48 flex justify-center"
        >
          <button className="bg-bg-alpha text-white px-8 py-4 rounded-full font-barlow tracking-widest uppercase text-sm hover:bg-[#2C4A3B] transition-colors duration-300 shadow-md">
            View All Treatments
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
