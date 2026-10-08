import { Router } from "express";

const router = Router();
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Transforme un résultat Google en objet simple
function simplifierLivre(item) {
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
async function fetchAvecRetry(url, essais = 3) {
  for (let i = 1; i <= essais; i++) {
    const response = await fetch(url);
    // ok, ou erreur « définitive » (4xx), ou dernier essai : on renvoie la réponse
    if (response.ok || response.status < 500 || i === essais) return response;
    await new Promise((resolve) => setTimeout(resolve, 500)); // pause de 0,5 s
  }
}

// GET /api/search?q=...
router.get("/", async (req, res) => {
  const q = req.query.q;
  if (!q || q.trim() === "") {
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

  const data = await response.json();
  const livres = (data.items || []).map(simplifierLivre);
  res.json(livres);
});

export default router;
