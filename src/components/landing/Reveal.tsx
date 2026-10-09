"use client";

import { useEffect, useRef } from "react";

// Small scroll reveal for the sections below the first screen. Plain CSS
// transition plus an IntersectionObserver, so the landing pages do not need
// the animation library. Content is visible in the server HTML and only
// hidden after hydration, and only if it is still below the fold.
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // With a [data-stagger] list inside, the cards come in one by one and the
    // wrapper itself stays put; otherwise the whole block slides in.
    const hidden = el.querySelector("[data-stagger]") ? "reveal-stagger-hidden" : "reveal-hidden";
    el.classList.add(hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(hidden);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
