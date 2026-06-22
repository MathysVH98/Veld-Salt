"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Product, formatZAR } from "@/lib/products";
import { waLink } from "@/lib/utils";
import ProductVisual from "./ProductVisual";
import { Cow, Kudu } from "./icons/Animals";

function StarRating() {
  return (
    <span
      className="flex items-center gap-1"
      title="Rated 5 out of 5"
      aria-label="Rated 5 out of 5"
    >
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-coriander" fill="currentColor" />
        ))}
      </span>
      <span className="text-xs font-medium text-bone/45">5.0</span>
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-bone/10 bg-espresso-50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <ProductVisual product={product} className="h-full w-full" />
          )}
        </div>
        {product.tags.includes("bestseller") && (
          <span className="absolute left-4 top-4 rounded-full bg-coriander px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-espresso">
            Bestseller
          </span>
        )}
        {(product.tags.includes("limited") ||
          product.tags.includes("new")) && (
          <span className="absolute right-4 top-4 rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bone">
            {product.tags.includes("new") ? "New" : "Limited"}
          </span>
        )}
        {product.icon && (
          <span
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-coriander/40 bg-espresso/70 text-coriander backdrop-blur"
            title={product.icon === "cow" ? "Beef" : "Game"}
            aria-label={product.icon === "cow" ? "Beef" : "Game"}
          >
            {product.icon === "cow" ? <Cow size={24} /> : <Kudu size={24} />}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center text-xs uppercase tracking-widest text-bone/45">
          <span>{product.category}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl leading-tight text-bone">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/60">
          {product.blurb}
        </p>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-display text-2xl text-coriander">
                {formatZAR(product.price)}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-bone/45">
                {product.weight}
              </span>
            </div>
            <div className="mt-2">
              <StarRating />
            </div>
          </div>
          <a
            href={waLink(
              `Hi Plaas Gedrag, I'd like to order: ${product.name} (${product.weight}) - ${formatZAR(
                product.price
              )}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-ember text-bone transition-all duration-300 hover:bg-ember-light hover:shadow-[0_8px_24px_-8px_rgba(181,64,42,0.8)]"
          >
            <Plus size={20} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
