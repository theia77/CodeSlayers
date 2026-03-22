import * as React from "react";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:opacity-90",
  secondary: "bg-accent text-white hover:opacity-90",
  outline: "border border-text/25 text-text hover:opacity-80",
  ghost: "text-text hover:opacity-80",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]} ${className}`.trim()}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
