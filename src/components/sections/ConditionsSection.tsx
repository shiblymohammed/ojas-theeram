"use client";

import React, { useState } from "react";
// Import the water wave component
import WaterWave from "react-water-wave";

export default function ConditionsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="conditions"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-[#050806] flex items-center justify-center font-sans"
    >
      {/* 1. Base Background Image WITH WATER RIPPLE */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `scale(1.1) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      >
        <WaterWave
          imageUrl="/images/BACKGROUND/bgWOMAN.png"
          dropRadius={10}       // Smaller ripple size
          perturbance={0.01}    // Very slight water distortion
          resolution={512}      // Quality of the WebGL render
          className="w-full h-full object-cover"
        >
          {() => (
            <>
              {/* Vignette & Dark Overlay directly inside the water wrapper (sits on top of canvas but behind the woman) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/40" />
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </>
          )}
        </WaterWave>
      </div>

      {/* 2. The Woman Main Subject (Fastest, crispest) */}
      {/* pointer-events-none ensures her layer doesn't block the mouse from touching the water behind her */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 30}px) scale(1.05)`,
        }}
      >
        <img
          src="/images/BACKGROUND/WOMAN_ONLY.png"
          alt="Subject"
          className="h-[105vh] md:h-[110vh] w-auto max-w-none object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>

    </section>
  );
}