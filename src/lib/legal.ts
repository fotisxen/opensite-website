import { siteConfig } from "./site.config";

// Legal texts as data. Wording follows the texts Fotis approved. Anything the
// texts take from siteConfig (company identity, server country, retention
// period...) is left out when the value is null, never shown as a placeholder.

export type Lang = "el" | "en";

export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "lines"; lines: string[] }
  | { t: "table"; head: string[]; rows: string[][] };

export interface Section {
  id?: string;
  title: string;
  blocks: Block[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro?: string;
  sections: Section[];
}

const { company, legal } = siteConfig;
const nonEmpty = (xs: (string | null | false | undefined)[]) => xs.filter((x): x is string => !!x);

export const PHONE_EL = siteConfig.phone.display;
export const PHONE_EN = `+30 ${siteConfig.phone.display}`;

// True once the legal identity is known. Footer links to the company details
// only appear then, because without it the block has nothing to show.
export const hasCompanyIdentity = company.legalName !== null;

// The "Company details" block at the top of the Terms of Use.
export function companyLines(lang: Lang): string[] {
  const el = lang === "el";
  const name = company.legalName
    ? [company.legalName, company.legalForm?.[lang]].filter(Boolean).join(", ")
    : null;
  const tax = nonEmpty([
    company.vatId && (el ? `ΑΦΜ ${company.vatId}` : `VAT No. EL${company.vatId}`),
    company.taxOffice && (el ? `ΔΟΥ ${company.taxOffice}` : `Tax office: ${company.taxOffice}`),
  ]).join(", ");
  return nonEmpty([
    name,
    name ? (el ? "Διακριτικός τίτλος: OpenSite" : "Trading as OpenSite") : "OpenSite",
    company.address && (el ? company.address : `${company.address}, Greece`),
    tax,
    company.gemi && (el ? `Αριθμός ΓΕΜΗ ${company.gemi}` : `GEMI No. ${company.gemi}`),
    `${siteConfig.email}, ${el ? PHONE_EL : PHONE_EN}`,
  ]);
}

// "Who is responsible" in the Privacy Policy.
function controllerLines(lang: Lang): string[] {
  const el = lang === "el";
  const name = company.legalName
    ? [
        company.legalName,
        company.legalForm?.[lang],
      ]
        .filter(Boolean)
        .join(", ") + (el ? ', με διακριτικό τίτλο «OpenSite»' : ", trading as OpenSite")
    : null;
  const ids = nonEmpty([
    company.vatId && (el ? `ΑΦΜ ${company.vatId}` : `VAT No. EL${company.vatId}`),
    company.taxOffice && (el ? `ΔΟΥ ${company.taxOffice}` : `Tax office: ${company.taxOffice}`),
    company.gemi && (el ? `αριθμός ΓΕΜΗ ${company.gemi}` : `GEMI No. ${company.gemi}`),
  ]).join(", ");
  return nonEmpty([
    name ?? "OpenSite",
    company.address && (el ? company.address : `${company.address}, Greece`),
    ids,
    `Email: ${siteConfig.email}`,
    el ? `Τηλέφωνο: ${PHONE_EL}` : `Phone: ${PHONE_EN}`,
  ]);
}

const where = (v: string | null) => v ?? "";

// ---------------------------------------------------------------- Privacy

function retentionEl() {
  return legal.retentionMonths !== null
    ? `Έως ${legal.retentionMonths} μήνες από την τελευταία μας επικοινωνία, αν δεν προχωρήσουμε σε έργο`
    : "Όσο διαρκεί η επικοινωνία μας, αν δεν προχωρήσουμε σε έργο";
}
function retentionEn() {
  return legal.retentionMonths !== null
    ? `Up to ${legal.retentionMonths} months after our last contact, if no project follows`
    : "For as long as our conversation lasts, if no project follows";
}

export function privacyDoc(lang: Lang): LegalDoc {
  return lang === "el" ? privacyEl() : privacyEn();
}

function privacyEl(): LegalDoc {
  const providers: string[][] = [
    [
      "Hostinger International Ltd. (Κύπρος)",
      "Φιλοξενεί το site και στέλνει τα αιτήματα των φορμών στο email μας",
      where(legal.serverCountry),
    ],
    ...(legal.emailProvider ? [[legal.emailProvider, "Φιλοξενεί το email info@opensite.gr", ""]] : []),
    [
      "Supabase, Inc. (ΗΠΑ)",
      "Βάση δεδομένων όπου αποθηκεύονται τα αιτήματα από τη φόρμα επικοινωνίας και από την κράτηση κλήσης",
      where(legal.supabaseRegion),
    ],
    [
      "EmailJS Pte. Ltd. (Σιγκαπούρη)",
      "Στέλνει το email επιβεβαίωσης όταν κλείνεις κλήση. Λαμβάνει όνομα, email, ημέρα και ώρα",
      "Servers στις ΗΠΑ",
    ],
    [
      "Contentful GmbH (Γερμανία)",
      "Σερβίρει τις εικόνες των άρθρων στη σελίδα Insights. Λαμβάνει τη διεύθυνση IP σου όταν ανοίγεις τη σελίδα",
      "ΕΕ και διεθνές δίκτυο διανομής",
    ],
    [
      "Google Ireland Limited και Meta Platforms Ireland Limited",
      "Μόνο αν πατήσεις «Αποδοχή». Δες την ενότητα 4",
      "Ιρλανδία, με πιθανή διαβίβαση στις ΗΠΑ",
    ],
  ];

  return {
    title: "Πολιτική απορρήτου",
    updated: `Τελευταία ενημέρωση: ${legal.updatedEl}`,
    intro:
      "Εδώ γράφουμε ποια προσωπικά δεδομένα συλλέγει το opensite.gr, γιατί τα συλλέγει, πού πηγαίνουν και ποια δικαιώματα έχεις.",
    sections: [
      {
        title: "1. Ποιος είναι υπεύθυνος",
        blocks: [
          { t: "p", text: "Υπεύθυνος επεξεργασίας είναι:" },
          { t: "lines", lines: controllerLines("el") },
        ],
      },
      {
        title: "2. Τι συλλέγουμε, γιατί και για πόσο",
        blocks: [
          {
            t: "table",
            head: ["Πότε", "Τι δεδομένα", "Γιατί", "Νομική βάση", "Πόσο τα κρατάμε"],
            rows: [
              [
                "Στέλνεις φόρμα για προσφορά ή επικοινωνία",
                "Όνομα, τηλέφωνο ή email, τι χρειάζεσαι, και όσα ακόμα γράψεις: το site σου, το είδος της επιχείρησης, το μήνυμά σου",
                "Για να σου απαντήσουμε και να ετοιμάσουμε προσφορά",
                "Ενέργειες πριν από σύμβαση, μετά από δικό σου αίτημα (άρθρο 6 παρ. 1 β GDPR)",
                retentionEl(),
              ],
              [
                "Κλείνεις κλήση",
                "Όνομα, επώνυμο, email, τηλέφωνο, υπηρεσία που σε ενδιαφέρει, σημειώσεις, ημέρα και ώρα",
                "Για να κανονίσουμε και να επιβεβαιώσουμε την κλήση",
                "Το ίδιο",
                "Το ίδιο",
              ],
              [
                "Μαζί με κάθε φόρμα",
                "Η σελίδα από την οποία μπήκες στο site και τα στοιχεία καμπάνιας που είχε το link της διαφήμισης (παράμετροι `utm`). Το αναγνωριστικό κλικ της Google (`gclid`) μόνο αν έχεις πατήσει «Αποδοχή»",
                "Για να ξέρουμε ποια διαφήμιση έφερε το αίτημα",
                "Έννομο συμφέρον μας να μετράμε την απόδοση των διαφημίσεών μας (άρθρο 6 παρ. 1 στ). Για το `gclid`, η συγκατάθεσή σου",
                "Όσο και το αίτημα",
              ],
              [
                "Μας καλείς ή μας γράφεις σε email, Viber ή WhatsApp",
                "Ο αριθμός ή η διεύθυνσή σου και όσα μας πεις ή μας στείλεις",
                "Για να σου απαντήσουμε",
                "Ενέργειες πριν από σύμβαση, ή έννομο συμφέρον μας να απαντάμε σε όσους επικοινωνούν μαζί μας",
                "Το ίδιο",
              ],
              [
                "Γίνεσαι πελάτης",
                "Στοιχεία τιμολόγησης και όσα χρειάζεται το έργο",
                "Για να εκτελέσουμε το έργο και να εκδώσουμε παραστατικά",
                "Σύμβαση (άρθρο 6 παρ. 1 β) και νομική υποχρέωση (άρθρο 6 παρ. 1 γ)",
                "Για όσο χρόνο ορίζει η φορολογική νομοθεσία",
              ],
              [
                "Ανοίγεις οποιαδήποτε σελίδα",
                "Διεύθυνση IP, ημέρα και ώρα, σελίδα, τύπος browser, στα αρχεία καταγραφής του server",
                "Για τη λειτουργία και την ασφάλεια του site",
                "Έννομο συμφέρον μας (άρθρο 6 παρ. 1 στ)",
                "Για περιορισμένο χρόνο, όπως ορίζει ο πάροχος φιλοξενίας",
              ],
              [
                "Πατάς «Αποδοχή» στα cookies",
                "Δες την ενότητα 4",
                "Μέτρηση και προβολή διαφημίσεων",
                "Η συγκατάθεσή σου (άρθρο 6 παρ. 1 α)",
                "Δες την ενότητα 4",
              ],
            ],
          },
          {
            t: "p",
            text: "Δεν ζητάμε και δεν θέλουμε ευαίσθητα δεδομένα. Μη γράφεις τέτοια στα μηνύματά σου.",
          },
        ],
      },
      {
        title: "3. Ποιοι άλλοι λαμβάνουν δεδομένα",
        blocks: [
          {
            t: "p",
            text: "Δεν πουλάμε δεδομένα σε κανέναν. Δεδομένα λαμβάνουν μόνο οι παρακάτω πάροχοι, που δουλεύουν για λογαριασμό μας:",
          },
          { t: "table", head: ["Πάροχος", "Τι κάνει", "Πού γίνεται η επεξεργασία"], rows: providers },
          {
            t: "p",
            text: "Αν μας γράψεις στο Viber ή στο WhatsApp, τα μηνύματα περνούν από αυτές τις υπηρεσίες, με τους δικούς τους όρους.",
          },
          {
            t: "p",
            text: "Δεδομένα δίνουμε επίσης στον λογιστή μας και σε δημόσιες αρχές, όπου το απαιτεί ο νόμος.",
          },
        ],
      },
      {
        id: "cookies",
        title: "4. Cookies και διαφημίσεις",
        blocks: [
          {
            t: "p",
            text: "Αν δεν πατήσεις «Αποδοχή», το site δεν βάζει cookies διαφήμισης ή μέτρησης και δεν φορτώνει κώδικα της Google ή της Meta. Το μόνο που αποθηκεύεται στον browser σου είναι η επιλογή σου στο banner και η ημερομηνία της, για να μη σε ρωτάμε σε κάθε σελίδα. Σε ξαναρωτάμε μετά από 180 ημέρες, είτε δέχτηκες είτε αρνήθηκες.",
          },
          { t: "p", text: "Αν πατήσεις «Αποδοχή», φορτώνουν δύο εργαλεία:" },
          {
            t: "table",
            head: ["Εργαλείο", "Εταιρεία", "Τι κάνει", "Cookies", "Διάρκεια"],
            rows: [
              [
                "Google tag για το Google Ads",
                "Google Ireland Limited",
                "Μετρά ποια διαφήμισή μας στο Google οδήγησε σε αίτημα ή σε κλήση",
                "`_gcl_au`, `_gcl_aw`",
                "Έως 90 ημέρες",
              ],
              [
                "Meta Pixel",
                "Meta Platforms Ireland Limited",
                "Μετρά ποια διαφήμισή μας στο Facebook και στο Instagram οδήγησε σε αίτημα. Μας επιτρέπει επίσης να δείχνουμε διαφημίσεις της OpenSite σε όσους επισκέφτηκαν το site",
                "`_fbp`, `_fbc`",
                "Έως 90 ημέρες",
              ],
            ],
          },
          {
            t: "p",
            text: "Τα εργαλεία αυτά λαμβάνουν τη διεύθυνση IP σου, στοιχεία του browser και της συσκευής σου, τη σελίδα που άνοιξες, και το αν έστειλες φόρμα ή πάτησες τηλέφωνο, Viber ή WhatsApp. Δεν λαμβάνουν όσα γράφεις στις φόρμες.",
          },
          {
            t: "p",
            text: "Για τη συλλογή αυτών των δεδομένων από το Meta Pixel και την αποστολή τους στη Meta είμαστε από κοινού υπεύθυνοι με τη Meta Platforms Ireland Limited. Για ό,τι κάνει στη συνέχεια η Meta ή η Google με τα δεδομένα, υπεύθυνη είναι η καθεμία, με τη δική της πολιτική απορρήτου.",
          },
          {
            t: "p",
            text: "Αλλάζεις την επιλογή σου όποτε θέλεις από το «Ρυθμίσεις cookies», στο κάτω μέρος κάθε σελίδας. Αν γυρίσεις σε «Απόρριψη», τα εργαλεία σταματούν και τα cookies τους σβήνονται από τον browser σου.",
          },
        ],
      },
      {
        title: "5. Διαβίβαση εκτός Ευρωπαϊκής Ένωσης",
        blocks: [
          {
            t: "p",
            text: "Η EmailJS επεξεργάζεται δεδομένα στις ΗΠΑ, με τις τυποποιημένες συμβατικές ρήτρες της Ευρωπαϊκής Επιτροπής. Η Google και η Meta μπορεί να διαβιβάσουν δεδομένα στις ΗΠΑ, με βάση το Πλαίσιο Προστασίας Δεδομένων ΕΕ–ΗΠΑ ή τυποποιημένες συμβατικές ρήτρες.",
          },
        ],
      },
      {
        title: "6. Τα δικαιώματά σου",
        blocks: [
          { t: "p", text: "Μπορείς να ζητήσεις:" },
          {
            t: "ul",
            items: [
              "να μάθεις ποια δεδομένα σου έχουμε και να πάρεις αντίγραφο,",
              "να διορθώσουμε ό,τι είναι λάθος,",
              "να σβήσουμε τα δεδομένα σου,",
              "να περιορίσουμε τη χρήση τους,",
              "να τα πάρεις σε μορφή που μεταφέρεται σε άλλον πάροχο,",
              "να σταματήσουμε επεξεργασία που στηρίζεται σε έννομο συμφέρον μας.",
            ],
          },
          {
            t: "p",
            text: "Τη συγκατάθεσή σου για τα cookies την ανακαλείς όποτε θέλεις από το «Ρυθμίσεις cookies». Η ανάκληση δεν επηρεάζει ό,τι έγινε πριν.",
          },
          { t: "p", text: "Γράψε μας στο info@opensite.gr. Απαντάμε μέσα σε έναν μήνα." },
          {
            t: "p",
            text: "Αν θεωρείς ότι δεν χειριστήκαμε σωστά τα δεδομένα σου, έχεις δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα, [www.dpa.gr](https://www.dpa.gr).",
          },
        ],
      },
      {
        title: "7. Είσαι υποχρεωμένος να δώσεις στοιχεία;",
        blocks: [
          {
            t: "p",
            text: "Όχι. Χωρίς όνομα και τηλέφωνο ή email όμως δεν μπορούμε να σου απαντήσουμε. Δεν παίρνουμε αποφάσεις για σένα με αυτοματοποιημένο τρόπο.",
          },
        ],
      },
      {
        title: "8. Ασφάλεια",
        blocks: [
          {
            t: "p",
            text: "Το site λειτουργεί μόνο με κρυπτογραφημένη σύνδεση (HTTPS). Πρόσβαση στα αιτήματα έχει μόνο η OpenSite και οι πάροχοι της ενότητας 3.",
          },
        ],
      },
      {
        title: "9. Αλλαγές",
        blocks: [
          {
            t: "p",
            text: "Όταν αλλάζει κάτι ουσιαστικό, ενημερώνουμε αυτή τη σελίδα και την ημερομηνία στην αρχή της.",
          },
        ],
      },
    ],
  };
}

function privacyEn(): LegalDoc {
  const providers: string[][] = [
    [
      "Hostinger International Ltd. (Cyprus)",
      "Hosts the site and sends form enquiries to our email",
      where(legal.serverCountry),
    ],
    ...(legal.emailProvider ? [[legal.emailProvider, "Hosts the info@opensite.gr mailbox", ""]] : []),
    [
      "Supabase, Inc. (USA)",
      "Database where enquiries from the contact form and call bookings are stored",
      where(legal.supabaseRegion),
    ],
    [
      "EmailJS Pte. Ltd. (Singapore)",
      "Sends the confirmation email when you book a call. Receives name, email, date and time",
      "Servers in the USA",
    ],
    [
      "Contentful GmbH (Germany)",
      "Serves the article images on the Insights page. Receives your IP address when you open that page",
      "EU and a global delivery network",
    ],
    [
      "Google Ireland Limited and Meta Platforms Ireland Limited",
      "Only if you press \"Accept\". See section 4",
      "Ireland, with possible transfer to the USA",
    ],
  ];

  return {
    title: "Privacy Policy",
    updated: `Last updated: ${legal.updatedEn}`,
    intro: "This page explains what personal data opensite.gr collects, why, where it goes and what rights you have.",
    sections: [
      {
        title: "1. Who is responsible",
        blocks: [
          { t: "p", text: "The data controller is:" },
          { t: "lines", lines: controllerLines("en") },
        ],
      },
      {
        title: "2. What we collect, why and for how long",
        blocks: [
          {
            t: "table",
            head: ["When", "What data", "Why", "Legal basis", "How long we keep it"],
            rows: [
              [
                "You send a quote or contact form",
                "Name, phone or email, what you need, and anything else you write: your website, your type of business, your message",
                "To reply and prepare a quote",
                "Steps taken at your request before entering into a contract (Article 6(1)(b) GDPR)",
                retentionEn(),
              ],
              [
                "You book a call",
                "First and last name, email, phone, the service you are interested in, notes, date and time",
                "To arrange and confirm the call",
                "Same",
                "Same",
              ],
              [
                "With every form",
                "The page through which you entered the site and the campaign details carried by the ad link (`utm` parameters). The Google click identifier (`gclid`) only if you pressed \"Accept\"",
                "To know which ad led to the enquiry",
                "Our legitimate interest in measuring how our ads perform (Article 6(1)(f)). For the `gclid`, your consent",
                "As long as the enquiry",
              ],
              [
                "You call us or write to us by email, Viber or WhatsApp",
                "Your number or address and whatever you tell or send us",
                "To reply",
                "Steps before a contract, or our legitimate interest in answering people who contact us",
                "Same",
              ],
              [
                "You become a client",
                "Invoicing details and whatever the project requires",
                "To deliver the project and issue invoices",
                "Contract (Article 6(1)(b)) and legal obligation (Article 6(1)(c))",
                "For as long as tax law requires",
              ],
              [
                "You open any page",
                "IP address, date and time, page, browser type, in the server logs",
                "To run and secure the site",
                "Our legitimate interest (Article 6(1)(f))",
                "For a limited period set by the hosting provider",
              ],
              [
                "You press \"Accept\" on the cookie banner",
                "See section 4",
                "Ad measurement and advertising",
                "Your consent (Article 6(1)(a))",
                "See section 4",
              ],
            ],
          },
          {
            t: "p",
            text: "We do not ask for or want sensitive data. Please do not include any in your messages.",
          },
        ],
      },
      {
        title: "3. Who else receives data",
        blocks: [
          {
            t: "p",
            text: "We do not sell data to anyone. Data is received only by the providers below, who work on our behalf:",
          },
          { t: "table", head: ["Provider", "What it does", "Where processing takes place"], rows: providers },
          {
            t: "p",
            text: "If you write to us on Viber or WhatsApp, your messages pass through those services under their own terms.",
          },
          {
            t: "p",
            text: "We also give data to our accountant and to public authorities where the law requires it.",
          },
        ],
      },
      {
        id: "cookies",
        title: "4. Cookies and advertising",
        blocks: [
          {
            t: "p",
            text: "Unless you press \"Accept\", the site sets no advertising or measurement cookies and loads no Google or Meta code. The only thing stored in your browser is your banner choice and its date, so we do not ask on every page. We ask again after 180 days, whether you accepted or declined.",
          },
          { t: "p", text: "If you press \"Accept\", two tools load:" },
          {
            t: "table",
            head: ["Tool", "Company", "What it does", "Cookies", "Duration"],
            rows: [
              [
                "Google tag for Google Ads",
                "Google Ireland Limited",
                "Measures which of our Google ads led to an enquiry or a call",
                "`_gcl_au`, `_gcl_aw`",
                "Up to 90 days",
              ],
              [
                "Meta Pixel",
                "Meta Platforms Ireland Limited",
                "Measures which of our Facebook and Instagram ads led to an enquiry. It also lets us show OpenSite ads to people who visited the site",
                "`_fbp`, `_fbc`",
                "Up to 90 days",
              ],
            ],
          },
          {
            t: "p",
            text: "These tools receive your IP address, browser and device details, the page you opened, and whether you sent a form or tapped the phone, Viber or WhatsApp link. They do not receive what you type into the forms.",
          },
          {
            t: "p",
            text: "For the collection of this data by the Meta Pixel and its transmission to Meta, we are joint controllers with Meta Platforms Ireland Limited. For what Meta or Google does with the data afterwards, each company is responsible under its own privacy policy.",
          },
          {
            t: "p",
            text: "You can change your choice at any time with \"Cookie settings\" at the bottom of every page. If you switch to \"Decline\", the tools stop and their cookies are removed from your browser.",
          },
        ],
      },
      {
        title: "5. Transfers outside the European Union",
        blocks: [
          {
            t: "p",
            text: "EmailJS processes data in the USA under the European Commission's standard contractual clauses. Google and Meta may transfer data to the USA under the EU–US Data Privacy Framework or standard contractual clauses.",
          },
        ],
      },
      {
        title: "6. Your rights",
        blocks: [
          { t: "p", text: "You can ask us to:" },
          {
            t: "ul",
            items: [
              "tell you what data we hold about you and give you a copy,",
              "correct anything that is wrong,",
              "delete your data,",
              "restrict how we use it,",
              "give it to you in a format you can take to another provider,",
              "stop processing that relies on our legitimate interest.",
            ],
          },
          {
            t: "p",
            text: "You can withdraw your cookie consent at any time through \"Cookie settings\". Withdrawal does not affect what happened before it.",
          },
          { t: "p", text: "Write to info@opensite.gr. We reply within one month." },
          {
            t: "p",
            text: "If you believe we have mishandled your data, you have the right to lodge a complaint with the Hellenic Data Protection Authority, [www.dpa.gr](https://www.dpa.gr).",
          },
        ],
      },
      {
        title: "7. Do you have to give us your details?",
        blocks: [
          {
            t: "p",
            text: "No. But without a name and a phone number or email we cannot reply. We make no automated decisions about you.",
          },
        ],
      },
      {
        title: "8. Security",
        blocks: [
          {
            t: "p",
            text: "The site works only over an encrypted connection (HTTPS). Only OpenSite and the providers in section 3 have access to enquiries.",
          },
        ],
      },
      {
        title: "9. Changes",
        blocks: [
          {
            t: "p",
            text: "When something material changes, we update this page and the date at the top.",
          },
        ],
      },
    ],
  };
}

// ------------------------------------------------------------------ Terms

export function termsDoc(lang: Lang): LegalDoc {
  return lang === "el" ? termsEl() : termsEn();
}

function termsEl(): LegalDoc {
  return {
    title: "Όροι χρήσης",
    updated: `Τελευταία ενημέρωση: ${legal.updatedEl}`,
    sections: [
      {
        id: "stoicheia",
        title: "Στοιχεία επιχείρησης",
        blocks: [{ t: "lines", lines: companyLines("el") }],
      },
      {
        title: "1. Τι είναι αυτό το site",
        blocks: [
          {
            t: "p",
            text: "Το opensite.gr παρουσιάζει τις υπηρεσίες της OpenSite. Το περιεχόμενό του είναι ενημερωτικό και δεν αποτελεί δεσμευτική προσφορά.",
          },
        ],
      },
      {
        title: "2. Τιμές",
        blocks: [
          {
            t: "p",
            text: "Οι τιμές «από» που εμφανίζονται είναι τιμές εκκίνησης, και δίπλα σε καθεμία γράφουμε αν περιλαμβάνει ΦΠΑ. Η τελική τιμή κάθε έργου ορίζεται στη γραπτή προσφορά, πριν ξεκινήσει η δουλειά.",
          },
        ],
      },
      {
        title: "3. Έργα και συνεργασία",
        blocks: [
          {
            t: "p",
            text: "Κάθε έργο διέπεται από τη γραπτή προσφορά ή σύμβαση που συμφωνούμε πριν ξεκινήσουμε. Εκεί ορίζονται το αντικείμενο, η τιμή, η ημερομηνία παράδοσης, οι πληρωμές και η υποστήριξη. Αν κάτι σε αυτό το site διαφέρει από τη γραπτή προσφορά, ισχύει η προσφορά.",
          },
        ],
      },
      {
        title: "4. Πνευματική ιδιοκτησία",
        blocks: [
          {
            t: "p",
            text: "Τα κείμενα, ο σχεδιασμός και ο κώδικας του site ανήκουν στην OpenSite. Τα ονόματα, τα λογότυπα και οι εικόνες των έργων ανήκουν στους πελάτες μας και εμφανίζονται με την άδειά τους.",
          },
        ],
      },
      {
        title: "5. Links προς άλλα sites",
        blocks: [
          {
            t: "p",
            text: "Το site έχει links προς sites τρίτων, όπως τα sites των πελατών μας. Δεν ελέγχουμε το περιεχόμενό τους.",
          },
        ],
      },
      {
        title: "6. Ευθύνη",
        blocks: [
          {
            t: "p",
            text: "Φροντίζουμε το περιεχόμενο του site να είναι ακριβές και ενημερωμένο. Δεν ευθυνόμαστε για ζημιά από τη χρήση του site, εκτός αν οφείλεται σε δόλο ή βαριά αμέλειά μας. Τίποτα εδώ δεν περιορίζει τα δικαιώματα που δίνει ο νόμος στους καταναλωτές.",
          },
        ],
      },
      {
        title: "7. Προσωπικά δεδομένα",
        blocks: [{ t: "p", text: "Ισχύει η [Πολιτική απορρήτου](/el/politiki-aporritou/)." }],
      },
      {
        title: "8. Εφαρμοστέο δίκαιο",
        blocks: [
          {
            t: "p",
            text: "Ισχύει το ελληνικό δίκαιο. Αρμόδια είναι τα δικαστήρια της Θεσσαλονίκης. Αν είσαι καταναλωτής, ισχύουν και τα δικαστήρια που ορίζει για σένα ο νόμος.",
          },
        ],
      },
      {
        title: "9. Αλλαγές",
        blocks: [
          {
            t: "p",
            text: "Όταν αλλάζουν οι όροι, ενημερώνουμε αυτή τη σελίδα και την ημερομηνία στην αρχή της.",
          },
        ],
      },
    ],
  };
}

function termsEn(): LegalDoc {
  return {
    title: "Terms of Use",
    updated: `Last updated: ${legal.updatedEn}`,
    sections: [
      {
        id: "company",
        title: "Company details",
        blocks: [{ t: "lines", lines: companyLines("en") }],
      },
      {
        title: "1. What this site is",
        blocks: [
          {
            t: "p",
            text: "opensite.gr presents the services of OpenSite. Its content is for information and is not a binding offer.",
          },
        ],
      },
      {
        title: "2. Prices",
        blocks: [
          {
            t: "p",
            text: "\"From\" prices shown on the site are starting prices, and next to each one we state whether it includes VAT. The final price of each project is set in the written quote, before work starts.",
          },
        ],
      },
      {
        title: "3. Projects",
        blocks: [
          {
            t: "p",
            text: "Each project is governed by the written quote or contract we agree before we start. It sets the scope, the price, the delivery date, the payments and the support. If anything on this site differs from the written quote, the quote applies.",
          },
        ],
      },
      {
        title: "4. Intellectual property",
        blocks: [
          {
            t: "p",
            text: "The text, design and code of this site belong to OpenSite. The names, logos and images of the projects belong to our clients and are shown with their permission.",
          },
        ],
      },
      {
        title: "5. Links to other sites",
        blocks: [
          {
            t: "p",
            text: "This site links to third-party sites, such as our clients' sites. We do not control their content.",
          },
        ],
      },
      {
        title: "6. Liability",
        blocks: [
          {
            t: "p",
            text: "We take care to keep the content of this site accurate and up to date. We are not liable for damage arising from the use of this site, unless it is caused by our wilful misconduct or gross negligence. Nothing here limits the rights the law gives to consumers.",
          },
        ],
      },
      {
        title: "7. Personal data",
        blocks: [{ t: "p", text: "The [Privacy Policy](/privacy-policy/) applies." }],
      },
      {
        title: "8. Governing law",
        blocks: [
          {
            t: "p",
            text: "Greek law applies. The courts of Thessaloniki have jurisdiction. If you are a consumer, the courts the law provides for you also have jurisdiction.",
          },
        ],
      },
      {
        title: "9. Changes",
        blocks: [
          {
            t: "p",
            text: "When these terms change, we update this page and the date at the top.",
          },
        ],
      },
    ],
  };
}
