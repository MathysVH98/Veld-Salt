"use client";

import { useState } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";
import {
  PRODUCTS,
  formatZAR,
  quantityOptions,
  defaultOption,
} from "@/lib/products";
import {
  useCart,
  resolveLine,
  buildOrderMessage,
} from "@/components/cart/CartContext";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const { items, add, remove, setCount, clear, totalPrice } = useCart();

  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // add-a-product builder
  const [pid, setPid] = useState(PRODUCTS[0].id);
  const [opt, setOpt] = useState(defaultOption(PRODUCTS[0]).label);
  const [count, setBuilderCount] = useState(1);

  const selected = PRODUCTS.find((p) => p.id === pid) ?? PRODUCTS[0];
  const opts = quantityOptions(selected);

  const onPickProduct = (id: string) => {
    setPid(id);
    const p = PRODUCTS.find((x) => x.id === id);
    if (p) setOpt(defaultOption(p).label);
  };

  const addToOrder = () => {
    add(pid, opt, count);
    setBuilderCount(1);
  };

  const send = () => {
    if (!items.length) return;
    window.open(
      waLink(buildOrderMessage(items, name, note)),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="bg-espresso pb-28 pt-40 md:pt-52">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow mb-6">
            <span className="h-px w-10 bg-coriander" />
            Contact &amp; Orders
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.02] text-bone md:text-7xl">
            Let&apos;s get you some{" "}
            <span className="italic text-ember">biltong.</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* order builder */}
          <Reveal>
            <div className="rounded-3xl border border-bone/10 bg-espresso-50 p-8 md:p-10">
              <h2 className="font-display text-3xl text-bone">
                Build your order
              </h2>
              <p className="mt-2 text-sm text-bone/55">
                Add what you would like below, then send it all to us on
                WhatsApp in one go.
              </p>

              {/* add a product */}
              <div className="mt-8 rounded-2xl border border-bone/10 bg-espresso p-5">
                <Field label="Which product?">
                  <select
                    value={pid}
                    onChange={(e) => onPickProduct(e.target.value)}
                    className="input"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} · {formatZAR(p.price)} {p.weight}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field label="How much?">
                    <select
                      value={opt}
                      onChange={(e) => setOpt(e.target.value)}
                      className="input"
                    >
                      {opts.map((o) => (
                        <option key={o.label} value={o.label}>
                          {o.label} · {formatZAR(selected.price * o.mult)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="How many?">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBuilderCount((c) => Math.max(1, c - 1))}
                        aria-label="Decrease"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-8 text-center font-display text-2xl text-bone">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => setBuilderCount((c) => c + 1)}
                        aria-label="Increase"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </Field>
                </div>

                <button
                  type="button"
                  onClick={addToOrder}
                  className="btn-ghost mt-6 w-full"
                >
                  <Plus size={18} />
                  Add to order
                </button>
              </div>

              {/* current order */}
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-bone/50">
                    Your order
                  </h3>
                  {items.length > 0 && (
                    <button
                      onClick={clear}
                      className="text-xs uppercase tracking-widest text-bone/40 transition-colors hover:text-ember"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-bone/15 px-5 py-8 text-center text-sm text-bone/45">
                    No items yet. Add a product above to start your order.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => {
                      const line = resolveLine(item);
                      if (!line) return null;
                      return (
                        <div
                          key={`${item.productId}-${item.option}`}
                          className="flex items-center gap-4 rounded-2xl border border-bone/10 bg-espresso p-4"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-lg text-bone">
                              {line.product.name}
                            </p>
                            <p className="text-xs text-bone/45">
                              {line.option.label} · {formatZAR(line.unit)} each
                            </p>
                          </div>
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
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm text-bone">
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
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="w-16 text-right font-display text-lg text-coriander">
                            {formatZAR(line.total)}
                          </span>
                          <button
                            onClick={() => remove(item.productId, item.option)}
                            aria-label="Remove"
                            className="text-bone/40 transition-colors hover:text-ember"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between px-1 pt-2">
                      <span className="text-sm uppercase tracking-widest text-bone/50">
                        Total
                      </span>
                      <span className="font-display text-2xl text-bone">
                        {formatZAR(totalPrice)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* your details */}
              <div className="mt-8 space-y-5">
                <Field label="Your name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Thabo"
                    className="input"
                  />
                </Field>
                <Field label="Anything else?">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Delivery area, gift note, collection time..."
                    className="input resize-none"
                  />
                </Field>
              </div>

              <button
                type="button"
                onClick={send}
                disabled={items.length === 0}
                className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
                Send order on WhatsApp
              </button>
            </div>
          </Reveal>

          {/* details */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5">
              <a
                href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-3xl border border-ember/40 bg-ember/10 p-7 transition-colors hover:bg-ember/20"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ember text-bone">
                  <MessageCircle size={26} />
                </span>
                <span>
                  <span className="block font-display text-2xl text-bone">
                    WhatsApp us
                  </span>
                  <span className="text-sm text-bone/60">
                    Fastest way to order. We reply quickly.
                  </span>
                </span>
              </a>

              <InfoRow icon={<Mail size={22} />} title="Email">
                {BRAND.email}
              </InfoRow>
              <InfoRow icon={<MapPin size={22} />} title="Where we are">
                {BRAND.region}, South Africa
              </InfoRow>
              <InfoRow icon={<Clock size={22} />} title="Order &amp; dispatch">
                Cut fresh and sealed to order. Nationwide courier in 2 to 4 working
                days.
              </InfoRow>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(242, 233, 216, 0.15);
          background: #15110e;
          padding: 0.85rem 1rem;
          color: #f2e9d8;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s;
        }
        .input::placeholder {
          color: rgba(242, 233, 216, 0.35);
        }
        .input:focus {
          border-color: #d6a24a;
        }
        select.input option {
          background: #15110e;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-bone/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5 rounded-3xl border border-bone/10 bg-espresso-50 p-7">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-coriander/40 text-coriander">
        {icon}
      </span>
      <span>
        <span className="block font-display text-xl text-bone">{title}</span>
        <span className="text-sm leading-relaxed text-bone/60">{children}</span>
      </span>
    </div>
  );
}
