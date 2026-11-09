import { siteConfig } from "./site.config";

export type LandingKey = "web" | "eshop" | "redesign" | "webGreece" | "eshopGreece";

export const BASE_URL = "https://opensite.gr";

export interface LandingContent {
  key: LandingKey;
  slug: string;
  local?: boolean; // the page targets Thessaloniki only
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

// webGreece and eshopGreece are added below, from the Thessaloniki pages.
export const landings = {
  web: {
    key: "web",
    slug: "kataskevi-istoselidon-thessaloniki",
    local: true,
    pageLabel: "Ιστοσελίδες",
    title: "Κατασκευή ιστοσελίδων Θεσσαλονίκη | OpenSite",
    description:
      "Κατασκευή ιστοσελίδων για επιχειρήσεις στη Θεσσαλονίκη. Γρήγορο site για κινητό και Google. Δείτε δωρεάν πώς θα είναι το site σας, απαντάμε σε 24 ώρες.",
    h1: "Κατασκευή ιστοσελίδων στη Θεσσαλονίκη",
    subtitle: "Γρήγορο, καθαρό site που δουλεύει σωστά σε κινητό και Google.",
    formTitle: "Δείτε δωρεάν πώς θα είναι το site σας",
    submitLabel: "Θέλω το δωρεάν δείγμα",
    defaultNeed: "Νέα ιστοσελίδα",
    showWebsiteField: false,
    gets: [
      "Βλέπετε δωρεάν ένα δείγμα της αρχικής σας σελίδας, πριν αποφασίσετε οτιδήποτε.",
      "Μιλάτε απευθείας με τον developer που φτιάχνει το site σας.",
      "Αλλάζετε κείμενα και φωτογραφίες μόνοι σας, και μας βρίσκετε όποτε χρειαστείτε.",
    ],
    ctaButton: "Θέλω το δωρεάν δείγμα",
    stickyRequestLabel: "Δωρεάν δείγμα",
    faqs: [
      {
        q: "Πόσο κοστίζει μια ιστοσελίδα;",
        a: "Εξαρτάται από το πόσες σελίδες και ποιες λειτουργίες χρειάζεστε. Μετά το δωρεάν δείγμα παίρνετε γραπτή προσφορά, πριν ξεκινήσουμε.",
      },
      { q: "Σε πόσο καιρό είναι έτοιμη;", a: "Η ημερομηνία παράδοσης γράφεται στην προσφορά, πριν ξεκινήσουμε." },
      {
        q: "Τι χρειάζεστε από εμένα για να ξεκινήσουμε;",
        a: "Τα κείμενα, τις φωτογραφίες και το logo που έχετε. Αν κάτι λείπει, το λέμε στην προσφορά.",
      },
      {
        q: "Έχω ήδη site. Μπορείτε να το ξαναφτιάξετε;",
        a: "Ναι. Κρατάτε το domain και το περιεχόμενό σας, και αλλάζει η ταχύτητα, ο σχεδιασμός και η εικόνα στο κινητό.",
      },
      {
        q: "Τι γίνεται με το domain και το hosting;",
        a: "Μένουν στο όνομά σας. Το κόστος τους είναι ξεχωριστό από την κατασκευή και γράφεται στην προσφορά.",
      },
      {
        q: "Τι υποστήριξη έχω μετά την παράδοση;",
        a: "Σας δείχνουμε πώς αλλάζετε το περιεχόμενο μόνοι σας. Τι άλλο καλύπτει η υποστήριξη, και για πόσο, γράφεται στην προσφορά.",
      },
      { q: "Κόβετε τιμολόγιο;", a: "Ναι, για κάθε έργο." },
    ],
    price: { from: siteConfig.pricing.websiteFrom, weeks: siteConfig.pricing.websiteWeeks },
  },
  eshop: {
    key: "eshop",
    slug: "kataskevi-eshop-thessaloniki",
    local: true,
    pageLabel: "Eshop",
    title: "Κατασκευή eshop Θεσσαλονίκη | OpenSite",
    description:
      "Κατασκευή eshop για καταστήματα στη Θεσσαλονίκη, εύκολο στη διαχείριση και σωστό στο κινητό. Δείτε δωρεάν πώς θα είναι το eshop σας, απαντάμε σε 24 ώρες.",
    h1: "Κατασκευή eshop στη Θεσσαλονίκη",
    subtitle: "Ηλεκτρονικό κατάστημα που δέχεται παραγγελίες από την πρώτη μέρα.",
    formTitle: "Δείτε δωρεάν πώς θα είναι το eshop σας",
    submitLabel: "Θέλω το δωρεάν δείγμα",
    defaultNeed: "Eshop",
    showWebsiteField: false,
    gets: [
      "Βλέπετε δωρεάν ένα δείγμα της αρχικής του eshop σας, πριν αποφασίσετε οτιδήποτε.",
      "Μιλάτε απευθείας με τον developer που φτιάχνει το eshop σας.",
      "Περνάτε προϊόντα και βλέπετε παραγγελίες μόνοι σας, και μας βρίσκετε όποτε χρειαστείτε.",
    ],
    ctaButton: "Θέλω το δωρεάν δείγμα",
    stickyRequestLabel: "Δωρεάν δείγμα",
    faqs: [
      {
        q: "Πόσο κοστίζει ένα eshop;",
        a: "Εξαρτάται από τον αριθμό των προϊόντων και από τους τρόπους πληρωμής και αποστολής που θέλετε. Μετά το δωρεάν δείγμα παίρνετε γραπτή προσφορά, πριν ξεκινήσουμε.",
      },
      { q: "Σε πόσο καιρό είναι έτοιμο;", a: "Η ημερομηνία παράδοσης γράφεται στην προσφορά, πριν ξεκινήσουμε." },
      {
        q: "Με ποιους τρόπους πληρώνουν οι πελάτες μου;",
        a: "Όπως συμφωνήσουμε: κάρτα, αντικαταβολή, τραπεζική κατάθεση. Για πληρωμές με κάρτα χρειάζεστε συνεργασία με τράπεζα ή πάροχο πληρωμών, και τη σύνδεση την κάνουμε εμείς.",
      },
      {
        q: "Ποιος περνάει τα προϊόντα;",
        a: "Εσείς, από το διαχειριστικό, και σας δείχνουμε πώς. Αν θέλετε να τα περάσουμε εμείς, μπαίνει στην προσφορά.",
      },
      {
        q: "Τι γίνεται με το domain και το hosting;",
        a: "Μένουν στο όνομά σας. Το κόστος τους είναι ξεχωριστό από την κατασκευή και γράφεται στην προσφορά.",
      },
      {
        q: "Τι υποστήριξη έχω μετά την παράδοση;",
        a: "Σας δείχνουμε πώς αλλάζετε το περιεχόμενο μόνοι σας. Τι άλλο καλύπτει η υποστήριξη, και για πόσο, γράφεται στην προσφορά.",
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
      "Το site σας είναι αργό ή παλιό; Το ξαναφτιάχνουμε στο ίδιο domain, γρήγορο και σωστό στο κινητό. Δείτε δωρεάν πώς θα είναι το νέο σας site.",
    h1: "Ανακατασκευή ιστοσελίδας",
    subtitle:
      "Το site σας είναι αργό ή παλιό; Το ξαναφτιάχνουμε στο ίδιο domain, γρήγορο και σωστό στο κινητό.",
    formTitle: "Δείτε δωρεάν πώς θα είναι το νέο σας site",
    submitLabel: "Θέλω το δωρεάν δείγμα",
    defaultNeed: "Ανακατασκευή site",
    showWebsiteField: true,
    gets: [
      "Βλέπετε δωρεάν ένα δείγμα της νέας αρχικής σας σελίδας, πριν αποφασίσετε οτιδήποτε.",
      "Μιλάτε απευθείας με τον developer που ξαναφτιάχνει το site σας.",
      "Κρατάτε το domain και το περιεχόμενό σας, και αλλάζει η ταχύτητα, ο σχεδιασμός και η εικόνα στο κινητό.",
    ],
    ctaButton: "Θέλω το δωρεάν δείγμα",
    stickyRequestLabel: "Δωρεάν δείγμα",
    faqs: [
      {
        q: "Θα χάσω τη θέση μου στο Google;",
        a: "Κρατάμε τις ίδιες διευθύνσεις σελίδων όπου γίνεται και ανακατευθύνουμε τις υπόλοιπες, ώστε το Google να βρίσκει το νέο site στη θέση του παλιού. Θέσεις στο Google δεν μπορεί να εγγυηθεί κανείς.",
      },
      {
        q: "Κρατάω το domain και τα email μου;",
        a: "Ναι. Το domain μένει δικό σας, και πριν από τη μεταφορά ελέγχουμε πού φιλοξενούνται τα email σας για να μη διακοπούν.",
      },
      {
        q: "Πόσο καιρό θα είναι κάτω το site;",
        a: "Το παλιό site μένει στον αέρα μέχρι να εγκρίνετε το νέο. Η αλλαγή γίνεται χωρίς να κλείσει.",
      },
      {
        q: "Πόσο κοστίζει;",
        a: "Εξαρτάται από το μέγεθος του site. Στείλτε το link και μαζί με το δωρεάν δείγμα παίρνετε γραπτή προσφορά.",
      },
    ],
    price: { from: siteConfig.pricing.redesignFrom, weeks: siteConfig.pricing.redesignWeeks },
  },
} as Record<LandingKey, LandingContent>;

// Nationwide versions of the Thessaloniki pages, used by the Google Ads campaign for all of Greece.
landings.webGreece = {
  ...landings.web,
  key: "webGreece",
  slug: "kataskevi-istoselidon",
  local: false,
  title: "Κατασκευή ιστοσελίδων για επιχειρήσεις | OpenSite",
  description:
    "Κατασκευή ιστοσελίδων για επιχειρήσεις σε όλη την Ελλάδα. Γρήγορο site για κινητό και Google. Δείτε δωρεάν πώς θα είναι το site σας, απαντάμε σε 24 ώρες.",
  h1: "Κατασκευή ιστοσελίδων για επιχειρήσεις",
  subtitle: "Γρήγορο, καθαρό site που δουλεύει σωστά σε κινητό και Google. Για επιχειρήσεις σε όλη την Ελλάδα.",
};
landings.eshopGreece = {
  ...landings.eshop,
  key: "eshopGreece",
  slug: "kataskevi-eshop",
  local: false,
  title: "Δημιουργία eshop για καταστήματα | OpenSite",
  description:
    "Δημιουργία eshop για καταστήματα σε όλη την Ελλάδα, εύκολο στη διαχείριση και σωστό στο κινητό. Δείτε δωρεάν πώς θα είναι το eshop σας, απαντάμε σε 24 ώρες.",
  h1: "Δημιουργία eshop για καταστήματα",
  subtitle: "Ηλεκτρονικό κατάστημα που δέχεται παραγγελίες από την πρώτη μέρα. Για καταστήματα σε όλη την Ελλάδα.",
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
  "Μας λέτε τι χρειάζεστε.",
  "Βλέπετε δωρεάν ένα δείγμα, χωρίς καμία δέσμευση.",
  "Αν σας αρέσει, παίρνετε γραπτή προσφορά και εγκρίνετε το site πριν βγει στον αέρα.",
] as const;

// Work cards. By default a card needs a real screenshot of the delivered
// site at public/work/<slug>.webp and is hidden without it. `image` points to
// another file, `textOnly` shows the card without an image (private systems
// with no public screenshot), `hideLink` drops the link (private admin).
export const workCards: readonly WorkCard[] = [
  {
    slug: "platterie-box",
    name: "The Platterie Box",
    blurb: "Storytelling site για deli και κρασί στη Θεσσαλονίκη: η ιστορία κάθε πιατέλας, από τους μικρούς παραγωγούς μέχρι το τραπέζι.",
  },
  {
    slug: "akinita-fotiadis",
    name: "Ακίνητα Φωτιάδης",
    blurb: "Μεσιτικό γραφείο. Το παλιό site ήταν αργό και δεν έδειχνε την ποιότητα του γραφείου. Το νέο είναι γρήγορο και οδηγεί τον επισκέπτη στην επικοινωνία.",
  },
  {
    slug: "df-real-estate",
    name: "DF Real Estate",
    blurb: "Μεσιτικό γραφείο. Κάθε ακίνητο έχει δική του σελίδα, σε δύο γλώσσες, και οι αγγελίες περνούν αυτόματα στο Spitogatos.",
  },
  {
    slug: "adonis-sail-yachts",
    name: "Adonis Sail Yachts",
    blurb: "Ναύλωση ιστιοπλοϊκών από το 2000. Ο επισκέπτης βλέπει τα σκάφη και φτάνει εύκολα στην κράτηση.",
  },
  {
    slug: "one-menoo",
    name: "OneMenoo",
    blurb: "Πλατφόρμα QR menu για εστιατόρια. Το αργό site ξαναχτίστηκε, φορτώνει σε κάτω από 2 δευτερόλεπτα και έχει ξεπεράσει τα 45.000 σκαναρίσματα.",
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

// What the Google Business Profile shows. Quotes are word for word, only with
// the missing spaces after punctuation added. Update by hand.
export const googleReviews = {
  rating: "4,9",
  count: 14,
  quotes: [
    {
      text: "Εξαιρετικοί επαγγελματίες! Κατανόησαν πλήρως τις ανάγκες μου και έδωσαν έμφαση σε κάθε λεπτομέρεια. Έγιναν όλα άψογα και στον συμφωνηθέντα χρόνο.",
      author: "Perikles Notas",
    },
    {
      text: "Εξαιρετική συνεργασία από την αρχή μέχρι το τέλος! Επαγγελματισμός, συνέπεια και άριστη επικοινωνία σε κάθε στάδιο.",
      author: "Lazaros Chalkidis",
    },
  ],
} as const;

// The testimonial already used on the home page. It stays in English until
// siteConfig.testimonial.el is filled in.
export const testimonial = {
  en: "From design to launch, OpenSite created a website that captures the elegance of our sailing experiences while providing a seamless booking journey for our clients.",
  author: "T. Markas",
  role: "Co-Owner, Yacht Charter & Sailing Experiences, Adonis Sail Yachts",
  roleEl: "Adonis Sail Yachts, ναύλωση ιστιοπλοϊκών",
};
