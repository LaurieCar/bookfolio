import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div">;

export default function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-card shadow-card ${className}`}
      {...props}
    ></div>
  );
}
