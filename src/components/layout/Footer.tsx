import { navigate } from "../../App";

export const Footer = () => (
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
      <a
        href="/Sriharan_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        Resume ↗
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
