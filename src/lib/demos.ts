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
