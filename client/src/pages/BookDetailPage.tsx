import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowRight, BookOpen, Trash2 } from "lucide-react";
import { deleteBook, getBook, updateBook } from "../api";
import { couleurCouverture } from "../constants";
import type { Book, Statut } from "../types";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";
import StatusButton from "../components/StatusButtons";

export default function BookDetailPage() {
  // id du livre
  const { id } = useParams();

  // states
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useNavigate
  const navigate = useNavigate();

  // chargement du livre
  useEffect(() => {
    if (!id) return;
    getBook(id)
      .then(setBook)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // lien de retour
  const lienRetour = (
    <Link
      to="/bibliotheque"
      className="text-ink/70 flex items-center gap-2 font-bold"
    >
      <ArrowRight />
      Retour à la bibliothèque
    </Link>
  );

  if (loading) return <Loader />;

  // livre introuvable ou erreur
  if (error || !book) {
    return (
      <div className="space-y-4">
        {lienRetour}
        <p>
          {error === "Livre introuvable"
            ? "Ce livre n'est pas dans la bibliothèque"
            : error}
        </p>
      </div>
    );
  }

  // infos du livre (annee, pages, ISBN)
  const infos = [
    { label: "Année", valeur: book.published_date?.slice(0, 4) || "-" },
    { label: "Pages", valeur: book.page_count || "-" },
    { label: "ISBN", valeur: book.isbn || "-" },
  ];

  // Catégories des livres : renvoie un tableau
  const categories = book.categories ? book.categories.split(", ") : [];

  // Envoie le nouveau statut du livre et affiche le livre mis à jour
  function changerStatut(nouveau: Statut) {
    updateBook(book!.id, { status: nouveau })
      .then(setBook)
      .catch((err: Error) => alert(err.message));
  }

  // suppression d'un livre
  function supprimer() {
    if (!window.confirm(`Supprimer « ${book!.title} » de ta bibliothèque ?`))
      return;
    deleteBook(book!.id)
      .then(() => navigate("/bibliotheque"))
      .catch((err: Error) => alert(err.message));
  }

  return (
    <div className="space-y-6">
      {lienRetour}

      {/* Grande carte */}
      <Card className="p-10 relative overflow-hidden">
        <div className="flex gap-12">
          {/* Colonne de gauche : Couverture */}
          <div className="w-64 shrink-0 relative">
            <div
              className="absolute -left-32 top-96 w-96 h-96 rounded-full bg-[#fdf1e6]"
              aria-hidden="true"
            ></div>
            {/* Couverture */}
            {book.cover_url ? (
              <img
                src={`${book.cover_url}&fife=w600`} // grande image google
                alt={`Couverture de ${book.title}`}
                className="relative aspect-2/3 w-full object-cover rounded-card shadow-2xl"
              />
            ) : (
              <div
                className={`relative aspect-2/3 w-full rounded-card shadow-2xl flex flex-col p-6 ${couleurCouverture(book.id)}`}
              >
                <BookOpen size={24} aria-hidden="true" />
                <p className="flex-1 flex items-center font-heading text-[32px] font-bold leading-tight">
                  {book.title}
                </p>
                <p className="text-sm">{book.authors || "Auteur inconnu"}</p>
              </div>
            )}
          </div>

          {/* Colonne de droite : infos du livre */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <StatusBadge status={book.status} />
              <h1 className="font-heading text-[32px] font-bold leading-tight">
                {book.title}
              </h1>
              <p className="text-lg text-ink/70">
                {book.authors || "Auteur inconnu"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {infos.map((info) => (
                <div
                  key={info.label}
                  className="bg-cream rounded-control px-4 py-3"
                >
                  <p className="text-xs text-ink/70">{info.label}</p>
                  <p className="font-heading font-semibold">{info.valeur}</p>
                </div>
              ))}
            </div>
            {/* Catégories */}
            <div className="flex flex-wrap items-center gap-2">
              <p className="mr-2 text-sm font-semibold">Catégories</p>
              {categories.length > 0 ? (
                categories.map((categorie) => (
                  <Badge key={categorie} className="bg-muted text-ink">
                    {categorie}
                  </Badge>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
            {/* Résumé */}
            <div className="space-y-2">
              <h2 className="font-heading text-lg font-semibold">Résumé</h2>
              <p className="leading-relaxed">
                {book.description || "Pas de résumé disponible pour le moment"}
              </p>
            </div>
            {/* Mise à jour du statut */}
            <hr className="border-muted" />
            <div className="space-y-3">
              <p className="text-sm font-semibold">Statut de lecture</p>
              <StatusButton current={book.status} onChange={changerStatut} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-10">
        <button
          type="button"
          onClick={supprimer}
          className="inline-flex h-[46px] items-center gap-2 px-5 rounded-control border border-[#f2dbd8] bg-white text-[#a12a1f] font-medium cursor-pointer hover:bg-[#a12a1f] hover:text-white"
        >
          <Trash2 size={16} aria-hidden="true" />
          Supprimer le livre
        </button>
      </Card>
    </div>
  );
}
