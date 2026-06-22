"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";
import Reveal from "./Reveal";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-espresso py-32 md:py-44"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(181,64,42,0.35),transparent_60%)]"
      />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow mb-8 justify-center">
            <span className="h-px w-10 bg-coriander" />
            No app, no cart, no fuss
            <span className="h-px w-10 bg-coriander" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-4xl font-display text-5xl font-light leading-[1.02] text-bone md:text-8xl">
            Order straight from{" "}
            <span className="italic text-ember">WhatsApp.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-bone/70">
            Tell us what you want and how much. We cut it fresh, seal it, and
            arrange delivery anywhere in South Africa. It really is that simple.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={waLink(
              "Hi Veld & Salt, I'd like to place an order. Here's what I'm after:"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mx-auto mt-12 px-9 py-4 text-base"
          >
            <MessageCircle size={20} />
            Chat to order
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm text-bone/40">
            Or email {BRAND.email}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
