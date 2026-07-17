import { useState, useEffect } from "react";
import { PortfolioDataProvider } from "./context/PortfolioDataContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminPanel } from "./components/admin/AdminPanel";
import { DotGrid } from "./components/ui/DotGrid";

import "./index.css";

// Global navigation helper
export const navigate = (path: string) => {
  // If the app is served from a subdirectory like /Portfolio, prepend it
  const base = "/Portfolio";
  const target = path.startsWith(base) ? path : `${base}${path === "/" ? "" : path}`;
  window.history.pushState({}, "", target);
  window.dispatchEvent(new Event("popstate"));
};

function Router() {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const base = "/Portfolio";
      
      let normalized = path;
      if (path.startsWith(base)) {
        normalized = path.substring(base.length);
      }
      
      if (normalized === "" || normalized === "/index.html") {
        normalized = "/";
      }
      
      setCurrentPath(normalized);
    };

    window.addEventListener("popstate", handleLocationChange);
    // Initial run
    handleLocationChange();

    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  if (currentPath === "/admin") {
    return <AdminPanel />;
  }

  if (currentPath === "/admin/login") {
    return <AdminLogin />;
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <DotGrid
          dotSize={2.5}
          gap={26}
          baseColor="#e5d1b8"
          activeColor="#c2611a"
          proximity={180}
          shockRadius={280}
          shockStrength={5.5}
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <PortfolioDataProvider>
      <Router />
    </PortfolioDataProvider>
  );
}
