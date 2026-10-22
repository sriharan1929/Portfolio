import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../constants";
import profilePic from "../../assets/Profile.jpg";
import { Button } from "../ui/Button";
import { MenuToggle } from "../ui/MenuToggle";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 h-16 flex items-center justify-between transition-all duration-300 ease-in-out border-b ${
        scrolled || mobileMenuOpen ? "bg-[rgba(255,253,249,0.92)] backdrop-blur-[12px] border-[#f0ddc8]" : "bg-transparent border-transparent"
      }`}>
        <a
          href="#home"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 font-cormorant text-xl md:text-2xl font-bold text-text-dark no-underline tracking-[-0.02em] transition-opacity duration-200 hover:opacity-80 z-50 whitespace-nowrap shrink-0"
        >
          <img src={profilePic} alt="Sri-Portfolio Logo" className="w-8 h-8 rounded-full object-cover border border-[#f0ddc8] shadow-sm shrink-0" />
          <span>Sri-Portfolio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Sriharan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Resume ↗
          </a>
          <a
            href="https://www.linkedin.com/in/sriharan-r/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            LinkedIn ↗
          </a>
          <Button href="mailto:sriharan8072@gmail.com" size="sm">
            Hire me
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <MenuToggle 
          isOpen={mobileMenuOpen} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden z-50" 
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-bg-warm z-[90] flex flex-col justify-center items-center gap-7 transition-all duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-cormorant font-bold text-text-dark no-underline tracking-[0.02em]"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/Sriharan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="text-xl font-dm-mono font-medium text-accent no-underline tracking-[0.02em]"
        >
          ↓ Download Resume
        </a>
        <a
          href="https://www.linkedin.com/in/sriharan-r/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="text-xl font-dm-mono font-medium text-text-muted hover:text-text-dark no-underline tracking-[0.02em]"
        >
          ↗ LinkedIn Profile
        </a>
        <Button href="mailto:sriharan8072@gmail.com" size="lg" onClick={() => setMobileMenuOpen(false)}>
          Hire me
        </Button>
      </div>
    </>
  );
};
