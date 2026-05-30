import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";
import { PROJECTS } from "../../constants";

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const isFeatured = project.featured;
  return (
    <FadeIn delay={index * 100}>
      <div className={`rounded-[20px] bg-bg-warm border-[1.5px] overflow-hidden h-full flex flex-col transition-all duration-250 hover:-translate-y-[3px] ${
        isFeatured ? "border-[#e8a05a] shadow-[0_4px_24px_rgba(194,97,26,0.12)] hover:shadow-[0_12px_40px_rgba(194,97,26,0.15)]" : "border-[#f0ddc8] shadow-none hover:shadow-none"
      }`}>
        {/* Header */}
        <div className={`pt-7 px-7 pb-5 border-b border-[#f0ddc8] ${
          isFeatured ? "bg-gradient-to-br from-[#fde8c8] via-[#fffdf9] to-[#fffdf9] via-[60%]" : "bg-transparent"
        }`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-cormorant text-2xl font-bold text-text-dark leading-[1.2] tracking-[-0.01em]">
              {project.title}
            </h3>
            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-bold font-dm-mono tracking-[0.06em] whitespace-nowrap ml-2">
                Featured
              </span>
            )}
          </div>
          <p className="text-[13px] text-text-light leading-[1.6] font-lora">{project.tagline}</p>
          <div className="text-[11px] text-[#b08060] mt-1.5 font-dm-mono">{project.period}</div>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-6 flex-1 flex flex-col gap-5">
          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech: string) => (
              <SkillChip key={tech} label={tech} />
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2 flex-1">
            {project.features.map((feature: string) => (
              <div key={feature} className="flex gap-2.5 items-start">
                <div className="w-[5px] h-[5px] rounded-full bg-accent mt-[7px] shrink-0" />
                <span className="text-[13px] text-text-muted leading-[1.6]">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-2.5 pt-2 border-t border-[#f0ddc8] mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-text-dark text-white text-[12px] font-semibold no-underline font-dm-mono tracking-[0.04em] transition-colors duration-200 hover:bg-[#3a2820]"
            >
              ↗ GitHub
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export const Projects = () => (
  <section id="projects" className="py-28 px-8 bg-bg-warm">
    <div className="max-w-[1100px] mx-auto">
      <FadeIn>
        <SectionHeading label="// selected.projects" title="Work that speaks for itself." />
      </FadeIn>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);
