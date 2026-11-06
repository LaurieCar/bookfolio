export type Variante ="primary" | "secondary";

// Classes propres à chaque variante
const VARIANTES: Record<Variante, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-white border border-line text-ink hover:bg-muted",
};

// Renvoie toutes les classes des boutons communs + les variantes
export function classesBouton(variant: Variante = "primary"): string {
  return `inline-flex h-[46px] items-center justify-center gap-2 px-4 rounded-control font-heading font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTES[variant]}`;
}
