import { phoneHref, siteConfig, viberHref, whatsappHref } from "@/lib/site.config";

// Inline SVGs: the landing pages do not load the Material Symbols font.
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-label-md text-label-md transition-all";
const primary = `${base} bg-primary-container text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]`;
const secondary = `${base} border border-surface-border bg-surface-container-high text-text-primary hover:border-primary`;

// The phone is always there; Viber and WhatsApp only when the config says
// the number has them.
export default function ContactButtons({
  phoneLabel,
  className = "",
}: {
  phoneLabel: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={phoneHref} className={primary}>
        <PhoneIcon />
        {phoneLabel}
      </a>
      {siteConfig.phone.viber === true && (
        <a href={viberHref} className={secondary}>
          <ChatIcon />
          Viber
        </a>
      )}
      {siteConfig.phone.whatsapp === true && (
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={secondary}>
          <ChatIcon />
          WhatsApp
        </a>
      )}
    </div>
  );
}

// The single line under the form: "ή κάλεσε 698 449 6660" plus chat links.
export function AltContactLine() {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body-md text-body-md text-text-secondary">
      <span>
        ή κάλεσε{" "}
        <a href={phoneHref} className="whitespace-nowrap font-semibold text-text-primary underline decoration-primary/60 underline-offset-4">
          {siteConfig.phone.display}
        </a>
      </span>
      {siteConfig.phone.viber === true && (
        <a href={viberHref} className="text-primary underline underline-offset-4">
          Viber
        </a>
      )}
      {siteConfig.phone.whatsapp === true && (
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
          WhatsApp
        </a>
      )}
    </p>
  );
}
