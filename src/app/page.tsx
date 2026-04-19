import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";

const ConditionsSection = dynamic(() => import("@/components/sections/ConditionsSection"));
const HowItWorksSection = dynamic(() => import("@/components/sections/HowItWorksSection"));
const TreatmentsPreview = dynamic(() => import("@/components/sections/TreatmentsPreview"));
const DoctorSection = dynamic(() => import("@/components/sections/DoctorSection"));
const AdvancedCareSection = dynamic(() => import("@/components/sections/AdvancedCareSection"));
const ProductsPreview = dynamic(() => import("@/components/sections/ProductsPreview"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const LocationSection = dynamic(() => import("@/components/sections/LocationSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--primary)]">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. SCROLL EXPERIENCE + PACKAGES (combined scroll) */}
      <IntroSection />

      {/* 4. CONDITIONS WE TREAT */}
      <ConditionsSection />

      {/* 5. HOW AYURVEDA WORKS */}
      <HowItWorksSection />

      {/* 6. THERAPIES SHOWCASE */}
      <TreatmentsPreview />

      {/* 7. DOCTOR / TRUST */}
      <DoctorSection />

      {/* 8. ADVANCED CARE */}
      <AdvancedCareSection />

      {/* 9. PRODUCTS */}
      <ProductsPreview />

      {/* 10. TESTIMONIALS */}
      {/* <TestimonialsSection /> */}

      {/* 11. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 12. LOCATION */}
      <LocationSection />

      {/* 13. FINAL CTA */}
      <CTASection />
    </main>
  );
}