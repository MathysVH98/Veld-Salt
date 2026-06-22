"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, CATEGORIES, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const PER_PAGE = 6;
type Filter = Category | "All";
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const choose = (f: Filter) => {
    setFilter(f);
    setPage(1);
  };

  const goTo = (p: number) => {
    setPage(p);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 280, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-espresso pb-28 pt-36 md:pt-44">
      {/* header */}
      <div className="container-x">
        <span className="eyebrow mb-6">
          <span className="h-px w-10 bg-coriander" />
          The Shop
        </span>
        <h1 className="max-w-3xl font-display text-5xl font-light leading-[1.02] text-bone md:text-7xl">
          Every cut we make,{" "}
          <span className="italic text-ember">in one place.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone/65">
          Browse the full range, then tap the plus on anything you like to start
          a WhatsApp order. We cut and seal to order.
        </p>
      </div>

      {/* filters */}
      <div className="container-x mt-12">
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => choose(f)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                filter === f
                  ? "border-ember bg-ember text-bone"
                  : "border-bone/15 text-bone/70 hover:border-coriander hover:text-coriander"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <div className="container-x mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {slice.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* pagination */}
        {pages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => goTo(Math.max(1, current - 1))}
              disabled={current === 1}
              aria-label="Previous page"
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone transition-colors hover:border-coriander hover:text-coriander disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: pages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border font-display text-lg transition-all duration-300",
                    p === current
                      ? "border-coriander bg-coriander text-espresso"
                      : "border-bone/15 text-bone/70 hover:border-coriander hover:text-coriander"
                  )}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => goTo(Math.min(pages, current + 1))}
              disabled={current === pages}
              aria-label="Next page"
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone transition-colors hover:border-coriander hover:text-coriander disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-bone/40">
          Showing {slice.length} of {filtered.length} products
        </p>
      </div>
    </div>
  );
}
