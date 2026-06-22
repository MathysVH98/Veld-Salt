"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");

  const message = `Hi Veld & Salt!%0A%0AName: ${name || "(your name)"}%0AProduct: ${
    product || "(what you'd like)"
  }%0AQuantity: ${qty || "(how much)"}%0A%0A${note}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Veld & Salt!\n\nName: ${name}\nProduct: ${product}\nQuantity: ${qty}\n\n${note}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
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
          {/* form */}
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-bone/10 bg-espresso-50 p-8 md:p-10"
            >
              <h2 className="font-display text-3xl text-bone">
                Build your order
              </h2>
              <p className="mt-2 text-sm text-bone/55">
                Fill this in and we&apos;ll open WhatsApp with your order ready to
                send.
              </p>

              <div className="mt-8 space-y-5">
                <Field label="Your name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Thabo"
                    className="input"
                  />
                </Field>

                <Field label="Which product?">
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="input"
                  >
                    <option value="">Choose a cut...</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.weight})`}>
                        {p.name} · {p.weight}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="How much?">
                  <input
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="e.g. 2 packs, or 1kg"
                    className="input"
                  />
                </Field>

                <Field label="Anything else?">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Delivery area, spice preference, gift note..."
                    className="input resize-none"
                  />
                </Field>
              </div>

              <button type="submit" className="btn-primary mt-8 w-full">
                <Send size={18} />
                Send via WhatsApp
              </button>
            </form>
          </Reveal>

          {/* details */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5">
              <a
                href={waLink("Hi Veld & Salt, I'd like to place an order.")}
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
