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

// Landing pages and the thank-you page share the frame and the Greek copy.
export function isGreekFramePath(pathname: string | null | undefined) {
  return isLandingPath(pathname) || isThanksPath(pathname);
}

export function isAdminPath(pathname: string | null | undefined) {
  return normalize(pathname).startsWith("/admin");
}
