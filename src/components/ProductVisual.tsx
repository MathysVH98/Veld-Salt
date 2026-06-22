import { Product } from "@/lib/products";

/**
 * Procedural, dependency-free product visual.
 * Renders a stylised "cut on a board" composition from the product's tone,
 * so the catalogue looks designed without any external image assets.
 */
export default function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [a, b] = product.tone;
  const id = product.id;

  // deterministic speckle positions from the product id
  const seed = id.charCodeAt(1) + id.charCodeAt(2);
  const speckles = Array.from({ length: 22 }, (_, i) => {
    const x = ((seed * (i + 3) * 53) % 360) + 20;
    const y = ((seed * (i + 7) * 31) % 240) + 30;
    const r = ((seed * (i + 1)) % 3) + 1;
    return { x, y, r };
  });

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={`${product.name} visual`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#241D17" />
          <stop offset="100%" stopColor="#15110E" />
        </radialGradient>
        <linearGradient id={`meat-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
        <linearGradient id={`fat-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2E9D8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#CFC6B5" stopOpacity="0.6" />
        </linearGradient>
        <filter id={`soft-${id}`}>
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      <rect width="400" height="300" fill={`url(#bg-${id})`} />

      {/* board */}
      <ellipse cx="200" cy="250" rx="170" ry="34" fill="#0E0B09" opacity="0.7" />

      {/* the cut */}
      <g filter={`url(#soft-${id})`}>
        <path
          d="M70 150 C 80 110, 150 95, 210 100 C 290 106, 340 130, 332 168 C 326 200, 250 214, 180 210 C 110 206, 60 192, 70 150 Z"
          fill={`url(#meat-${id})`}
          stroke="#0E0B09"
          strokeWidth="2"
        />
        {/* fat rim */}
        <path
          d="M70 150 C 80 110, 150 95, 210 100 C 250 103, 285 112, 305 126"
          fill="none"
          stroke={`url(#fat-${id})`}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* cut face highlight */}
        <path
          d="M150 120 C 200 118, 250 126, 280 145 C 250 150, 200 150, 160 145 Z"
          fill="#F2E9D8"
          opacity="0.08"
        />
        {/* spice speckle */}
        {speckles.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={Math.min(s.y, 205)}
            r={s.r}
            fill={i % 3 === 0 ? "#D6A24A" : "#0E0B09"}
            opacity={i % 3 === 0 ? 0.55 : 0.4}
          />
        ))}
      </g>

      {/* category tag */}
      <text
        x="200"
        y="282"
        textAnchor="middle"
        fill="#8A9079"
        fontSize="11"
        letterSpacing="4"
        fontFamily="var(--font-manrope)"
        style={{ textTransform: "uppercase" }}
      >
        {product.category}
      </text>
    </svg>
  );
}
