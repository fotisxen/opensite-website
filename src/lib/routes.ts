// Routes that use the stripped-down "landing" frame: no main menu, no site
// footer, no newsletter, no sticky book-a-call button, no page transition.
export const LANDING_PATHS = [
  "/kataskevi-istoselidon-thessaloniki",
  "/kataskevi-eshop-thessaloniki",
  "/anakataskevi-istoselidas",
  // Nationwide pages used by the Google Ads campaign. New entries go last:
  // lib/greek.ts reads the first three by position.
  "/kataskevi-istoselidon",
  "/kataskevi-eshop",
  // English ad landing page for Cyprus and its thank-you page. They use
  // EnglishLandingFrame instead of the Greek frame (see ENGLISH_LANDING_PATHS).
  "/web-design-cyprus",
  "/thank-you",
] as const;

// The landing paths above that are in English.
const ENGLISH_LANDING_PATHS: readonly string[] = ["/web-design-cyprus", "/thank-you"];

export const THANKS_PATH = "/efcharistoume";

function normalize(pathname: string | null | undefined) {
  if (!pathname) return "";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function isLandingPath(pathname: string | null | undefined) {
  const p = normalize(pathname);
  return (LANDING_PATHS as readonly string[]).includes(p);
}

export function isEnglishLandingPath(pathname: string | null | undefined) {
  return ENGLISH_LANDING_PATHS.includes(normalize(pathname));
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

// Greek landing pages, the Greek thank-you page and the Greek site share the
// Greek copy and skip the English chrome.
export function isGreekFramePath(pathname: string | null | undefined) {
  return (
    (isLandingPath(pathname) && !isEnglishLandingPath(pathname)) ||
    isThanksPath(pathname) ||
    isGreekSitePath(pathname)
  );
}

// Pages that draw their own frame (Greek frame or English landing frame), so
// the English main chrome must not render there.
export function hasOwnFrame(pathname: string | null | undefined) {
  return isGreekFramePath(pathname) || isLandingPath(pathname);
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
  if (p === "/privacy-policy") return "/el/politiki-aporritou/";
  if (p === "/terms-of-service") return "/el/oroi-chrisis/";
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
  if (p === "/el/politiki-aporritou") return "/privacy-policy/";
  if (p === "/el/oroi-chrisis") return "/terms-of-service/";
  return "/";
}

export function isAdminPath(pathname: string | null | undefined) {
  return normalize(pathname).startsWith("/admin");
}
