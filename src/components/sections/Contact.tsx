import { FadeIn } from "../ui/FadeIn";
import { SectionLabel } from "../ui/SectionLabel";

export const Contact = () => (
  <section id="contact" className="py-28 px-8 bg-[#1a1410]">
    <div className="max-w-[800px] mx-auto text-center">
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

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:sriharan8072@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-[14px] no-underline tracking-[0.02em] transition-all duration-200 hover:bg-[#e8803a] hover:-translate-y-0.5"
          >
            ✉ sriharan8072@gmail.com
          </a>
          <a
            href="https://github.com/sriharan8072"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent text-bg-warm font-semibold text-[14px] no-underline tracking-[0.02em] border-[1.5px] border-text-muted transition-all duration-200 hover:border-accent hover:-translate-y-0.5"
          >
            ↗ GitHub
          </a>
        </div>

        {/* Contact details */}
        <div className="mt-14 pt-8 border-t border-[#2e2018] flex justify-center gap-10 flex-wrap">
          {[
            { label: "Phone", value: "+91 8072800950" },
            { label: "Location", value: "Salem, Tamil Nadu" },
            { label: "Status", value: "Open to work" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-[10px] text-text-muted tracking-[0.1em] uppercase font-dm-mono mb-1">{label}</div>
              <div className="text-[13px] text-[#c2a882] font-medium">{value}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);
