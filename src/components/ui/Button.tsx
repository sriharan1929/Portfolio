import type { ReactNode } from "react";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "dark" | "outline-light";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

type ButtonAsAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonAsButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex justify-center items-center gap-2 rounded-full font-semibold no-underline tracking-[0.02em] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-[#e8803a] hover:-translate-y-0.5 active:scale-[0.98]",
    secondary: "bg-transparent text-text-dark border-[1.5px] border-[#c2a882]/50 hover:border-accent hover:-translate-y-0.5 active:scale-[0.98]",
    dark: "bg-text-dark text-white font-dm-mono tracking-[0.04em] hover:bg-[#3a2820] hover:-translate-y-0.5 active:scale-[0.98]",
    "outline-light": "bg-transparent text-bg-warm border-[1.5px] border-[#c2a882]/50 hover:border-accent hover:text-accent hover:-translate-y-0.5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-[18px] py-[8px] text-[13px]",
    md: "px-7 py-3 text-[14px]",
    lg: "px-8 py-3.5 text-[14px]"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={combinedClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
