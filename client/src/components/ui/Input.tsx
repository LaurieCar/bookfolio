import { useId, type ComponentProps } from "react";

// toutes les props d'un input (value, onChange, placeholder, type) + le libellé
interface InputProps extends ComponentProps<"input"> {
  label: string; // label obligatoire
}

export default function Input({ label, className = "", ...props }: InputProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`h-[46px] px-3 rounded-control bg-white border border-line focus-visible:outline-2 focus-visible:outline-primary ${className}`}
        {...props}
      />
    </div>
  );
}
