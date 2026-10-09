"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Screenshot that is only requested once it is about to scroll into view.
// Browsers start native lazy images far before the viewport on phones, which
// made the four work screenshots compete with the fonts at page load. The box
// keeps the image's aspect ratio, so nothing shifts when it appears.
export default function WorkShot({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ aspectRatio: `${width} / ${height}` }} className="bg-surface-container">
      {show && <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />}
    </div>
  );
}
