"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 py-5 px-6 md:px-12 bg-black/40 backdrop-blur-md border-b border-[var(--brand-sand)] pointer-events-none">
      <nav className="flex items-center justify-between w-full pointer-events-auto">
        
        {/* Left Side: Menu & Link */}
        <div className="flex items-center gap-8 w-1/3">
          <button className="flex items-center gap-4 text-[var(--brand-sand)] hover:text-white transition-colors">
            <div className="flex flex-col justify-center gap-[5px] w-6">
              <span className="h-[1px] bg-current w-full block" />
              <span className="h-[1px] bg-current w-full block" />
            </div>
            <span className="text-xs font-space tracking-widest uppercase font-medium mt-0.5">Menu</span>
          </button>
          
          <Link href="/treatments" className="hidden md:block text-xs font-space tracking-widest uppercase text-[var(--brand-sand)] hover:text-white transition-colors font-medium mt-0.5">
            Treatments
          </Link>
        </div>

        {/* Center: Minimalist Logo */}
        <div className="flex justify-center flex-grow">
          <Link href="/" className="relative hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo_only.png"
              alt="Ojas Theeram"
              width={42}
              height={42}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Side: Contact & Icon */}
        <div className="flex items-center justify-end gap-8 w-1/3">
          <Link href="/contact" className="hidden md:block text-xs font-space tracking-widest uppercase text-[var(--brand-sand)] hover:text-white transition-colors font-medium mt-0.5">
            Contact Us
          </Link>
          <button className="text-[var(--brand-sand)] hover:text-white transition-colors">
            <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>

      </nav>
    </header>
  );
}
