"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, waLink, cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-bone/10 bg-espresso/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="container-x flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-coriander/50 text-coriander transition-colors group-hover:bg-coriander group-hover:text-espresso">
              <span className="font-display text-lg font-semibold">P</span>
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-bone">
              Plaas Gedrag
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium tracking-wide text-bone/80 hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order Now
            </a>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-bone md:hidden"
          >
            <Menu size={26} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-espresso/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-x flex h-20 items-center justify-between">
              <span className="font-display text-xl font-semibold text-bone">
                Plaas Gedrag
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-bone"
              >
                <X size={28} />
              </button>
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="container-x mt-10 flex flex-col gap-2"
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-bone/10 py-5 font-display text-4xl text-bone"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full"
              >
                Order on WhatsApp
              </a>
              <p className="mt-6 text-sm text-bone/50">{BRAND.tagline}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
