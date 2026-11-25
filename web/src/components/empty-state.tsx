export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border-2 border-dashed border-mecu-300 bg-mecu-100/50 px-6 py-10 text-center text-zinc-600">
      {children}
    </p>
  );
}
