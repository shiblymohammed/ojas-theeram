import HeroSection from "@/components/sections/HeroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import TreatmentsPreview from "@/components/sections/TreatmentsPreview";
import DoctorSection from "@/components/sections/DoctorSection";
import ProductsPreview from "@/components/sections/ProductsPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--primary)]">

      {/* 🌿 Hero */}
      <HeroSection />

      {/* 🧘 Packages */}
      <PackagesSection />

      {/* 🌱 Treatments */}
      <TreatmentsPreview />

      {/* 👨‍⚕️ Doctor */}
      <DoctorSection />

      {/* 🛍 Products */}
      <ProductsPreview />

      {/* 🌿 Why Choose Us */}
      <WhyChooseUs />

      {/* 📞 CTA */}
      <CTASection />

    </main>
  );
}