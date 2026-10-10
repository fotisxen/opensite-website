// Two slow-moving brand glows behind a page hero. Decorative and CSS only, so
// it costs nothing at load and never moves the layout.
// No clipping box: the glows fade out on their own, and a mask fades the whole
// layer towards the bottom, so there is never a visible rectangle edge
// against the next section. (html/body clip horizontal overflow.)
export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]"
    >
      <div className="glow-a absolute -left-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.35),transparent)]" />
      <div className="glow-b absolute -right-24 top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(74_225_118/0.18),transparent)]" />
    </div>
  );
}
