import { siteConfig } from "./site.config";

export type LandingKey = "web" | "eshop" | "redesign";

export const BASE_URL = "https://opensite.gr";

export interface LandingContent {
  key: LandingKey;
  slug: string;
  pageLabel: string; // used in the lead email subject
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  formTitle: string;
  submitLabel: string;
  defaultNeed: "Νέα ιστοσελίδα" | "Eshop" | "Ανακατασκευή site";
  showWebsiteField: boolean;
  gets: [string, string, string];
  ctaButton: string;
  stickyRequestLabel: string;
  faqs: { q: string; a: string | null }[]; // a: null hides the question
  price: { from: number | null; weeks: number | null };
}

export const landings: Record<LandingKey, LandingContent> = {
  web: {
    key: "web",
    slug: "kataskevi-istoselidon-thessaloniki",
    pageLabel: "Ιστοσελίδες",
    title: "Κατασκευή ιστοσελίδων Θεσσαλονίκη | OpenSite",
    description:
      "Κατασκευή ιστοσελίδων για επιχειρήσεις στη Θεσσαλονίκη. Γρήγορο site για κινητό και Google. Ζήτα δωρεάν προσφορά, απαντάμε σε 24 ώρες.",
    h1: "Κατασκευή ιστοσελίδων στη Θεσσαλονίκη",
    subtitle: "Γρήγορο, καθαρό site που δουλεύει σωστά σε κινητό και Google.",
    formTitle: "Ζήτα δωρεάν προσφορά",
    submitLabel: "Στείλε και πάρε προσφορά",
    defaultNeed: "Νέα ιστοσελίδα",
    showWebsiteField: false,
    gets: [
      "Μιλάς απευθείας με τον developer που φτιάχνει το site σου.",
      "Ξέρεις από την αρχή τιμή και ημερομηνία παράδοσης.",
      "Αλλάζεις κείμενα και φωτογραφίες μόνος σου, και μας βρίσκεις όποτε χρειαστείς.",
    ],
    ctaButton: "Ζήτα δωρεάν προσφορά",
    stickyRequestLabel: "Ζήτα προσφορά",
    faqs: [
      { q: "Πόσο κοστίζει μια ιστοσελίδα;", a: null },
      { q: "Σε πόσο καιρό είναι έτοιμη;", a: null },
      { q: "Τι χρειάζεστε από μένα για να ξεκινήσουμε;", a: null },
      { q: "Έχω ήδη site. Μπορείτε να το ξαναφτιάξετε;", a: null },
      { q: "Τι γίνεται με το domain και το hosting;", a: null },
      { q: "Τι υποστήριξη έχω μετά την παράδοση;", a: null },
      { q: "Κόβετε τιμολόγιο;", a: null },
    ],
    price: { from: siteConfig.pricing.websiteFrom, weeks: siteConfig.pricing.websiteWeeks },
  },
  eshop: {
    key: "eshop",
    slug: "kataskevi-eshop-thessaloniki",
    pageLabel: "Eshop",
    title: "Κατασκευή eshop Θεσσαλονίκη | OpenSite",
    description:
      "Κατασκευή eshop για καταστήματα στη Θεσσαλονίκη, εύκολο στη διαχείριση και σωστό στο κινητό. Ζήτα δωρεάν προσφορά, απαντάμε σε 24 ώρες.",
    h1: "Κατασκευή eshop στη Θεσσαλονίκη",
    subtitle: "Ηλεκτρονικό κατάστημα που δέχεται παραγγελίες από την πρώτη μέρα.",
    formTitle: "Ζήτα δωρεάν προσφορά",
    submitLabel: "Στείλε και πάρε προσφορά",
    defaultNeed: "Eshop",
    showWebsiteField: false,
    gets: [
      "Μιλάς απευθείας με τον developer που φτιάχνει το eshop σου.",
      "Ξέρεις από την αρχή τιμή και ημερομηνία παράδοσης.",
      "Περνάς προϊόντα και βλέπεις παραγγελίες μόνος σου, και μας βρίσκεις όποτε χρειαστείς.",
    ],
    ctaButton: "Ζήτα δωρεάν προσφορά",
    stickyRequestLabel: "Ζήτα προσφορά",
    faqs: [
      { q: "Πόσο κοστίζει ένα eshop;", a: null },
      { q: "Σε πόσο καιρό είναι έτοιμο;", a: null },
      { q: "Με ποιους τρόπους πληρώνουν οι πελάτες μου;", a: null },
      { q: "Ποιος περνάει τα προϊόντα;", a: null },
      { q: "Τι γίνεται με το domain και το hosting;", a: null },
      { q: "Τι υποστήριξη έχω μετά την παράδοση;", a: null },
    ],
    price: { from: siteConfig.pricing.eshopFrom, weeks: siteConfig.pricing.eshopWeeks },
  },
  redesign: {
    key: "redesign",
    slug: "anakataskevi-istoselidas",
    pageLabel: "Ανακατασκευή",
    title: "Ανακατασκευή ιστοσελίδας | OpenSite",
    description:
      "Το site σου είναι αργό ή παλιό; Το ξαναφτιάχνουμε στο ίδιο domain, γρήγορο και σωστό στο κινητό. Ζήτα δωρεάν έλεγχο του site σου.",
    h1: "Ανακατασκευή ιστοσελίδας",
    subtitle:
      "Το site σου είναι αργό ή παλιό; Το ξαναφτιάχνουμε στο ίδιο domain, γρήγορο και σωστό στο κινητό.",
    formTitle: "Ζήτα δωρεάν έλεγχο του site σου",
    submitLabel: "Στείλε και πάρε τον έλεγχο",
    defaultNeed: "Ανακατασκευή site",
    showWebsiteField: true,
    gets: [
      "Μιλάς απευθείας με τον developer που ξαναφτιάχνει το site σου.",
      "Κρατάς το domain και το περιεχόμενό σου.",
      "Αλλάζει η ταχύτητα, ο σχεδιασμός και η εικόνα στο κινητό.",
    ],
    ctaButton: "Ζήτα δωρεάν έλεγχο",
    stickyRequestLabel: "Ζήτα έλεγχο",
    faqs: [
      { q: "Θα χάσω τη θέση μου στο Google;", a: null },
      { q: "Κρατάω το domain και τα email μου;", a: null },
      { q: "Πόσο καιρό θα είναι κάτω το site;", a: null },
      { q: "Πόσο κοστίζει;", a: null },
    ],
    price: { from: siteConfig.pricing.redesignFrom, weeks: siteConfig.pricing.redesignWeeks },
  },
};

export const landingKeys = Object.keys(landings) as LandingKey[];

// The price and delivery phrases are appended to the subtitle only when
// the number exists in the config. A null never leaves a gap or a "€".
export function subtitleWithFacts(content: LandingContent) {
  let text = content.subtitle;
  const { from, weeks } = content.price;
  if (from != null) text += ` Από €${from}${siteConfig.pricing.priceSuffix ?? ""}.`;
  if (weeks != null) text += ` Έτοιμο σε ${weeks} εβδομάδες.`;
  return text;
}

export const steps = [
  "Μας λες τι χρειάζεσαι.",
  "Παίρνεις προσφορά με τιμή και ημερομηνία παράδοσης.",
  "Βλέπεις το site πριν βγει στον αέρα και το εγκρίνεις.",
] as const;

// Work cards. A card is only shown if a real screenshot of the delivered
// site exists at public/work/<slug>.webp.
export const workCards = [
  {
    slug: "akinita-fotiadis",
    name: "Ακίνητα Φωτιάδης",
    blurb: "Μεσιτικό γραφείο. Νέο site σε Webflow με σύστημα καταχώρισης ακινήτων.",
  },
  {
    slug: "df-real-estate",
    name: "DF Real Estate",
    blurb: "Μεσιτικό γραφείο. Site αγγελιών σε Next.js με διαχειριστικό για το γραφείο.",
  },
  {
    slug: "adonis-sail-yachts",
    name: "Adonis Sail Yachts",
    blurb: "Ναύλωση ιστιοπλοϊκών. Νέο site σε Webflow με καθαρή ροή κράτησης.",
  },
  {
    slug: "one-menoo",
    name: "OneMenoo",
    blurb: "Πλατφόρμα QR menu. Ξαναχτίσαμε σε Next.js το site που ήταν αργό σε WordPress.",
  },
] as const;

// The testimonial already used on the home page. It stays in English until
// siteConfig.testimonial.el is filled in.
export const testimonial = {
  en: "From design to launch, OpenSite created a website that captures the elegance of our sailing experiences while providing a seamless booking journey for our clients.",
  author: "T. Markas",
  role: "Co-Owner, Yacht Charter & Sailing Experiences, Adonis Sail Yachts",
};
