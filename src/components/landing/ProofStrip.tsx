import { proofClients } from "@/lib/landing";

// One line of real client names, directly under the rating in the hero.
//
// Clarity, 7 days to 23 November 2026: one page per session, 27 seconds of
// active time, and on the Cyprus page 69% of visitors gone before the first
// fifth. Whatever convinces them has to be inside the first screen, so the
// names sit there rather than only in the case-study section further down.
//
// Names only, no logos: logos would cost height the first screen does not
// have. Two names on a phone, four from the small breakpoint up — a wrapped
// third line pushed the form's reassurance text under the cookie banner.
export default function ProofStrip({ lang = "el" }: { lang?: "el" | "en" }) {
  const short = lang === "en" ? "Work" : "Έργα";
  const long = lang === "en" ? "Recent work" : "Πρόσφατα";
  const [a, b, c, d] = proofClients;

  return (
    <p className="mt-2 font-body-sm text-body-sm text-text-secondary">
      <span className="text-text-primary">
        <span className="sm:hidden">{short}</span>
        <span className="hidden sm:inline">{long}</span>:
      </span>{" "}
      {a} · {b}
      <span className="hidden sm:inline">
        {" "}
        · {c} · {d}
      </span>
    </p>
  );
}
