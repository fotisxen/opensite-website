import { siteConfig } from "./site.config";

export type LeadPayload = Record<string, string | undefined>;

// Where form submissions go. FormSubmit for now: on 9 October 2026 the live
// server did not run PHP, so the own endpoint in docs/lead-endpoint/lead.php
// cannot be used there. If the hosting can run PHP later, copy that file to
// public/api/ and set this to "/api/lead.php".
const LEAD_ENDPOINT: string = `https://formsubmit.co/ajax/${siteConfig.email}`;

const OWN_ENDPOINT = LEAD_ENDPOINT.startsWith("/");

// On 20 October 2026 FormSubmit took 75 seconds to answer, although the email
// went out at once. Visitors left on "Αποστολή…" and never reached the
// thank-you page, so no conversion was counted. We now wait this long for an
// answer and then let the visitor through; the keepalive request keeps going.
const ANSWER_WAIT_MS = 4000;

/**
 * Sends one form submission. Throws only when the provider answers in time
 * and says it failed, or the request cannot be sent at all. A slow answer
 * counts as sent: the keepalive request carries on after the page changes.
 */
export async function sendLead(payload: LeadPayload): Promise<void> {
  const { subject, ...rest } = payload;
  const fields: Record<string, string> = {};
  const all = OWN_ENDPOINT ? payload : { _subject: subject, _template: "table", ...rest };
  for (const [key, value] of Object.entries(all)) {
    if (value !== undefined) fields[key] = value;
  }

  // A form-encoded body with only safelisted headers needs no CORS preflight,
  // which keepalive requests to another site do not reliably support.
  const request = fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams(fields),
    keepalive: true,
  }).then(async (res) => {
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    // FormSubmit answers {"success":"true"} (a string); our own endpoint answers true.
    const success =
      typeof data === "object" && data !== null
        ? (data as { success?: unknown }).success
        : undefined;
    if (!(res.ok && (success === true || success === "true"))) {
      throw new Error(`lead endpoint: ${res.status}`);
    }
  });

  const slow = new Promise<"slow">((resolve) => setTimeout(() => resolve("slow"), ANSWER_WAIT_MS));
  await Promise.race([request, slow]);
  // Past the wait, a late failure must not surface as an unhandled rejection.
  request.catch(() => {});
}
