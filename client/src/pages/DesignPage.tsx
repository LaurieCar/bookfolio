import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

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
      {/* … une section par composant : badges des 3 statuts, carte, champ … */}
    </div>
  );
}
