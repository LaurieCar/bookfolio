import type { Book, InfosLivre, Stats, Statut } from "./types.ts";

// Petite fonction utilitaire : fait le fetch, gère les erreurs et renvoie le JSON.
// <T> = le type de la réponse attendue, choisi à chaque appel (voir plus bas)
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Erreur ${res.status}`);
  }
  if (res.status === 204) return undefined as T; // pas de contenu (DELETE)
  return res.json() as Promise<T>;
}

export const searchGoogleBooks = (q: string) =>
  request<InfosLivre[]>(`/api/search?q=${encodeURIComponent(q)}`);

export const getBooks = (status?: Statut | "", q?: string) => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (q) params.set("q", q);
  return request<Book[]>(`/api/books?${params}`);
};

export const getBook = (id: number | string) =>
  request<Book>(`/api/books/${id}`);

// Le livre trouvé sur Google + le statut choisi
export const addBook = (book: InfosLivre & { status: Statut }) =>
  request<Book>("/api/books", { method: "POST", body: JSON.stringify(book) });

// Seulement les champs à changer, par exemple { rating: 4 }
export const updateBook = (id: number, changes: Partial<Book>) =>
  request<Book>(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });

export const deleteBook = (id: number) =>
  request<void>(`/api/books/${id}`, { method: "DELETE" });

export const getStats = () => request<Stats>("/api/stats");
