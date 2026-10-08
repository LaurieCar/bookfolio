import express from "express";
import cors from "cors";
import db from "./db.js";
import booksRouter from "./routes/books.js";
import searchRouter from "./routes/search.js";
import statsRouter from "./routes/stats.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // pour lire le JSON envoyé par le client

app.get("/api/health", (req, res) => {
  res.json({ message: "OK" });
});

app.use("/api/books", booksRouter);
app.use("/api/search", searchRouter);
app.use("/api/stats", statsRouter);

// gestion des erreurs non prévues
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erreur serveur" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
