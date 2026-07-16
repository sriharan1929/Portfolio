import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import "./StarBorder.css";

interface StarBorderProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  radius?: string;
  children?: ReactNode;
}

export const StarBorder = <T extends ElementType = "div">({
  as: Component = "div" as T,
  className = "",
  innerClassName = "",
  color = "var(--color-accent-border)",
  speed = "6s",
  thickness = 1,
  radius = "20px",
  children,
  ...rest
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ComponentToRender = Component as any;
  return (
    <ComponentToRender
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius: radius,
        ...(rest.style as React.CSSProperties || {})
      }}
      {...(rest as Record<string, unknown>)}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          borderRadius: radius
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          borderRadius: radius
        }}
      ></div>
      <div
        className={`inner-content ${innerClassName}`}
        style={{
          borderRadius: `calc(${radius} - ${thickness}px)`
        }}
      >
        {children}
      </div>
    </ComponentToRender>
  );
};
