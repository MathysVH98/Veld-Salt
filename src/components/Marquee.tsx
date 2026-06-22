"use client";

const WORDS = [
  "Air-dried",
  "Hand-cut",
  "Grass-fed",
  "Waterberg",
  "Single-farm",
  "No preservatives",
  "Slow-cured",
  "Proudly Limpopo",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-oxblood-deep py-6">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-bone/90 md:text-3xl">
              {w}
            </span>
            <span className="text-coriander">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
