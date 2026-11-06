import Input from "./ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      label="Rechercher dans ma bibliothèque"
      placeholder="Titre ou auteur"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
