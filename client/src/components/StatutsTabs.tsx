import type { Stats, Statut } from "../types";

// Liste des onglets
const ONGLETS: { valeur: Statut | ""; label: string }[] = [
  { valeur: "", label: "Tous" },
  { valeur: "a_lire", label: "À lire" },
  { valeur: "en_cours", label: "en cours" },
  { valeur: "lu", label: "Lus" },
];

interface StatusTabsProps {
  current: Statut | "";
  onChange: (s: Statut | "") => void;
  counts: Stats["parStatut"];
}
export default function StatutsTabs({
  current,
  onChange,
  counts,
}: StatusTabsProps) {
  // Total des livres = La somme des 3 statuts
  const total = counts.a_lire + counts.en_cours + counts.lu;

  return (
    <div className="inline-flex gap-1 p-1 bg-white border border-line rounded-control">
      {ONGLETS.map((onglet) => {
        const actif = onglet.valeur === current;
        const nombre = onglet.valeur === "" ? total : counts[onglet.valeur];

        return (
          <button
            key={onglet.label}
            type="button"
            aria-pressed={actif}
            onClick={() => onChange(onglet.valeur)}
            className={`flex items-center gap-2 px-4 py-2 rounded-control font-medium ${
              actif ? "bg-primary text-white" : "text-ink"
            }`}
          >
            {onglet.label}
            <span
              className={`rounded-full px-2 text-xs ${
                actif ? "bg-white/20 text-white" : "bg-muted text-ink"
              }`}
            >
              {nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}
