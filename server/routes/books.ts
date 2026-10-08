import { Router } from "express";
import Database from "better-sqlite3";
import db from "../db.ts";
import type { Book } from "../types.ts";

const router = Router();

const STATUTS: string[] = ["a_lire", "en_cours", "lu"];

// GET /api/books : lister (avec des filtres)
router.get("/", (req, res) => {
  const { status, q } = req.query;

  let sql = "SELECT * FROM books WHERE 1=1"; // « 1=1 » est une astuce pour ajouter des AND facilement
  const params: string[] = [];

  if (typeof status === "string") {
    sql += " AND status = ?";
    params.push(status);
  }
  if (typeof q === "string") {
    sql += " AND (title LIKE ? OR authors LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }
  sql += " ORDER BY updated_at DESC";

  const books = db.prepare(sql).all(...params) as Book[];
  res.json(books);
});

// GET /api/books/:id : détail d'un livre
router.get("/:id", (req, res) => {
  const book = db
    .prepare("SELECT * FROM books WHERE id = ?")
    .get(req.params.id) as Book | undefined;
  if (!book) return res.status(404).json({ error: "Livre introuvable" });
  res.json(book);
});

// POST /api/books : ajouter un livre
router.post("/", (req, res) => {
  const {
    google_id,
    title,
    authors,
    description,
    cover_url,
    page_count,
    published_date,
    isbn,
    categories,
    status = "a_lire",
  } = req.body as Partial<Book>;

  // si titre manquant ou avec que des espaces
  if (!title || title.trim() === "")
    return res.status(400).json({ error: "Le titre est obligatoire" });

  // si mauvais statut du livre
  if (!STATUTS.includes(status))
    return res.status(400).json({ error: "Statut invalide" });

  const insert = db.prepare(`
    INSERT INTO books (
      google_id, title, authors, description, cover_url,
      page_count, published_date, isbn, categories, status
    )
    VALUES (
      @google_id, @title, @authors, @description, @cover_url,
      @page_count, @published_date, @isbn, @categories, @status
    )
  `);

  try {
    const result = insert.run({
      google_id: google_id ?? null,
      title: title,
      authors: authors ?? null,
      description: description ?? null,
      cover_url: cover_url ?? null,
      page_count: page_count ?? null,
      published_date: published_date ?? null,
      isbn: isbn ?? null,
      categories: categories ?? null,
      status: status,
    });

    // on relit le livre créé pour le renvoyer au client
    const book = db
      .prepare("SELECT * FROM books WHERE id = ?")
      .get(result.lastInsertRowid) as Book;
    res.status(201).json(book);
  } catch (error) {
    // doublon de google_id, insert échoue
    if (
      error instanceof Database.SqliteError &&
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return res
        .status(409)
        .json({ error: "Ce livre est déjà dans ta bibliothèque" });
    }
    throw error; // autre erreur : le gestionnaire d'erreurs de index.ts répond 500
  }
});

// PUT /api/books/:id : modifier un livre
router.put("/:id", (req, res) => {
  // récupérer un livre existant
  const existant = db
    .prepare("SELECT * FROM books WHERE id = ?")
    .get(req.params.id) as Book | undefined;
  if (!existant) return res.status(404).json({ error: "Livre introuvable" });

  // Fusionner
  const update: Book = { ...existant, ...(req.body as Partial<Book>) };

  // validation statut
  if (!STATUTS.includes(update.status))
    return res.status(400).json({ error: "Statut invalide" });

  // validation note
  const noteValide =
    update.rating === null ||
    (Number.isInteger(update.rating) &&
      update.rating >= 1 &&
      update.rating <= 5);

  if (!noteValide)
    return res
      .status(400)
      .json({ error: "La note doit être comprise entre 1 et 5" });

  // UPDATE de la requete
  db.prepare(
    `
        UPDATE books
        SET status = @status,
        rating = @rating,
        review = @review,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
        `,
  ).run({
    id: existant.id,
    status: update.status,
    rating: update.rating,
    review: update.review,
  });

  // réponse
  const book = db
    .prepare("SELECT * FROM books WHERE id = ?")
    .get(existant.id) as Book;
  res.json(book);
});

// DELETE /api/books/:id : supprimer un livre
router.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM books WHERE id = ?").run(req.params.id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Livre introuvable" });
  res.status(204).end();
});

export default router;
