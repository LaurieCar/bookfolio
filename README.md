# 📚 Bookfolio

Une petite application web perso pour **cataloguer mes livres** et suivre mes lectures :

- 📘 **À lire** : les livres qui m'attendent
- 📖 **En cours** : ce que je lis en ce moment
- ✅ **Lus** : les livres terminés, avec ma note et mon avis

Les infos des livres (couverture, auteur, résumé, nombre de pages…) sont récupérées automatiquement grâce à l'**API Google Books**, qui est gratuite.

---

## 🧰 Stack technique

- **Backend** : Node.js, Express, TypeScript, SQLite (`better-sqlite3`)
- **Frontend** : React (Vite), React Router, Tailwind CSS 4
- **API externe** : Google Books

---

## ✅ Prérequis

- [Node.js](https://nodejs.org) **v22.18 ou plus** (développé avec la v24), pour exécuter directement les fichiers TypeScript
- npm **v10 ou plus** (installé avec Node.js)
- [Git](https://git-scm.com)

---

## ⚙️ Installation et configuration

### Backend

```bash
mkdir server
cd server
npm init -y
npm install express cors better-sqlite3
npm install --save-dev typescript @types/node @types/express @types/cors @types/better-sqlite3
```

Dans `server/package.json`, ajouter `"type"` et les `"scripts"` :

```json
{
  "type": "module",
  "main": "index.ts",
  "scripts": {
    "dev": "node --env-file=.env --watch index.ts",
    "start": "node --env-file=.env index.ts",
    "typecheck": "tsc"
  }
}
```

Node exécute directement les fichiers `.ts`, en retirant les types. TypeScript sert uniquement à vérifier le code (`npm run typecheck`).

`server/tsconfig.json` :

```jsonc
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

Les imports entre fichiers du serveur se font avec l'extension `.ts` (`import db from "./db.ts";`), et les imports de types avec `import type`.

### Clé API Google Books

L'API Google Books nécessite une clé (gratuite) :

1. Sur la [Google Cloud Console](https://console.cloud.google.com), créer un projet.
2. Activer **Books API** (*API et services → Bibliothèque*).
3. Créer une clé API (*API et services → Identifiants → Créer des identifiants → Clé API*).

Copier `server/.env.example` en `server/.env`, puis y mettre la clé :

```env
GOOGLE_BOOKS_API_KEY=ta_cle_ici
```

Le fichier `.env` n'est pas versionné (il est dans le `.gitignore`).

Tester la clé dans le navigateur (remplacer `TA_CLE`) :

```
https://www.googleapis.com/books/v1/volumes?q=le+petit+prince&maxResults=2&key=TA_CLE
```

### Base de données

SQLite avec `better-sqlite3` (installé avec le backend) : toute la base tient dans un seul fichier.

`server/db.ts` (connexion et création de la table `books`) :

```ts
import Database from "better-sqlite3";
import fs from "node:fs";

fs.mkdirSync("data", { recursive: true });

const db = new Database("data/bibliotheque.db");

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
```

Dans `server/index.ts`, importer le fichier pour créer la table au démarrage :

```ts
import "./db.ts";
```

Les colonnes de la table sont décrites par le type `Book` dans `server/types.ts`.

Le fichier `server/data/bibliotheque.db` est créé automatiquement au premier lancement du serveur. Il n'est pas versionné (`*.db` dans le `.gitignore`).

> ⚠️ Lancer le serveur depuis le dossier `server/`, car le chemin de la base est relatif au dossier courant.

### Frontend

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install tailwindcss @tailwindcss/vite react-router
```

`client/vite.config.js` (plugins React + Tailwind, et proxy `/api` vers le serveur) :

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
```

`client/src/index.css` :

```css
@import "tailwindcss";
```

---

## 🚀 Lancer l'application

Dans deux terminaux séparés :

```bash
# Terminal 1 : le serveur
cd server
npm run dev
```

```bash
# Terminal 2 : le client
cd client
npm run dev
```

- API : <http://localhost:3001> (test : <http://localhost:3001/api/health>)
- Application : <http://localhost:5173>

Vérifier les types du backend :

```bash
cd server
npm run typecheck
```
