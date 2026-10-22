import { Sun, Atom, Terminal, Brain } from "lucide-react";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const DeskIllustration = () => {
  const { projects } = usePortfolioData();
  const projectCount = projects.length > 0 ? `${projects.length}` : "6";

  const chips = [
    { icon: <Atom size={18} className="text-[#0ea5e9] mx-auto" />, label: "React 19", color: "bg-[#e8f4fd]", delay: "0s" },
    { icon: <Terminal size={18} className="text-[#10b981] mx-auto" />, label: "FastAPI", color: "bg-[#edfce8]", delay: "1.3s" },
    { icon: <Brain size={18} className="text-[#f43f5e] mx-auto" />, label: "LLM", color: "bg-[#fde8e8]", delay: "2.6s" },
  ];

  return (
    <div className="relative w-[380px] h-[380px]">
      {/* Main desk card */}
      <div className="card-warm absolute top-[30px] left-[20px] right-[20px] bottom-[20px] rounded-3xl shadow-[0_8px_40px_rgba(194,97,26,0.1),0_2px_12px_rgba(0,0,0,0.04)] p-7 flex flex-col gap-4">
        {/* Lamp glow header */}
        <div className="h-20 rounded-xl bg-gradient-to-br from-[#fde8c8] via-[#fdf4e8] to-[#fff9f2] border border-accent-border flex items-center px-5 gap-3 animate-lamp-glow">
          <Sun size={26} className="text-[#a84e15]" />
          <div>
            <div className="text-[13px] font-bold text-[#7a3c10] font-dm-mono">ZIP-RAG System</div>
            <div className="text-[11px] text-[#b06830] mt-0.5">Offline · LangChain · FAISS · Ollama</div>
          </div>
        </div>

        {/* Floating stat chips */}
        <div className="flex gap-2.5">
          {chips.map((chip) => (
            <div key={chip.label} className={`flex-1 py-2.5 px-2 rounded-xl ${chip.color} text-center animate-float`} style={{ animationDelay: chip.delay }}>
              <div className="h-[22px] flex items-center justify-center">{chip.icon}</div>
              <div className="text-[10px] font-semibold text-text-muted mt-1 font-dm-mono">{chip.label}</div>
            </div>
          ))}
        </div>

        {/* Code snippet card */}
        <div className="flex-1 rounded-xl bg-text-dark p-4 font-dm-mono overflow-hidden">
          <div className="text-[10px] text-[#8b7b6b] mb-2">// semantic retrieval pipeline</div>
          <div className="text-[10px] leading-[1.8]">
            <span className="text-accent">const</span>
            <span className="text-[#e8c99a]"> retriever</span>
            <span className="text-[#888]"> = </span>
            <span className="text-[#7ec8a0]">FAISS</span>
            <span className="text-[#888]">.</span>
            <span className="text-[#e8dcc8]">from_documents</span>
            <span className="text-[#888]">(docs);</span>
            <br />
            <span className="text-accent">await</span>
            <span className="text-[#e8dcc8]"> ollama</span>
            <span className="text-[#888]">.</span>
            <span className="text-[#7ec8a0]">invoke</span>
            <span className="text-[#888]">(query);</span>
          </div>
        </div>

        {/* Bottom metrics */}
        <div className="flex gap-2">
          {[[projectCount, "Projects"], ["8+", "Tech Stacks"], ["2026", "Graduating"]].map(([val, label]) => (
            <div key={label} className="divider-t flex-1 text-center py-2.5">
              <div className="text-[18px] font-bold text-accent font-cormorant">{val}</div>
              <div className="text-[9px] text-text-light tracking-[0.06em] uppercase mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge – top right */}
      <div className="badge-featured absolute top-0 right-0 !text-[11px] !py-2 !px-3.5 shadow-[0_4px_16px_rgba(194,97,26,0.3)] animate-[float_5s_ease_infinite] [animation-delay:0.8s]">
        AI Builder
      </div>
    </div>
  );
};
