import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TreatmentsPreview from "@/components/sections/TreatmentsPreview";
import DoctorSection from "@/components/sections/DoctorSection";
import AdvancedCareSection from "@/components/sections/AdvancedCareSection";
import ProductsPreview from "@/components/sections/ProductsPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import LocationSection from "@/components/sections/LocationSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--primary)]">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. SCROLL EXPERIENCE TRANSITION */}
      <IntroSection />

      {/* 3. SIGNATURE PACKAGES */}
      <PackagesSection />

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
      <TestimonialsSection />

      {/* 11. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 12. LOCATION */}
      <LocationSection />

      {/* 13. FINAL CTA */}
      <CTASection />
    </main>
  );
}