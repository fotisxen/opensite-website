// Client demos: standalone HTML files in public/demos/<slug>/demo.html.
// Add a new demo here and it gets its /demos/<slug>/ URL and a row in Admin → Demos.

export type Demo = {
  slug: string;
  name: string;
  kind: string;
  created: string; // YYYY-MM-DD
  instagram?: string;
};

export const DEMOS: Demo[] = [
  { slug: "bsmt", name: "BEISMENTraining (Χανιά)", kind: "Gym · HYROX", created: "2026-10-27", instagram: "https://www.instagram.com/bsmt_gymchania/" },
  { slug: "prigkipesa", name: "Πριγκηπέσα", kind: "Streetfood & wine", created: "2026-10-27", instagram: "https://www.instagram.com/prigkhpesa/" },
  { slug: "sintrofi", name: "+Τροφή (Sintrofi)", kind: "Restaurant · Bib Gourmand", created: "2026-10-27", instagram: "https://www.instagram.com/sin_trofi/" },
  { slug: "ble-vin", name: "Blé Vin", kind: "Wine bar & prosciutteria", created: "2026-10-27", instagram: "https://www.instagram.com/blevinthessaloniki/" },
  { slug: "mpakal", name: "Μπακάλ", kind: "Urban tavern", created: "2026-10-27", instagram: "https://www.instagram.com/mpakal.gr/" },
  { slug: "loupino", name: "Λούπινο", kind: "Μεζεδοπωλείο · μπαρ", created: "2026-10-27", instagram: "https://www.instagram.com/loupino.skg/" },
  { slug: "morrison", name: "Morrison", kind: "Rooftop bar-restaurant", created: "2026-10-26", instagram: "https://www.instagram.com/morrison.skg/" },
  { slug: "tzaki", name: "Tzaki 'Ho", kind: "Country eating", created: "2026-10-26", instagram: "https://www.instagram.com/tzakiho/" },
  { slug: "aelios-petra", name: "Αέλιος Πέτρα", kind: "Forest restaurant", created: "2026-10-26", instagram: "https://www.instagram.com/aeliospetra_chortiatis/" },
  { slug: "kritikos", name: "Kritikos Port", kind: "Seafood restaurant", created: "2026-10-26", instagram: "https://www.instagram.com/kritikos.port/" },
  { slug: "lykos", name: "Lykos", kind: "Χασαποταβέρνα", created: "2026-10-26", instagram: "https://www.instagram.com/lykos_thermi/" },
  { slug: "soma", name: "SOMA", kind: "Fitness studio", created: "2026-10-26", instagram: "https://www.instagram.com/somaskg/" },
  { slug: "maitr-margarita", name: "Μαιτρ και Μαργαρίτα", kind: "Wine bistro", created: "2026-10-26", instagram: "https://www.instagram.com/maitr.margarita/" },
  { slug: "paramythia", name: "Παραμυθία", kind: "Greek restaurant", created: "2026-10-26", instagram: "https://www.instagram.com/paramythia_/" },
  { slug: "sanaa", name: "Sanaa Coast", kind: "Coast bar & restaurant", created: "2026-10-26", instagram: "https://www.instagram.com/sanaa.coast/" },
  { slug: "aeras", name: "AÈRAS", kind: "All day bar", created: "2026-10-26", instagram: "https://www.instagram.com/aeras.skg/" },
  { slug: "pantheon", name: "Pantheon Bar", kind: "All day café bar", created: "2026-10-26", instagram: "https://www.instagram.com/pantheon.bar/" },
  { slug: "tsai", name: "Τσάι (The Tσάι Club)", kind: "Coffee & matcha", created: "2026-10-26", instagram: "https://www.instagram.com/tsaiskg/" },
  { slug: "gb-pilates", name: "GB Pilates Club", kind: "Pilates studio", created: "2026-10-26", instagram: "https://www.instagram.com/gbpilatesclub/" },
  { slug: "gorilla", name: "Gorilla Bar", kind: "Cocktail bar", created: "2026-10-26", instagram: "https://www.instagram.com/gorillabarskg/" },
  { slug: "maganie", name: "Οψοποιών Μαγγανείαι", kind: "Restaurant", created: "2026-10-26" },
  { slug: "platterie-box", name: "The Platterie Box", kind: "Deli / platters", created: "2026-10-21" },
  { slug: "cotridis-b2b", name: "Cotridis B2B", kind: "B2B catalogue", created: "2026-10-21" },
];

export const demoPath = (slug: string) => `/demos/${slug}/`;
