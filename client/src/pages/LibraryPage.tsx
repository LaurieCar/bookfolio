import { useState, useEffect } from "react";
import { getBooks, getStats } from "../api";
import type { Book, Statut, Stats } from "../types";
import { MESSAGES_VIDE } from "../constants";
import ButtonLink from "../components/ui/ButtonLink";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import StatutsTabs from "../components/StatutsTabs";
import SearchBar from "../components/SearchBar";

export default function LibraryPage() {
  // la liste des livres
  const [books, setBooks] = useState<Book[]>([]);
  // Nombre total de livres
  const [stats, setStats] = useState<Stats | null>(null);
  // Statuts ""= Tous
  const [status, setStatus] = useState<Statut | "">("");
  // Chargement en cours
  const [loading, setLoading] = useState(true);
  // Les erreurs
  const [error, setError] = useState<string | null>(null);
  // Barre de recherche
  const [q, setQ] = useState("");

  // à chaque changement de statut, se recharge automatiquement
  useEffect(() => {
    getBooks(status, q)
      .then(setBooks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status, q]);

  // Les stats (total, compteurs par statut)
  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      {/* En-tête de la page*/}
      <div className="flex items-end justify-between mb-8">
        <div>
          {stats && (
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/70">
              {stats.total} livre{stats.total > 1 ? "s" : ""}
            </p>
          )}
          <h1 className="font-heading text-[32px] font-bold leading-tight">
            Ma bibliothèque
          </h1>
        </div>
        <ButtonLink to="/ajouter">+ Ajouter un livre</ButtonLink>
      </div>
      <div className="flex items-end justify-between gap-4">
        {/* Stats des livres */}
        {stats && (
          <StatutsTabs
            current={status}
            onChange={setStatus}
            counts={stats.parStatut}
          />
        )}
        {/* Barre de recherche */}
        <div className="w-96">
          <SearchBar value={q} onChange={setQ} />
        </div>
      </div>
      {/* Nombre de livres affichés */}
      <p className="mt-6 mb-4 text-sm text-ink/70">
        {books.length} livre{books.length > 1 ? "s" : ""}
      </p>
      {/* Grille des livres */}
      {books.length === 0 ? (
        <EmptyState
          message={
            q ? `Aucun livre ne correspond à " ${q} "` : MESSAGES_VIDE[status]
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
