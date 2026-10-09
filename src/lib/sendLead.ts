import { siteConfig } from "./site.config";

export type LeadPayload = Record<string, string | undefined>;

// Where form submissions go. FormSubmit for now: on 9 October 2026 the live
// server did not run PHP, so the own endpoint in docs/lead-endpoint/lead.php
// cannot be used there. If the hosting can run PHP later, copy that file to
// public/api/ and set this to "/api/lead.php".
const LEAD_ENDPOINT: string = `https://formsubmit.co/ajax/${siteConfig.email}`;

const OWN_ENDPOINT = LEAD_ENDPOINT.startsWith("/");

/**
 * Sends one form submission. Throws unless the provider confirms it: a 2xx
 * with a JSON body that says success. Every form goes through here.
 */
export async function sendLead(payload: LeadPayload): Promise<void> {
  const { subject, ...rest } = payload;
  const body = OWN_ENDPOINT
    ? payload
    : { _subject: subject, _template: "table", ...rest };

  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

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
  const confirmed = res.ok && (success === true || success === "true");

  if (!confirmed) {
    throw new Error(`lead endpoint: ${res.status}`);
  }
}
