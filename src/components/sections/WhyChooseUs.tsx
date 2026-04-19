"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Leaf, Award, Fingerprint, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Leaf className="w-8 h-8 md:w-12 md:h-12 text-[var(--brand-forest)]" strokeWidth={1} />,
    title: "Authentic Traditions",
    description: "Rooted in ancient Kerala Ayurveda, we use only pure, classical formulations and time-tested therapies for profound healing. Our processes remain faithful to the original texts, ensuring you receive the uncompromised benefits of genuine Ayurvedic science.",
    bgColor: "bg-[#f7f7eb]", // bg-primary
    textColor: "text-[var(--brand-forest)]",
    subTextColor: "text-[var(--text-secondary)]",
    borderColor: "border-[var(--brand-sand)]",
  },
  {
    icon: <Award className="w-8 h-8 md:w-12 md:h-12 text-[#f7f7eb]" strokeWidth={1} />,
    title: "Master Practitioners",
    description: "Our treatments are guided by highly experienced Vaidyas who bring decades of clinical expertise and profound knowledge. They possess an intuitive understanding of pulse diagnosis (Nadi Pariksha) and holistic healing methodologies.",
    bgColor: "bg-[var(--brand-forest)]",
    textColor: "text-white",
    subTextColor: "text-white/80",
    borderColor: "border-white/20",
  },
  {
    icon: <Fingerprint className="w-8 h-8 md:w-12 md:h-12 text-[var(--brand-forest)]" strokeWidth={1} />,
    title: "Bespoke Healing",
    description: "Every journey is unique. We tailor our wellness programs specifically to your Prakriti (individual mind-body constitution) and Vikriti (current imbalances), ensuring precisely targeted treatments that restore your innate harmony.",
    bgColor: "bg-[#d4c8af]", // brand-sand
    textColor: "text-[var(--brand-forest)]",
    subTextColor: "text-[var(--brand-forest)]/80",
    borderColor: "border-[var(--brand-forest)]/20",
  },
  {
    icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[var(--brand-sand)]" strokeWidth={1} />,
    title: "Tranquil Sanctuary",
    description: "Immerse yourself in a serene, luxurious environment mindfully designed to calm the senses and support deep restoration. From the architecture to the ambient sounds, every detail is curated to disconnect you from daily stress.",
    bgColor: "bg-[#060a08]",
    textColor: "text-[var(--brand-sand)]",
    subTextColor: "text-white/70",
    borderColor: "border-[var(--brand-sand)]/20",
  },
];

// Individual Card Component to handle its own parallax logic
const Card = ({ 
  feature, 
  i, 
  progress, 
  range, 
  targetScale 
}: { 
  feature: typeof features[0], 
  i: number, 
  progress: MotionValue<number>, 
  range: number[], 
  targetScale: number 
}) => {
  const containerRef = useRef(null);
  
  // Scale down the card as the next ones come on top
  const scale = useTransform(progress, range, [1, targetScale]);
  // Slight darkening effect as it moves back
  const opacity = useTransform(progress, range, [1, 0.5]);

  return (
    <div ref={containerRef} className="h-[100svh] lg:h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-10vh + ${i * 40}px)` }}
        className={`relative flex flex-col md:flex-row w-full max-w-5xl h-[500px] md:h-[450px] ${feature.bgColor} ${feature.borderColor} border rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 origin-top shadow-2xl overflow-hidden`}
      >
        {/* Subtle decorative background shape */}
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none rotate-45 scale-150">
           <Image src="/images/other/leaf-1-3.png" alt="Decoration" width={400} height={400} />
        </div>

        <motion.div style={{ opacity }} className="flex flex-col md:flex-row gap-8 md:gap-16 w-full relative z-10">
          
          <div className="md:w-1/3 flex flex-col justify-between">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] border border-[inherit] flex items-center justify-center mb-8 bg-black/5 backdrop-blur-sm">
              {feature.icon}
            </div>
            
            <div className="font-space text-6xl md:text-8xl opacity-10 font-bold leading-none mt-auto">
              0{i + 1}
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col justify-center">
            <h3 className={`text-4xl md:text-5xl lg:text-6xl font-gallient ${feature.textColor} mb-6`}>
              {feature.title}
            </h3>
            <p className={`font-space text-lg md:text-xl leading-relaxed ${feature.subTextColor}`}>
              {feature.description}
            </p>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="why-choose-us" 
      ref={containerRef} 
      // High section length to allow smooth scrolling through the 4 cards
      className="relative w-full bg-[var(--bg-primary)] pb-24"
    >
      {/* Introduction Header - fades out as we start scrolling the cards */}
      <div className="sticky top-0 h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center px-6 z-0">
         <motion.div
           style={{
             opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
             y: useTransform(scrollYProgress, [0, 0.1], [0, -50])
           }}
         >
            <span className="text-[var(--brand-earth)] tracking-[0.3em] font-space text-xs font-bold uppercase mb-4 block">
              The Ojas Theeram Difference
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-[90px] text-[var(--brand-forest)] font-gallient leading-none drop-shadow-sm">
              Why Choose Us
            </h2>
         </motion.div>
      </div>

      {/* The Stacking Cards Container */}
      <div className="relative z-10 -mt-[20vh] md:-mt-[30vh]">
        {features.map((feature, i) => {
          // Define the target scale depending on how far back the card goes
          // Each card shrinks slightly more than the previous one
          const targetScale = 1 - ((features.length - i) * 0.05);

          return (
             <Card 
               key={i}
               i={i}
               feature={feature}
               progress={scrollYProgress}
               // Card's scaling starts when it reaches the top of the container
               range={[i * 0.25, 1]}
               targetScale={targetScale}
             />
          );
        })}
      </div>
    </section>
  );
}
