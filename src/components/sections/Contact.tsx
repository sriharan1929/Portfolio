import { FadeIn } from "../ui/FadeIn";
import { SectionLabel } from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Eye, Download } from "lucide-react";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const Contact = () => {
  const { profile, openResume } = usePortfolioData();

  return (
    <Section id="contact" className="bg-[#1a1410]" innerClassName="max-w-[800px] mx-auto text-center">
      <FadeIn>
        <SectionLabel><span className="text-[#c2a882]">// let's.connect</span></SectionLabel>
        <h2 className="font-cormorant text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-bg-warm leading-[1.15] tracking-[-0.03em] mt-2 mb-5">
          Let's build something<br />
          <span className="text-[#e8a05a]">remarkable together.</span>
        </h2>
        <p className="text-base text-[#c2a882] leading-[1.8] max-w-[520px] mx-auto mb-12 font-lora">
          I'm actively seeking entry-level roles in full-stack, frontend, or AI application development.
          If you're building something interesting, I'd love to hear about it.
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center items-center">
          <Button
            href={`mailto:${profile.email}`}
            size="md"
            variant="primary"
          >
            ✉ {profile.email}
          </Button>
          <Button
            href={profile.linkedin || "https://www.linkedin.com/in/sriharan-r/"}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            variant="outline-light"
          >
            ↗ LinkedIn
          </Button>
          <Button
            href={profile.github || "https://github.com/sriharan1929"}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            variant="outline-light"
          >
            ↗ GitHub
          </Button>
          <Button
            onClick={openResume}
            size="md"
            variant="secondary"
            className="text-bg-warm border-[#c2a882]/50 hover:text-accent hover:border-accent flex items-center gap-1.5"
          >
            <Eye size={15} />
            <span>Preview Resume</span>
          </Button>
          <Button
            href={profile.resume_url || "/Sriharan_Resume.pdf"}
            download="Sriharan_R_Resume.pdf"
            size="md"
            variant="secondary"
            className="text-bg-warm border-[#c2a882]/50 hover:text-accent hover:border-accent flex items-center gap-1.5"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </Button>
        </div>

        {/* Contact details */}
        <div className="mt-14 pt-8 border-t border-[#2e2018] flex flex-col sm:flex-row justify-center gap-8 sm:gap-10">
          {[
            { label: "Phone", value: profile.phone },
            { label: "Location", value: profile.location },
            { label: "Status", value: profile.status },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-[10px] text-text-muted tracking-[0.1em] uppercase font-dm-mono mb-1">{label}</div>
              <div className="text-[13px] text-[#c2a882] font-medium">{value}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};
