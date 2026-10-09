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
      {
        q: "Πόσο κοστίζει μια ιστοσελίδα;",
        a: "{τιμή} Η τελική τιμή εξαρτάται από το πόσες σελίδες και ποιες λειτουργίες χρειάζεσαι, και τη μαθαίνεις γραπτά πριν ξεκινήσουμε.",
      },
      { q: "Σε πόσο καιρό είναι έτοιμη;", a: "Η ημερομηνία παράδοσης γράφεται στην προσφορά, πριν ξεκινήσουμε." },
      {
        q: "Τι χρειάζεστε από μένα για να ξεκινήσουμε;",
        a: "Τα κείμενα, τις φωτογραφίες και το logo που έχεις. Αν κάτι λείπει, το λέμε στην προσφορά.",
      },
      {
        q: "Έχω ήδη site. Μπορείτε να το ξαναφτιάξετε;",
        a: "Ναι. Κρατάς το domain και το περιεχόμενό σου, και αλλάζει η ταχύτητα, ο σχεδιασμός και η εικόνα στο κινητό.",
      },
      {
        q: "Τι γίνεται με το domain και το hosting;",
        a: "Μένουν στο όνομά σου. Το κόστος τους είναι ξεχωριστό από την κατασκευή και γράφεται στην προσφορά.",
      },
      {
        q: "Τι υποστήριξη έχω μετά την παράδοση;",
        a: "Σου δείχνουμε πώς αλλάζεις το περιεχόμενο μόνος σου. Τι άλλο καλύπτει η υποστήριξη, και για πόσο, γράφεται στην προσφορά.",
      },
      { q: "Κόβετε τιμολόγιο;", a: "Ναι, για κάθε έργο." },
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
      {
        q: "Πόσο κοστίζει ένα eshop;",
        a: "{τιμή} Η τελική τιμή εξαρτάται από τον αριθμό των προϊόντων και από τους τρόπους πληρωμής και αποστολής που θέλεις.",
      },
      { q: "Σε πόσο καιρό είναι έτοιμο;", a: "Η ημερομηνία παράδοσης γράφεται στην προσφορά, πριν ξεκινήσουμε." },
      {
        q: "Με ποιους τρόπους πληρώνουν οι πελάτες μου;",
        a: "Όπως συμφωνήσουμε: κάρτα, αντικαταβολή, τραπεζική κατάθεση. Για πληρωμές με κάρτα χρειάζεσαι συνεργασία με τράπεζα ή πάροχο πληρωμών, και τη σύνδεση την κάνουμε εμείς.",
      },
      {
        q: "Ποιος περνάει τα προϊόντα;",
        a: "Εσύ, από το διαχειριστικό, και σου δείχνουμε πώς. Αν θέλεις να τα περάσουμε εμείς, μπαίνει στην προσφορά.",
      },
      {
        q: "Τι γίνεται με το domain και το hosting;",
        a: "Μένουν στο όνομά σου. Το κόστος τους είναι ξεχωριστό από την κατασκευή και γράφεται στην προσφορά.",
      },
      {
        q: "Τι υποστήριξη έχω μετά την παράδοση;",
        a: "Σου δείχνουμε πώς αλλάζεις το περιεχόμενο μόνος σου. Τι άλλο καλύπτει η υποστήριξη, και για πόσο, γράφεται στην προσφορά.",
      },
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
      {
        q: "Θα χάσω τη θέση μου στο Google;",
        a: "Κρατάμε τις ίδιες διευθύνσεις σελίδων όπου γίνεται και ανακατευθύνουμε τις υπόλοιπες, ώστε το Google να βρίσκει το νέο site στη θέση του παλιού. Θέσεις στο Google δεν μπορεί να εγγυηθεί κανείς.",
      },
      {
        q: "Κρατάω το domain και τα email μου;",
        a: "Ναι. Το domain μένει δικό σου, και πριν από τη μεταφορά ελέγχουμε πού φιλοξενούνται τα email σου για να μη διακοπούν.",
      },
      {
        q: "Πόσο καιρό θα είναι κάτω το site;",
        a: "Το παλιό site μένει στον αέρα μέχρι να εγκρίνεις το νέο. Η αλλαγή γίνεται χωρίς να κλείσει.",
      },
      {
        q: "Πόσο κοστίζει;",
        a: "Εξαρτάται από το μέγεθος του site. Στείλε το link και σου λέμε τιμή μαζί με τον δωρεάν έλεγχο.",
      },
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
  text += pricePhrase(from, siteConfig.pricing.vatMode);
  if (weeks != null) text += ` Έτοιμο σε ${weeks} εβδομάδες.`;
  return text;
}

export type VatMode = "plus" | "included" | "none" | null;

const VAT_RATE = 0.24;
const euro = (n: number) => `€${n.toLocaleString("el-GR", { maximumFractionDigits: 0 })}`;

// Price phrase for the subtitle. Empty while the price or the VAT mode is
// missing, so a price never appears without saying how VAT applies.
export function pricePhrase(from: number | null, vatMode: VatMode): string {
  if (from === null || vatMode === null) return "";
  if (vatMode === "plus") {
    return ` Από ${euro(from)} + ΦΠΑ (${euro(Math.round(from * (1 + VAT_RATE)))} με ΦΠΑ).`;
  }
  if (vatMode === "included") return ` Από ${euro(from)} με ΦΠΑ.`;
  return ` Από ${euro(from)}, τελική τιμή.`;
}

// FAQ answers with the {τιμή} placeholder get the price phrase; when there is
// none, the question is dropped. A question with no answer is never shown.
export function resolveFaqs(content: LandingContent) {
  const price = pricePhrase(content.price.from, siteConfig.pricing.vatMode).trim();
  return content.faqs
    .map((f) => {
      if (!f.a) return null;
      if (f.a.includes("{τιμή}")) {
        if (!price) return null;
        return { q: f.q, a: f.a.replace("{τιμή}", price) };
      }
      return { q: f.q, a: f.a };
    })
    .filter((f): f is { q: string; a: string } => f !== null);
}

export const steps = [
  "Μας λες τι χρειάζεσαι.",
  "Παίρνεις προσφορά με τιμή και ημερομηνία παράδοσης.",
  "Βλέπεις το site πριν βγει στον αέρα και το εγκρίνεις.",
] as const;

// Work cards. By default a card needs a real screenshot of the delivered
// site at public/work/<slug>.webp and is hidden without it. `image` points to
// another file, `textOnly` shows the card without an image (private systems
// with no public screenshot), `hideLink` drops the link (private admin).
export const workCards: readonly WorkCard[] = [
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
  {
    slug: "df-real-estate-crm",
    name: "DF Real Estate CRM",
    blurb: "Ιδιωτικό διαχειριστικό για το μεσιτικό: αγγελίες, φωτογραφίες και πελάτες, με είσοδο μόνο για το προσωπικό.",
    hideLink: true,
  },
  {
    slug: "starbulk-intranet",
    name: "Star Bulk Intranet",
    blurb: "Intranet για ναυτιλιακή εταιρεία. SharePoint με custom web parts (SPFx), μέσα στο Microsoft 365 της εταιρείας.",
    hideLink: true,
    // Illustration, not a screenshot: the real intranet is private.
    image: { src: "/case-studies/starbulk-intranet.svg", width: 800, height: 500, alt: "Απεικόνιση του intranet (όχι πραγματικό screenshot)" },
  },
  {
    slug: "hoopstruct",
    name: "HoopStruct",
    blurb: "Το δικό μας προϊόν: προχωρημένα στατιστικά μπάσκετ και scouting reports, με website, εφαρμογές για Windows και Mac και εφαρμογές για iOS και Android.",
    image: { src: "/case-studies/hoopstruct.png", width: 1200, height: 630 },
  },
];

type WorkCard = {
  slug: string;
  name: string;
  blurb: string;
  image?: { src: string; width: number; height: number; alt?: string };
  textOnly?: boolean;
  hideLink?: boolean;
};

// The testimonial already used on the home page. It stays in English until
// siteConfig.testimonial.el is filled in.
export const testimonial = {
  en: "From design to launch, OpenSite created a website that captures the elegance of our sailing experiences while providing a seamless booking journey for our clients.",
  author: "T. Markas",
  role: "Co-Owner, Yacht Charter & Sailing Experiences, Adonis Sail Yachts",
};
