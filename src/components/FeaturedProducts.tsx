"use client";

import Link from "next/link";
import { featuredProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function FeaturedProducts() {
  const products = featuredProducts();

  return (
    <section className="relative bg-espresso py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow mb-6">
                <span className="h-px w-10 bg-coriander" />
                The Range
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-xl font-display text-4xl font-light leading-tight text-bone md:text-6xl">
                Cuts worth{" "}
                <span className="italic text-ember">slowing down for.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/shop" className="btn-ghost shrink-0">
              View all products
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
