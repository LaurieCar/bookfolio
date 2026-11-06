import Badge from "./ui/Badge";
import { STATUTS } from "../constants";
import type { Statut } from "../types";

// Les props du composant, décrites comme un objet
interface StatusBadgeProps {
  status: Statut;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = STATUTS[status];
  return <Badge className={s.classes}>{s.label}</Badge>;
}
