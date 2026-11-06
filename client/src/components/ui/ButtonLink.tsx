import { Link, type LinkProps } from "react-router";
import { classesBouton, type Variante } from "./buttonStyles";

// Toutes les props d'un <Link> (to, children…) + la variante
interface ButtonLinkProps extends LinkProps {
  variant?: Variante;
}

export default function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${classesBouton(variant)} ${className}`} {...props} />
  );
}
