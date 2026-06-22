"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Check,
} from "lucide-react";
import { formatZAR, quantityOptions } from "@/lib/products";
import { useCart, resolveLine, FREE_SHIPPING_THRESHOLD } from "./CartContext";

export default function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    remove,
    setCount,
    changeOption,
    clear,
    subtotal,
    shipping,
    grandTotal,
    toast,
  } = useCart();

  const toFree = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      {/* lightweight "added" toast, so adding never blocks browsing */}
      <AnimatePresence>
        {toast && (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[72] flex justify-center px-4">
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-coriander/30 bg-espresso-50 py-3 pl-5 pr-3 shadow-2xl shadow-black/50"
            >
              <Check size={18} className="text-coriander" />
              <span className="text-sm text-bone">{toast.msg}</span>
              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-coriander px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-espresso transition-colors hover:bg-coriander-light"
              >
                View order
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-espresso"
            >
              <header className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
                <span className="flex items-center gap-2.5 font-display text-2xl text-bone">
                  <ShoppingBag size={22} className="text-coriander" />
                  Your order
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close cart"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  <X size={24} />
                </button>
              </header>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <ShoppingBag size={40} className="text-bone/25" />
                  <p className="text-bone/55">Your order is empty.</p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="btn-ghost"
                  >
                    Browse the range
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                    {items.map((item) => {
                      const line = resolveLine(item);
                      if (!line) return null;
                      const { product } = line;
                      const opts = quantityOptions(product);
                      return (
                        <div
                          key={`${item.productId}-${item.option}`}
                          className="flex gap-4 rounded-2xl border border-bone/10 bg-espresso-50 p-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-espresso">
                            {product.image && (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            )}
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-lg leading-tight text-bone">
                                {product.name}
                              </h3>
                              <button
                                onClick={() =>
                                  remove(item.productId, item.option)
                                }
                                aria-label={`Remove ${product.name}`}
                                className="text-bone/40 transition-colors hover:text-ember"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <select
                                value={item.option}
                                onChange={(e) =>
                                  changeOption(
                                    item.productId,
                                    item.option,
                                    e.target.value
                                  )
                                }
                                className="cart-select"
                                aria-label="Quantity option"
                              >
                                {opts.map((o) => (
                                  <option key={o.label} value={o.label}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                              <span className="text-xs text-bone/45">
                                {formatZAR(line.unit)} each
                              </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() =>
                                    setCount(
                                      item.productId,
                                      item.option,
                                      item.count - 1
                                    )
                                  }
                                  aria-label="Decrease quantity"
                                  className="grid h-7 w-7 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-7 text-center text-sm text-bone">
                                  {item.count}
                                </span>
                                <button
                                  onClick={() =>
                                    setCount(
                                      item.productId,
                                      item.option,
                                      item.count + 1
                                    )
                                  }
                                  aria-label="Increase quantity"
                                  className="grid h-7 w-7 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="font-display text-lg text-coriander">
                                {formatZAR(line.total)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={clear}
                      className="text-xs uppercase tracking-widest text-bone/40 transition-colors hover:text-ember"
                    >
                      Clear order
                    </button>
                  </div>

                  <footer className="border-t border-bone/10 px-6 py-6">
                    <p className="mb-4 rounded-xl bg-coriander/10 px-4 py-2.5 text-center text-xs text-coriander">
                      {shipping === 0
                        ? "You have unlocked free shipping."
                        : `Add ${formatZAR(toFree)} more for free shipping.`}
                    </p>

                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between text-bone/60">
                        <span>Subtotal</span>
                        <span>{formatZAR(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between text-bone/60">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? "Free" : formatZAR(shipping)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 mt-3 flex items-center justify-between border-t border-bone/10 pt-3">
                      <span className="text-sm uppercase tracking-widest text-bone/50">
                        Total
                      </span>
                      <span className="font-display text-3xl text-bone">
                        {formatZAR(grandTotal)}
                      </span>
                    </div>

                    <Link
                      href="/order"
                      onClick={() => setOpen(false)}
                      className="btn-primary w-full"
                    >
                      <Send size={18} />
                      Checkout
                    </Link>
                    <p className="mt-3 text-center text-xs text-bone/45">
                      Add your delivery details on the next step.
                    </p>
                  </footer>
                </>
              )}
            </motion.aside>

            <style jsx global>{`
              .cart-select {
                border-radius: 0.6rem;
                border: 1px solid rgba(242, 233, 216, 0.15);
                background: #15110e;
                padding: 0.3rem 0.6rem;
                color: #f2e9d8;
                font-size: 0.8rem;
                outline: none;
              }
              .cart-select:focus {
                border-color: #d6a24a;
              }
              .cart-select option {
                background: #15110e;
              }
            `}</style>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
