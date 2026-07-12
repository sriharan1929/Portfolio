import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

export const Section = ({ id, className = "", innerClassName = "max-w-[1100px] mx-auto", children }: SectionProps) => (
  <section id={id} className={`py-20 md:py-28 px-6 md:px-8 ${className}`}>
    <div className={innerClassName}>
      {children}
    </div>
  </section>
);
