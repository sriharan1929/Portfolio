import { useState, useEffect } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { DeskIllustration } from "./DeskIllustration";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-8 relative overflow-hidden bg-gradient-to-br from-[#fffdf9] via-[#fffdf9] to-[#fdf0e0] from-[60%]"
    >
      {/* Background orbs */}
      <div className="absolute top-[10%] right-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(237,160,80,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(194,97,26,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto w-full grid grid-cols-2 gap-16 items-center pt-16">
        {/* Left – Text */}
        <div>
          <div className={`transition-all duration-700 ease-in-out delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-border mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <SectionLabel>Available for opportunities · 2026</SectionLabel>
            </div>

            <h1 className="font-cormorant text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold text-text-dark leading-[1.08] tracking-[-0.03em] mb-5">
              Sriharan R
            </h1>

            <p className="font-semibold text-accent font-dm-mono tracking-[0.04em] mb-5 uppercase text-[12px]">
              Full Stack Developer · React · AI · Backend
            </p>

            <p className="text-[1.05rem] leading-[1.75] text-text-muted max-w-[460px] mb-10 font-lora">
              Computer Science undergraduate building React, AI-powered systems,
              and backend-driven products with clarity, structure, and technical depth.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-white font-semibold text-[14px] no-underline tracking-[0.02em] transition-all duration-200 hover:bg-accent-hover hover:-translate-y-[1px]"
              >
                View Projects →
              </a>
              <a
                href="mailto:sriharan8072@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-transparent text-text-dark font-semibold text-[14px] no-underline tracking-[0.02em] border-[1.5px] border-[#c2a882] transition-all duration-200 hover:border-accent hover:-translate-y-[1px]"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Right – Desk composition */}
        <div className={`flex justify-center transition-all duration-800 ease-in-out delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-7"}`}>
          <DeskIllustration />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[11px] text-text-light tracking-[0.1em] uppercase font-dm-mono">scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
      </div>
    </section>
  );
};
