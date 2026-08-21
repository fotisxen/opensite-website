export interface BreakdownItem {
  label: string;
  value: number;
}

export default function BreakdownBars({
  items,
  color,
  formatValue,
}: {
  items: BreakdownItem[];
  color: string;
  formatValue: (n: number) => string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));

  if (items.length === 0) {
    return <p className="font-body-sm text-body-sm text-text-secondary">No data yet.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="font-label-sm text-label-sm">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="truncate pr-2 normal-case">{item.label}</span>
            <span className="shrink-0">{formatValue(item.value)}</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(4, (item.value / max) * 100)}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
