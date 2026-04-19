"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Leaf, Award, Fingerprint, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Leaf className="w-7 h-7 md:w-10 md:h-10 text-[var(--brand-forest)]" strokeWidth={1} />,
    title: "Authentic Traditions",
    description: "Rooted in ancient Kerala Ayurveda, we use only pure, classical formulations and time-tested therapies. Our processes remain faithful to the original texts, ensuring you receive the uncompromised benefits of genuine Ayurvedic science.",
    bgColor: "bg-[#f7f7eb]",
    textColor: "text-[var(--brand-forest)]",
    subTextColor: "text-[var(--text-secondary)]",
    borderColor: "border-[var(--brand-sand)]",
  },
  {
    icon: <Award className="w-7 h-7 md:w-10 md:h-10 text-[#f7f7eb]" strokeWidth={1} />,
    title: "Master Practitioners",
    description: "Guided by experienced Vaidyas who bring decades of clinical expertise and an intuitive understanding of pulse diagnosis (Nadi Pariksha) and holistic healing methodologies.",
    bgColor: "bg-[var(--brand-forest)]",
    textColor: "text-white",
    subTextColor: "text-white/80",
    borderColor: "border-white/20",
  },
  {
    icon: <Fingerprint className="w-7 h-7 md:w-10 md:h-10 text-[var(--brand-forest)]" strokeWidth={1} />,
    title: "Bespoke Healing",
    description: "We tailor programs to your Prakriti (mind-body constitution) and Vikriti (current imbalances), ensuring precisely targeted treatments that restore your innate harmony.",
    bgColor: "bg-[#d4c8af]",
    textColor: "text-[var(--brand-forest)]",
    subTextColor: "text-[var(--brand-forest)]/80",
    borderColor: "border-[var(--brand-forest)]/20",
  },
  {
    icon: <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-[var(--brand-sand)]" strokeWidth={1} />,
    title: "Tranquil Sanctuary",
    description: "Every detail of our serene environment is curated to calm the senses — from architecture to ambient sound — so you can truly disconnect and heal deeply.",
    bgColor: "bg-[#060a08]",
    textColor: "text-[var(--brand-sand)]",
    subTextColor: "text-white/70",
    borderColor: "border-[var(--brand-sand)]/20",
  },
];

const Card = ({
  feature, i, progress, range, targetScale,
}: {
  feature: typeof features[0];
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.6]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-8">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 30}px)` }}
        className={`relative flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[420px] ${feature.bgColor} ${feature.borderColor} border rounded-2xl md:rounded-[2.5rem] p-6 md:p-12 origin-top shadow-2xl overflow-hidden transform-gpu will-change-transform`}
      >
        {/* Decorative leaf */}
        <div className="absolute -right-16 -top-16 opacity-8 pointer-events-none rotate-45 scale-125 hidden md:block">
          <Image src="/images/other/leaf-1-3.png" alt="" width={300} height={300} quality={30} />
        </div>

        <motion.div style={{ opacity }} className="flex flex-col md:flex-row gap-6 md:gap-12 w-full relative z-10">

          {/* Icon + Number */}
          <div className="md:w-1/3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-between">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-current/20 flex items-center justify-center bg-black/5 backdrop-blur-sm">
              {feature.icon}
            </div>
            <div className={`font-space text-5xl md:text-7xl opacity-10 font-bold leading-none ${feature.textColor}`}>
              0{i + 1}
            </div>
          </div>

          {/* Text */}
          <div className="md:w-2/3 flex flex-col justify-center">
            <h3 className={`text-3xl md:text-4xl lg:text-5xl font-gallient ${feature.textColor} mb-3 md:mb-5 leading-tight`}>
              {feature.title}
            </h3>
            <p className={`font-space text-sm md:text-base leading-relaxed ${feature.subTextColor}`}>
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
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="relative w-full bg-[var(--bg-primary)]"
    >
      {/* Header */}
      <div className="sticky top-0 h-[35vh] md:h-[45vh] flex flex-col items-center justify-center text-center px-6 z-0">
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.08], [0, -40]),
          }}
        >
          <span className="text-[var(--brand-earth)] tracking-[0.3em] font-space text-[10px] md:text-xs font-bold uppercase mb-3 block">
            The Ojas Theeram Difference
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-[80px] text-[var(--brand-forest)] font-gallient leading-none">
            Why Choose Us
          </h2>
        </motion.div>
      </div>

      {/* Stacking Cards */}
      <div className="relative z-10 -mt-[15vh] md:-mt-[25vh]">
        {features.map((feature, i) => {
          const targetScale = 1 - ((features.length - i) * 0.04);
          return (
            <Card
              key={i}
              i={i}
              feature={feature}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* Bottom padding */}
      <div className="h-24 md:h-32" />
    </section>
  );
}
