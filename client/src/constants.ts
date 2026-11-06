import type { Statut } from "./types.ts";

// Associe chaque statut à un libellé et à des couleurs Tailwind.
// Record<Statut, ...> : TypeScript vérifie qu'il y a bien les 3 statuts, ni plus ni moins
export const STATUTS: Record<Statut, { label: string; classes: string }> = {
  a_lire: { label: "À lire", classes: "bg-a-lire text-a-lire-text" },
  en_cours: { label: "En cours", classes: "bg-en-cours text-en-cours-text" },
  lu: { label: "Lu", classes: "bg-lu text-lu-text" },
};

// Fond + texte de chaque couverture par défaut
const COUVERTURES = [
  "bg-primary text-white",
  "bg-peach text-ink",
  "bg-violet text-white",
  "bg-sage-dark text-white",
  "bg-sand text-ink",
  "bg-sage-light text-ink",
  "bg-lavender-light text-ink",
];

// Choisit la couleur d'un livre à partir de son id
export function couleurCouverture(id: number): string {
  return COUVERTURES[id % COUVERTURES.length];
}

// Messages affichés si onglet vide
export const MESSAGES_VIDE: Record<Statut | "", string> = {
  "": "Ta bibliothèque est vide pour l'instant. Ajoute ton premier livre ! 📚",
  a_lire: "Ta pile à lire est vide pour l'instant",
  en_cours: "Aucune lecture en cours pour l'instant",
  lu: "Pas encore de livre terminé. Ça viendra !",
};
