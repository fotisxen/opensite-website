import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

const process = [
  {
    label: "01",
    title: "Technical Audit",
    desc: "Crawl budget, site speed, indexation, and structured data. Fix the plumbing before writing a single word of content.",
  },
  {
    label: "02",
    title: "Keyword Architecture",
    desc: "We map search intent to page structure — so every page targets a purpose, not just a phrase.",
  },
  {
    label: "03",
    title: "Content Systems",
    desc: "Editorial calendars built around topics your buyers actually search, not what's easiest to write.",
  },
  {
    label: "04",
    title: "Authority Building",
    desc: "Earned links and digital PR that build topical trust — the signal search engines weight most.",
  },
  {
    label: "05",
    title: "Reporting & Iteration",
    desc: "Monthly ranking, traffic, and conversion reporting, in plain language, with the next move already decided.",
  },
];

// Node positions for the crawl-map graphic (percentages of a 600x400 viewbox-like space)
const nodes = [
  { id: "home", x: 300, y: 200, r: 22, label: "Home" },
  { id: "n1", x: 120, y: 90, r: 12 },
  { id: "n2", x: 90, y: 220, r: 10 },
  { id: "n3", x: 150, y: 320, r: 13 },
  { id: "n4", x: 480, y: 100, r: 11 },
  { id: "n5", x: 510, y: 230, r: 14 },
  { id: "n6", x: 460, y: 330, r: 10 },
  { id: "n7", x: 300, y: 60, r: 9 },
  { id: "n8", x: 300, y: 350, r: 9 },
];

const edges = [
  ["home", "n1"],
  ["home", "n2"],
  ["home", "n3"],
  ["home", "n4"],
  ["home", "n5"],
  ["home", "n6"],
  ["home", "n7"],
  ["home", "n8"],
  ["n1", "n7"],
  ["n4", "n7"],
  ["n3", "n8"],
  ["n6", "n8"],
];

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function SeoStrategyPage() {
  return (
    <>
      <section className="relative mx-auto mb-16 max-w-container-max px-margin-mobile pt-12 md:px-margin-desktop">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
        <FadeIn className="max-w-3xl">
          <span className="mb-stack-md inline-block rounded-full bg-secondary/10 px-3 py-1 font-label-sm text-label-sm text-secondary">
            SEO Strategy
          </span>
          <h1 className="mb-stack-lg font-display-lg-mobile text-display-lg-mobile leading-[1.1] md:text-display-lg">
            <span className="gradient-text">Visibility is infrastructure,</span>
            <br />
            not luck.
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-text-secondary">
            Search engines crawl a graph, not a homepage. We architect how
            authority flows through every page of your site — then earn the
            links that fill it.
          </p>
        </FadeIn>
      </section>

      {/* Signature: animated crawl map */}
      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn delay={0.1}>
          <div className="glass-card mx-auto max-w-3xl overflow-hidden rounded-3xl p-stack-lg">
            <svg
              viewBox="0 0 600 400"
              className="h-auto w-full"
              role="img"
              aria-label="Diagram of link authority flowing from a homepage to connected pages"
            >
              <defs>
                <radialGradient id="homeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ae176" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4ae176" stopOpacity="0" />
                </radialGradient>
              </defs>

              {edges.map(([a, b], i) => {
                const from = nodeById(a);
                const to = nodeById(b);
                return (
                  <g key={`${a}-${b}`}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#434655"
                      strokeWidth="1.5"
                    />
                    <circle r="3" fill="#4ae176">
                      <animateMotion
                        dur={`${2.4 + (i % 4) * 0.4}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.3}s`}
                        path={`M${from.x},${from.y} L${to.x},${to.y}`}
                      />
                    </circle>
                  </g>
                );
              })}

              <circle
                cx={nodeById("home").x}
                cy={nodeById("home").y}
                r={nodeById("home").r + 24}
                fill="url(#homeGlow)"
              />

              {nodes.map((n) =>
                n.id === "home" ? (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={n.r} fill="#4ae176" />
                    <text
                      x={n.x}
                      y={n.y + n.r + 20}
                      textAnchor="middle"
                      className="font-body-sm"
                      fill="#F8FAFC"
                      fontSize="13"
                    >
                      Home
                    </text>
                  </g>
                ) : (
                  <circle
                    key={n.id}
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill="#232a39"
                    stroke="#8d90a0"
                    strokeWidth="1.5"
                  />
                ),
              )}
            </svg>
          </div>
        </FadeIn>
        <p className="mt-4 text-center font-label-sm text-label-sm text-text-secondary">
          A simplified view of how link equity flows through a well-structured
          site
        </p>
      </section>

      {/* Process */}
      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="mb-stack-lg max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg">
            The five moves, in order
          </h2>
          <p className="mt-4 font-body-md text-text-secondary">
            SEO fails when steps get skipped. This is the sequence we run for
            every client, without exception.
          </p>
        </FadeIn>
        <Stagger className="space-y-4">
          {process.map((step) => (
            <StaggerItem
              key={step.title}
              className="glass-card flex flex-col gap-4 rounded-2xl p-8 transition-all hover:border-secondary/50 sm:flex-row sm:items-start"
            >
              <span className="font-headline-md text-headline-md text-secondary/50 sm:w-16">
                {step.label}
              </span>
              <div>
                <h3 className="mb-2 font-headline-sm text-headline-sm text-text-primary">
                  {step.title}
                </h3>
                <p className="font-body-sm text-text-secondary">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container-max px-margin-mobile pb-12 md:px-margin-desktop">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border/50 bg-surface-container p-stack-lg text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-secondary/5" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">
                Get a free <span className="text-secondary">crawl audit.</span>
              </h2>
              <p className="mb-stack-lg font-body-lg text-body-lg text-text-secondary">
                We&apos;ll show you exactly where your site is leaking authority
                — no commitment required.
              </p>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-xl bg-secondary-container px-8 py-4 font-label-md text-label-md text-on-secondary-container transition-all hover:opacity-90"
              >
                Request Audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
