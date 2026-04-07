"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero/background.png"
        alt="Ojas Theeram Ayurvedic Retreat"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  );
}
