import type { Statut } from "./types.ts";

// Associe chaque statut à un libellé et à des couleurs Tailwind.
// Record<Statut, ...> : TypeScript vérifie qu'il y a bien les 3 statuts, ni plus ni moins
export const STATUTS: Record<Statut, { label: string; classes: string }> = {
  a_lire: { label: "À lire", classes: "bg-a-lire text-a-lire-text" },
  en_cours: { label: "En cours", classes: "bg-en-cours text-en-cours-text" },
  lu: { label: "Lu", classes: "bg-lu text-lu-text" },
};
