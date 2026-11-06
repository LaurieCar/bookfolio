import { STATUTS } from "../constants";
import type { Statut } from "../types";

// ordre des boutons
const ORDRE: Statut[] = ["a_lire", "en_cours", "lu"];

interface StatusButtonsProps {
  current: Statut;
  onChange: (s: Statut) => void;
}

export default function StatusButton({
  current,
  onChange,
}: StatusButtonsProps) {
  return (
    <div className="flex gap-3">
      {ORDRE.map((statut) => {
        const actif = statut === current;
        return (
          <button
            key={statut}
            type="button"
            aria-pressed={actif}
            onClick={() => onChange(statut)}
            className={`h-[46px] w-30 rounded-control border font-medium cursor-pointer ${
              actif
                ? "bg-lu text-lu-text border-lu-text"
                : "bg-white text-ink border-line"
            }`}
          >
            {actif && "✓ "}
            {STATUTS[statut].label}
          </button>
        );
      })}
    </div>
  );
}
