"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    quote:
      "Genuinely the best biltong I have eaten outside my late father's garage. The garlic cut is dangerous. It does not last a day in this house.",
    name: "Thandeka M.",
    city: "Pretoria",
  },
  {
    quote:
      "You can taste that it is a single farm. Clean, beefy, properly dried. The droëwors snaps like it should. We order a Trekker box every month.",
    name: "Ruan & Lize",
    city: "Bela-Bela",
  },
  {
    quote:
      "Ordered the kudu biltong for a braai and my guests would not stop talking about it. Ships fast, sealed perfectly, no fuss on WhatsApp.",
    name: "Sipho D.",
    city: "Johannesburg",
  },
  {
    quote:
      "Peri-peri with real heat that does not wreck the flavour. This is what biltong should taste like. I am never buying garage biltong again.",
    name: "Carla V.",
    city: "Polokwane",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % REVIEWS.length);
  const prev = () => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length);
  const r = REVIEWS[i];

  return (
    <section className="relative overflow-hidden bg-oxblood-deep py-28 md:py-40">
      <Quote
        className="pointer-events-none absolute -left-6 top-10 text-ember/10"
        size={240}
        strokeWidth={1}
      />
      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow mb-12">
            <span className="h-px w-10 bg-coriander" />
            From the Stoep
          </span>
        </Reveal>

        <div className="min-h-[260px] max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex gap-1 text-coriander">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="font-display text-3xl font-light leading-snug text-bone md:text-5xl">
                “{r.quote}”
              </p>
              <p className="mt-8 text-sm uppercase tracking-widest text-coriander">
                {r.name} · {r.city}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-coriander hover:text-coriander"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-coriander hover:text-coriander"
          >
            <ChevronRight size={20} />
          </button>
          <span className="ml-4 text-sm text-bone/50">
            {String(i + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
