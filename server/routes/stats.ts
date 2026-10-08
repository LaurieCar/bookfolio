import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/stats : regroupe toutes les stats en un seul objet
router.get("/", (req, res) => {
  // STATS nombre de livres par statut
  const lignes = db
    .prepare("SELECT status, COUNT(*) AS total FROM books GROUP BY status")
    .all();
  // remplir l'objet
  const parStatut = { a_lire: 0, en_cours: 0, lu: 0 };
  for (const ligne of lignes) {
    parStatut[ligne.status] = ligne.total;
  }
  const total = parStatut.a_lire + parStatut.en_cours + parStatut.lu;

  // STATS nombre de pages lues
  const pagesLues =
    db
      .prepare("SELECT SUM(page_count) AS pages FROM books WHERE status = 'lu'")
      .get().pages ?? 0; // si aucun livre lu, renvoie 0 au lieu de null

  // STATS note moyenne
  const noteMoyenne = db
    .prepare(
      "SELECT ROUND(AVG(rating), 1) AS moyenne FROM books WHERE rating IS NOT NULL",
    )
    .get().moyenne;

  // STATS top auteurs
  const topAuteurs = db
    .prepare(
      `
        SELECT authors, COUNT(*) AS total
        FROM books
        WHERE status = 'lu' AND authors IS NOT NULL
        GROUP BY authors
        ORDER BY total DESC
        LIMIT 5
        `,
    )
    .all();

  res.json({ parStatut, total, pagesLues, noteMoyenne, topAuteurs });
});

export default router;
