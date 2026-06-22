import StoryParallax from "@/components/StoryParallax";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

const VALUES = [
  {
    title: "Single-farm",
    body: "We never blend mystery meat from a dozen suppliers. One Waterberg farm, one herd, full traceability from veld to vacuum pack.",
  },
  {
    title: "Slow by design",
    body: "Industrial biltong is force-dried in hours. Ours hangs for up to two weeks. Time is the only flavour enhancer we use.",
  },
  {
    title: "Nothing to hide",
    body: "Coriander, salt, pepper, vinegar. That is the list. No MSG, no nitrates, no soy, no sugar fillers padding out the weight.",
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
              Plaas Gedrag is not a factory. It is a farmer, a drying room, and
              a stubborn belief that biltong should taste of the animal and the
              air it dried in. Nothing else.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee />
      <StoryParallax />

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
