import { Router } from "express";
import type { InfosLivre } from "../types.ts";

const router = Router();
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// La forme (simplifiée) d'un résultat Google Books : presque tout peut manquer
interface GoogleVolume {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    publishedDate?: string;
    categories?: string[];
    industryIdentifiers?: { type: string; identifier: string }[];
    imageLinks?: { thumbnail?: string };
  };
}

// Transforme un résultat Google en objet simple
function simplifierLivre(item: GoogleVolume): InfosLivre {
  const info = item.volumeInfo || {};
  const isbn13 = (info.industryIdentifiers || []).find(
    (id) => id.type === "ISBN_13",
  );

  return {
    google_id: item.id,
    title: info.title || "Titre inconnu",
    authors: (info.authors || []).join(", "),
    description: info.description || "",
    // Google renvoie souvent http:// → on force https:// pour éviter les blocages
    cover_url:
      info.imageLinks?.thumbnail?.replace("http://", "https://") || null,
    page_count: info.pageCount || null,
    published_date: info.publishedDate || null,
    isbn: isbn13 ? isbn13.identifier : null,
    categories: (info.categories || []).join(", "),
  };
}

// Google Books renvoie parfois une erreur 503 passagère : on réessaie jusqu'à 3 fois
async function fetchAvecRetry(url: string, essais = 3): Promise<Response> {
  for (let i = 1; i < essais; i++) {
    const response = await fetch(url);
    // ok, ou erreur « définitive » (4xx) : on renvoie la réponse
    if (response.status < 500) return response;
    await new Promise((resolve) => setTimeout(resolve, 500)); // pause de 0,5 s
  }
  return fetch(url); // dernier essai : on renvoie la réponse quoi qu'il arrive
}

// GET /api/search?q=...
router.get("/", async (req, res) => {
  const q = req.query.q;
  if (typeof q !== "string" || q.trim() === "") {
    return res.status(400).json({ error: "Le paramètre q est obligatoire" });
  }

  const url =
    "https://www.googleapis.com/books/v1/volumes?maxResults=20&printType=books" +
    "&key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(q);

  const response = await fetchAvecRetry(url);
  if (!response.ok) {
    return res.status(502).json({ error: "Google Books ne répond pas" });
  }

  const data = (await response.json()) as { items?: GoogleVolume[] };
  const livres = (data.items || []).map(simplifierLivre);
  res.json(livres);
});

export default router;
