import type { ComponentProps } from "react";
import { classesBouton, type Variante } from "./buttonStyles";

// Les props d'un bouton (onClick, type, disabled) + la variante
interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variante;
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${classesBouton(variant)} ${className}`} {...props} />
  );
}
