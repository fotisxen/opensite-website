export type LeadPayload = Record<string, string | undefined>;

/** Στέλνει ένα αίτημα φόρμας στο δικό μας endpoint. Πετάει σφάλμα αν δεν επιβεβαιωθεί η αποστολή. */
export async function sendLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/api/lead.php", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  const confirmed =
    res.ok &&
    typeof data === "object" &&
    data !== null &&
    (data as { success?: unknown }).success === true;

  if (!confirmed) {
    throw new Error(`lead endpoint: ${res.status}`);
  }
}
