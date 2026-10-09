import type { Statut } from "./types.ts";

// Associe chaque statut à un libellé et à des couleurs Tailwind.
// Record<Statut, ...> : TypeScript vérifie qu'il y a bien les 3 statuts, ni plus ni moins
export const STATUTS: Record<Statut, { label: string; classes: string }> = {
  a_lire: { label: "À lire", classes: "bg-sky-100 text-sky-800" },
  en_cours: { label: "En cours", classes: "bg-amber-100 text-amber-800" },
  lu: { label: "Lu", classes: "bg-emerald-100 text-emerald-800" },
};
