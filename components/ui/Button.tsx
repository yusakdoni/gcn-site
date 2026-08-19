import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-cta uppercase transition-all duration-300 ease-editorial";

const variants: Record<Variant, string> = {
  primary: "bg-electric text-white hover:bg-deep-blue",
  secondary: "border border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white",
  ghost: "text-deep-blue hover:text-electric underline-offset-4 hover:underline",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
}

export function Button({ variant = "primary", href, children, className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
