import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../constants";
import profilePic from "../../assets/Profile.jpg";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-100 px-8 h-16 flex items-center justify-between transition-all duration-300 ease-in-out border-b ${
      scrolled ? "bg-[rgba(255,253,249,0.92)] backdrop-blur-[12px] border-[#f0ddc8]" : "bg-transparent border-transparent"
    }`}>
      <a
        href="#home"
        onClick={(e) => handleNav(e, "#home")}
        className="flex items-center gap-2.5 font-cormorant text-xl font-bold text-text-dark no-underline tracking-[-0.02em] transition-opacity duration-200 hover:opacity-80"
      >
        <img src={profilePic} alt="Sri-Portfolio Logo" className="w-8 h-8 rounded-full object-cover border border-[#f0ddc8] shadow-sm" />
        Sri-Portfolio
      </a>

      {/* Desktop nav */}
      <div className="flex gap-8 items-center">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            className="text-[13px] font-medium text-text-muted no-underline tracking-[0.02em] transition-colors duration-200 hover:text-accent"
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:sriharan8072@gmail.com"
          className="text-[13px] font-semibold text-white bg-accent no-underline px-[18px] py-[8px] rounded-full tracking-[0.02em] transition-colors duration-200 hover:bg-accent-hover"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
};
