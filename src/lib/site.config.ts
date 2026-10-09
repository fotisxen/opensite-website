// Single source of truth for contact details, prices, and tracking IDs.
// A value of `null` means "we don't know yet": the matching element is
// simply not rendered. Never put placeholders such as "€X" or "TBD" in
// pages. Fill a value in here and it appears everywhere it is used.

export interface SiteConfig {
  phone: {
    display: string;
    e164: string;
    viber: boolean | null; // true if the number has Viber
    whatsapp: boolean | null; // true if the number has WhatsApp
  };
  email: string;
  social: {
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
  };
  pricing: {
    websiteFrom: number | null; // euros, e.g. 900
    websiteWeeks: number | null; // weeks, e.g. 3
    eshopFrom: number | null;
    eshopWeeks: number | null;
    redesignFrom: number | null;
    redesignWeeks: number | null;
    // How the "from" prices relate to VAT. While null, no price is shown at all.
    vatMode: "plus" | "included" | "none" | null;
  };
  tracking: {
    googleAdsId: string | null; // "AW-XXXXXXXXXX"
    leadLabel: string | null; // the part after "/" in send_to
    callLabel: string | null;
    chatLabel: string | null;
    metaPixelId: string | null;
  };
  testimonial: {
    el: string | null; // Greek rendering, approved by Fotis
  };
  // How many projects the three Greek landing pages show: 4 (websites only),
  // or null for all of them.
  landingProjects: 4 | null;
  // Legal identity of the business. Shown in the Terms of Use and the Privacy
  // Policy. A null line is simply left out of the page.
  company: {
    legalName: string | null; // trade name registered at the tax office
    legalForm: { el: string; en: string } | null; // e.g. sole trader, IKE
    address: string | null; // street, number, postcode, city
    vatId: string | null; // AFM, digits only
    taxOffice: string | null; // DOY
    gemi: string | null; // GEMI number, if registered
  };
  // Facts the legal texts need. Same rule: null means the line is left out.
  legal: {
    updatedEl: string; // date the texts went up, Greek
    updatedEn: string;
    serverCountry: string | null; // where Hostinger hosts the site
    emailProvider: string | null; // who hosts info@opensite.gr
    supabaseRegion: string | null; // region of the project holding `leads`
    retentionMonths: number | null; // how long an enquiry with no project is kept
  };
}

export const siteConfig: SiteConfig = {
  phone: {
    display: "698 449 6660",
    e164: "+306984496660",
    viber: true,
    whatsapp: true,
  },
  email: "info@opensite.gr",
  social: {
    instagram: "https://www.instagram.com/open_site_/",
    facebook: "https://www.facebook.com/profile.php?id=61586307389215",
    linkedin: null, // the previous link was never confirmed
  },
  pricing: {
    websiteFrom: 1000,
    websiteWeeks: null,
    eshopFrom: 1200,
    eshopWeeks: null,
    redesignFrom: null,
    redesignWeeks: null,
    vatMode: "plus", // prices are without VAT
  },
  tracking: {
    googleAdsId: null,
    leadLabel: null,
    callLabel: null,
    chatLabel: null,
    metaPixelId: "2111724882722505",
  },
  testimonial: {
    el: "Από τον σχεδιασμό μέχρι το launch, το OpenSite δημιούργησε ένα website που αποτυπώνει την κομψότητα των ιστιοπλοϊκών μας εμπειριών και δίνει στους πελάτες μας μια διαδικασία κράτησης χωρίς εμπόδια.",
  },
  landingProjects: null,
  company: {
    legalName: "ΞΕΝΙΤΙΔΗΣ ΦΩΤΗΣ",
    legalForm: { el: "Ατομική επιχείρηση", en: "Sole proprietorship" },
    address: "Υδραγωγείου 4, Θεσσαλονίκη", // postcode not given yet
    vatId: null,
    taxOffice: null,
    gemi: null,
  },
  legal: {
    updatedEl: "9 Οκτωβρίου 2026",
    updatedEn: "9 October 2026",
    serverCountry: null,
    emailProvider: "Zoho Mail (Zoho Corporation)",
    supabaseRegion: null,
    retentionMonths: 24,
  },
};

export const phoneHref = `tel:${siteConfig.phone.e164}`;
export const viberHref = `viber://chat?number=${encodeURIComponent(siteConfig.phone.e164)}`;
export const whatsappHref = `https://wa.me/${siteConfig.phone.e164.replace("+", "")}`;
