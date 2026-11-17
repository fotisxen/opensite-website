import type { LeadActivityKind, LeadStatus } from "@/types/database";

// Funnel order for Admin → Leads. "qualified" is legacy and not a stage.
export const STAGES = ["new", "contacted", "replied", "demo", "proposal", "won", "lost"] as const;

export const statusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  replied: "Replied",
  demo: "Demo",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
  qualified: "Qualified",
};

export const channelLabel: Record<string, string> = {
  cold_email: "Cold email",
  instagram: "Instagram",
  google_ads: "Google Ads",
  site_form: "Site form",
  referral: "Referral",
  other: "Other",
};

export const activityLabel: Record<LeadActivityKind, string> = {
  email: "Email",
  followup: "Follow-up",
  dm: "DM",
  call: "Call",
  meeting: "Meeting",
  reply: "Reply",
  proposal: "Proposal",
  note: "Note",
  bounce: "Bounce",
};

export function today() {
  return new Date().toISOString().slice(0, 10);
}
