"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The same 3D scene as the English home page. three.js is heavy on phones,
// so it only starts once the page has finished loading and the browser is
// idle: the headline and the buttons are usable first. The glow holds the
// space meanwhile, so nothing shifts when the scene appears.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function GreekHeroScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      if (idle) idleId = idle(() => setReady(true), { timeout: 4000 });
      else timer = setTimeout(() => setReady(true), 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (timer) clearTimeout(timer);
      const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId !== undefined && cancel) cancel(idleId);
    };
  }, []);

  return (
    <div className="relative h-[280px] sm:h-[400px] lg:h-[520px]">
      <div className="glow-a pointer-events-none absolute inset-8 rounded-full bg-primary-container/20 blur-[90px]" />
      {ready && <HeroScene />}
    </div>
  );
}
