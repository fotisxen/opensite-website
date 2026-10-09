import { LANDING_PATHS } from "./routes";

// Copy of the Greek site (/el/). Written for Greek readers, not translated
// line by line: shorter, concrete, and only things that are true. Anything
// that needs a number (price, delivery time) is left out until the config has it.

export const GREEK_NAV = [
  { href: "/el/ypiresies/", label: "Υπηρεσίες" },
  { href: "/el/ergasies/", label: "Δουλειές" },
  { href: "/el/schetika/", label: "Σχετικά" },
  { href: "/el/epikoinonia/", label: "Επικοινωνία" },
] as const;

export interface GreekService {
  id: string;
  title: string;
  summary: string;
  points: string[];
  // Dedicated landing page (the ones the ads point to), if there is one.
  landing?: string;
}

export const greekServices: GreekService[] = [
  {
    id: "istoselides",
    title: "Ιστοσελίδες",
    summary: "Site για επιχειρήσεις που θέλουν να τις βρίσκουν και να τις καλούν.",
    points: [
      "Σχεδιασμός για κινητό πρώτα, γιατί από εκεί έρχονται οι περισσότεροι",
      "Σαφής δρόμος από την πρώτη σελίδα μέχρι το τηλέφωνο ή τη φόρμα",
      "Αλλάζεις κείμενα και φωτογραφίες μόνος σου",
      "Επιλέγουμε το εργαλείο που ταιριάζει στο έργο: Next.js ή Webflow",
    ],
    landing: LANDING_PATHS[0],
  },
  {
    id: "eshop",
    title: "E-shop",
    summary: "Ηλεκτρονικό κατάστημα με απλή διαδρομή από το προϊόν στο checkout.",
    points: [
      "Σελίδες προϊόντων και κατηγοριών σχεδιασμένες πρώτα για το κινητό",
      "Απλή διαδρομή από το προϊόν μέχρι την παραγγελία",
      "Περνάς προϊόντα και βλέπεις παραγγελίες μόνος σου",
    ],
    landing: LANDING_PATHS[1],
  },
  {
    id: "anakataskevi",
    title: "Ανακατασκευή site",
    summary: "Το υπάρχον site είναι αργό ή παλιό; Το ξαναφτιάχνουμε και κρατάς το domain και το περιεχόμενό σου.",
    points: [
      "Κρατάς το domain και το περιεχόμενό σου",
      "Αλλάζει η ταχύτητα, ο σχεδιασμός και η εικόνα στο κινητό",
      "Μετακίνηση από WordPress σε Next.js ή Webflow, όπως στο OneMenoo και στους Adonis Sail Yachts",
    ],
    landing: LANDING_PATHS[2],
  },
  {
    id: "crm",
    title: "CRM και διαχειριστικά",
    summary: "Ιδιωτικό πάνελ για να διαχειρίζεσαι μόνος σου αγγελίες, πελάτες και επαφές.",
    points: [
      "Είσοδος μόνο για το προσωπικό, με δικαιώματα ανά χρήστη",
      "Πελάτες, επαφές και φωτογραφίες σε ένα σημείο",
      "Σύνδεση του site και του e-shop με τη λίστα των πελατών σου",
    ],
  },
  {
    id: "intranet",
    title: "Intranet και SharePoint",
    summary: "Εσωτερικό portal για εταιρείες που δουλεύουν ήδη με Microsoft 365.",
    points: [
      "SharePoint με custom web parts (SPFx)",
      "Η σύνδεση και τα δικαιώματα έρχονται από το Microsoft 365 της εταιρείας",
      "Το περιεχόμενο το ενημερώνει η ίδια η ομάδα, χωρίς developer",
    ],
  },
  {
    id: "efarmoges",
    title: "Εφαρμογές desktop και mobile",
    summary: "Εφαρμογές για Windows, Mac, iOS και Android, με κοινό backend.",
    points: [
      "Μία βάση κώδικα για περισσότερες πλατφόρμες όπου γίνεται",
      "Ένα cloud backend που τις εξυπηρετεί όλες",
      "Το δικό μας προϊόν, το HoopStruct, έχει website, δύο desktop και δύο mobile εφαρμογές",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    summary: "Τεχνική βελτιστοποίηση, ώστε το Google να καταλαβαίνει και να δείχνει σωστά το site.",
    points: [
      "Ταχύτητα, δομή σελίδων και metadata",
      "Structured data και sitemap που ενημερώνεται μόνο του",
      "Δική σελίδα για κάθε αγγελία ή προϊόν, όπως στο DF Real Estate",
    ],
  },
];

export const greekSteps = [
  { title: "Μας λες τι χρειάζεσαι", text: "Με μια φόρμα ή ένα τηλεφώνημα. Απαντάμε μέσα σε 24 ώρες." },
  { title: "Παίρνεις προσφορά", text: "Με τιμή και ημερομηνία παράδοσης, πριν ξεκινήσουμε." },
  { title: "Βλέπεις το site πριν βγει", text: "Το εγκρίνεις εσύ και μετά ανεβαίνει στον αέρα." },
] as const;

export const greekWhy = [
  {
    title: "Μιλάς με αυτόν που το φτιάχνει",
    text: "Το OpenSite είναι στούντιο στη Θεσσαλονίκη. Δεν υπάρχει ενδιάμεσος και δεν χάνεται τίποτα στη μεταφορά.",
  },
  {
    title: "Ξέρεις τι θα πληρώσεις και πότε θα έχεις το site",
    text: "Η προσφορά έχει τιμή και ημερομηνία παράδοσης. Δεν υπάρχουν κρυφά κόστη.",
  },
  {
    title: "Φτιάχνουμε και δικά μας προϊόντα",
    text: "Το HoopStruct, με website και τέσσερις εφαρμογές, είναι δικό μας. Ξέρουμε τι σημαίνει να στηρίζεις ένα προϊόν μετά την παράδοση.",
  },
] as const;

export interface GreekCase {
  slug: string; // same slug as the English case study
  name: string;
  field: string;
  platform: string;
  intro: string;
  problem: string[];
  built: { title: string; text: string }[];
  link?: string;
  image?: { src: string; width: number; height: number; alt?: string };
}

export const greekCases: GreekCase[] = [
  {
    slug: "akinita-fotiadis",
    name: "Ακίνητα Φωτιάδης",
    field: "Μεσιτικό γραφείο",
    platform: "Webflow",
    intro: "Νέο site για ένα καθιερωμένο μεσιτικό γραφείο, με σύστημα καταχώρισης ακινήτων.",
    problem: [
      "Το WordPress site ήταν αργό και είχε συχνά προβλήματα",
      "Ο σχεδιασμός δεν έδειχνε την ποιότητα του γραφείου",
      "Δεν υπήρχε καθαρός δρόμος από τον επισκέπτη μέχρι την επικοινωνία",
    ],
    built: [
      { title: "Σχεδιασμός με βάση την ταυτότητα", text: "Κάθε σελίδα δείχνει το γραφείο όπως είναι." },
      { title: "Καθαρή ροή", text: "Από την αναζήτηση ακινήτου μέχρι την επικοινωνία με το γραφείο." },
      { title: "Κινητό, tablet, desktop", text: "Φτιαγμένο να δουλεύει σωστά σε όλες τις οθόνες." },
      { title: "Καταχώριση ακινήτων", text: "Σελίδες ακινήτων και φόρμες επικοινωνίας." },
    ],
    image: { src: "/work/akinita-fotiadis.webp", width: 800, height: 500 },
  },
  {
    slug: "df-real-estate",
    name: "DF Real Estate",
    field: "Μεσιτικό γραφείο",
    platform: "Next.js και Supabase",
    intro: "Πλατφόρμα αγγελιών φτιαγμένη από το μηδέν, συνδεδεμένη με το Spitogatos.",
    problem: [
      "Δεν υπήρχε site, χρειαζόταν ολόκληρη κατασκευή",
      "Κάθε αγγελία έπρεπε να έχει δική της σελίδα με σωστά δεδομένα για το Google",
      "Οι αγγελίες έπρεπε να περνάνε αυτόματα στο Spitogatos",
    ],
    built: [
      { title: "SEO από την αρχή", text: "Δική σελίδα, metadata και structured data για κάθε αγγελία." },
      { title: "Feed προς Spitogatos", text: "Ένα XML feed κρατά το πορτάλ συγχρονισμένο με το site." },
      { title: "Supabase backend", text: "Βάση δεδομένων, αποθήκευση φωτογραφιών και σύνδεση χρηστών." },
      { title: "Δίγλωσσο", text: "Περιεχόμενο και διεπαφή για ελληνόφωνους πελάτες." },
    ],
    link: "https://df-real-estate.com",
    image: { src: "/work/df-real-estate.webp", width: 800, height: 500 },
  },
  {
    slug: "adonis-sail-yachts",
    name: "Adonis Sail Yachts",
    field: "Ναύλωση ιστιοπλοϊκών",
    platform: "Webflow",
    intro: "Νέο site για εταιρεία ναύλωσης που λειτουργεί από το 2000, με καθαρή ροή αιτήματος.",
    problem: [
      "Το WordPress site ήταν αργό",
      "Δεν φαινόταν πού να πατήσει ο επισκέπτης για να ζητήσει ναύλωση",
      "Ο σχεδιασμός δεν έδειχνε την εμπειρία του ταξιδιού",
    ],
    built: [
      { title: "Οπτικός σχεδιασμός", text: "Εικόνες και διάταξη που δείχνουν την εμπειρία." },
      { title: "Ροή προς το αίτημα", text: "Σαφή κουμπιά από κάθε ενότητα προς το αίτημα ναύλωσης." },
      { title: "Πρώτα για κινητό", text: "Πολλοί ψάχνουν ναύλωση από το κινητό." },
      { title: "Hosting στο Webflow", text: "Σταθερή απόδοση χωρίς τον φόρτο του WordPress." },
    ],
    link: "https://www.adonis-sailyachts.com/",
    image: { src: "/work/adonis-sail-yachts.webp", width: 800, height: 500 },
  },
  {
    slug: "one-menoo",
    name: "OneMenoo",
    field: "Πλατφόρμα QR menu",
    platform: "Next.js",
    intro: "Ξαναχτίσαμε σε Next.js το site μιας πλατφόρμας QR menu με τεχνητή νοημοσύνη.",
    problem: [
      "Το WordPress site ήταν αργό για ένα σύγχρονο προϊόν",
      "Το SEO ήταν αδύναμο",
      "Δεν υπήρχε βάση για νέες λειτουργίες",
    ],
    built: [
      { title: "Ταχύτητα", text: "Φτιαγμένο από την αρχή με προτεραιότητα στη φόρτωση." },
      { title: "Βάση για SEO", text: "Server-side rendering, structured data και σωστά metadata." },
      { title: "Επεκτάσιμη αρχιτεκτονική", text: "Νέες λειτουργίες μπαίνουν χωρίς να ξαναχτίζεται το site." },
      { title: "Χωρίς page builder", text: "Κάθε στοιχείο φτιάχτηκε για τον σκοπό του." },
    ],
    link: "https://onemenoo.com/en",
    image: { src: "/work/one-menoo.webp", width: 800, height: 500 },
  },
  {
    slug: "df-real-estate-crm",
    name: "DF Real Estate CRM",
    field: "Διαχειριστικό για μεσιτικό",
    platform: "Next.js και Supabase",
    intro: "Ιδιωτικό πάνελ για να διαχειρίζεται το γραφείο μόνο του αγγελίες και πελάτες.",
    problem: [
      "Δεν υπήρχε τρόπος να προστεθεί ή να αλλάξει μια αγγελία χωρίς developer",
      "Οι πελάτες και οι επαφές δεν είχαν ασφαλές μέρος",
      "Έπρεπε η πρόσβαση να είναι μόνο για το προσωπικό",
    ],
    built: [
      { title: "Διαχείριση αγγελιών", text: "Δημιουργία, αλλαγή και διαγραφή αγγελιών και φωτογραφιών." },
      { title: "Ιδιωτικό αρχείο πελατών", text: "Το βλέπουν μόνο συνδεδεμένοι χρήστες, με Row Level Security." },
      { title: "Κλειστή πρόσβαση", text: "Είσοδος με πρόσκληση, χωρίς δημόσια εγγραφή." },
      { title: "Φτιαγμένο από το μηδέν", text: "Όχι έτοιμο CRM, αλλά σύστημα στα μέτρα του γραφείου." },
    ],
    image: { src: "/work/df-real-estate-crm.webp", width: 800, height: 500 },
  },
  {
    slug: "starbulk-intranet",
    name: "Star Bulk Intranet",
    field: "Intranet ναυτιλιακής εταιρείας",
    platform: "SharePoint και SPFx",
    intro: "Εσωτερικό portal για μια ναυτιλιακή εταιρεία, με νέα, εργαλεία και πληροφορίες σε ένα μέρος.",
    problem: [
      "Εργαλεία και πληροφορίες ήταν σκόρπια σε πολλά σημεία",
      "Τα εσωτερικά νέα και τα έγγραφα δύσκολα βρίσκονταν",
      "Χρειαζόταν ασφαλής πρόσβαση μέσα στο υπάρχον Microsoft περιβάλλον",
    ],
    built: [
      { title: "Custom web parts (SPFx)", text: "Στοιχεία φτιαγμένα για την εταιρεία αντί για τα γενικά του SharePoint." },
      { title: "Εταιρική εμφάνιση", text: "Σύγχρονος και ενιαίος σχεδιασμός." },
      { title: "Ασφάλεια", text: "Η πρόσβαση έρχεται από τη σύνδεση και τα δικαιώματα του Microsoft 365." },
      { title: "Εύκολη συντήρηση", text: "Όποιος διαχειρίζεται το περιεχόμενο ενημερώνει τις σελίδες μόνος του." },
    ],
    // Illustration, not a screenshot: the real intranet is private.
    image: { src: "/case-studies/starbulk-intranet.svg", width: 800, height: 500, alt: "Απεικόνιση του intranet (όχι πραγματικό screenshot)" },
  },
  {
    slug: "hoopstruct",
    name: "HoopStruct",
    field: "Δικό μας προϊόν",
    platform: "Next.js, Electron, React Native",
    intro: "Στατιστικά μπάσκετ και scouting reports, με website, δύο desktop και δύο mobile εφαρμογές.",
    problem: [
      "Το box score δίνει μόνο βασικά νούμερα",
      "Η καταχώριση αγώνων με το χέρι είναι αργή",
      "Οι παίκτες σπάνια βλέπουν την ανάλυση της ομάδας",
    ],
    built: [
      { title: "Τρεις τρόποι εισαγωγής", text: "Φωτογραφία box score που διαβάζει η τεχνητή νοημοσύνη, εισαγωγή play-by-play ή χειροκίνητα." },
      { title: "Προχωρημένα στατιστικά", text: "PIR, PER, PIE, Four Factors και Impact Rating φτιαγμένο από την αρχή." },
      { title: "Scouting reports", text: "Δυνατά και αδύνατα σημεία και πώς κερδίζεται μια ομάδα, από τα δεδομένα." },
      { title: "Desktop και mobile", text: "Windows και macOS για προπονητές, iOS και Android για παίκτες, με κοινό backend." },
    ],
    link: "https://hoopstruct.com",
    image: { src: "/case-studies/hoopstruct.png", width: 1200, height: 630 },
  },
];

export function getGreekCase(slug: string) {
  return greekCases.find((c) => c.slug === slug);
}
