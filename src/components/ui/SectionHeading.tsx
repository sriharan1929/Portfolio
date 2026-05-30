import { SectionLabel } from "./SectionLabel";

export const SectionHeading = ({ label, title }: { label: string, title: string }) => (
  <div className="mb-12">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="font-cormorant text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text-dark leading-[1.15] mt-[0.4rem] tracking-[-0.02em] whitespace-pre-line">
      {title}
    </h2>
  </div>
);
