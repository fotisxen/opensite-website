export interface CaseStudy {
  slug: string;
  industry: string;
  duration: string;
  title: string;
  subtitle: string;
  liveUrl?: string; // omitted for private projects (e.g. an internal intranet)
  platform: string;
  image: string;
  imageFit?: "contain"; // for wide brand artwork that should not be cropped
  heroMetrics: { value: string; label: string }[];
  problem: {
    description: string;
    bullets: string[];
  };
  solution: {
    description: string;
    highlights: { title: string; desc: string }[];
  };
  impact: {
    icon: string;
    iconWrap: string;
    iconColor: string;
    value: string;
    text: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "one-menoo",
    industry: "Hospitality Tech",
    duration: "Custom Build",
    title: "OneMenoo",
    subtitle:
      "How we rebuilt a slow WordPress product into a high-performance Next.js platform, and helped it reach 45,000+ QR scans.",
    liveUrl: "https://onemenoo.com/en",
    platform: "Next.js",
    image: "https://onemenoo.com/images/onemenoo-social.jpg",
    heroMetrics: [
      { value: "45,000+", label: "QR Scans" },
      { value: "1,500+", label: "AI Messages Sent" },
      { value: "Next.js", label: "Platform" },
      { value: "100%", label: "Custom Build" },
    ],
    problem: {
      description:
        "OneMenoo is an AI-powered QR menu platform for restaurants. Their WordPress site was too slow for a modern SaaS product, had poor SEO scores, and couldn't handle the scale of a growing user base.",
      bullets: [
        "Slow page loads damaging Google ranking and first impressions",
        "WordPress architecture not suited for a dynamic AI product",
        "No scalable foundation for new features and integrations",
      ],
    },
    solution: {
      description:
        "We rebuilt the entire platform from scratch in Next.js with a custom architecture optimised for performance, SEO, and scalability. The new site loads in under 2 seconds and scores 90+ on Lighthouse.",
      highlights: [
        {
          title: "Performance First",
          desc: "Sub-2s load times and 90+ Lighthouse scores across all pages.",
        },
        {
          title: "SEO Foundation",
          desc: "Server-side rendering, structured data, and optimised metadata from day one.",
        },
        {
          title: "Scalable Architecture",
          desc: "Built to grow with the product, new features ship without rebuilding.",
        },
        {
          title: "100% Custom",
          desc: "No page builders, no compromises. Every component built for purpose.",
        },
      ],
    },
    impact: [
      {
        icon: "qr_code_scanner",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "45,000+",
        text: "QR menu scans tracked through the platform since launch.",
      },
      {
        icon: "smart_toy",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "1,500+",
        text: "AI-powered menu interactions delivered to restaurant guests.",
      },
      {
        icon: "speed",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "90+",
        text: "Lighthouse performance score, up from a WordPress baseline under 50.",
      },
    ],
  },
  {
    slug: "akinita-fotiadis",
    industry: "Real Estate",
    duration: "Webflow Build",
    title: "Akinita Fotiadis",
    subtitle:
      "How we transformed a lagging, poorly designed WordPress site into a fast, conversion-focused Webflow presence that truly reflects the brand.",
    liveUrl: "https://akinita-fotiadis-98.webflow.io",
    platform: "Webflow",
    image:
      "https://cdn.prod.website-files.com/66d58e4d00041d88f5505eaf/66e71eb023b4a639865ea9cb_graph-image-1.avif",
    heroMetrics: [
      { value: "Webflow", label: "Platform" },
      { value: "100%", label: "Responsive" },
      { value: "Fast", label: "Load Speed" },
      { value: "New", label: "Brand Identity" },
    ],
    problem: {
      description:
        "Akinita Fotiadis is an established real estate agency. Their WordPress site was lagging, visually outdated, and failed to reflect the quality and professionalism of their business, costing them potential clients before they even made contact.",
      bullets: [
        "Slow, poorly optimised WordPress site with frequent performance issues",
        "Design didn't reflect the brand's identity or build client trust",
        "Confusing user flow with no clear path from visitor to inquiry",
      ],
    },
    solution: {
      description:
        "We designed and built a new site in Webflow that puts the brand front and centre, clean, professional, and built to guide visitors toward making contact. Fully responsive and significantly faster than the previous WordPress setup.",
      highlights: [
        {
          title: "Brand-Led Design",
          desc: "Every visual decision reflects the agency's identity and builds immediate trust.",
        },
        {
          title: "Clear User Flow",
          desc: "Structured journeys that guide visitors from discovery to inquiry naturally.",
        },
        {
          title: "Responsive",
          desc: "Pixel-perfect across mobile, tablet, and desktop.",
        },
        {
          title: "Added Functionality",
          desc: "New features including property listings, contact forms, and interactive sections.",
        },
      ],
    },
    impact: [
      {
        icon: "phone_in_talk",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "↑ Inquiries",
        text: "Cleaner user flow drives more visitors to make direct contact with the agency.",
      },
      {
        icon: "devices",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "100%",
        text: "Fully responsive across all screen sizes, something the old site failed to deliver.",
      },
      {
        icon: "speed",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "Fast",
        text: "Significantly faster load times versus the previous WordPress site.",
      },
    ],
  },
  {
    slug: "adonis-sail-yachts",
    industry: "Yacht & Marine Tourism",
    duration: "Webflow Build",
    title: "Adonis Sail Yachts",
    subtitle:
      "How we redesigned a poor-performing WordPress site into an immersive Webflow experience that converts sailing enthusiasts into charter clients.",
    liveUrl: "https://adonis-sail-yachts.webflow.io",
    platform: "Webflow",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    heroMetrics: [
      { value: "Webflow", label: "Platform" },
      { value: "100%", label: "Responsive" },
      { value: "Est. 2000", label: "Client Since" },
      { value: "New UX", label: "User Flow" },
    ],
    problem: {
      description:
        "Adonis Sail Yachts has been operating since 2000, offering yacht charters across Greece. Their WordPress site had a poor user experience, unclear booking flow, and slow performance, failing to convert the sailing interest of visitors into actual charter inquiries.",
      bullets: [
        "Slow WordPress site losing visitors before they reached the booking section",
        "Poor UX with no clear path from interest to charter inquiry",
        "Design didn't communicate the quality and experience of the sailing product",
      ],
    },
    solution: {
      description:
        "We rebuilt the site in Webflow with an immersive, visual-first design that puts the sailing experience at the forefront. The new user flow naturally guides visitors from discovering the yachts to submitting a charter inquiry.",
      highlights: [
        {
          title: "Immersive Design",
          desc: "Visual storytelling that communicates the quality of the sailing experience.",
        },
        {
          title: "Booking-Optimised Flow",
          desc: "Clear CTAs and streamlined inquiry paths from every section of the site.",
        },
        {
          title: "Mobile First",
          desc: "Fully responsive, most charter research happens on mobile.",
        },
        {
          title: "Fast & Reliable",
          desc: "Webflow hosting ensures consistent performance with no WordPress overhead.",
        },
      ],
    },
    impact: [
      {
        icon: "sailing",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "New UX",
        text: "Complete redesign of the user journey from discovery to charter inquiry.",
      },
      {
        icon: "devices",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "100%",
        text: "Responsive across all devices, critical for a travel and tourism audience.",
      },
      {
        icon: "speed",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "Faster",
        text: "Significant load time improvement over the previous WordPress setup.",
      },
    ],
  },
  {
    slug: "df-real-estate",
    industry: "Real Estate",
    duration: "Custom Build",
    title: "DF Real Estate",
    subtitle:
      "How we built a bilingual property listings platform from scratch, a fast, SEO-ready Next.js site on a Supabase backend, wired straight into the Spitogatos portal feed.",
    liveUrl: "https://df-real-estate.com",
    platform: "Next.js",
    image:
      "https://xdyiitwokwufavirmqdd.supabase.co/storage/v1/object/public/property-images/cf5b99e0-8746-45c2-9630-e15cbad2d25c/1785920961215-10.webp",
    heroMetrics: [
      { value: "Next.js", label: "Platform" },
      { value: "Supabase", label: "Backend" },
      { value: "Custom", label: "Full Build" },
      { value: "Spitogatos", label: "Feed Integration" },
    ],
    problem: {
      description:
        "DF Real Estate needed a listings platform that could go live without page-builder overhead, fast, SEO-ready pages for every property, bilingual content, and a direct feed into the Spitogatos portal, all without a developer in the loop for routine updates.",
      bullets: [
        "No existing site, needed a complete build from the ground up",
        "Every listing needed its own SEO-optimised page with structured data",
        "Needed to syndicate listings to the Spitogatos portal automatically",
      ],
    },
    solution: {
      description:
        "We built the entire platform in Next.js with Supabase as the backend, Postgres for property data, Storage for photos, and Auth to protect the admin side. Every listing gets a dedicated page with schema.org JSON-LD, and the sitemap regenerates automatically as listings change.",
      highlights: [
        {
          title: "SEO by Default",
          desc: "Per-listing metadata, structured data, and auto-generated sitemaps.",
        },
        {
          title: "Spitogatos Feed",
          desc: "A live XML feed keeps the Spitogatos portal in sync with the site.",
        },
        {
          title: "Supabase Backend",
          desc: "Postgres, Storage, and Auth handle data, photos, and access control.",
        },
        {
          title: "Bilingual",
          desc: "Content and UI built to serve Greek-speaking clients end to end.",
        },
      ],
    },
    impact: [
      {
        icon: "language",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "Next.js",
        text: "A full custom build replacing the need for a page builder or template site.",
      },
      {
        icon: "sync",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "Spitogatos",
        text: "Listings sync automatically to the Spitogatos portal via a live XML feed.",
      },
      {
        icon: "search",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "SEO-Ready",
        text: "Every property page ships with structured data and metadata out of the box.",
      },
    ],
  },
  {
    slug: "df-real-estate-crm",
    industry: "Real Estate",
    duration: "Custom Build",
    title: "DF Real Estate CRM",
    subtitle:
      "The first CRM I built end to end, a private admin panel that lets the agency manage listings and clients themselves, secured with Supabase Auth and Row Level Security.",
    liveUrl: "https://df-real-estate.com/admin/login",
    platform: "Next.js + Supabase",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    heroMetrics: [
      { value: "Custom", label: "Built From Scratch" },
      { value: "Supabase", label: "Auth + RLS" },
      { value: "Custom", label: "CRM Built" },
      { value: "Private", label: "Client Pipeline" },
    ],
    problem: {
      description:
        "Beyond the public site, the agency needed a way to run the business day-to-day, adding and editing listings, uploading photos, and keeping track of client inquiries, without calling a developer for every change, and without exposing any of it publicly.",
      bullets: [
        "No self-serve way to add, edit, or take down property listings",
        "Client and lead information had nowhere secure to live",
        "Needed strict access control, staff-only, no public sign-up",
      ],
    },
    solution: {
      description:
        "I designed and built a protected admin panel from the ground up, my first full CRM build. It covers property and photo management, plus a private client table locked down with Postgres Row Level Security, behind an authenticated login gate with no public sign-up path.",
      highlights: [
        {
          title: "Property Management",
          desc: "Full create/edit/delete flow for listings and their photos.",
        },
        {
          title: "Private Client Pipeline",
          desc: "A clients table only authenticated staff can ever see, enforced by RLS.",
        },
        {
          title: "Locked-Down Access",
          desc: "Auth-gated /admin route, no public sign-up, invite-only accounts.",
        },
        {
          title: "Built From Scratch",
          desc: "No CRM template or third-party platform, a fully custom system.",
        },
      ],
    },
    impact: [
      {
        icon: "admin_panel_settings",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "Custom",
        text: "A fully custom admin panel, not a bought-in CRM platform.",
      },
      {
        icon: "lock",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "RLS-Secured",
        text: "Row Level Security keeps client data visible only to authenticated staff.",
      },
      {
        icon: "person_add",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "First Build",
        text: "The first end-to-end CRM I've designed and shipped.",
      },
    ],
  },
  {
    slug: "starbulk-intranet",
    industry: "Enterprise Intranet",
    duration: "Enterprise Build",
    title: "Starbulk Intranet",
    subtitle:
      "A modern company intranet for Star Bulk, a global dry bulk shipping company, bringing internal news, tools and resources together in one secure place for employees.",
    platform: "SharePoint + SPFx",
    image: "/case-studies/starbulk-intranet.svg",
    heroMetrics: [
      { value: "Intranet", label: "Enterprise Portal" },
      { value: "SPFx", label: "Custom Web Parts" },
      { value: "Private", label: "Staff Access Only" },
      { value: "Global", label: "Shipping Company" },
    ],
    problem: {
      description:
        "A shipping company with people across offices and vessels needs one dependable place for internal information. Scattered tools, documents and announcements make everyday work slower than it should be.",
      bullets: [
        "Company information and tools spread across many places",
        "Internal news and resources hard to find",
        "Needed a secure, staff-only experience that fits the company's existing Microsoft environment",
      ],
    },
    solution: {
      description:
        "We built the intranet on SharePoint, extended with custom SharePoint Framework (SPFx) web parts, so employees get a clean, branded home page and the tools they need, inside the Microsoft 365 setup the company already uses.",
      highlights: [
        {
          title: "Custom SPFx Web Parts",
          desc: "Purpose-built components instead of one-size-fits-all SharePoint defaults.",
        },
        {
          title: "Branded Experience",
          desc: "A modern, consistent look that feels like the company, not a template.",
        },
        {
          title: "Secure by Design",
          desc: "Staff-only access that inherits the company's existing Microsoft sign-in and permissions.",
        },
        {
          title: "Easy to Maintain",
          desc: "Content owners update pages themselves, without calling a developer.",
        },
      ],
    },
    impact: [
      {
        icon: "hub",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "One Hub",
        text: "Company information and tools in a single, easy-to-find home.",
      },
      {
        icon: "extension",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "SPFx",
        text: "Custom web parts built for how the company actually works.",
      },
      {
        icon: "lock",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "Enterprise-Grade",
        text: "Built inside Microsoft 365, with the security the company already trusts.",
      },
    ],
  },
  {
    slug: "hoopstruct",
    industry: "SaaS Product",
    duration: "Our Own Product",
    title: "HoopStruct",
    subtitle:
      "Our first product: basketball analytics that turns a box score into real advanced stats and scouting reports, shipped as a website, two desktop apps and two mobile apps.",
    liveUrl: "https://hoopstruct.com",
    platform: "Next.js + Electron + React Native",
    image: "/case-studies/hoopstruct.png",
    imageFit: "contain",
    heroMetrics: [
      { value: "5", label: "Website + 4 Apps" },
      { value: "Win + Mac", label: "Desktop Apps" },
      { value: "iOS + Android", label: "Mobile Apps" },
      { value: "In-house", label: "Our Own Product" },
    ],
    problem: {
      description:
        "Coaches and analysts rarely get real advanced statistics from a simple box score. Deep analytics usually means expensive software or a stats company, and the insight never reaches the players.",
      bullets: [
        "Box scores stop at basic numbers, with no real advanced metrics",
        "Entering game data by hand is slow",
        "Scouting insight rarely reaches the players themselves",
      ],
    },
    solution: {
      description:
        "We designed and built HoopStruct end to end: a marketing website, a desktop app for Windows and macOS where coaches analyse games, and a companion mobile app for iOS and Android where players read the latest scouting report.",
      highlights: [
        {
          title: "Three Ways In",
          desc: "Snap a photo of a box score (AI reads it), import play-by-play data, or type it in.",
        },
        {
          title: "Real Advanced Stats",
          desc: "PIR, PER, PIE, Four Factors and a from-scratch Impact Rating, not a handful of token numbers.",
        },
        {
          title: "Scouting Reports",
          desc: "Strengths, weaknesses and how to beat a team, generated from the data.",
        },
        {
          title: "Desktop and Mobile",
          desc: "Windows and macOS apps for coaches, iOS and Android apps for players, one shared cloud backend.",
        },
      ],
    },
    impact: [
      {
        icon: "devices",
        iconWrap: "bg-primary/10",
        iconColor: "text-primary",
        value: "4 Apps",
        text: "Two desktop apps and two mobile apps, plus the website, all built in-house.",
      },
      {
        icon: "rocket_launch",
        iconWrap: "bg-secondary/10",
        iconColor: "text-secondary",
        value: "Our Product",
        text: "Our first own product, built the same way we build for clients.",
      },
      {
        icon: "monitoring",
        iconWrap: "bg-tertiary/10",
        iconColor: "text-tertiary",
        value: "Pro-Level",
        text: "Analytics depth that normally takes expensive software or a stats company.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
