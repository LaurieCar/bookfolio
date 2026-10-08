import Database from "better-sqlite3";
import fs from "node:fs";

// On s'assure que le dossier data/ existe
fs.mkdirSync("data", { recursive: true });

// Ouvre (ou crée) le fichier de base de données
const db = new Database("data/bibliotheque.db");

// Crée la table si elle n'existe pas encore
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    google_id      TEXT UNIQUE,
    title          TEXT NOT NULL,
    authors        TEXT,
    description    TEXT,
    cover_url      TEXT,
    page_count     INTEGER,
    published_date TEXT,
    isbn           TEXT,
    categories     TEXT,
    status         TEXT NOT NULL DEFAULT 'a_lire'
                   CHECK (status IN ('a_lire', 'en_cours', 'lu')),
    rating         INTEGER CHECK (rating BETWEEN 1 AND 5),
    review         TEXT,
    created_at     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
