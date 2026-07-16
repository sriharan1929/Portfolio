import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionLabel } from "../ui/SectionLabel";
import { Section } from "../ui/Section";
import { StarBorder } from "../ui/StarBorder";
import { CERTIFICATIONS } from "../../constants";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const About = () => {
  const { profile, education } = usePortfolioData();

  return (
    <Section id="about" className="bg-bg-warm">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <FadeIn direction="left">
          <SectionHeading label="// about.me" title={"Crafting systems\nwith clarity."} />
          <div className="flex flex-col gap-5">
            {profile.about_paragraphs.map((para, idx) => (
              <p key={idx} className="text-base leading-[1.85] text-text-muted font-lora">
                {para}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={150}>
          <div className="flex flex-col gap-5 w-full">
            {/* Education card */}
            <StarBorder
              as="div"
              className="w-full shadow-[0_2px_12px_rgba(194,97,26,0.06)]"
              innerClassName="p-6 bg-bg-warm"
              radius="16px"
              thickness={1.5}
              color="var(--color-accent-border)"
            >
              <SectionLabel>Education</SectionLabel>
              <div className="mt-4 flex flex-col gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start gap-4">
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
            </StarBorder>

            {/* Certifications card */}
            <StarBorder
              as="div"
              className="w-full shadow-[0_2px_12px_rgba(194,97,26,0.06)]"
              innerClassName="p-6 bg-bg-warm"
              radius="16px"
              thickness={1.5}
              color="var(--color-accent-border)"
            >
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
            </StarBorder>

            {/* Achievement */}
            <StarBorder
              as="div"
              className="w-full shadow-[0_2px_12px_rgba(194,97,26,0.06)]"
              innerClassName="py-5 px-6 bg-gradient-to-br from-[#fde8c8] to-[#fdf4e8] flex items-center gap-3.5"
              radius="16px"
              thickness={1.5}
              color="var(--color-accent)"
            >
              <span className="text-[28px]">🏆</span>
              <div>
                <div className="text-[13px] font-semibold text-[#7a3c10]">Volant'24 — 2nd Prize</div>
                <div className="text-[12px] text-[#b06830] mt-0.5">Innovative technical solution presentation</div>
              </div>
            </StarBorder>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

