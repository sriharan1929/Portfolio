import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export const FadeIn = ({ children, delay = 0, direction = "up" }: FadeInProps) => {
  const [ref, isVisible] = useIntersectionObserver();
  const transforms = {
    up: "translate-y-7",
    left: "-translate-x-7",
    right: "translate-x-7",
    none: "translate-none",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[650ms] ease-[ease] ${
        isVisible ? "opacity-100 translate-none" : `opacity-0 ${transforms[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
