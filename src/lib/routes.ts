// Routes that use the stripped-down "landing" frame: no main menu, no site
// footer, no newsletter, no sticky book-a-call button, no page transition.
export const LANDING_PATHS = [
  "/kataskevi-istoselidon-thessaloniki",
  "/kataskevi-eshop-thessaloniki",
  "/anakataskevi-istoselidas",
] as const;

export const THANKS_PATH = "/efcharistoume";

function normalize(pathname: string | null | undefined) {
  if (!pathname) return "";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function isLandingPath(pathname: string | null | undefined) {
  const p = normalize(pathname);
  return (LANDING_PATHS as readonly string[]).includes(p);
}

export function isThanksPath(pathname: string | null | undefined) {
  return normalize(pathname) === THANKS_PATH;
}

// The Greek site lives under /el/. It draws its own header and footer
// (see components/greek), so the English main chrome must not render there.
export function isGreekSitePath(pathname: string | null | undefined) {
  const p = normalize(pathname);
  return p === "/el" || p.startsWith("/el/");
}

// Landing pages, thank-you page and the Greek site share the Greek copy and
// skip the English chrome.
export function isGreekFramePath(pathname: string | null | undefined) {
  return isLandingPath(pathname) || isThanksPath(pathname) || isGreekSitePath(pathname);
}

// The same page in the other language, for the language switch. Pages with
// no Greek twin (articles, legal pages) fall back to the home page.
export function greekCounterpart(pathname: string | null | undefined) {
  const p = normalize(pathname);
  if (p === "" || p === "/") return "/el/";
  if (p === "/about") return "/el/schetika/";
  if (p === "/contact" || p === "/book-a-call") return "/el/epikoinonia/";
  if (p === "/case-studies") return "/el/ergasies/";
  if (p.startsWith("/case-studies/")) return `/el/ergasies/${p.slice("/case-studies/".length)}/`;
  if (p === "/services" || p.startsWith("/services/")) return "/el/ypiresies/";
  return "/el/";
}

export function englishCounterpart(pathname: string | null | undefined) {
  const p = normalize(pathname);
  if (p === "/el") return "/";
  if (p === "/el/schetika") return "/about/";
  if (p === "/el/epikoinonia") return "/contact/";
  if (p === "/el/ergasies") return "/case-studies/";
  if (p.startsWith("/el/ergasies/")) return `/case-studies/${p.slice("/el/ergasies/".length)}/`;
  if (p === "/el/ypiresies") return "/services/";
  return "/";
}

export function isAdminPath(pathname: string | null | undefined) {
  return normalize(pathname).startsWith("/admin");
}
