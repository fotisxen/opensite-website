import { ICON_PATHS } from "@/lib/icons";

// Inline replacement for the Material Symbols font. The font came from
// fonts.googleapis.com, which handed every visitor's IP address to Google
// before they could accept or decline anything. The glyph scales with the
// surrounding font size like the font did, and takes its colour from the text.
export default function Icon({
  name,
  filled = false,
  className = "",
}: {
  name: string;
  filled?: boolean;
  className?: string;
}) {
  const d = (filled && ICON_PATHS[`${name}-fill`]) || ICON_PATHS[name];
  if (!d) {
    // An icon name with no path would silently vanish; keep a hook to find it.
    return <span data-missing-icon={name} className={className} />;
  }
  return (
    <svg
      viewBox="0 -960 960 960"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 align-middle ${className}`}
    >
      <path d={d} />
    </svg>
  );
}
