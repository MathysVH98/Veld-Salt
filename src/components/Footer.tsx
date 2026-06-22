import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-espresso-50">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-coriander/50 font-display text-lg text-coriander">
                P
              </span>
              <span className="font-display text-xl font-semibold text-bone">
                Plaas Gedrag
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-bone/60">{BRAND.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-bone/45">
              <MapPin size={15} /> {BRAND.region}, South Africa
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-ultra text-coriander">
              Explore
            </h4>
            <ul className="space-y-3 text-bone/70">
              <li>
                <Link href="/shop" className="link-underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/story" className="link-underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={waLink("Hi Plaas Gedrag, I'd like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Order on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-ultra text-coriander">
              Get in touch
            </h4>
            <ul className="space-y-3 text-bone/70">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2 link-underline"
                >
                  <Mail size={15} /> {BRAND.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-coriander hover:text-coriander"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bone/10 pt-8 text-sm text-bone/40 md:flex-row">
          <p>© {new Date().getFullYear()} Plaas Gedrag. Hand-cut in the Waterberg.</p>
          <p>Made with salt, patience and good beef.</p>
        </div>
      </div>
    </footer>
  );
}
