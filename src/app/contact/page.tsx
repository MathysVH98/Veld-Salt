import Link from "next/link";
import { MessageCircle, Mail, MapPin, Clock, ShoppingBag } from "lucide-react";
import { BRAND, waLink } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  return (
    <div className="bg-espresso pb-28 pt-40 md:pt-52">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow mb-6">
            <span className="h-px w-10 bg-coriander" />
            Get in touch
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.02] text-bone md:text-7xl">
            Talk to the{" "}
            <span className="italic text-ember">farm.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/65">
            Questions about a cut, a bulk order or delivery? Reach us on any of
            the below. To place an order, head to the order page and build your
            box.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* contact methods */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <a
                href={waLink("Hi Plaas Gedrag, I have a question.")}
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
                    {BRAND.phone} · fastest way to reach us.
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

          {/* order CTA */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-bone/10 bg-espresso-50 p-8 text-center md:p-12">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-coriander/40 text-coriander">
                <ShoppingBag size={28} />
              </span>
              <h2 className="mt-6 font-display text-3xl text-bone md:text-4xl">
                Ready to order?
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-bone/60">
                Build your box, pick your quantities and send it straight to us
                on WhatsApp, all from one page.
              </p>
              <Link href="/order" className="btn-primary mx-auto mt-8">
                <ShoppingBag size={18} />
                Start your order
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
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
