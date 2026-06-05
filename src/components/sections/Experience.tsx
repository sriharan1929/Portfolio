import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";

export const Experience = () => (
  <section id="experience" className="py-20 md:py-28 px-6 md:px-8 bg-bg-warm-secondary">
    <div className="max-w-[1100px] mx-auto">
      <FadeIn>
        <SectionHeading label="// work.experience" title="Hands-on in the field." />
      </FadeIn>
      <FadeIn delay={100}>
        <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-bg-warm border border-[#f0ddc8] max-w-[780px] shadow-[0_2px_16px_rgba(194,97,26,0.07)]">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
            <div className="flex-1">
              <div className="font-cormorant text-[1.6rem] font-bold text-text-dark leading-[1.2]">
                Junior Intern
              </div>
              <div className="text-[14px] text-accent font-semibold mt-1">
                Syzy Technologies Pvt Ltd, Salem
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-border text-[12px] font-semibold text-[#7a3c10] font-dm-mono whitespace-nowrap">
              Jan 2026
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {[
              "Supported frontend feature development in a component-based application environment",
              "Worked on UI fixes, layout alignment, and reusable component improvements for cleaner rendering",
              "Assisted with API integration, workflow debugging, and permission-based feature behavior",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
                <span className="text-[14px] text-text-muted leading-[1.7] font-lora">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[#f0ddc8] flex gap-2 flex-wrap">
            {["React", "Component Architecture", "API Integration", "UI Debugging"].map((tag) => (
              <SkillChip key={tag} label={tag} />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);
