import { Loader as LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <p className="text-ink/70 flex items-center gap-2">
      <LoaderIcon
        size={20}
        strokeWidth={2}
        aria-hidden="true"
        className="animate-spin"
      />
      Chargement...
    </p>
  );
}
