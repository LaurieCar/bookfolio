# 📚 Bookfolio

Une petite application web perso pour **cataloguer mes livres** et suivre mes lectures :

- 📘 **À lire** : les livres qui m'attendent
- 📖 **En cours** : ce que je lis en ce moment
- ✅ **Lus** : les livres terminés, avec ma note et mon avis

Les infos des livres (couverture, auteur, résumé, nombre de pages…) sont récupérées automatiquement grâce à l'**API Google Books**, qui est gratuite.

---

## 🧰 Stack technique

- **Backend** : Node.js, Express, SQLite (`better-sqlite3`)
- **Frontend** : React (Vite), React Router, Tailwind CSS 4
- **API externe** : Google Books

---

## ✅ Prérequis

- [Node.js](https://nodejs.org) **v20 ou plus** (développé avec la v24)
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
```

Dans `server/package.json`, ajouter `"type"` et les `"scripts"` :

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch index.js",
    "start": "node index.js"
  }
}
```

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
