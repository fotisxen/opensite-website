"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "./site.config";

// Nothing from Google or Meta loads before the visitor presses "Accept".
// Lead source (utm_*) reaches the lead email without any cookies; click ids
// (gclid, gbraid, wbraid) are only included after consent.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/* ------------------------------ consent ------------------------------ */

const CONSENT_KEY = "os_consent";
const CONSENT_DATE_KEY = "os_consent_date";
const CONSENT_VERSION_KEY = "os_consent_v";
const CONSENT_MAX_AGE_DAYS = 180;
// Bump this when the banner text or what "Accept" covers changes, so a choice
// made under the old wording is asked again.
const CONSENT_VERSION = 2;

export type Consent = "granted" | "denied";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw !== "granted" && raw !== "denied") return null;
    if (Number(localStorage.getItem(CONSENT_VERSION_KEY)) !== CONSENT_VERSION) return null;
    const at = Date.parse(localStorage.getItem(CONSENT_DATE_KEY) ?? "");
    if (Number.isNaN(at)) return null;
    const ageDays = (Date.now() - at) / 86_400_000;
    return ageDays > CONSENT_MAX_AGE_DAYS ? null : raw;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
    localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
    localStorage.setItem(CONSENT_VERSION_KEY, String(CONSENT_VERSION));
  } catch {
    // storage unavailable: the choice just won't persist
  }
  if (value === "granted") {
    loadTags();
    setBannerOpen(false);
    return;
  }
  setBannerOpen(false);
  revokeTags();
}

// Cookies the two tools set: _fbp, _fbc and everything starting with _gcl.
function isTrackingCookie(name: string) {
  return name === "_fbp" || name === "_fbc" || name.startsWith("_gcl");
}

function clearTrackingCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  // host itself plus every parent domain, e.g. www.opensite.gr, opensite.gr
  const domains = [host];
  for (let i = 1; i < parts.length - 1; i++) domains.push(parts.slice(i).join("."));
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name || !isTrackingCookie(name)) continue;
    const expire = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = name + expire;
    for (const d of domains) {
      document.cookie = `${name}${expire}; domain=${d}`;
      document.cookie = `${name}${expire}; domain=.${d}`;
    }
  }
}

// "Decline" after "Accept": switch the tools off, remove their cookies, and
// reload so nothing that was already loaded keeps running.
function revokeTags() {
  if (typeof window === "undefined") return;
  const wasLoaded = loaded;
  if (wasLoaded) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
    if (typeof window.fbq === "function") window.fbq("consent", "revoke");
  }
  clearTrackingCookies();
  if (wasLoaded) window.location.reload();
}

/* ------------------------- banner visibility ------------------------- */

// The banner and the sticky bar both need to know whether the banner is open.
let bannerOpen = false;
const listeners = new Set<() => void>();

export function setBannerOpen(open: boolean) {
  if (bannerOpen === open) return;
  bannerOpen = open;
  listeners.forEach((l) => l());
}

export function openConsentBanner() {
  setBannerOpen(true);
}

export function useBannerOpen() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => bannerOpen,
    () => false,
  );
}

/* ------------------------------- tags -------------------------------- */

let loaded = false;

export function loadTags() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const { googleAdsId, metaPixelId } = siteConfig.tracking;

  if (googleAdsId) {
    window.dataLayer = window.dataLayer || [];
    // gtag.js expects the `arguments` object, not an array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    // The Google tag is only used to count conversions: no personalised
    // ads and no analytics, so those two stay denied.
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", googleAdsId);
  }

  if (metaPixelId) {
    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        const n = fbq as unknown as {
          callMethod?: (...a: unknown[]) => void;
          queue: unknown[];
        };
        if (n.callMethod) n.callMethod(...args);
        else n.queue.push(args);
      } as unknown as Window["fbq"] & {
        push: unknown;
        loaded: boolean;
        version: string;
        queue: unknown[];
      };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const first = document.getElementsByTagName("script")[0];
      first?.parentNode?.insertBefore(t, first) ?? document.head.appendChild(t);
    }
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }
}

/* ------------------------------ events ------------------------------- */

function sendConversion(label: string | null) {
  const { googleAdsId } = siteConfig.tracking;
  if (!loaded || !googleAdsId || !label) return;
  window.gtag("event", "conversion", { send_to: `${googleAdsId}/${label}` });
}

function sendMeta(event: "Lead" | "Contact") {
  if (loaded && typeof window.fbq === "function") window.fbq("track", event);
}

export function trackLead() {
  sendConversion(siteConfig.tracking.leadLabel);
  sendMeta("Lead");
}

export function trackCall() {
  sendConversion(siteConfig.tracking.callLabel);
  sendMeta("Contact");
}

export function trackChat() {
  sendConversion(siteConfig.tracking.chatLabel);
  sendMeta("Contact");
}

/* -------------------- "lead just submitted" flag --------------------- */

// Lives in module memory, so it survives client-side navigation to the
// thank-you page but not a reload or a direct visit. That way a refresh
// never counts as a second lead.
let leadJustSubmitted = false;

export function markLeadSubmitted() {
  leadJustSubmitted = true;
}

export function consumeLeadSubmitted() {
  const value = leadJustSubmitted;
  leadJustSubmitted = false;
  return value;
}

/* ---------------------------- attribution ---------------------------- */

type Attribution = Record<string, string>;

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
];
const CLICK_IDS = ["gclid", "gbraid", "wbraid"];

let attribution: Attribution | null = null;

export function captureAttribution() {
  if (attribution || typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = { landing_page: window.location.pathname };
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  attribution = found;
}

export function getAttribution(includeClickIds: boolean): Attribution {
  const result: Attribution = { ...(attribution ?? {}) };
  if (!includeClickIds) {
    for (const key of CLICK_IDS) delete result[key];
  }
  return result;
}

export function hasConsent() {
  return getConsent() === "granted";
}
