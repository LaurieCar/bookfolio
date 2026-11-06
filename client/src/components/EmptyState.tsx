interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return <p className="py-12 text-center text-ink/70">{message}</p>;
}
