import type { ReactNode } from "react";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex justify-center items-center gap-2 rounded-full font-semibold no-underline tracking-[0.02em] transition-all duration-200";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-[#e8803a] hover:-translate-y-0.5",
    secondary: "bg-transparent text-text-dark border-[1.5px] border-text-muted hover:border-accent hover:-translate-y-0.5",
    dark: "bg-text-dark text-white font-dm-mono tracking-[0.04em] hover:bg-[#3a2820] hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-[18px] py-[8px] text-[13px]",
    md: "px-7 py-3 text-[14px]",
    lg: "px-8 py-3.5 text-[14px]"
  };

  return (
    <a
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
