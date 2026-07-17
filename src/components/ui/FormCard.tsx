import type { HTMLAttributes, ReactNode } from "react";

interface FormCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  headerRight?: ReactNode;
}

export const FormCard = ({
  children,
  className = "",
  title,
  headerRight,
  ...props
}: FormCardProps) => {
  return (
    <div
      className={`bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)] ${className}`}
      {...props}
    >
      {title && (
        <div className="flex justify-between items-center pb-2 border-b border-[#f0ddc8] w-full">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono">
            {title}
          </h3>
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
};
