"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { fbq } from "@/lib/pixel";
import { useEffect } from "react";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCguJXOrGXIWYbUOU10hevnZIRSB6Ni0nqd94bHVpYibkVJvUYjjqVpomk4a5MdS3QA4gz5cj0CHQlh6nbJt9OuBqelcrjpO9-O_KVURKMDE_lqe_rF4mSwEgItE7OqlDLNSFHKAHrSSA0ecUJ-bT76RWNo1-iVZJvzucfOfBPaCJELjamWaM1H7Jx1eXjSbuex3jQ8W380xXoT3KC06iz3o0viO60Y9uJZTCZoj-ckbYTx_FiqxuQfDR7dFU-0pVuC6R_rgkBdl0U";

type FormStatus = "idle" | "sending" | "success" | "error";

export function HomePage() {
  useEffect(() => {
    fbq("ViewContent", { content_name: "Home Page" });
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "E-commerce",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name and email before sending.");
      return;
    }
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@opensite.gr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            business_type: formData.businessType,
            message: formData.message,
            _subject: `New project inquiry from ${formData.name}`,
          }),
        },
      );
      if (!response.ok) throw new Error(`Status ${response.status}`);
      fbq("Lead", {
        content_name: "Home Page Form",
        content_category: "Agency Lead",
      });
      setStatus("success");
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      setFormData({
        name: "",
        email: "",
        businessType: "E-commerce",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong — please try again.");
    }
  };

  return (
    <>
      <section className="relative flex min-h-[921px] items-center overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-1 items-center gap-gutter px-margin-mobile py-stack-lg md:px-margin-desktop lg:grid-cols-2">
          <FadeIn className="space-y-stack-lg">
            <h1 className="font-display-lg text-display-lg-mobile leading-tight text-text-primary md:text-display-lg">
              We build websites and e-shops that{" "}
              <span className="text-primary-container">
                turn visitors into customers
              </span>
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-text-secondary">
              Modern digital solutions designed for real business growth, not
              just appearance. We combine technical excellence with marketing
              psychology.
            </p>
            <div className="flex flex-wrap gap-4 pt-stack-md">
              <Link
                href="/book-a-call/"
                className="rounded-xl bg-primary-container px-8 py-4 font-label-md text-white transition-transform hover:scale-105"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/case-studies/"
                className="rounded-xl border border-surface-border bg-surface-container-low px-8 py-4 font-label-md text-text-primary transition-colors hover:bg-surface-container-high"
              >
                View Our Work
              </Link>
            </div>
          </FadeIn>
          <FadeIn
            delay={0.15}
            direction="left"
            className="relative hidden lg:block"
          >
            <div className="glass-card rotate-2 transform rounded-[16px] p-4 shadow-2xl transition-transform duration-500 hover:rotate-0">
              <Image
                src={heroImage}
                alt="Premium software dashboard mockup"
                width={640}
                height={480}
                className="h-auto w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="glass-card absolute -bottom-6 -left-6 rounded-xl border border-primary-container/30 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-secondary">
                  trending_up
                </span>
                <div>
                  <div className="font-label-sm text-xs text-text-secondary">
                    Tailored Solutions
                  </div>
                  <div className="text-xl font-bold text-text-primary">
                    100%
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-container-lowest py-10">
        <FadeIn className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-wrap items-center justify-between gap-gutter opacity-60 grayscale transition-all duration-500 hover:grayscale-0">
            {[
              ["code", "Web Development"],
              ["shopping_cart", "E-shops"],
              ["smartphone", "Mobile Apps"],
              ["search", "SEO Strategy"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-2 font-headline-sm text-text-primary"
              >
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-text-primary">
              Most websites don&apos;t bring customers —{" "}
              <span className="text-primary-container">we fix that</span>
            </h2>
            <p className="font-body-lg text-body-lg text-text-secondary">
              Is your digital presence an asset or a liability?
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              {
                icon: "person_cancel",
                title: "Poor Conversion",
                text: "Visitors land on your page but leave without taking action. You're leaving money on the table every single day.",
              },
              {
                icon: "search_off",
                title: "No SEO Presence",
                text: "Your business is invisible on Google. If customers can't find you, they'll find your competitors instead.",
              },
              {
                icon: "heart_broken",
                title: "Weak UX",
                text: "A confusing interface frustrates users. We transform complex flows into intuitive, friction-free journeys.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="group rounded-[16px] border border-surface-border bg-surface-card p-8 transition-colors hover:border-error/50"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-error">
                  {item.icon}
                </span>
                <h3 className="mb-3 font-headline-sm text-headline-sm text-text-primary">
                  {item.title}
                </h3>
                <p className="font-body-md text-text-secondary">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16 max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-text-primary">
              Services focused on your{" "}
              <span className="text-secondary">bottom line</span>
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-text-secondary">
              We don&apos;t just build features; we build revenue-generating
              engines tailored to your specific industry needs.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "language",
                iconClass: "bg-primary/10 text-primary",
                title: "Websites",
                text: "High-performance corporate sites that establish authority and capture leads.",
              },
              {
                icon: "store",
                iconClass: "bg-secondary/10 text-secondary",
                title: "E-commerce",
                text: "Full-scale online stores optimized for maximum average order value and retention.",
              },
              {
                icon: "devices",
                iconClass: "bg-tertiary/10 text-tertiary",
                title: "Mobile Apps",
                text: "Native and cross-platform apps designed to keep your customers engaged on the go.",
              },
              {
                icon: "rocket_launch",
                iconClass: "bg-primary-container/10 text-primary-container",
                title: "SEO Strategy",
                text: "Data-driven optimization to dominate search results and attract organic traffic.",
              },
            ].map((s) => (
              <StaggerItem
                key={s.title}
                className="rounded-[16px] border border-surface-border bg-surface-card p-8 transition-all hover:bg-surface-container-high"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${s.iconClass}`}
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="mb-2 font-headline-sm text-headline-sm text-text-primary">
                  {s.title}
                </h3>
                <p className="font-body-sm text-text-secondary">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16 text-center">
            <h2 className="font-headline-lg text-headline-lg text-text-primary">
              Success stories driven by{" "}
              <span className="text-primary-container">metrics</span>
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {[
              {
                img: "https://onemenoo.com/images/onemenoo-social.jpg",
                tag: "Hospitality Tech",
                tagClass: "bg-primary/10 text-primary",
                title: "OneMenoo",
                desc: "WordPress was too slow for a modern AI product. We rebuilt it in Next.js with a custom architecture — faster, SEO-optimised, and built to scale.",
                metric: "45,000+",
                sub: "QR scans in the first 6 months",
                href: "/case-studies/one-menoo/",
              },
              {
                img: "https://cdn.prod.website-files.com/66d58e4d00041d88f5505eaf/66e71eb023b4a639865ea9cb_graph-image-1.avif",
                tag: "Yacht & Marine Tourism",
                tagClass: "bg-tertiary/10 text-tertiary",
                title: "Adonis Sail Yachts",
                desc: "A slow, poorly structured WordPress site was losing potential charter clients. We redesigned it in Webflow — clean UX, fast load, seamless booking flow.",
                metric: "100%",
                sub: "Responsive across all devices",
                href: "/case-studies/akinita-fotiadis/",
              },
            ].map((c) => (
              <StaggerItem
                key={c.title}
                className="flex flex-col overflow-hidden rounded-[16px] border border-surface-border bg-surface-card md:flex-row"
              >
                <div className="h-64 overflow-hidden md:h-auto md:w-1/2">
                  <Image
                    src={c.img}
                    alt={c.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between p-8 md:w-1/2">
                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-label-sm ${c.tagClass}`}
                    >
                      {c.tag}
                    </span>
                    <h3 className="mt-4 mb-2 font-headline-sm text-headline-sm text-text-primary">
                      {c.title}
                    </h3>
                    <p className="mb-4 text-sm text-text-secondary">{c.desc}</p>
                    <div className="rounded-lg bg-surface-container-low p-4">
                      <div className="text-2xl font-bold text-secondary">
                        {c.metric}
                      </div>
                      <div className="text-xs text-text-secondary">{c.sub}</div>
                    </div>
                  </div>
                  <Link
                    href={c.href}
                    className="mt-6 flex items-center gap-2 font-label-md text-primary transition-all hover:gap-3"
                  >
                    View Case Study
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <h2 className="mb-8 font-headline-lg text-headline-lg text-text-primary">
                Why forward-thinking brands choose{" "}
                <span className="text-primary-container">OpenSite</span>
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: "trending_up",
                    iconClass: "bg-primary/10 text-primary",
                    title: "Business-First Mentality",
                    text: "We don't build features; we build business solutions. Every pixel and line of code is measured against your KPIs.",
                  },
                  {
                    icon: "speed",
                    iconClass: "bg-secondary/10 text-secondary",
                    title: "Fast Delivery",
                    text: "Our agile process ensures you get to market faster without sacrificing the quality of the final product.",
                  },
                  {
                    icon: "psychology",
                    iconClass: "bg-tertiary/10 text-tertiary",
                    title: "Custom Solutions",
                    text: "No templates. We build bespoke systems that reflect your unique brand identity and operational needs.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                    >
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="mb-2 font-headline-sm text-headline-sm text-text-primary">
                        {item.title}
                      </h4>
                      <p className="text-text-secondary">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -inset-4 aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[16px] border border-surface-border bg-surface-card p-12">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-[120px]">
                      verified
                    </span>
                  </div>
                  <div className="mb-4 text-5xl font-bold text-text-primary">
                    100%
                  </div>
                  <div className="mb-8 text-xl text-text-secondary">
                    Client retention rate based on successful business outcomes
                    and continued support.
                  </div>
                  <div className="border-t border-surface-border pt-8">
                    <div className="font-label-md text-sm text-text-primary italic">
                      &ldquo;From design to launch, OpenSite created a website
                      that captures the elegance of our sailing experiences
                      while providing a seamless booking journey for our
                      clients.&rdquo;
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-surface-container-high" />
                      <div>
                        <div className="text-sm font-bold text-text-primary">
                          T. Markas
                        </div>
                        <div className="text-xs text-text-secondary">
                          Co-Owner – Yacht Charter & Sailing Experiences, Adonis
                          Sail Yachts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-background py-24" id="contact">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn>
            <div className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-surface-border bg-surface-card shadow-2xl lg:grid-cols-2">
              <div className="flex flex-col justify-between bg-primary-container p-12 text-white">
                <div>
                  <h2 className="mb-6 font-display-lg text-headline-lg leading-tight">
                    Let&apos;s build your next digital project
                  </h2>
                  <p className="font-body-lg opacity-90">
                    Ready to scale? Share your project details and get a
                    customized proposal within 24 hours.
                  </p>
                </div>
                <div className="mt-12 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined">mail</span>
                    <span>info@opensite.gr</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    <span>Thessaloniki, Greece / Global Remote</span>
                  </div>
                </div>
              </div>
              <div className="p-12">
                {status === "success" ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <span className="material-symbols-outlined text-5xl text-primary">
                      check_circle
                    </span>
                    <h3 className="font-headline-sm text-xl font-bold text-text-primary">
                      Message sent!
                    </h3>
                    <p className="text-text-secondary">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 rounded-xl border border-surface-border px-6 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-container"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-label-md text-sm text-text-secondary">
                          Full Name
                        </label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-surface-border bg-background p-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                          placeholder="John Doe"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-label-md text-sm text-text-secondary">
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-surface-border bg-background p-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                          placeholder="john@company.com"
                          type="email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block font-label-md text-sm text-text-secondary">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-surface-border bg-background p-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                      >
                        <option>E-commerce</option>
                        <option>SaaS / Tech</option>
                        <option>Service Business</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block font-label-md text-sm text-text-secondary">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-surface-border bg-background p-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                        placeholder="Tell us about your goals..."
                        rows={4}
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-error">
                        {errorMessage ||
                          "Something went wrong — please try again."}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-xl bg-primary-container py-4 font-label-md text-white shadow-lg shadow-primary-container/20 transition-all hover:opacity-90 disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Get Proposal"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
