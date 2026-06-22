"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "veld at golden hour" layer.
 * Warm dust and ember motes drift slowly upward like light through farm air,
 * and a soft amber lantern glow tracks the cursor, nudging nearby motes aside.
 * Replaces the old film-grain overlay with something interactive and on-theme.
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

    // warm palette: coriander gold, soft ember, bone
    const COLORS = ["#D6A24A", "#E8C77E", "#B5402A", "#F2E9D8"];

    type Mote = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      tw: number;
      hue: string;
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

      const count = Math.round(Math.min(70, (w * h) / 26000));
      motes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 2.2),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.35, -0.06), // gentle drift upward
        a: rand(0.15, 0.6),
        tw: rand(0, Math.PI * 2),
        hue: COLORS[Math.floor(Math.random() * COLORS.length)],
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
      ctx!.beginPath();
      ctx!.fillStyle = m.hue;
      ctx!.globalAlpha = alpha;
      ctx!.shadowColor = m.hue;
      ctx!.shadowBlur = 8;
      ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx!.fill();
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
        m.tw += 0.02;

        // wrap around the viewport
        if (m.y < -12) {
          m.y = h + 12;
          m.x = rand(0, w);
        }
        if (m.x < -12) m.x = w + 12;
        if (m.x > w + 12) m.x = -12;

        const tw = (Math.sin(m.tw) + 1) / 2; // 0..1 twinkle
        drawMote(m, m.a * (0.4 + 0.6 * tw));
      }

      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;

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
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) drawMote(m, m.a * 0.6);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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
