import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionLabel } from "../ui/SectionLabel";
import { CERTIFICATIONS } from "../../constants";

export const About = () => (
  <section id="about" className="py-28 px-8 bg-bg-warm">
    <div className="max-w-[1100px] mx-auto">
      <div className="grid grid-cols-2 gap-20 items-start">
        <FadeIn direction="left">
          <SectionHeading label="// about.me" title={"Crafting systems\nwith clarity."} />
          <div className="flex flex-col gap-5">
            <p className="text-base leading-[1.85] text-text-muted font-lora">
              I'm a Computer Science Engineering undergraduate at Sona College of Technology (CGPA 7.87),
              graduating in 2026. My work sits at the intersection of full-stack engineering and AI application development,
              where I focus on building systems that are as thoughtful in architecture as they are in user experience.
            </p>
            <p className="text-base leading-[1.85] text-text-muted font-lora">
              I've built an offline RAG system that works across multiple document formats using FAISS, LangChain, and locally
              running LLMs — no cloud dependency, no data leaving the machine. That project taught me to think across
              retrieval logic, local inference, document processing, and frontend UX simultaneously.
            </p>
            <p className="text-base leading-[1.85] text-text-muted font-lora">
              I approach engineering the way you'd approach a well-organized desk — every tool in its place, every decision
              reasoned, every interface considered. I'm ready to contribute to product teams building React, AI, or backend-driven systems.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={150}>
          <div className="flex flex-col gap-5">
            {/* Education card */}
            <div className="p-6 rounded-2xl bg-bg-warm border border-accent-border/50 shadow-[0_2px_12px_rgba(194,97,26,0.06)]">
              <SectionLabel>Education</SectionLabel>
              <div className="mt-4 flex flex-col gap-4">
                {[
                  { degree: "B.E. CSE", place: "Sona College of Technology, Salem", year: "2026", score: "CGPA: 7.87/10" },
                  { degree: "HSC", place: "SSRM Higher Secondary School", year: "2021", score: "90.5%" },
                  { degree: "SSLC", place: "SSRM Higher Secondary School", year: "2019", score: "89%" },
                ].map((edu) => (
                  <div key={edu.degree} className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-semibold text-[14px] text-text-dark">{edu.degree}</div>
                      <div className="text-[12px] text-text-light mt-0.5">{edu.place}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[12px] font-semibold text-accent font-dm-mono">{edu.score}</div>
                      <div className="text-[11px] text-[#b08060]">{edu.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications card */}
            <div className="p-6 rounded-2xl bg-bg-warm border border-accent-border/50 shadow-[0_2px_12px_rgba(194,97,26,0.06)]">
              <SectionLabel>Certifications</SectionLabel>
              <div className="mt-4 flex flex-col gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <div className="text-[13px] text-text-dark font-medium">{cert.name}</div>
                    <div className="text-[11px] text-text-light ml-auto font-dm-mono">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="py-5 px-6 rounded-2xl bg-gradient-to-br from-[#fde8c8] to-[#fdf4e8] border border-accent-border flex items-center gap-3.5">
              <span className="text-[28px]">🏆</span>
              <div>
                <div className="text-[13px] font-semibold text-[#7a3c10]">Volant'24 — 2nd Prize</div>
                <div className="text-[12px] text-[#b06830] mt-0.5">Innovative technical solution presentation</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);
