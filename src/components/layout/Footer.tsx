import { navigate } from "../../App";

export const Footer = () => (
  <footer className="px-8 py-6 bg-[#100e0b] flex justify-between items-center flex-wrap gap-4">
    <div className="flex items-center gap-4">
      <span className="font-cormorant text-base font-bold text-text-muted">Sriharan R</span>
      <button
        onClick={() => navigate("/admin/login")}
        className="text-[10px] text-[#3a2820] hover:text-[#c2a882] transition-colors font-dm-mono cursor-pointer"
      >
        [Admin Login]
      </button>
    </div>
    <span className="text-[11px] text-[#3a2820] font-dm-mono">
      Built with React · TypeScript · Tailwind CSS
    </span>
  </footer>
);
