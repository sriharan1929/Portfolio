import { useState, useEffect } from "react";
import { X, Download, ExternalLink, Printer, FileText, Check, Copy, Briefcase, GraduationCap, Award, Sparkles } from "lucide-react";
import { usePortfolioData } from "../../context/PortfolioDataContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const { profile } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || "sriharan8072@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const resumePdfPath = profile.resume_url || "/Sriharan_Resume.pdf";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/65 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#fffdf9] rounded-2xl md:rounded-3xl border border-[#f0ddc8] shadow-[0_20px_60px_rgba(30,20,10,0.35)] overflow-hidden z-10">
        {/* Top Header Bar */}
        <div className="px-5 md:px-7 py-4 border-b border-[#f0ddc8] bg-[#fffaf3] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light border border-accent-border flex items-center justify-center text-accent shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cormorant text-xl md:text-2xl font-bold text-text-dark leading-tight">
                  {profile.name} — Resume
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-accent text-white font-dm-mono text-[10px] font-bold uppercase tracking-wider">
                  Verified ATS
                </span>
              </div>
              <p className="text-[12px] text-text-light font-lora">
                Full Stack Developer · React · TypeScript · Java · AWS
              </p>
            </div>
          </div>

          {/* Action buttons & Close */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-[#f0ddc8]/60 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`px-3 py-1 text-xs font-dm-mono font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "interactive"
                    ? "bg-white text-accent shadow-sm"
                    : "text-text-muted hover:text-text-dark"
                }`}
              >
                Interactive
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={`px-3 py-1 text-xs font-dm-mono font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "pdf"
                    ? "bg-white text-accent shadow-sm"
                    : "text-text-muted hover:text-text-dark"
                }`}
              >
                PDF View
              </button>
            </div>

            {/* Direct Download PDF Button */}
            <a
              href={resumePdfPath}
              download="Sriharan_R_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-white text-xs font-dm-mono font-bold hover:bg-accent-hover transition-all shadow-sm active:scale-95 no-underline"
              title="Download Resume as PDF"
            >
              <Download size={14} />
              <span className="hidden xs:inline">Download</span>
            </a>

            {/* Print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl text-text-muted hover:text-text-dark hover:bg-[#f0ddc8]/40 transition-colors cursor-pointer"
              title="Print Resume"
            >
              <Printer size={16} />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-text-muted hover:text-text-dark hover:bg-[#f0ddc8]/50 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#fffdf9]">
          {activeTab === "interactive" ? (
            <div className="max-w-[800px] mx-auto bg-white border border-[#f0ddc8] rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm print:shadow-none print:border-none print:p-0">
              {/* Resume Header */}
              <div className="border-b border-[#f0ddc8] pb-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h1 className="font-cormorant text-3xl sm:text-4xl font-bold text-text-dark tracking-tight">
                    SRIHARAN R
                  </h1>
                  <span className="text-xs font-dm-mono font-semibold text-accent uppercase tracking-wider">
                    Full Stack Developer
                  </span>
                </div>
                <div className="text-[13px] text-text-muted font-dm-mono mt-1">
                  React.js · TypeScript · Java · AWS
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-text-muted font-lora">
                  <span>📞 +91 8072800950</span>
                  <span>•</span>
                  <a href="mailto:sriharan8072@gmail.com" className="text-accent hover:underline">
                    sriharan8072@gmail.com
                  </a>
                  <span>•</span>
                  <span>📍 Salem, Tamil Nadu, India</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-dm-mono">
                  <a
                    href="https://github.com/sriharan1929"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark hover:text-accent underline"
                  >
                    github.com/sriharan1929
                  </a>
                  <span>•</span>
                  <a
                    href="https://linkedin.com/in/sriharan-r/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark hover:text-accent underline"
                  >
                    linkedin.com/in/sriharan-r
                  </a>
                  <span>•</span>
                  <a
                    href="https://portfoliosri-khaki.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    portfoliosri-khaki.vercel.app
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-7">
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles size={13} />
                  Professional Summary
                </h4>
                <p className="text-[13.5px] leading-[1.75] text-text-muted font-lora">
                  Computer Science and Engineering graduate (2026) with six months of internship experience building production React, TypeScript and Next.js applications on AWS (Lambda, AppSync, DynamoDB, Cognito). Authored 40+ automated tests with Vitest and React Testing Library. Built full-stack projects using the MERN stack, FastAPI and Java with MySQL. Seeking an entry-level Full Stack Developer or Software Developer role.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-7">
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Technical Skills
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs font-lora">
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Languages:
                    </span>
                    <span className="text-text-muted">Java, JavaScript, TypeScript, Python, SQL</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Frontend:
                    </span>
                    <span className="text-text-muted">React.js, Next.js, HTML5, CSS3, Tailwind CSS</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Backend:
                    </span>
                    <span className="text-text-muted">Node.js, Express.js, FastAPI, REST APIs, GraphQL (AWS AppSync), JWT Authentication</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Cloud (AWS):
                    </span>
                    <span className="text-text-muted">Lambda, AppSync, DynamoDB, Cognito, IAM, CloudWatch, CloudFront</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Databases:
                    </span>
                    <span className="text-text-muted">MySQL, MongoDB, DynamoDB</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Testing:
                    </span>
                    <span className="text-text-muted">Vitest, Jest, React Testing Library, Playwright</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • AI & Data:
                    </span>
                    <span className="text-text-muted">RAG, LangChain, FAISS, Ollama, sentence-transformers</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-dm-mono font-semibold text-text-dark min-w-[125px] shrink-0">
                      • Tools:
                    </span>
                    <span className="text-text-muted">Git, GitHub, VS Code, Eclipse, AI agents</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-7">
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Briefcase size={13} />
                  Professional Experience
                </h4>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-accent/40 pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-dm-mono mb-1">
                      <span className="font-bold text-text-dark text-sm">
                        Junior Engineering Intern | Syzy Technologies Pvt Ltd, Salem
                      </span>
                      <span className="text-accent font-semibold">Jan 2026 – Jul 2026</span>
                    </div>

                    {/* FlowFlux */}
                    <div className="mt-2">
                      <div className="text-[13px] font-semibold text-text-dark font-lora">
                        FlowFlux – Enterprise CRM and Business Management Software
                      </div>
                      <div className="text-[11px] font-dm-mono text-text-light mb-1.5">
                        React.js · TypeScript · GraphQL · AWS · Vitest
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-text-muted space-y-1 font-lora">
                        <li>Built and maintained React and TypeScript components for CRM modules, integrating GraphQL APIs through AWS AppSync.</li>
                        <li>Worked with AWS Lambda, AppSync, DynamoDB, Cognito, IAM, CloudWatch and CloudFront.</li>
                        <li>Authored 40+ unit, integration and end-to-end tests using Vitest and React Testing Library, improving test coverage across CRM modules and catching regressions before deployment.</li>
                      </ul>
                    </div>

                    {/* Grand Vekasa */}
                    <div className="mt-3">
                      <div className="text-[13px] font-semibold text-text-dark font-lora">
                        Grand Vekasa Hotel Official Website
                      </div>
                      <div className="text-[11px] font-dm-mono text-text-light mb-1.5">
                        Next.js · SEO · Playwright · UI Automation
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-text-muted space-y-1 font-lora">
                        <li>Developed and optimized the hotel website in Next.js with a focus on SEO to improve search ranking and engagement.</li>
                        <li>Used AI coding tools (Codex, Antigravity IDE, Kiro IDE) to accelerate development, and used Playwright, Figma Make and Stitch AI to build automations and prototype UI.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-7">
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Key Projects
                </h4>

                <div className="space-y-4">
                  {/* ZIP-RAG */}
                  <div className="border-l-2 border-[#f0ddc8] pl-4">
                    <div className="flex justify-between items-baseline text-xs font-dm-mono">
                      <span className="font-bold text-text-dark text-[13px]">
                        ZIP-RAG – Multi-Format Offline RAG System
                      </span>
                      <span className="text-text-light">Jan 2026 – Apr 2026</span>
                    </div>
                    <div className="text-[11px] font-dm-mono text-accent mb-1">
                      React · Python · FastAPI · FAISS · LangChain · Ollama · sentence-transformers
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs text-text-muted space-y-1 font-lora">
                      <li>Developed a full-stack application with a React frontend and FastAPI backend for real-time document querying.</li>
                      <li>Built an offline RAG system delivering document-grounded answers with no cloud dependency.</li>
                      <li>Designed a FAISS and sentence-transformers semantic search pipeline over large documents and ZIP files.</li>
                      <li>Ran local LLM inference (Llama 3 and Mistral via Ollama) for fully private, offline responses.</li>
                    </ul>
                  </div>

                  {/* LMS */}
                  <div className="border-l-2 border-[#f0ddc8] pl-4">
                    <div className="flex justify-between items-baseline text-xs font-dm-mono">
                      <span className="font-bold text-text-dark text-[13px]">
                        Personal Learning Management System (My Learning OS)
                      </span>
                      <span className="text-text-light">Feb 2025 – Jun 2025</span>
                    </div>
                    <div className="text-[11px] font-dm-mono text-accent mb-1">
                      MongoDB · Express.js · React.js · Node.js (MERN)
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs text-text-muted space-y-1 font-lora">
                      <li>Developed a full-stack learning management system to centralize notes, tasks, goals and roadmaps.</li>
                      <li>Built responsive React.js components and RESTful APIs supporting secure CRUD operations and efficient data retrieval.</li>
                      <li>Integrated JWT authentication and global search for secure access and fast navigation across all modules.</li>
                    </ul>
                  </div>

                  {/* Wholesale */}
                  <div className="border-l-2 border-[#f0ddc8] pl-4">
                    <div className="flex justify-between items-baseline text-xs font-dm-mono">
                      <span className="font-bold text-text-dark text-[13px]">
                        Online Wholesale Shop Management System
                      </span>
                      <span className="text-text-light">Dec 2023 – Apr 2024</span>
                    </div>
                    <div className="text-[11px] font-dm-mono text-accent mb-1">
                      Java · MySQL · Eclipse
                    </div>
                    <ul className="list-disc list-outside ml-4 text-xs text-text-muted space-y-1 font-lora">
                      <li>Developed a Java application to manage inventory and day-to-day wholesale operations.</li>
                      <li>Implemented CRUD operations with MySQL-backed persistence for product and order management.</li>
                      <li>Structured the code for maintainable business logic and clean database interaction.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-7">
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <GraduationCap size={13} />
                  Education
                </h4>
                <div className="space-y-2 text-xs font-lora">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-text-dark">B.E. Computer Science and Engineering</strong>
                      <span className="text-text-light"> | Sona College of Technology, Salem</span>
                    </div>
                    <div className="font-dm-mono text-accent font-semibold">
                      CGPA: 7.98 <span className="text-text-light font-normal">• Oct 2022 – Apr 2026</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-text-dark">HSC</strong>
                      <span className="text-text-light"> | SSRM Higher Secondary School, Karuppur, Salem</span>
                    </div>
                    <div className="font-dm-mono text-accent font-semibold">
                      90.5% <span className="text-text-light font-normal">• Jun 2020 – May 2021</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-text-dark">SSLC</strong>
                      <span className="text-text-light"> | SSRM Higher Secondary School, Karuppur, Salem</span>
                    </div>
                    <div className="font-dm-mono text-accent font-semibold">
                      89% <span className="text-text-light font-normal">• Jun 2018 – Mar 2019</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-dm-mono text-xs font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Award size={13} />
                  Achievements
                </h4>
                <p className="text-xs text-text-muted font-lora leading-relaxed">
                  • Won <strong>2nd Prize in Volant'24 Idea Presentation</strong> for “Speak-Up,” an AI-based mentoring application for children who stammer, designed with interactive game-based learning modules to encourage engaging and personalized practice.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-stone-100 rounded-2xl border border-[#f0ddc8] overflow-hidden relative">
              <iframe
                src={`${resumePdfPath}#view=FitH`}
                className="w-full h-full border-none"
                title="Sriharan R Resume PDF"
              />
              {/* Fallback overlay if iframe blocked */}
              <noscript>
                <div className="p-8 text-center">
                  <p className="text-sm text-text-muted mb-4 font-lora">
                    Unable to embed PDF viewer directly.
                  </p>
                  <a
                    href={resumePdfPath}
                    download="Sriharan_R_Resume.pdf"
                    className="px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-xs"
                  >
                    Download Resume PDF
                  </a>
                </div>
              </noscript>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-5 md:px-8 py-3.5 border-t border-[#f0ddc8] bg-[#fffaf3] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#f0ddc8] bg-white text-text-dark hover:border-accent hover:text-accent text-xs font-dm-mono transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Email Copied!" : "Copy Email"}</span>
            </button>

            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#f0ddc8] bg-white text-text-dark hover:border-accent hover:text-accent text-xs font-dm-mono transition-colors"
            >
              <ExternalLink size={13} />
              <span>Open in New Tab</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-dm-mono text-text-light hidden sm:inline">
              Format: PDF (289 KB)
            </span>
            <a
              href={resumePdfPath}
              download="Sriharan_R_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white font-semibold text-xs font-dm-mono hover:bg-accent-hover transition-all shadow-md active:scale-95 no-underline"
            >
              <Download size={15} />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
