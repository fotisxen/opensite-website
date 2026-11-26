/* ICS demo · shared data for the website (/demos/ics/) and the CRM (/demos/ics-crm/).
   Both pages read and write the same localStorage key, so an action on the website
   (quote, booking, portal upload, payment) shows up in the CRM at once, and the other way round.
   Everything is made up apart from offices, phones and team names (icsgr.com, Nov 2026). */
(function () {
  const KEY = "ics-demo-v2";
  const day = n => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const ago = h => Date.now() - h * 3600e3;
  /* an appointment at a wall-clock time in a timezone, n days from today */
  const at = (n, hh, mm, tz) => {
    const d = new Date(); d.setDate(d.getDate() + n);
    const ymd = d.toLocaleDateString("en-CA", { timeZone: tz });
    const guess = Date.parse(`${ymd}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00Z`);
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(guess));
    const shown = +p.find(x => x.type === "hour").value * 60 + +p.find(x => x.type === "minute").value;
    return guess - (shown - (hh * 60 + mm)) * 60e3;
  };

  const OFF = {
    Toronto: { tz: "America/Toronto", el: "Τορόντο", fr: "Toronto", tel: "+1 416 391 2286", mail: "toronto@icsgr.com", addr: "1315 Lawrence Ave E, Unit 203, Toronto ON M3A 3R3", ll: [-79.38, 43.65] },
    Montreal: { tz: "America/Toronto", el: "Μόντρεαλ", fr: "Montréal", tel: "+1 514 270 7337", mail: "montreal@icsgr.com", addr: "800 boul. Chomedey, Tour C, Suite 120, Laval QC H7V 3Y4", ll: [-73.57, 45.5] },
    "New York": { tz: "America/New_York", el: "Νέα Υόρκη", fr: "New York", tel: "+1 718 360 1657", mail: "newyork@icsgr.com", addr: "32-75 Steinway St, Suite 207, Astoria NY 11103", ll: [-74.0, 40.71] },
    Athens: { tz: "Europe/Athens", el: "Αθήνα", fr: "Athènes", tel: "+30 210 3230 205", mail: "athens@icsgr.com", addr: "Λεωφ. Συγγρού 233, Ν. Σμύρνη 171 21", ll: [23.73, 37.98] },
    Thessaloniki: { tz: "Europe/Athens", el: "Θεσσαλονίκη", fr: "Thessalonique", tel: "+30 2310 704 043", mail: "thessaloniki@icsgr.com", addr: "Π. Βλαχάκου 3, 562 26 Θεσσαλονίκη", ll: [22.94, 40.64] },
    Nicosia: { tz: "Asia/Nicosia", el: "Λευκωσία", fr: "Nicosie", tel: "+357 22 26 22 68", mail: "nicosia@icsgr.com", addr: "Γρηγορίου Ξενοπούλου 24, Λευκωσία", ll: [33.38, 35.17] },
  };
  /* perm: admin = everything incl. settings · all = every case · office = own office only · acct = tax & banking cases only */
  const U = {
    am: { n: "Anastasios Moussas", r: ["President", "Πρόεδρος", "Président"], off: "Toronto", c: "#0f1512", perm: "admin" },
    et: { n: "Efthymia Tseliou", r: ["Director", "Διευθύντρια", "Directrice"], off: "Toronto", c: "#8a3b5c", perm: "admin" },
    mm: { n: "Marianna Michalitsianou", r: ["Senior Consultant", "Senior Consultant", "Conseillère principale"], off: "Toronto", c: "#5b6b16", perm: "all" },
    md: { n: "Marie-Eve Duclos-Haskis", r: ["Senior Consultant", "Senior Consultant", "Conseillère principale"], off: "Montreal", c: "#7a4b9b", perm: "office" },
    mk: { n: "Maria Korda", r: ["Senior Consultant", "Senior Consultant", "Conseillère principale"], off: "Athens", c: "#2459a8", perm: "all" },
    ag: { n: "Anastasia Gianniloi", r: ["Managing Lawyer", "Δικηγόρος", "Avocate"], off: "Athens", c: "#a0522d", perm: "all" },
    sr: { n: "Stavroula Rigopoulou", r: ["Accounting", "Λογιστήριο", "Comptabilité"], off: "Athens", c: "#2f7d4f", perm: "acct" },
    el: { n: "Eleonora Lekka", r: ["Real Estate", "Ακίνητα", "Immobilier"], off: "Athens", c: "#b7791f", perm: "all" },
    gt: { n: "Georgios Tachtsidis", r: ["Senior Consultant", "Senior Consultant", "Conseiller principal"], off: "Thessaloniki", c: "#c2410c", perm: "office" },
  };
  const TYPES = {
    inh: { n: ["Inheritance", "Κληρονομιά", "Succession"], c: "blue", steps: [["Consultation", "Συζήτηση", "Consultation"], ["Power of attorney", "Πληρεξούσιο", "Procuration"], ["Translations", "Μεταφράσεις", "Traductions"], ["Acceptance", "Αποδοχή", "Acceptation"], ["Tax", "Φόρος", "Impôt"], ["Registration", "Μεταγραφή", "Enregistrement"]] },
    tax: { n: ["Tax declaration", "Φορολογική", "Déclaration fiscale"], c: "green", steps: [["Documents", "Έγγραφα", "Documents"], ["Preparation", "Προετοιμασία", "Préparation"], ["Review", "Έλεγχος", "Vérification"], ["Filed", "Υποβλήθηκε", "Déposée"]] },
    re: { n: ["Real estate", "Ακίνητα", "Immobilier"], c: "amber", steps: [["Valuation", "Εκτίμηση", "Évaluation"], ["Title check", "Έλεγχος τίτλων", "Vérification des titres"], ["Buyer / tenant", "Αγοραστής / ενοικιαστής", "Acheteur / locataire"], ["Contract", "Συμβόλαιο", "Contrat"], ["Closed", "Ολοκληρώθηκε", "Conclue"]] },
    tr: { n: ["Translation", "Μετάφραση", "Traduction"], c: "lime", steps: [["Received", "Παραλαβή", "Reçue"], ["Translating", "Μετάφραση", "En traduction"], ["Certified", "Πιστοποίηση", "Certifiée"], ["Delivered", "Παράδοση", "Livrée"]] },
    bank: { n: ["AFM & banking", "ΑΦΜ & τράπεζα", "AFM et banque"], c: "", steps: [["Documents", "Έγγραφα", "Documents"], ["AFM", "ΑΦΜ", "AFM"], ["Bank account", "Λογαριασμός", "Compte bancaire"], ["Done", "Ολοκληρώθηκε", "Terminé"]] },
    imm: { n: ["Immigration", "Μετανάστευση", "Immigration"], c: "red", steps: [["Eligibility", "Καταλληλότητα", "Admissibilité"], ["Application", "Αίτηση", "Demande"], ["Decision", "Απόφαση", "Décision"], ["Arrival", "Άφιξη", "Arrivée"]] },
  };
  /* what each stage means, in the client's words (shown in the portal) */
  const TIPS = {
    inh: [["We have talked and your case is open.", "Μιλήσαμε και η υπόθεσή σας ξεκίνησε.", "Nous avons discuté et votre dossier est ouvert."], ["You sign a power of attorney so we can act for you in Greece.", "Υπογράφετε πληρεξούσιο ώστε να ενεργούμε για εσάς στην Ελλάδα.", "Vous signez une procuration pour que nous agissions pour vous en Grèce."], ["We officially translate the documents (will, certificates).", "Μεταφράζουμε επίσημα τα έγγραφα (διαθήκη, πιστοποιητικά).", "Nous traduisons officiellement les documents (testament, certificats)."], ["The notary in Greece prepares the acceptance of inheritance.", "Ο συμβολαιογράφος στην Ελλάδα συντάσσει την αποδοχή κληρονομιάς.", "Le notaire en Grèce prépare l’acceptation de la succession."], ["The inheritance tax return is filed.", "Υποβάλλεται η δήλωση φόρου κληρονομιάς.", "La déclaration d’impôt sur la succession est déposée."], ["Registration at the land registry. Done!", "Μεταγραφή στο κτηματολόγιο. Τέλος!", "Enregistrement au cadastre. Terminé !"]],
    tax: [["We collect your documents.", "Συγκεντρώνουμε τα έγγραφά σας.", "Nous rassemblons vos documents."], ["Our accountants prepare the declaration.", "Οι λογιστές μας ετοιμάζουν τη δήλωση.", "Nos comptables préparent la déclaration."], ["A second accountant checks it.", "Δεύτερος λογιστής την ελέγχει.", "Un second comptable la vérifie."], ["Filed. You receive the tax notice.", "Υποβλήθηκε. Λαμβάνετε το εκκαθαριστικό.", "Déposée. Vous recevez l’avis d’imposition."]],
    re: [["We visit and value the property.", "Επισκεπτόμαστε και εκτιμούμε το ακίνητο.", "Nous visitons et évaluons le bien."], ["We check the titles and permits.", "Ελέγχουμε τίτλους και άδειες.", "Nous vérifions les titres et permis."], ["We look for a buyer or tenant.", "Ψάχνουμε αγοραστή ή ενοικιαστή.", "Nous cherchons un acheteur ou un locataire."], ["The contract is prepared and signed.", "Το συμβόλαιο ετοιμάζεται και υπογράφεται.", "Le contrat est préparé et signé."], ["Completed.", "Ολοκληρώθηκε.", "Terminé."]],
    tr: [["We received your documents.", "Λάβαμε τα έγγραφά σας.", "Nous avons reçu vos documents."], ["Your translator is working on them.", "Ο μεταφραστής σας τα μεταφράζει.", "Votre traducteur y travaille."], ["The translation is certified.", "Η μετάφραση πιστοποιείται.", "La traduction est certifiée."], ["Ready: PDF and by courier.", "Έτοιμη: σε PDF και με courier.", "Prête : en PDF et par messagerie."]],
    bank: [["We collect your documents.", "Συγκεντρώνουμε τα έγγραφά σας.", "Nous rassemblons vos documents."], ["We apply for your Greek AFM.", "Κάνουμε αίτηση για ΑΦΜ.", "Nous demandons votre AFM grec."], ["We open the bank account for you.", "Ανοίγουμε τον τραπεζικό λογαριασμό.", "Nous ouvrons le compte bancaire."], ["Done.", "Ολοκληρώθηκε.", "Terminé."]],
    imm: [["We check that you qualify.", "Ελέγχουμε αν πληροίτε τις προϋποθέσεις.", "Nous vérifions votre admissibilité."], ["Your application is submitted.", "Η αίτησή σας υποβλήθηκε.", "Votre demande est déposée."], ["We wait for the decision.", "Περιμένουμε την απόφαση.", "Nous attendons la décision."], ["Welcome! We help with your first steps.", "Καλώς ήρθατε! Σας βοηθάμε στα πρώτα βήματα.", "Bienvenue ! Nous vous aidons à vos débuts."]],
  };
  Object.keys(TIPS).forEach(k => { if (TYPES[k]) TYPES[k].tips = TIPS[k]; });

  /* ---------- reading documents (PDF text layer) ---------- */
  const FIELDS = {
    nameGr: ["Full name (Greek)", "Ονοματεπώνυμο (ελληνικά)", "Nom complet (grec)"],
    father: ["Father’s name", "Πατρώνυμο", "Prénom du père"],
    mother: ["Mother’s name", "Μητρώνυμο", "Prénom de la mère"],
    dob: ["Date of birth", "Ημερομηνία γέννησης", "Date de naissance"],
    pob: ["Place of birth", "Τόπος γέννησης", "Lieu de naissance"],
    afm: ["Greek AFM (tax no.)", "ΑΦΜ", "AFM grec"],
    amka: ["AMKA", "ΑΜΚΑ", "AMKA"],
    idno: ["ID / passport no.", "ΑΔΤ / Αρ. διαβατηρίου", "No d’identité / passeport"],
    addr: ["Address", "Διεύθυνση", "Adresse"],
    ph: ["Phone", "Τηλέφωνο", "Téléphone"],
    em: ["Email", "Email", "Courriel"],
  };
  let pdfjs = null;
  function loadPdfJs() {
    if (pdfjs) return pdfjs;
    pdfjs = new Promise((ok, no) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; ok(window.pdfjsLib); };
      s.onerror = () => { pdfjs = null; no(new Error("pdf.js did not load")); };
      document.head.appendChild(s);
    });
    return pdfjs;
  }
  /* turns a PDF into lines of text, top to bottom */
  async function pdfLines(buf) {
    const lib = await loadPdfJs(), doc = await lib.getDocument({ data: buf }).promise, out = [];
    for (let p = 1; p <= Math.min(doc.numPages, 5); p++) {
      const tc = await (await doc.getPage(p)).getTextContent(), rows = {};
      tc.items.forEach(it => { const y = Math.round(it.transform[5] / 3); (rows[y] = rows[y] || []).push([it.transform[4], it.str]); });
      Object.keys(rows).map(Number).sort((a, b) => b - a).forEach(y => out.push(rows[y].sort((a, b) => a[0] - b[0]).map(x => x[1]).join(" ").replace(/\s+/g, " ").trim()));
    }
    return out.filter(Boolean);
  }
  function parseFields(lines) {
    const f = {}, g = (re, k, fn) => { if (f[k]) return; for (const l of lines) { const m = l.match(re); if (m) { f[k] = fn ? fn(m) : m[m.length - 1].trim(); return; } } };
    let sur = "", giv = "";
    for (const l of lines) { const a = l.match(/^(?:Επώνυμο|Surname)\s*[:：]\s*(.+)$/i); if (a && !sur) sur = a[1].trim(); const b = l.match(/^(?:Όνομα|Given names?)\s*[:：]\s*(.+)$/i); if (b && !giv) giv = b[1].trim(); }
    if (sur || giv) f.nameGr = `${giv} ${sur}`.trim();
    g(/^Πατρώνυμο\s*:\s*(.+)$/, "father");
    g(/^Μητρώνυμο\s*:\s*(.+)$/, "mother");
    g(/(?:Ημερομηνία γέννησης|Ημ\.? γέννησης|Date of birth)\s*:\s*(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/i, "dob", m => `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`);
    g(/^(?:Τόπος γέννησης|Place of birth)\s*:\s*(.+)$/i, "pob");
    g(/Α\.?\s?Φ\.?\s?Μ\.?\s*:\s*(\d{9})\b/, "afm", m => m[1].replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"));
    g(/Α\.?\s?Μ\.?\s?Κ\.?\s?Α\.?\s*:\s*(\d{11})\b/, "amka");
    g(/(?:Α\.?\s?Δ\.?\s?Τ\.?|Διαβατηρίου|Passport No\.?)[^:]*:\s*([A-ZΑ-Ω]{1,2}\s?\d{6,7})/i, "idno");
    g(/^(?:Διεύθυνση κατοικίας|Διεύθυνση|Address)\s*:\s*(.+)$/i, "addr");
    g(/^(?:Τηλέφωνο|Phone)\s*:\s*(\+?[\d\s]{8,})$/i, "ph");
    g(/([\w.+-]+@[\w-]+\.[\w.]+)/, "em");
    return f;
  }
  /* file: a File/Blob, or a URL string. Returns {kind, fields, title, lines} */
  async function readDoc(file) {
    let buf, name = typeof file === "string" ? file.split("/").pop() : file.name || "document";
    const isPdf = /\.pdf$/i.test(name) || file.type === "application/pdf";
    if (!isPdf) return { kind: /\.(jpe?g|png|heic|webp)$/i.test(name) ? "image" : "other", fields: {}, title: name, lines: [] };
    buf = typeof file === "string" ? await (await fetch(file)).arrayBuffer() : await file.arrayBuffer();
    const lines = await pdfLines(new Uint8Array(buf));
    const title = lines.find(l => /^(ΠΙΣΤΟΠΟΙΗΤΙΚΟ|ΒΕΒΑΙΩΣΗ|ΛΗΞΙΑΡΧΙΚΗ|ΑΠΟΣΠΑΣΜΑ|ΔΙΑΘΗΚΗ|CERTIFICATE|PASSPORT)/i.test(l)) || name;
    return { kind: lines.length ? "pdf" : "scan", fields: parseFields(lines), title, lines };
  }

  const DOCST = { req: ["Requested", "Ζητήθηκε", "Demandé", "amber"], rec: ["Received", "Παραλήφθηκε", "Reçu", "blue"], trn: ["Translated", "Μεταφράστηκε", "Traduit", "lime"], cert: ["Certified", "Πιστοποιήθηκε", "Certifié", "green"] };
  const KINDS = { doc: ["Document request", "Αίτημα εγγράφου", "Demande de document"], upd: ["Update needed", "Χρειάζεται ενημέρωση", "Mise à jour requise"], act: ["Action", "Ενέργεια", "Action"], call: ["Call client", "Κλήση πελάτη", "Appeler le client"] };
  const ROLES = [["Heir", "Κληρονόμος", "Héritier"], ["Co-heir", "Συγκληρονόμος", "Cohéritier"], ["Seller", "Πωλητής", "Vendeur"], ["Buyer", "Αγοραστής", "Acheteur"], ["Owner", "Ιδιοκτήτης", "Propriétaire"], ["Applicant", "Αιτών", "Demandeur"], ["Spouse", "Σύζυγος", "Conjoint"], ["Attorney-in-fact", "Πληρεξούσιος", "Mandataire"]];

  function SEED() {
    return {
      v: 2, me: "mm",
      clients: [
        { id: "c1", n: "Eleni Papas", ph: ["+1 416 555 0142"], em: ["eleni.papas@example.com"], addr: "Scarborough, ON", afm: "148 223 901", amka: "", dob: "1961-04-12", off: "Toronto", lang: "EN/ΕΛ", note: "Prefers calls after 4pm Toronto time.", src: "Referral", nameGr: "", father: "", mother: "", idno: "", pob: "" },
        { id: "c2", n: "Nikos Papas", ph: ["+1 647 555 0198"], em: ["n.papas@example.com"], addr: "Mississauga, ON", afm: "", amka: "", dob: "1958-09-30", off: "Toronto", lang: "ΕΛ", note: "Brother of Eleni. Co-heir.", src: "Referral" },
        { id: "c3", n: "Sophie Dimas", ph: ["+1 514 555 0110"], em: ["sdimas@example.com"], addr: "Laval, QC", afm: "", amka: "", dob: "1990-02-03", off: "Montreal", lang: "FR/EN", note: "", src: "Website" },
        { id: "c4", n: "Kostas Laskaris", ph: ["+30 694 555 0177", "+1 416 555 0133"], em: ["k.laskaris@example.com"], addr: "Toronto, ON · Kalamaria (GR)", afm: "077 412 556", amka: "", dob: "1972-11-21", off: "Toronto", lang: "ΕΛ", note: "Owns the Kalamaria apartment with his sister.", src: "AHEPA event" },
        { id: "c5", n: "Andreas Mavros", ph: ["+1 718 555 0120"], em: ["amavros@example.com"], addr: "Astoria, NY", afm: "", amka: "", dob: "1985-06-14", off: "New York", lang: "EN", note: "", src: "Website" },
        { id: "c6", n: "Ioanna Kosta", ph: ["+30 697 555 0101"], em: ["ioanna.k@example.com"], addr: "Athens", afm: "132 555 789", amka: "", dob: "1999-08-08", off: "Athens", lang: "ΕΛ", note: "Work permit 18–35, wants Toronto.", src: "Instagram" },
        { id: "c7", n: "Maria Laskari", ph: ["+30 231 555 0160"], em: [], addr: "Thessaloniki", afm: "066 120 334", amka: "", dob: "1969-01-02", off: "Thessaloniki", lang: "ΕΛ", note: "Sister of Kostas. 50% owner.", src: "Referral" },
      ],
      cases: [
        { id: "ICS-2418", t: "Acceptance of inheritance · Kalamata", type: "inh", off: "Toronto", own: "mm", st: 2, cl: [["c1", "Heir"], ["c2", "Co-heir"]],
          props: [{ a: "2-storey house, Kalamata (Messinia)", k: "KAEK 340123456789", sh: "50% / 50%" }, { a: "Olive grove, 4.2 str., Kalamata", k: "KAEK 340129900112", sh: "50% / 50%" }],
          docs: [{ n: "Death certificate.pdf", s: "cert", by: "mk", d: ago(400) }, { n: "Will (notarised).pdf", s: "trn", by: "mk", d: ago(200) }, { n: "Family status certificate", s: "req", by: "mm", d: ago(30), client: true }, { n: "Power of attorney · Eleni.pdf", s: "cert", by: "mm", d: ago(900) }],
          info: "Father passed away in Kalamata, 2025. Two heirs in Ontario. Acceptance to be signed in Athens by attorney-in-fact.",
          portal: { on: true, msgs: [["mk", ago(6), "The translations of the will are certified. We now need the family status certificate to file the acceptance."], ["client", ago(3), "Thank you Maria! My brother is getting it from the municipality, I'll upload it here."]] },
          log: [["mk", ago(5), "Translations of the will certified."], ["mm", ago(30), "Requested family status certificate from Athens."], ["mm", ago(900), "Case opened."]] },
        { id: "ICS-2422", t: "Greek tax declaration 2026", type: "tax", off: "Toronto", own: "mm", st: 0, cl: [["c4", "Owner"]], props: [], docs: [{ n: "E1 2025.pdf", s: "rec", by: "mm", d: ago(50) }, { n: "T4 / Canadian income", s: "req", by: "mm", d: ago(48), client: true }], info: "Rental income from Kalamaria apartment.", portal: { on: true, msgs: [] }, log: [["mm", ago(50), "Case opened."]] },
        { id: "ICS-2425", t: "Certified translation · 4 pages", type: "tr", off: "Montreal", own: "md", st: 1, cl: [["c3", "Applicant"]], props: [], docs: [{ n: "Birth certificate (GR).pdf", s: "rec", by: "md", d: ago(20) }], info: "Greek → French, for the Québec civil registry.", portal: { on: true, msgs: [] }, log: [["md", ago(20), "Case opened."]] },
        { id: "ICS-2427", t: "Sale of apartment · Kalamaria", type: "re", off: "Thessaloniki", own: "gt", st: 2, cl: [["c4", "Seller"], ["c7", "Seller"]], props: [{ a: "Apartment 92 m², 3rd floor, Kalamaria", k: "KAEK 190876543210", sh: "50% Kostas / 50% Maria" }], docs: [{ n: "Title deed.pdf", s: "rec", by: "gt", d: ago(300) }, { n: "Energy certificate (PEA)", s: "req", by: "el", d: ago(10) }], info: "Asking €185k. Two viewings this week.", portal: { on: false, msgs: [] }, log: [["el", ago(10), "Requested energy certificate."], ["gt", ago(300), "Case opened."]] },
        { id: "ICS-2430", t: "AFM & bank account", type: "bank", off: "New York", own: "mm", st: 1, cl: [["c5", "Applicant"]], props: [], docs: [{ n: "Passport.pdf", s: "rec", by: "mm", d: ago(70) }], info: "", portal: { on: true, msgs: [] }, log: [["mm", ago(70), "Case opened."]] },
        { id: "ICS-2436", t: "Work permit 18–35", type: "imm", off: "Toronto", own: "am", st: 1, cl: [["c6", "Applicant"]], props: [], docs: [{ n: "Degree (translated).pdf", s: "trn", by: "mk", d: ago(100) }, { n: "CV.pdf", s: "rec", by: "am", d: ago(120) }], info: "IEC application. Arrival planned spring 2027.", portal: { on: true, msgs: [] }, log: [["am", ago(120), "Case opened."]] },
      ],
      tasks: [
        { id: 1, t: "Send family status certificate", k: "doc", c: "ICS-2418", from: "mm", to: "mk", due: day(1), done: false, at: ago(30), cm: [["mm", ago(30), "Needed for the acceptance. Can you get it from the municipality this week?"], ["mk", ago(4), "Appointment at the municipality on Monday."]] },
        { id: 2, t: "Update Eleni on translation status", k: "call", c: "ICS-2418", from: "mk", to: "mm", due: day(0), done: false, at: ago(5), cm: [["mk", ago(5), "Translations are certified. Please let her know."]] },
        { id: 3, t: "Get T4 slips from client", k: "doc", c: "ICS-2422", from: "sr", to: "mm", due: day(-1), done: false, at: ago(48), cm: [] },
        { id: 4, t: "Energy certificate (PEA) for Kalamaria", k: "doc", c: "ICS-2427", from: "el", to: "gt", due: day(3), done: false, at: ago(10), cm: [] },
        { id: 5, t: "Translate birth certificate GR → FR", k: "act", c: "ICS-2425", from: "md", to: "mk", due: day(2), done: false, at: ago(20), cm: [] },
        { id: 6, t: "Book bank appointment (Eurobank)", k: "act", c: "ICS-2430", from: "mm", to: "sr", due: day(4), done: false, at: ago(60), cm: [] },
        { id: 7, t: "Check IEC pool invitations", k: "upd", c: "ICS-2436", from: "am", to: "mm", due: day(6), done: false, at: ago(100), cm: [] },
        { id: 8, t: "Power of attorney signed at consulate", k: "act", c: "ICS-2418", from: "mm", to: "mm", due: day(-20), done: true, at: ago(900), cm: [] },
      ],
      invoices: [
        { id: "INV-1041", c: "ICS-2418", desc: "Acceptance of inheritance · retainer", amt: 1200, cur: "CAD", st: "paid", at: ago(880), paidAt: ago(870) },
        { id: "INV-1052", c: "ICS-2418", desc: "Certified translations · 6 pages", amt: 270, cur: "CAD", st: "due", at: ago(5) },
        { id: "INV-1049", c: "ICS-2422", desc: "Greek tax declaration 2026", amt: 350, cur: "CAD", st: "due", at: ago(48) },
        { id: "INV-1050", c: "ICS-2425", desc: "Certified translation GR → FR · 4 pages", amt: 180, cur: "CAD", st: "paid", at: ago(20), paidAt: ago(19) },
        { id: "INV-1047", c: "ICS-2430", desc: "AFM & bank account", amt: 450, cur: "USD", st: "paid", at: ago(70), paidAt: ago(66) },
      ],
      appts: [
        { id: "A1", who: "Eleni Papas", em: "eleni.papas@example.com", c: "ICS-2418", u: "mk", off: "Athens", ts: at(2, 17, 0, "Europe/Athens"), mode: "video", topic: "Inheritance update" },
        { id: "A2", who: "Kostas Laskaris", em: "k.laskaris@example.com", c: "ICS-2422", u: "mm", off: "Toronto", ts: at(1, 11, 0, "America/Toronto"), mode: "office", topic: "Tax declaration documents" },
        { id: "A3", who: "Sophie Dimas", em: "sdimas@example.com", c: "ICS-2425", u: "md", off: "Montreal", ts: at(3, 14, 30, "America/Toronto"), mode: "office", topic: "Pick up certified translation" },
      ],
      inbox: [
        { id: 1, kind: "quote", at: ago(2), read: false, d: { name: "George Andreou", email: "g.andreou@example.com", off: "Toronto", what: "Certified translation · Diploma / transcript · 3 pages · Express", amt: "CA$ 148", files: ["degree_scan.pdf"] } },
        { id: 2, kind: "newsletter", at: ago(9), read: true, d: { email: "christina.v@example.com" } },
      ],
      orders: [
        { id: "SUB-2031", kind: "plan", key: "taxcare", name: "Eleni Papas", email: "eleni.papas@example.com", what: "Greek Tax Care · annual plan", amt: 290, cur: "CAD", at: Date.now() - 300 * 864e5, renew: Date.now() + 65 * 864e5, auto: true },
      ],
      subs: ["christina.v@example.com", "k.laskaris@example.com", "eleni.papas@example.com"],
      notif: [
        { to: "mm", at: ago(4), text: ["Maria Korda replied on “Send family status certificate”", "Η Maria Korda απάντησε στο «Send family status certificate»", "Maria Korda a répondu à « Send family status certificate »"], go: ["task", 1], read: false },
        { to: "mm", at: ago(2), text: ["New translation quote from the website · George Andreou", "Νέα προσφορά μετάφρασης από το site · George Andreou", "Nouvelle demande de traduction du site · George Andreou"], go: ["inbox"], read: false },
      ],
      audit: [["mk", ago(5), "ICS-2418 · document “Will (notarised).pdf” → Translated"], ["mm", ago(30), "ICS-2418 · task created for Maria Korda"], ["et", ago(200), "Permissions · Stavroula Rigopoulou → Accounting only"]],
      nid: 9, rev: 1,
    };
  }
  function load() { try { const j = localStorage.getItem(KEY); if (j) { const s = JSON.parse(j); if (s && s.v === 2) { if (!s.orders) s.orders = SEED().orders; return s; } } } catch (e) {} return SEED(); }
  function save(S) { S.rev = (S.rev || 0) + 1; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function reset() { const s = SEED(); save(s); return s; }
  /* fires when the OTHER page (another tab) changes the data */
  function on(cb) { addEventListener("storage", e => { if (e.key === KEY) cb(load()); }); }
  /* website events land in the CRM inbox + notify the office team */
  function lead(S, kind, d, notifyTo) {
    S.inbox = S.inbox || []; const id = (S.inbox.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1;
    S.inbox.unshift({ id, kind, at: Date.now(), read: false, d });
    const L = { quote: ["New translation quote", "Νέα προσφορά μετάφρασης", "Nouvelle demande de traduction"], booking: ["New appointment booked", "Νέο ραντεβού", "Nouveau rendez-vous"], newsletter: ["Newsletter sign-up", "Εγγραφή στο newsletter", "Inscription à l'infolettre"], upload: ["Client uploaded a document", "Ο πελάτης ανέβασε έγγραφο", "Le client a téléversé un document"], message: ["New message from a client", "Νέο μήνυμα πελάτη", "Nouveau message d'un client"], payment: ["Payment received", "Πληρωμή ελήφθη", "Paiement reçu"], order: ["Online order", "Νέα παραγγελία online", "Commande en ligne"], subscription: ["New annual plan", "Νέα ετήσια συνδρομή", "Nouvel abonnement annuel"], request: ["New service request", "Νέο αίτημα υπηρεσίας", "Nouvelle demande de service"], contact: ["Message from the website", "Μήνυμα από το site", "Message du site"], property: ["Property enquiry", "Ενδιαφέρον για ακίνητο", "Demande immobilière"], valuation: ["Property valuation request", "Αίτημα εκτίμησης ακινήτου", "Demande d'évaluation"] }[kind] || [kind, kind, kind];
    (notifyTo || ["mm"]).forEach(u => S.notif.unshift({ to: u, at: Date.now(), text: L.map(x => `${x} · ${d.name || d.email || ""}`), go: ["inbox"], read: false }));
    return id;
  }
  /* time helpers */
  const tzNow = tz => { const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()); const g = k => p.find(x => x.type === k).value; const h = +g("hour"), m = +g("minute"); return { s: `${g("hour")}:${g("minute")}`, open: !/Sat|Sun/.test(g("weekday")) && h * 60 + m >= 540 && h * 60 + m < 1020 }; };
  const fmtT = (ts, tz, loc) => new Date(ts).toLocaleTimeString(loc || "en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
  const fmtDT = (ts, tz, loc) => new Date(ts).toLocaleString(loc || "en-GB", { timeZone: tz, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  window.ICS = { KEY, OFF, U, TYPES, DOCST, KINDS, ROLES, FIELDS, day, ago, at, load, save, reset, on, lead, tzNow, fmtT, fmtDT, SEED, readDoc };
})();
