// Two slow-moving brand glows behind a page hero. Decorative and CSS only, so
// it costs nothing at load and never moves the layout.
export default function HeroGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="glow-a absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-container/25 blur-[100px]" />
      <div className="glow-b absolute -right-16 top-10 h-72 w-72 rounded-full bg-secondary/15 blur-[100px]" />
    </div>
  );
}
