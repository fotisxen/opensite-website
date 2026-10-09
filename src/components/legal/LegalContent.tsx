import Link from "next/link";
import type { Block, LegalDoc } from "@/lib/legal";

// Inline markup used in the legal texts: `code` and [label](url).
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded bg-surface-container px-1 py-0.5 text-[0.9em] text-text-primary">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const external = /^https?:/.test(href);
          return external ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
              {label}
            </a>
          ) : (
            <Link key={i} href={href} className="text-primary underline underline-offset-2">
              {label}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return (
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          <Inline text={block.text} />
        </p>
      );
    case "lines":
      return (
        <p className="mt-3 text-base leading-relaxed text-text-primary">
          {block.lines.map((line, i) => (
            <span key={i} className="block">
              <Inline text={line} />
            </span>
          ))}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-1 pl-6 text-base leading-relaxed text-text-secondary">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto rounded-xl border border-surface-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-surface-container text-text-primary">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-surface-border align-top">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 text-text-secondary ${j === 0 ? "font-medium text-text-primary" : ""}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

// The page title is the H1 and each section title is an H2, as in the texts.
export default function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <article>
      <h1 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-text-secondary">{doc.updated}</p>
      {doc.intro && <p className="mt-4 text-base leading-relaxed text-text-secondary">{doc.intro}</p>}
      {doc.sections.map((section) => (
        <section key={section.title} id={section.id} className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}
