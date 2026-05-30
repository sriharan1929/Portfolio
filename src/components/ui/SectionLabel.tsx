import React from "react";

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent font-dm-mono">
    {children}
  </span>
);
