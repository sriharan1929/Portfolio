import { useState, useEffect } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { DeskIllustration } from "./DeskIllustration";
import profilePic from "../../assets/Profile.jpg";
import { Button } from "../ui/Button";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { profile } = usePortfolioData();
  
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 md:px-8 lg:px-12 relative overflow-hidden bg-gradient-to-br from-[#fffdf9]/30 via-[#fffdf9]/50 to-[#fdf0e0]/70 from-[60%]"
    >
      {/* Background orbs */}
      <div className="absolute top-[10%] right-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(237,160,80,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(194,97,26,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 lg:pt-16 pb-16 lg:pb-0">
        {/* Left – Text */}
        <div className="w-full">
          <div className={`transition-all duration-700 ease-in-out delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-10 rounded-[32px] shadow-[0_8px_32px_rgba(194,97,26,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-border mb-8 relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <SectionLabel>Available for opportunities · 2026</SectionLabel>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 relative z-10">
                <div className="relative shrink-0 group">
                  <div className="absolute -inset-1.5 rounded-full border border-accent/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute -inset-0.5 rounded-full border-[2px] border-[#e8a05a] animate-[spin_10s_linear_infinite] border-dashed"></div>
                  <img src={profilePic} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-[3px] border-white shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h1 className="font-cormorant text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-text-dark leading-[1.08] tracking-[-0.03em]">
                  {profile.hero_title}
                </h1>
              </div>

              <p className="font-semibold text-accent font-dm-mono tracking-[0.04em] mb-5 uppercase text-[12px] relative z-10">
                {profile.hero_subtitle}
              </p>

              <p className="text-[1.05rem] leading-[1.75] text-text-muted max-w-[460px] mb-10 font-lora relative z-10">
                {profile.hero_description}
              </p>

              <div className="flex gap-4 flex-wrap relative z-10">
                <Button
                  href="#projects"
                  variant="primary"
                >
                  View Projects →
                </Button>
                <Button
                  href="mailto:sriharan8072@gmail.com"
                  variant="secondary"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Desk composition */}
        <div className={`flex justify-center transition-all duration-800 ease-in-out delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-7"}`}>
          <div className="scale-75 sm:scale-90 lg:scale-100 origin-center lg:origin-right w-full flex justify-center">
            <DeskIllustration />
          </div>
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
