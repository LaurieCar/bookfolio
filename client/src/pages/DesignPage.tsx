import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ButtonLink from "../components/ui/ButtonLink";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import StatusBadge from "../components/StatusBadge";
import BookCard from "../components/BookCard";
import type { Book } from "../types";

export default function DesignPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-heading text-2xl font-semibold">
        Design system BookFolio
      </h1>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Boutons</h2>
        <div className="flex gap-2">
          <Button>Principal</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button disabled>Désactivé</Button>
          <ButtonLink to="/ajouter">+ Ajouter un livre</ButtonLink>
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">
          Badges des 3 statuts
        </h2>
        <Badge className="bg-lu text-lu-text">Lu</Badge>
        <Badge className="bg-en-cours text-en-cours-text">En cours</Badge>
        <Badge className="bg-a-lire text-a-lire-text">À lire</Badge>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Cartes</h2>
        <Card className="p-4">Petite Carte</Card>
        <Card className="p-10">Grande Carte</Card>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Champs</h2>
        <Input label="Titre, auteur ou ISBN" placeholder="Victor Hugo" />
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Statuts Badges</h2>
        <StatusBadge status="a_lire" />
        <StatusBadge status="en_cours" />
        <StatusBadge status="lu" />
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Liste des livres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Un livre avec auteur */}
          <BookCard
            book={
              {
                id: 5,
                title: "La Peste",
                authors: "Albert Camus",
                status: "lu",
                cover_url: null,
              } as Book
            }
          />
          {/* Un livre sans auteur */}
          <BookCard
            book={
              {
                id: 6,
                title: "Le livre sans nom",
                authors: null,
                status: "a_lire",
                cover_url: null,
              } as Book
            }
          />
        </div>
      </section>
      {/* … une section par composant : badges des 3 statuts, carte, champ … */}
    </div>
  );
}
