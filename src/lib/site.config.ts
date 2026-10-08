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
    priceSuffix: string | null; // e.g. " + ΦΠΑ"
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
}

export const siteConfig: SiteConfig = {
  phone: {
    display: "698 449 6660",
    e164: "+306984496660",
    viber: null,
    whatsapp: null,
  },
  email: "info@opensite.gr",
  social: {
    instagram: "https://www.instagram.com/open_site_/",
    facebook: "https://www.facebook.com/profile.php?id=61586307389215",
    linkedin: null, // the previous link was never confirmed
  },
  pricing: {
    websiteFrom: null,
    websiteWeeks: null,
    eshopFrom: null,
    eshopWeeks: null,
    redesignFrom: null,
    redesignWeeks: null,
    priceSuffix: null,
  },
  tracking: {
    googleAdsId: null,
    leadLabel: null,
    callLabel: null,
    chatLabel: null,
    metaPixelId: "2111724882722505",
  },
  testimonial: {
    el: null,
  },
};

export const phoneHref = `tel:${siteConfig.phone.e164}`;
export const viberHref = `viber://chat?number=${encodeURIComponent(siteConfig.phone.e164)}`;
export const whatsappHref = `https://wa.me/${siteConfig.phone.e164.replace("+", "")}`;
