import Image from "next/image";
import StoryParallax from "@/components/StoryParallax";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

const VALUES = [
  {
    title: "Single-farm",
    body: "We never blend mystery meat from a dozen suppliers. Every cut is traceable to a single Waterberg farm and a single herd, from the veld to the vacuum pack.",
  },
  {
    title: "Slow by design",
    body: "Where industrial biltong is force-dried in a matter of hours, ours hangs for up to two weeks, because time is the only flavour enhancer we believe in.",
  },
  {
    title: "Nothing to hide",
    body: "Our cure is simply coriander, salt, pepper and vinegar, with no MSG, nitrates, soy or sugar fillers quietly padding out the weight.",
  },
];

export default function StoryPage() {
  return (
    <div className="bg-espresso">
      {/* hero */}
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(92,26,22,0.5),transparent_55%)]" />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow mb-6">
              <span className="h-px w-10 bg-coriander" />
              Our Story
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-5xl font-display text-5xl font-light leading-[1.0] text-bone md:text-8xl">
              From a dust road in the{" "}
              <span className="italic text-ember">Waterberg.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-bone/70">
              Plaas Gedrag is not a factory. It is a farmer, a drying room and a
              stubborn conviction that biltong should taste of the animal it
              came from and the air it dried in.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee />
      <StoryParallax />

      {/* the drying room */}
      <section className="py-28 md:py-40">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow mb-6">
              <span className="h-px w-10 bg-coriander" />
              The drying room
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-tight text-bone md:text-6xl">
              Hung by hand,{" "}
              <span className="italic text-ember">dried by the veld air.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/70">
              Every cut and every coil hangs in our Waterberg drying room until
              the air has done its work, with no tumblers and no accelerants,
              only steady airflow and time.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <figure className="overflow-hidden rounded-3xl border border-bone/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/products/biltong-drying.jpg"
                    alt="Biltong hanging on hooks to air-dry in the Waterberg drying room"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="bg-espresso-50 px-5 py-4 text-xs uppercase tracking-widest text-bone/55">
                  Biltong on the hooks
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.08}>
              <figure className="overflow-hidden rounded-3xl border border-bone/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/products/droewors-drying.jpg"
                    alt="Coils of droëwors hanging through the slow dry"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="bg-espresso-50 px-5 py-4 text-xs uppercase tracking-widest text-bone/55">
                  Droëwors through the slow dry
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-espresso-50 py-28 md:py-40">
        <div className="container-x">
          <Reveal>
            <h2 className="mb-16 max-w-2xl font-display text-4xl font-light leading-tight text-bone md:text-6xl">
              What we will{" "}
              <span className="italic text-ember">never compromise on.</span>
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-bone/10 bg-espresso p-8">
                  <span className="font-display text-5xl text-coriander/30">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-bone">
                    {v.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-bone/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CTASection />
    </div>
  );
}
