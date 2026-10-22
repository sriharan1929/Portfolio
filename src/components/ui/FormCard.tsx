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
      className={`admin-card-panel rounded-[24px] md:p-8 flex flex-col gap-6 ${className}`}
      {...props}
    >
      {title && (
        <div className="divider-b flex justify-between items-center pb-2 w-full">
          <h3 className="mono-tag text-[12px]">
            {title}
          </h3>
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
};
