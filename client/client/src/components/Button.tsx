import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#00FF6A] text-[#021E12] shadow-[0_0_20px_rgba(0,255,106,0.3)] hover:shadow-[0_0_30px_rgba(0,255,106,0.5)] hover:bg-[#33FF85]",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/5",
    outline: "bg-transparent border-2 border-[#00FF6A] text-[#00FF6A] hover:bg-[#00FF6A]/10 shadow-[0_0_10px_rgba(0,255,106,0.1)]",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
