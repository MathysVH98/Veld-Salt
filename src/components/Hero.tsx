"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-oxblood/30 blur-3xl" />
    </div>
  ),
});

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[680px] w-full items-center overflow-hidden"
    >
      {/* 3D layer */}
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0 z-0">
        <HeroScene />
      </motion.div>

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#15110E_85%)]" />

      {/* copy */}
      <motion.div
        style={{ y: yText, opacity }}
        className="container-x relative z-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          <span className="h-px w-10 bg-coriander" />
          {BRAND.region}
        </motion.div>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.92] tracking-tight text-bone">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Air-dried
          </motion.span>
          <motion.span
            className="block italic text-ember"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            the slow way.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70"
        >
          Hand-cut biltong and droëwors from a single family farm in the
          Waterberg. No shortcuts, no nonsense. Just salt, spice, patience and
          good Limpopo beef.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/shop" className="btn-primary">
            Explore the Range
          </Link>
          <a
            href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Order on WhatsApp
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-bone/50"
        >
          <span className="text-[10px] uppercase tracking-ultra">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
