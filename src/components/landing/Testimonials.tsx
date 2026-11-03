import { googleReviews, testimonial } from "@/lib/landing";
import { siteConfig } from "@/lib/site.config";
import Reveal from "./Reveal";

// The rating line under a page's main text.
export function ReviewsLine() {
  return (
    <p className="mt-3 font-label-md text-label-md text-text-primary">
      <span aria-hidden="true" className="text-amber-400">★</span> {googleReviews.rating}/5 · {googleReviews.count} κριτικές στο Google
    </p>
  );
}

// Google reviews plus the client testimonial. A translated quote says so.
export default function Testimonials() {
  return (
    <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
      <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Τι λένε οι πελάτες μας</h2>
      <div data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
        {googleReviews.quotes.map((q) => (
          <figure key={q.author} className="rounded-2xl border border-surface-border bg-surface-card p-6">
            <blockquote className="font-body-md text-body-md text-text-primary">&ldquo;{q.text}&rdquo;</blockquote>
            <figcaption className="mt-4">
              <span className="block font-label-md text-label-md text-text-primary">{q.author}</span>
              <span className="block font-body-sm text-body-sm text-text-secondary">Κριτική στο Google</span>
            </figcaption>
          </figure>
        ))}
        <figure className="rounded-2xl border border-surface-border bg-surface-card p-6">
          <blockquote className="font-body-md text-body-md text-text-primary" lang={siteConfig.testimonial.el ? "el" : "en"}>
            &ldquo;{siteConfig.testimonial.el ?? testimonial.en}&rdquo;
          </blockquote>
          <figcaption className="mt-4">
            <span className="block font-label-md text-label-md text-text-primary">{testimonial.author}</span>
            <span className="block font-body-sm text-body-sm text-text-secondary">{testimonial.roleEl}</span>
            {siteConfig.testimonial.el && (
              <span className="mt-1 block text-xs text-text-secondary/80">Μετάφραση από τα αγγλικά</span>
            )}
          </figcaption>
        </figure>
      </div>
    </Reveal>
  );
}
