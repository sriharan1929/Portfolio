import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";
import { Section } from "../ui/Section";
import { SKILLS } from "../../constants";

export const Skills = () => (
  <Section id="skills" className="bg-bg-warm-secondary">
    <FadeIn>
      <SectionHeading label="// core.skills" title="The tools in my kit." />
    </FadeIn>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(SKILLS).map(([category, skills], i) => (
        <FadeIn key={category} delay={i * 80}>
          <div className="p-7 rounded-[18px] bg-bg-warm border border-[#f0ddc8] h-full transition-all duration-200 hover:shadow-[0_8px_30px_rgba(194,97,26,0.12)] hover:-translate-y-0.5 group">
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono mb-4 pb-3 border-b border-[#f0ddc8]">
              {category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </Section>
);
