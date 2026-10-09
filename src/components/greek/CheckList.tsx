function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0 text-secondary">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

export default function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-text-primary">
          <CheckIcon />
          <span className="font-body-md text-body-md">{text}</span>
        </li>
      ))}
    </ul>
  );
}
