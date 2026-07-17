import type { LabelHTMLAttributes, ReactNode } from "react";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export const FormLabel = ({ children, className = "", ...props }: FormLabelProps) => {
  return (
    <label
      className={`text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
