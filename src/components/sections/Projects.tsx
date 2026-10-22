import { FadeIn } from "../ui/FadeIn";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillChip } from "../ui/SkillChip";
import { Button } from "../ui/Button";
import { StarBorder } from "../ui/StarBorder";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import type { Project } from "../../types";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isFeatured = project.featured;
  return (
    <FadeIn delay={index * 100}>
      <StarBorder
        as="article"
        className={`h-full ${
          isFeatured ? "card-shadow-md card-shadow-hover" : ""
        }`}
        innerClassName="bg-bg-warm h-full flex flex-col"
        radius="20px"
        thickness={isFeatured ? 2.5 : 1.5}
        color={isFeatured ? "var(--color-accent)" : "var(--color-accent-border)"}
        speed={isFeatured ? "4s" : "6s"}
      >
        {/* Header */}
        <div
          className={`pt-7 px-7 pb-5 divider-b w-full ${
            isFeatured
              ? "bg-gradient-to-br from-[#fde8c8] via-[#fffdf9] to-[#fffdf9] via-[60%]"
              : "bg-transparent"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="heading-serif text-2xl leading-[1.2]">
              {project.title}
            </h3>
            {isFeatured && (
              <span className="badge-featured ml-2">
                Featured
              </span>
            )}
          </div>
          <p className="text-[13px] text-text-light leading-[1.6] font-lora">{project.tagline}</p>
          <div className="meta-date mt-1.5">{project.period}</div>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-6 flex-1 flex flex-col gap-5 w-full">
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
                <div className="dot-indicator" />
                <span className="text-[13px] text-text-muted leading-[1.6]">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="divider-t flex flex-wrap gap-2.5 pt-3 mt-auto">
            {project.live && (
              <Button
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
              >
                ↗ Live Demo
              </Button>
            )}
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant={project.live ? "secondary" : "dark"}
              size="sm"
            >
              ↗ GitHub
            </Button>
          </div>
        </div>
      </StarBorder>
    </FadeIn>
  );
};

export const Projects = () => {
  const { projects } = usePortfolioData();

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-8 bg-transparent">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <SectionHeading label="// selected.projects" title="Work that speaks for itself." />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

