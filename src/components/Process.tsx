"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const STEPS = [
  {
    no: "01",
    title: "Source",
    body: "We work with one Waterberg farm. Grass-fed, free-roaming cattle, slaughtered humanely and butchered whole.",
  },
  {
    no: "02",
    title: "Cure",
    body: "Each cut is rubbed by hand with toasted coriander, rock salt, cracked pepper and a splash of brown vinegar.",
  },
  {
    no: "03",
    title: "Hang",
    body: "The meat hangs for up to fourteen days in dry highveld air, with no heat and no rush, while the veld quietly does the work.",
  },
  {
    no: "04",
    title: "Cut & Seal",
    body: "Sliced to your order, weighed, and vacuum-sealed within the hour so it reaches you exactly as it left the farm.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-espresso-50 py-28 md:py-40">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow mb-6">
            <span className="h-px w-10 bg-coriander" />
            From Farm to Pack
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-20 max-w-2xl font-display text-4xl font-light leading-tight text-bone md:text-6xl">
            Four steps,{" "}
            <span className="italic text-ember">and not a single shortcut.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative">
          {/* progress rail */}
          <div className="absolute left-[27px] top-2 hidden h-full w-px bg-bone/10 md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-coriander to-ember"
            />
          </div>

          <div className="flex flex-col gap-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.05}>
                <div className="grid gap-6 md:grid-cols-[56px_1fr] md:items-start md:gap-10">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-coriander/40 bg-espresso font-display text-lg text-coriander">
                    {s.no}
                  </div>
                  <div className="max-w-2xl border-b border-bone/10 pb-10">
                    <h3 className="font-display text-3xl text-bone md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-bone/65">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
