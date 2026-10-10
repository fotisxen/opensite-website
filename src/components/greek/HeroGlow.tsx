// Two slow-moving brand glows behind a page hero. Decorative and CSS only, so
// it costs nothing at load and never moves the layout.
// The layer spans the full window width (a mask clips to its box, so a layer
// as wide as the content column showed straight edges on wide screens) and
// fades out towards the bottom. The glows themselves stay aligned with the
// content column. html/body clip horizontal overflow.
export default function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)]"
    >
      <div className="relative mx-auto h-full max-w-container-max">
        <div className="glow-a absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.32),transparent)]" />
        <div className="glow-b absolute -right-32 top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(74_225_118/0.16),transparent)]" />
      </div>
    </div>
  );
}
