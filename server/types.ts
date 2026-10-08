// Les 3 statuts possibles d'un livre
export type Statut = "a_lire" | "en_cours" | "lu";

// Les infos d'un livre, telles que renvoyées par /api/search
export interface InfosLivre {
  google_id: string | null;
  title: string;
  authors: string | null;
  description: string | null;
  cover_url: string | null;
  page_count: number | null;
  published_date: string | null;
  isbn: string | null;
  categories: string | null;
}

// Un livre de ma bibliothèque (une ligne de la table books) :
// les infos du livre + mes données perso + les colonnes automatiques
export interface Book extends InfosLivre {
  id: number;
  status: Statut;
  rating: number | null;
  review: string | null;
  created_at: string;
  updated_at: string;
}
