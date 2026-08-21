export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block font-label-md text-label-md text-text-secondary">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 font-body-md text-body-md text-text-primary outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container";

export const primaryButtonClass =
  "rounded-xl bg-primary-container px-6 py-3 font-headline-sm text-headline-sm text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-60";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-card rounded-2xl p-6 ${className}`}>{children}</div>;
}
