"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "E-commerce Store",
    brief: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name and email before sending.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@opensite.gr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_type: formData.businessType,
          message: formData.brief,
          _subject: `New project inquiry from ${formData.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch (err) {
      console.error("[contact-form] submit error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong sending your message."
      );
    }
  }

  return (
    <>
      <div className="mx-auto max-w-container-max px-margin-mobile pb-20 pt-12 md:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <FadeIn className="space-y-stack-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-container/20 bg-primary-container/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="font-label-sm text-label-sm tracking-wide text-primary">
                AVAILABLE FOR NEW PROJECTS
              </span>
            </div>
            <h1 className="gradient-text font-display-lg text-display-lg-mobile leading-[1.1] md:text-display-lg">
              Let&apos;s build something great together
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-text-secondary">
              Whether you&apos;re starting from scratch or scaling an existing
              product, we bring the technical expertise and design precision your
              project deserves.{" "}
              <span className="font-semibold text-text-primary">
                We respond within 24 hours.
              </span>
            </p>
            <div className="space-y-6 pt-8">
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-border bg-surface-card transition-colors group-hover:border-primary-container">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@opensite.gr"
                    className="font-headline-sm text-headline-sm text-text-primary transition-colors hover:text-primary"
                  >
                    info@opensite.gr
                  </a>
                </div>
              </div>
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-border bg-surface-card transition-colors group-hover:border-primary-container">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm uppercase tracking-wider text-text-secondary">
                    Call Directly
                  </p>
                  <a
                    href="tel:+306984496660"
                    className="font-headline-sm text-headline-sm text-text-primary transition-colors hover:text-primary"
                  >
                    +30 6984 49 6660
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-16">
              <p className="mb-8 font-label-md text-label-md text-text-secondary">
                TRUSTED BY BUSINESSES IN GREECE
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
                {[24, 32, 20, 28].map((w) => (
                  <div
                    key={w}
                    className="h-8 rounded bg-text-secondary/20"
                    style={{ width: `${w * 4}px` }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <div className="glass-card relative overflow-hidden rounded-3xl p-stack-lg md:p-12">
              <div className="absolute -mt-20 -mr-20 top-0 right-0 h-64 w-64 rounded-full bg-primary-container/10 blur-[100px]" />

              {status === "success" ? (
                <div className="relative z-10 space-y-4 py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container/20">
                    <span className="material-symbols-outlined text-secondary text-[32px]">
                      check_circle
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary">
                    Thank you for your submission!
                  </h3>
                  <p className="mx-auto max-w-sm font-body-md text-body-md text-text-secondary">
                    We&apos;ve received your project brief and will get back to you at{" "}
                    <strong className="text-text-primary">{formData.email}</strong> within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form className="relative z-10 space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 font-label-md text-label-md text-text-secondary">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container"
                        placeholder="John Doe"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 font-label-md text-label-md text-text-secondary">
                        Email Address
                      </label>
                      <input
                        className="w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container"
                        placeholder="john@company.com"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 font-label-md text-label-md text-text-secondary">
                      Business Type
                    </label>
                    <select
                      className="w-full appearance-none rounded-xl border border-surface-border bg-background/50 px-4 py-3 text-text-secondary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                    >
                      <option>E-commerce Store</option>
                      <option>SaaS Platform</option>
                      <option>Corporate Website</option>
                      <option>Custom Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 font-label-md text-label-md text-text-secondary">
                      Project Brief
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container"
                      placeholder="Tell us about your goals, timeline, and requirements..."
                      rows={5}
                      name="brief"
                      value={formData.brief}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary-container py-4 font-headline-sm text-headline-sm text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Start Your Project"}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p
                    className={`text-center font-body-sm text-body-sm ${
                      status === "error" ? "text-error" : "text-text-secondary"
                    }`}
                  >
                    {status === "error" ? (
                      errorMessage
                    ) : (
                      <>
                        By submitting, you agree to our{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>

        <section className="mt-32 border-t border-surface-border pt-32">
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              { icon: "auto_awesome", title: "Technical Excellence", text: "We leverage the latest stack—Next.js, Tailwind, and Node—to deliver high-performance solutions." },
              { icon: "architecture", title: "Bespoke Design", text: "No templates. Every interface is handcrafted to reflect your unique brand identity." },
              { icon: "rocket_launch", title: "Growth Centered", text: "We build conversion engines that drive real business results in the Greek market." },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="glass-card group rounded-2xl p-8 transition-all hover:border-primary-container/50"
              >
                <span className="material-symbols-outlined mb-4 text-primary text-[40px]">
                  {item.icon}
                </span>
                <h3 className="mb-2 font-headline-sm text-headline-sm">{item.title}</h3>
                <p className="font-body-sm text-text-secondary">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </div>
    </>
  );
}