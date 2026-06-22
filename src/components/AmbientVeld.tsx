"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient layer: coriander seeds drift slowly through the page like spice
 * caught in the light, and a soft amber lantern glow tracks the cursor,
 * nudging nearby seeds aside. Replaces the old film-grain overlay.
 */
export default function AmbientVeld() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // real coriander seed sprite
    const img = new Image();
    let ready = false;
    img.onload = () => {
      ready = true;
      if (reduce) staticDraw();
    };
    img.src = "/coriander-seed.png";

    type Mote = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      tw: number;
      rot: number;
      spin: number;
    };

    let w = 0;
    let h = 0;
    let motes: Mote[] = [];

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(48, (w * h) / 36000));
      motes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(2.2, 4.6),
        vx: rand(-0.1, 0.1),
        vy: rand(-0.28, -0.05), // gentle drift upward
        a: rand(0.4, 0.85),
        tw: rand(0, Math.PI * 2),
        rot: rand(0, Math.PI * 2),
        spin: rand(-0.01, 0.01),
      }));
    }

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const glowPos = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    function drawMote(m: Mote, alpha: number) {
      if (!ready) return;
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.translate(m.x, m.y);
      ctx!.rotate(m.rot);
      ctx!.drawImage(img, -m.r, -m.r, m.r * 2, m.r * 2);
      ctx!.restore();
    }

    function staticDraw() {
      ctx!.clearRect(0, 0, w, h);
      for (const m of motes) drawMote(m, m.a * 0.85);
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    function frame() {
      ctx!.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const R = 150;
      for (const m of motes) {
        // nudge motes away from the lantern, like stirring dust
        const dx = m.x - mouse.x;
        const dy = m.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / R) * 0.7;
          m.x += (dx / d) * force;
          m.y += (dy / d) * force;
        }

        m.x += m.vx;
        m.y += m.vy;
        m.tw += 0.012;
        m.rot += m.spin;

        // wrap around the viewport
        if (m.y < -16) {
          m.y = h + 16;
          m.x = rand(0, w);
        }
        if (m.x < -16) m.x = w + 16;
        if (m.x > w + 16) m.x = -16;

        const tw = (Math.sin(m.tw) + 1) / 2; // 0..1 gentle shimmer
        drawMote(m, m.a * (0.85 + 0.15 * tw));
      }

      ctx!.globalAlpha = 1;

      if (glow) {
        glowPos.x += (mouse.x - glowPos.x) * 0.12;
        glowPos.y += (mouse.y - glowPos.y) * 0.12;
        glow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px)`;
      }

      raf = requestAnimationFrame(frame);
    }

    build();
    window.addEventListener("resize", build);

    if (reduce) {
      // static pass: draw a calm scatter once, no motion or cursor tracking
      staticDraw();
    } else {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute -left-[320px] -top-[320px] hidden h-[640px] w-[640px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(214,162,74,0.10) 0%, rgba(181,64,42,0.05) 38%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
