import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import "./db.ts"; // ouvre la base et crée la table au démarrage
import booksRouter from "./routes/books.ts";
import searchRouter from "./routes/search.ts";
import statsRouter from "./routes/stats.ts";

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
// (Express le reconnaît grâce à ses 4 paramètres : il faut garder « next » même s'il ne sert pas)
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erreur serveur" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
