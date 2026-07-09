"use client";
import { CustomSelect } from "@/components/CustomSelect";
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
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
            message: formData.brief,
            _subject: `New project inquiry from ${formData.name}`,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      setStatus("success");
    } catch (err) {
      console.error("[contact-form] submit error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your message.",
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
              product, we bring the technical expertise and design precision
              your project deserves.{" "}
              <span className="font-semibold text-text-primary">
                We respond within 24 hours.
              </span>
            </p>
            <div className="space-y-6 pt-8">
              <div className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-border bg-surface-card transition-colors group-hover:border-primary-container">
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
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
                  <span className="material-symbols-outlined text-primary">
                    call
                  </span>
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
                    We&apos;ve received your project brief and will get back to
                    you at{" "}
                    <strong className="text-text-primary">
                      {formData.email}
                    </strong>{" "}
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  className="relative z-10 space-y-6"
                  onSubmit={handleSubmit}
                  noValidate
                >
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

                    <CustomSelect
                      name="businessType"
                      value={formData.businessType}
                      onChange={(val) =>
                        setFormData((p) => ({ ...p, businessType: val }))
                      }
                    />
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
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
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
        {/* <section className="mt-32 border-t border-surface-border pt-32">
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              {
                icon: "auto_awesome",
                title: "Technical Excellence",
                text: "We leverage the latest stack—Next.js, Tailwind, and Node—to deliver high-performance solutions.",
              },
              {
                icon: "architecture",
                title: "Bespoke Design",
                text: "No templates. Every interface is handcrafted to reflect your unique brand identity.",
              },
              {
                icon: "rocket_launch",
                title: "Growth Centered",
                text: "We build conversion engines that drive real business results in the Greek market.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="glass-card group rounded-2xl p-8 transition-all hover:border-primary-container/50"
              >
                <span className="material-symbols-outlined mb-4 text-primary text-[40px]">
                  {item.icon}
                </span>
                <h3 className="mb-2 font-headline-sm text-headline-sm">
                  {item.title}
                </h3>
                <p className="font-body-sm text-text-secondary">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section> */}
        {/* Replace your entire <section className="mt-24 w-full"> ... </section> block with this */}
        <section className="mt-24 w-full">
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-br from-primary-container/10 via-background to-secondary/5 px-8 py-14 md:px-14">
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-container/20 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />

            <div className="relative mx-auto max-w-5xl">
              <p className="mb-4 text-sm tracking-widest text-text-secondary uppercase">
                Our Approach
              </p>
              <h2 className="mb-10 max-w-2xl text-3xl font-bold leading-tight text-text-primary md:text-4xl">
                You don&apos;t get a team.{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  You get the people actually building your product.
                </span>
              </h2>

              {/* --- 3D glass stage --- */}
              <div className="glass-stage">
                <div className="glass-floor" />

                <div className="glass-cube" aria-hidden="true">
                  <div className="cube-face cube-front" />
                  <div className="cube-face cube-back" />
                  <div className="cube-face cube-right" />
                  <div className="cube-face cube-left" />
                  <div className="cube-face cube-top" />
                  <div className="cube-face cube-bottom" />
                </div>

                <div className="glass-cards">
                  {[
                    {
                      number: "01",
                      icon: "forum",
                      title: "Direct communication",
                      text: "No managers. No layers. You talk directly with the people building your system.",
                    },
                    {
                      number: "02",
                      icon: "build",
                      title: "Built for longevity",
                      text: "Everything is engineered for performance, scalability, and future growth.",
                    },
                    {
                      number: "03",
                      icon: "trending_up",
                      title: "Execution clarity",
                      text: "You always know what's being built, why it matters, and what comes next.",
                    },
                  ].map((c) => (
                    <div key={c.number} className="glass-shard">
                      <div className="glass-shard-inner">
                        <div className="flex items-center justify-between">
                          <span className="shard-icon material-symbols-outlined">
                            {c.icon}
                          </span>
                          <span className="shard-number">{c.number}</span>
                        </div>
                        <h3 className="shard-title">{c.title}</h3>
                        <p className="shard-text">{c.text}</p>
                        <span className="shard-arrow material-symbols-outlined">
                          arrow_forward
                        </span>
                      </div>
                      <div
                        className="glass-shard-reflection"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              .glass-stage {
                position: relative;
                padding: 48px 0 24px;
                perspective: 1400px;
              }

              .glass-floor {
                position: absolute;
                left: -20%;
                right: -20%;
                bottom: -20px;
                height: 220px;
                background-image:
                  linear-gradient(
                    rgba(180, 197, 255, 0.09) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(180, 197, 255, 0.09) 1px,
                    transparent 1px
                  );
                background-size: 44px 44px;
                transform: perspective(600px) rotateX(62deg);
                transform-origin: bottom;
                -webkit-mask-image: linear-gradient(
                  to top,
                  black,
                  transparent 75%
                );
                mask-image: linear-gradient(to top, black, transparent 75%);
                pointer-events: none;
              }

              .glass-cube {
                position: absolute;
                top: -12px;
                right: 8px;
                width: 64px;
                height: 64px;
                transform-style: preserve-3d;
                transform: rotateX(-20deg) rotateY(35deg) rotateZ(8deg);
                animation: cubeFloat 6s ease-in-out infinite;
                z-index: 3;
              }
              @keyframes cubeFloat {
                0%,
                100% {
                  transform: rotateX(-20deg) rotateY(35deg) rotateZ(8deg)
                    translateY(0px);
                }
                50% {
                  transform: rotateX(-15deg) rotateY(48deg) rotateZ(11deg)
                    translateY(-10px);
                }
              }
              .cube-face {
                position: absolute;
                width: 64px;
                height: 64px;
                background: linear-gradient(
                  135deg,
                  rgba(180, 197, 255, 0.35),
                  rgba(74, 225, 118, 0.12)
                );
                border: 1px solid rgba(180, 197, 255, 0.55);
                box-shadow: inset 0 0 18px rgba(180, 197, 255, 0.25);
              }
              .cube-front {
                transform: translateZ(32px);
              }
              .cube-back {
                transform: translateZ(-32px) rotateY(180deg);
              }
              .cube-right {
                transform: rotateY(90deg) translateZ(32px);
              }
              .cube-left {
                transform: rotateY(-90deg) translateZ(32px);
              }
              .cube-top {
                transform: rotateX(90deg) translateZ(32px);
              }
              .cube-bottom {
                transform: rotateX(-90deg) translateZ(32px);
              }

              .glass-cards {
                position: relative;
                z-index: 2;
                display: grid;
                gap: 28px;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              }

              .glass-shard {
                position: relative;
              }

              .glass-shard-inner {
                position: relative;
                padding: 28px;
                border-radius: 18px;
                background: linear-gradient(
                  160deg,
                  rgba(180, 197, 255, 0.14),
                  rgba(22, 30, 45, 0.55)
                );
                border: 1px solid rgba(180, 197, 255, 0.25);
                backdrop-filter: blur(16px);
                transform: perspective(900px) rotateX(8deg);
                transform-origin: bottom;
                box-shadow:
                  inset 0 1px 0 rgba(255, 255, 255, 0.25),
                  0 24px 40px rgba(0, 0, 0, 0.35);
                transition: transform 0.4s ease;
              }
              .glass-shard:hover .glass-shard-inner {
                transform: perspective(900px) rotateX(0deg) translateY(-4px);
              }

              .glass-shard-reflection {
                position: absolute;
                left: 4%;
                right: 4%;
                top: 100%;
                height: 56px;
                background: linear-gradient(
                  160deg,
                  rgba(180, 197, 255, 0.14),
                  rgba(22, 30, 45, 0.55)
                );
                transform: perspective(900px) rotateX(8deg) scaleY(-1);
                transform-origin: top;
                opacity: 0.22;
                border-radius: 18px;
                -webkit-mask-image: linear-gradient(
                  to bottom,
                  black,
                  transparent
                );
                mask-image: linear-gradient(to bottom, black, transparent);
                pointer-events: none;
              }

              .shard-icon {
                font-size: 26px;
                color: #b4c5ff;
              }
              .shard-number {
                font-size: 13px;
                color: rgba(220, 226, 246, 0.4);
              }
              .shard-title {
                margin-top: 14px;
                font-size: 17px;
                font-weight: 600;
                color: #f8fafc;
              }
              .shard-text {
                margin-top: 8px;
                font-size: 13px;
                line-height: 1.6;
                color: #94a3b8;
              }
              .shard-arrow {
                display: inline-block;
                margin-top: 16px;
                font-size: 18px;
                color: #b4c5ff;
              }
            `}</style>
          </div>
        </section>
      </div>
    </>
  );
}
