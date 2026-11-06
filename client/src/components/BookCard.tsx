import { Link } from "react-router";
import { BookOpen } from "lucide-react";
import Card from "./ui/Card";
import StatusBadge from "./StatusBadge";
import { couleurCouverture } from "../constants";
import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/livre/${book.id}`}>
      <Card className="p-4 flex flex-col gap-2 h-full">
        {/* La couverture = si on a book.cover url sinon par défaut*/}
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={`Couverture de ${book.title}`}
            className="aspect-2/3 w-full object-cover rounded-card shadow-card"
          />
        ) : (
          <div
            className={`aspect-2/3 w-full rounded-card flex flex-col p-4 ${couleurCouverture(book.id)}`}
          >
            <BookOpen size={20} aria-hidden="true" />
            <p className="flex-1 flex items-center font-heading font-bold">
              {book.title}
            </p>
            <p className="text-xs">{book.authors || "Auteur inconnu"}</p>
          </div>
        )}

        {/* Le titre */}
        <h3 className="font-heading font-semibold truncate">{book.title}</h3>
        {/* L'auteur */}
        <p className="text-sm text-ink/70 truncate">
          {book.authors || "Auteur inconnu"}
        </p>
        {/* Le badge (dans une div, sinon il s'étire sur toute la largeur) */}
        <div>
          <StatusBadge status={book.status} />
        </div>
      </Card>
    </Link>
  );
}
