import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";
import { Section } from "../ui/Section";
import { StarBorder } from "../ui/StarBorder";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const Skills = () => {
  const { skills } = usePortfolioData();

  return (
    <Section id="skills" className="bg-bg-warm-secondary">
      <FadeIn>
        <SectionHeading label="// core.skills" title="The tools in my kit." />
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(skills).map(([category, list], i) => (
          <FadeIn key={category} delay={i * 80}>
            <StarBorder
              as="div"
              className="h-full transition-all duration-200 hover:shadow-[0_8px_30px_rgba(194,97,26,0.12)] hover:-translate-y-0.5 group"
              innerClassName="p-7 bg-bg-warm h-full flex flex-col"
              radius="18px"
              thickness={1.5}
              color="var(--color-accent-border)"
            >
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono mb-4 pb-3 border-b border-[#f0ddc8] w-full">
                {category}
              </div>
              <div className="flex flex-wrap gap-1.5 w-full">
                {list.map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </StarBorder>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

