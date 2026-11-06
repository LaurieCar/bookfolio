import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode; // contenu affiché (texte, icone)
  className?: string; // couleurs fournies par le composant
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
