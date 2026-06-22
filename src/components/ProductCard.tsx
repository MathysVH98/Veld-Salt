"use client";

import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import { Product, formatZAR } from "@/lib/products";
import { waLink } from "@/lib/utils";
import ProductVisual from "./ProductVisual";

function SpiceMeter({ level }: { level: number }) {
  if (level === 0) return null;
  return (
    <span className="flex items-center gap-0.5" title={`Heat ${level}/3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame
          key={i}
          size={13}
          className={i < level ? "text-ember" : "text-bone/20"}
          fill={i < level ? "currentColor" : "none"}
        />
      ))}
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
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
          <ProductVisual product={product} className="h-full w-full" />
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
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-bone/45">
          <span>{product.category}</span>
          <span>{product.weight}</span>
        </div>
        <h3 className="mt-2 font-display text-2xl leading-tight text-bone">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/60">
          {product.blurb}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl text-coriander">
              {formatZAR(product.price)}
            </span>
            <SpiceMeter level={product.spice} />
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
