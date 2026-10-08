import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // pour lire le JSON envoyé par le client

app.get("/api/health", (req, res) => {
  res.json({ message: "Hello, le serveur fonctionne ! 📚" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
