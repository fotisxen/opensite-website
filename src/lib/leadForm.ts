export const LEAD_FORM_ID = "lead-form";
export const LEAD_NAME_ID = "lead-name";

// Scrolls to the lead form and puts the cursor in the "Name" field.
// Used by the final CTA and the sticky bar.
export function focusLeadForm() {
  if (typeof document === "undefined") return;
  const form = document.getElementById(LEAD_FORM_ID);
  const name = document.getElementById(LEAD_NAME_ID) as HTMLInputElement | null;
  if (!form) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.setTimeout(() => name?.focus({ preventScroll: true }), reduce ? 0 : 450);
}
