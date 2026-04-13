"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Treatments", href: "/treatments" },
    { name: "Packages", href: "/#packages" },
    { name: "Products", href: "/products" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-center py-2">
      {/* Centered Logo */}
      <Image
        src="/logo.png"
        alt="Ojas Theeram"
        width={180}
        height={60}
        className="object-contain"
        priority
      />
    </nav>
  );
}
