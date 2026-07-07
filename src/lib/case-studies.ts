export interface CaseStudy {
  slug: string;
  industry: string;
  duration: string;
  title: string;
  subtitle: string;
  liveUrl: string;
  platform: string;
  image: string;
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
      "How we rebuilt a slow WordPress product into a high-performance Next.js platform — and helped it reach 45,000+ QR scans.",
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
          desc: "Built to grow with the product — new features ship without rebuilding.",
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
        text: "Lighthouse performance score — up from a WordPress baseline under 50.",
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
        "Akinita Fotiadis is an established real estate agency. Their WordPress site was lagging, visually outdated, and failed to reflect the quality and professionalism of their business — costing them potential clients before they even made contact.",
      bullets: [
        "Slow, poorly optimised WordPress site with frequent performance issues",
        "Design didn't reflect the brand's identity or build client trust",
        "Confusing user flow with no clear path from visitor to inquiry",
      ],
    },
    solution: {
      description:
        "We designed and built a new site in Webflow that puts the brand front and centre — clean, professional, and built to guide visitors toward making contact. Fully responsive and significantly faster than the previous WordPress setup.",
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
        text: "Fully responsive across all screen sizes — something the old site failed to deliver.",
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
        "Adonis Sail Yachts has been operating since 2000, offering yacht charters across Greece. Their WordPress site had a poor user experience, unclear booking flow, and slow performance — failing to convert the sailing interest of visitors into actual charter inquiries.",
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
          desc: "Fully responsive — most charter research happens on mobile.",
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
        text: "Responsive across all devices — critical for a travel and tourism audience.",
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
