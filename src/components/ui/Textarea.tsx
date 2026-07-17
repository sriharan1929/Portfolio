import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "standard" | "nested";
  inputSize?: "sm" | "md";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", variant = "standard", inputSize = "md", ...props }, ref) => {
    const baseStyles = "w-full rounded-xl border border-[#f0ddc8] outline-none text-text-dark focus:border-accent leading-relaxed transition-colors duration-150 disabled:cursor-not-allowed";

    const variants = {
      standard: "bg-white disabled:bg-[#faf8f5]",
      nested: "bg-[#faf8f5]"
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-4 py-2.5 text-sm"
    };

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
