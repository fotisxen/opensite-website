"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Brand colors from globals.css.
const PRIMARY = 0xb4c5ff;
const SECONDARY = 0x4ae176;
const BLUE = 0x2563eb;

const W = 3.6; // browser window size in scene units
const H = 2.3;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function rect(w: number, h: number, r: number, color: number, opacity = 1) {
  return new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRect(w, h, r), 8),
    new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, side: THREE.DoubleSide })
  );
}

function outline(w: number, h: number, r: number, color: number, opacity: number) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.ShapeGeometry(roundedRect(w, h, r), 8)),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
}

function place<T extends THREE.Object3D>(obj: T, x: number, y: number, z: number) {
  obj.position.set(x, y, z);
  return obj;
}

function labelTexture(text: string, opts: { w: number; h: number; font: string; color: string; bg?: string; border?: string }) {
  const canvas = document.createElement("canvas");
  canvas.width = opts.w;
  canvas.height = opts.h;
  const ctx = canvas.getContext("2d")!;
  if (opts.bg) {
    const r = opts.h / 2;
    ctx.beginPath();
    ctx.moveTo(r, 2);
    ctx.arcTo(opts.w - 2, 2, opts.w - 2, opts.h - 2, r - 2);
    ctx.arcTo(opts.w - 2, opts.h - 2, 2, opts.h - 2, r - 2);
    ctx.arcTo(2, opts.h - 2, 2, 2, r - 2);
    ctx.arcTo(2, 2, opts.w - 2, 2, r - 2);
    ctx.closePath();
    ctx.fillStyle = opts.bg;
    ctx.fill();
    if (opts.border) {
      ctx.strokeStyle = opts.border;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  ctx.fillStyle = opts.color;
  ctx.font = opts.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, opts.w / 2, opts.h / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// The site "window": three exploded layers (blueprint, page, analytics).
function buildSite() {
  const site = new THREE.Group();

  // Back layer: blueprint grid.
  const blueprint = new THREE.Group();
  blueprint.add(outline(W * 1.08, H * 1.08, 0.16, PRIMARY, 0.45));
  const grid: number[] = [];
  for (let i = 1; i < 8; i++) {
    const gx = -W * 0.54 + (W * 1.08 * i) / 8;
    grid.push(gx, -H * 0.54, 0, gx, H * 0.54, 0);
  }
  for (let i = 1; i < 5; i++) {
    const gy = -H * 0.54 + (H * 1.08 * i) / 5;
    grid.push(-W * 0.54, gy, 0, W * 0.54, gy, 0);
  }
  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(grid, 3));
  blueprint.add(new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color: PRIMARY, transparent: true, opacity: 0.12 })));
  site.add(blueprint);

  // Middle layer: the page.
  const page = new THREE.Group();
  page.add(rect(W, H, 0.14, 0x0f1729, 0.96));
  page.add(place(outline(W, H, 0.14, PRIMARY, 0.9), 0, 0, 0.004));
  page.add(place(rect(W, 0.3, 0.14, 0x1a2440), 0, H / 2 - 0.15, 0.006));
  [0xff5f57, 0xffbd2e, 0x28c840].forEach((c, i) => {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.045, 20), new THREE.MeshBasicMaterial({ color: c }));
    page.add(place(dot, -W / 2 + 0.22 + i * 0.13, H / 2 - 0.15, 0.01));
  });
  page.add(place(rect(1.7, 0.13, 0.06, 0x0f1729), 0.1, H / 2 - 0.15, 0.01));
  // hero copy
  page.add(place(rect(1.5, 0.15, 0.05, PRIMARY, 0.95), -0.85, 0.55, 0.01));
  page.add(place(rect(1.0, 0.15, 0.05, BLUE), -1.1, 0.33, 0.01));
  page.add(place(rect(1.35, 0.06, 0.03, 0x64748b, 0.8), -0.925, 0.1, 0.01));
  page.add(place(rect(1.1, 0.06, 0.03, 0x64748b, 0.8), -1.05, -0.02, 0.01));
  page.add(place(rect(0.72, 0.2, 0.08, BLUE), -1.28, -0.24, 0.012));
  page.add(place(rect(0.4, 0.05, 0.025, 0xffffff, 0.9), -1.28, -0.24, 0.016));
  // hero visual
  page.add(place(rect(1.05, 0.95, 0.1, 0x1e3a8a, 0.9), 1.0, 0.28, 0.01));
  const sun = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), new THREE.MeshBasicMaterial({ color: SECONDARY }));
  page.add(place(sun, 1.2, 0.5, 0.014));
  // feature cards
  for (let i = 0; i < 3; i++) {
    page.add(place(rect(1.0, 0.52, 0.08, 0x16203a), -1.15 + i * 1.15, -0.78, 0.01));
    page.add(place(rect(0.5, 0.05, 0.025, i === 1 ? SECONDARY : PRIMARY, 0.9), -1.15 + i * 1.15 - 0.2, -0.68, 0.014));
    page.add(place(rect(0.7, 0.04, 0.02, 0x64748b, 0.7), -1.15 + i * 1.15 - 0.1, -0.8, 0.014));
  }
  site.add(page);

  // Front layer: analytics card with a rising line.
  const stats = new THREE.Group();
  stats.add(rect(1.5, 0.95, 0.1, 0x0b1220, 0.82));
  stats.add(place(outline(1.5, 0.95, 0.1, SECONDARY, 0.85), 0, 0, 0.004));
  const pts = [-0.6, -0.25, -0.2, 0.05, 0.0, 0.22, 0.3].map((y, i) => new THREE.Vector3(-0.6 + i * 0.2, y - 0.12, 0.01));
  const lineGeo = new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3(pts).getPoints(60));
  stats.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: SECONDARY })));
  const endDot = new THREE.Mesh(new THREE.CircleGeometry(0.05, 20), new THREE.MeshBasicMaterial({ color: SECONDARY }));
  stats.add(place(endDot, pts[pts.length - 1].x, pts[pts.length - 1].y, 0.014));
  const growth = labelTexture("+248%", { w: 256, h: 96, font: "700 64px Sora, Inter, sans-serif", color: "#4ae176" });
  const growthPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.23),
    new THREE.MeshBasicMaterial({ map: growth, transparent: true })
  );
  stats.add(place(growthPlane, -0.38, 0.3, 0.014));
  site.add(stats);

  return { site, blueprint, page, stats };
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the page still works without the scene
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
    const world = new THREE.Group();
    scene.add(world);

    const { site, blueprint, page, stats } = buildSite();
    world.add(site);

    // Services orbiting the site, matching what the agency sells.
    const services = ["Web", "E-shop", "Apps", "SEO", "CRM", "SPFx"];
    const chips = services.map((name, i) => {
      const tex = labelTexture(name, {
        w: 256,
        h: 96,
        font: "600 44px Inter, sans-serif",
        color: "#f8fafc",
        bg: "rgba(22,30,45,0.92)",
        border: "rgba(180,197,255,0.7)",
      });
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
      world.add(sprite);
      return { sprite, offset: (i / services.length) * Math.PI * 2 };
    });

    // Visitors flowing in from the left; they turn green (customers) once
    // they pass through the page.
    const N = 70;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const speed = new Float32Array(N);
    const spread = new Float32Array(N * 2);
    const visitor = new THREE.Color(PRIMARY);
    const customer = new THREE.Color(SECONDARY);
    const respawn = (i: number, initial: boolean) => {
      pos[i * 3] = initial ? -5 + Math.random() * 7.5 : -5.2;
      speed[i] = 0.7 + Math.random() * 0.8;
      spread[i * 2] = (Math.random() - 0.5) * 3.2;
      spread[i * 2 + 1] = (Math.random() - 0.5) * 2.4;
    };
    for (let i = 0; i < N; i++) respawn(i, true);
    const flowGeo = new THREE.BufferGeometry();
    flowGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    flowGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const flow = new THREE.Points(
      flowGeo,
      new THREE.PointsMaterial({ size: 0.075, vertexColors: true, transparent: true, opacity: 0.95, sizeAttenuation: true })
    );
    world.add(flow);

    // Dust for depth.
    const dustPos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const r = 4 + Math.random() * 4;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = r * Math.sin(b) * Math.cos(a);
      dustPos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
      dustPos[i * 3 + 2] = r * Math.cos(b) - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: PRIMARY, size: 0.025, transparent: true, opacity: 0.5 }));
    scene.add(dust);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(0, 0, camera.aspect < 0.95 ? 13 : 10.2);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    const draw = (t: number, dt: number) => {
      const s = t * 0.001;
      // Intro: the layers start stacked, then fan apart while the scene fades in.
      const intro = reduceMotion ? 1 : Math.min(1, t / 1600);
      const e = 1 - Math.pow(1 - intro, 3);
      canvas.style.opacity = String(Math.min(1, e * 1.6));
      blueprint.position.z = -0.85 * e;
      page.position.z = 0;
      stats.position.set(1.05 * e, -0.75 * e, 0.8 * e);
      world.scale.setScalar(0.7 + 0.3 * e);

      // Gentle idle sway so it always reads as 3D but stays legible.
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      site.rotation.y = -0.42 + Math.sin(s * 0.5) * 0.16 + current.x * 0.3;
      site.rotation.x = 0.16 + Math.sin(s * 0.4) * 0.05 + current.y * 0.2;
      site.position.y = Math.sin(s * 0.9) * 0.08;

      chips.forEach(({ sprite, offset }) => {
        const a = s * 0.35 + offset;
        const x = Math.cos(a) * 2.9;
        const z = Math.sin(a) * 1.8;
        sprite.position.set(x, Math.sin(a * 1.0) * 0.5 + 0.1, z);
        const k = 0.85 + (z / 1.8) * 0.2; // closer = larger
        sprite.scale.set(1.05 * k, 0.39 * k, 1);
      });

      const step = Math.min(dt, 0.05);
      for (let i = 0; i < N; i++) {
        pos[i * 3] += speed[i] * step;
        const x = pos[i * 3];
        if (x > 2.2) respawn(i, false);
        // Funnel toward the page centre, then spread again on the way out.
        const conv = x < 0 ? Math.min(1, (x + 5) / 5) : 1;
        pos[i * 3 + 1] = spread[i * 2] * 0.6 * (1 - conv * 0.75);
        pos[i * 3 + 2] = spread[i * 2 + 1] * (1 - conv * 0.8) + 0.05;
        const c = x > 0 ? customer : visitor;
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      flowGeo.attributes.position.needsUpdate = true;
      flowGeo.attributes.color.needsUpdate = true;
      flow.rotation.y = site.rotation.y * 0.5;

      dust.rotation.y = s * 0.02;
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      draw(2000, 0);
    } else {
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = (now - last) / 1000;
        last = now;
        if (!visible || document.hidden) return;
        draw(now - t0, dt);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      ro.disconnect();
      scene.traverse((obj) => {
        const o = obj as THREE.Mesh;
        o.geometry?.dispose();
        const mat = o.material as THREE.Material | THREE.Material[] | undefined;
        const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
        mats.forEach((m) => {
          (m as THREE.MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className="absolute inset-0" />;
}
