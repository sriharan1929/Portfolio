import { navigate } from "../../App";
import { usePortfolioData } from "../../context/PortfolioDataContext";

export const Footer = () => {
  const { openResume } = usePortfolioData();

  return (
    <footer className="px-8 py-6 bg-[#100e0b] flex justify-between items-center flex-wrap gap-4 border-t border-[#201812]">
      <div className="flex items-center gap-5 flex-wrap">
        <span className="font-cormorant text-base font-bold text-[#f5ebd9]">Sriharan R</span>
        <a
          href="https://github.com/sriharan1929"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/sriharan-r/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn ↗
        </a>
        <button
          type="button"
          onClick={openResume}
          className="footer-link bg-transparent border-none cursor-pointer p-0"
        >
          Resume Preview ↗
        </button>
        <a
          href="/Sriharan_Resume.pdf"
          download="Sriharan_R_Resume.pdf"
          className="footer-link text-accent hover:underline"
        >
          Download PDF ↓
        </a>
        <button
          onClick={() => navigate("/admin/login")}
          className="text-[10px] text-[#5a4840] hover:text-[#c2a882] transition-colors font-dm-mono cursor-pointer bg-transparent border-none outline-none"
        >
          [Admin Login]
        </button>
      </div>
    <span className="text-[11px] text-[#7a6858] font-dm-mono">
      Built with React · TypeScript · Tailwind CSS
    </span>
  </footer>
  );
};
