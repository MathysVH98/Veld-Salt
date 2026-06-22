"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

export default function StoryParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const yWord = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-espresso py-28 md:py-40"
    >
      {/* giant ghost word */}
      <motion.span
        style={{ y: yWord }}
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[26vw] font-light leading-none text-bone/[0.03]"
      >
        veld
      </motion.span>

      <div className="container-x grid items-center gap-16 md:grid-cols-2">
        {/* parallax visual stack */}
        <div className="relative h-[420px] md:h-[560px]">
          <motion.div
            style={{ y: ySlow, rotate }}
            className="absolute left-4 top-4 h-3/4 w-3/4 rounded-3xl bg-gradient-to-br from-oxblood to-oxblood-deep shadow-2xl shadow-black/50"
          />
          <motion.div
            style={{ y: yFast }}
            className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-3xl border border-coriander/20 bg-gradient-to-br from-espresso-100 to-espresso"
          >
            <div className="flex h-full flex-col justify-end p-6">
              <span className="font-display text-6xl text-coriander">14</span>
              <span className="mt-2 text-sm uppercase tracking-widest text-bone/60">
                days of slow drying
              </span>
            </div>
          </motion.div>
          <motion.div
            style={{ y: ySlow }}
            className="absolute right-8 top-0 grid h-28 w-28 place-items-center rounded-full border border-bone/15 bg-espresso/80 backdrop-blur"
          >
            <span className="text-center font-display text-sm italic leading-tight text-bone/80">
              est.
              <br />
              2018
            </span>
          </motion.div>
        </div>

        {/* copy */}
        <div>
          <Reveal>
            <span className="eyebrow mb-6">
              <span className="h-px w-10 bg-coriander" />
              Our Story
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-light leading-tight text-bone md:text-6xl">
              One farm. One herd.{" "}
              <span className="italic text-ember">One honest cut.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-bone/70">
              Veld &amp; Salt began on a dust road in the Waterberg, where a
              fourth-generation farmer still hangs his beef the way his
              grandfather did. We buy the whole animal, cure it by hand, and let
              the dry highveld air do the rest.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-bone/70">
              No tumblers. No accelerants. No mystery powders. Just coriander,
              rock salt, a splash of vinegar and two weeks of patience.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/story" className="btn-ghost mt-10">
              Read the full story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
