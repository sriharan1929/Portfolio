import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";
import { Section } from "../ui/Section";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const Experience = () => {
  const { experience } = usePortfolioData();

  return (
    <Section id="experience" className="bg-bg-warm-secondary">
      <FadeIn>
        <SectionHeading label="// work.experience" title="Hands-on in the field." />
      </FadeIn>
      <div className="flex flex-col gap-8">
        {experience.map((exp, idx) => (
          <FadeIn key={exp.id || idx} delay={idx * 100}>
            <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-bg-warm border border-[#f0ddc8] max-w-[780px] shadow-[0_2px_16px_rgba(194,97,26,0.07)]">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div className="flex-1">
                  <div className="font-cormorant text-[1.6rem] font-bold text-text-dark leading-[1.2]">
                    {exp.title}
                  </div>
                  <div className="text-[14px] text-accent font-semibold mt-1">
                    {exp.company}
                  </div>
                  {exp.project_name && (
                    <div className="text-[13px] text-text-light font-medium mt-1 font-lora italic">
                      Project: {exp.project_name}
                    </div>
                  )}
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-border text-[12px] font-semibold text-[#7a3c10] font-dm-mono whitespace-nowrap">
                  {exp.period}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {exp.points.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
                    <span className="text-[14px] text-text-muted leading-[1.7] font-lora">{item}</span>
                  </div>
                ))}
              </div>

              {exp.tags && exp.tags.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#f0ddc8] flex gap-2 flex-wrap">
                  {exp.tags.map((tag) => (
                    <SkillChip key={tag} label={tag} />
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
