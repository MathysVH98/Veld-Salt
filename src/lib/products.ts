export type Category =
  | "Biltong"
  | "Droëwors"
  | "Chilli Bites"
  | "Snapsticks"
  | "Gifting";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // ZAR
  weight: string;
  blurb: string;
  spice: 0 | 1 | 2 | 3;
  tags: string[];
  featured?: boolean;
  /** hue pair used by the procedural product visual */
  tone: [string, string];
}

export const CATEGORIES: Category[] = [
  "Biltong",
  "Droëwors",
  "Chilli Bites",
  "Snapsticks",
  "Gifting",
];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "original-beef-biltong",
    name: "Original Beef Biltong",
    category: "Biltong",
    price: 95,
    weight: "250g",
    blurb: "Our flagship cut. Grass-fed silverside, coriander, rock salt, a whisper of vinegar.",
    spice: 0,
    tags: ["bestseller", "grass-fed"],
    featured: true,
    tone: ["#7A241D", "#431311"],
  },
  {
    id: "p02",
    slug: "garlic-biltong",
    name: "Roasted Garlic Biltong",
    category: "Biltong",
    price: 99,
    weight: "250g",
    blurb: "Slow-roasted garlic folded into the cure for a deep, savoury finish.",
    spice: 1,
    tags: ["savoury"],
    featured: true,
    tone: ["#8A6A2E", "#3E2D11"],
  },
  {
    id: "p03",
    slug: "peri-peri-biltong",
    name: "Peri-Peri Biltong",
    category: "Biltong",
    price: 105,
    weight: "250g",
    blurb: "African bird's-eye chilli with a citrus edge. Heat that lingers, not burns.",
    spice: 3,
    tags: ["hot", "limited"],
    featured: true,
    tone: ["#B5402A", "#5C1A16"],
  },
  {
    id: "p04",
    slug: "fatty-biltong",
    name: "Fatty Cut Biltong",
    category: "Biltong",
    price: 110,
    weight: "250g",
    blurb: "For the purists. Marbled cuts dried to a tender, melt-in-the-mouth chew.",
    spice: 0,
    tags: ["premium"],
    tone: ["#9A8252", "#4A3A1C"],
  },
  {
    id: "p05",
    slug: "classic-droewors",
    name: "Classic Droëwors",
    category: "Droëwors",
    price: 89,
    weight: "200g",
    blurb: "Coiled farm sausage, air-dried slow until it snaps. Coriander forward.",
    spice: 1,
    tags: ["bestseller"],
    featured: true,
    tone: ["#7A3A1D", "#3A1A0E"],
  },
  {
    id: "p06",
    slug: "chilli-droewors",
    name: "Chilli Droëwors",
    category: "Droëwors",
    price: 95,
    weight: "200g",
    blurb: "The classic coil with a Waterberg chilli kick worked through the mince.",
    spice: 2,
    tags: ["hot"],
    tone: ["#A8341F", "#4A140C"],
  },
  {
    id: "p07",
    slug: "cheese-chilli-bites",
    name: "Cheese & Chilli Bites",
    category: "Chilli Bites",
    price: 79,
    weight: "150g",
    blurb: "Bite-sized biltong cubes tossed with chilli and a dusting of hard cheese.",
    spice: 2,
    tags: ["snack", "new"],
    tone: ["#C8893C", "#5C3A14"],
  },
  {
    id: "p08",
    slug: "smoky-chilli-bites",
    name: "Smoky Chilli Bites",
    category: "Chilli Bites",
    price: 75,
    weight: "150g",
    blurb: "Cubed, kissed with smoke, then rolled in a smoked-paprika chilli rub.",
    spice: 2,
    tags: ["snack"],
    tone: ["#9A4A2A", "#451A10"],
  },
  {
    id: "p09",
    slug: "original-snapsticks",
    name: "Original Snapsticks",
    category: "Snapsticks",
    price: 69,
    weight: "12 sticks",
    blurb: "Lunchbox-ready droëwors sticks. One snap and you're hooked.",
    spice: 1,
    tags: ["kids", "lunchbox"],
    tone: ["#7A4A24", "#3A2010"],
  },
  {
    id: "p10",
    slug: "bbq-snapsticks",
    name: "BBQ Snapsticks",
    category: "Snapsticks",
    price: 72,
    weight: "12 sticks",
    blurb: "Sweet-smoky braai-spice sticks. The crowd-pleaser of the range.",
    spice: 1,
    tags: ["lunchbox"],
    tone: ["#B5402A", "#5C2A16"],
  },
  {
    id: "p11",
    slug: "biltong-powder-rub",
    name: "Veld Spice Rub",
    category: "Gifting",
    price: 65,
    weight: "120g",
    blurb: "Our house cure in a jar. Coriander, salt, pepper, a few secrets from the farm.",
    spice: 1,
    tags: ["pantry"],
    tone: ["#D6A24A", "#7A5A1E"],
  },
  {
    id: "p12",
    slug: "the-trekker-box",
    name: "The Trekker Gift Box",
    category: "Gifting",
    price: 349,
    weight: "Mixed 800g",
    blurb: "A curated crate of biltong, droëwors and chilli bites. The full Waterberg story.",
    spice: 1,
    tags: ["gift", "bestseller"],
    featured: true,
    tone: ["#5C1A16", "#15110E"],
  },
  {
    id: "p13",
    slug: "lean-slab-biltong",
    name: "Lean Slab Biltong",
    category: "Biltong",
    price: 115,
    weight: "300g",
    blurb: "Sliced to order from a whole lean slab. Firm, dark, intensely beefy.",
    spice: 0,
    tags: ["premium", "lean"],
    tone: ["#6A201A", "#2E0F0C"],
  },
  {
    id: "p14",
    slug: "venison-biltong",
    name: "Kudu Venison Biltong",
    category: "Biltong",
    price: 145,
    weight: "200g",
    blurb: "Free-roaming Waterberg kudu. Lean, gamey, and unmistakably wild.",
    spice: 1,
    tags: ["wild", "limited", "premium"],
    featured: true,
    tone: ["#5A3A28", "#241410"],
  },
  {
    id: "p15",
    slug: "boere-droewors",
    name: "Boere Droëwors",
    category: "Droëwors",
    price: 92,
    weight: "200g",
    blurb: "Old-recipe coil with nutmeg and clove. The taste of a farmhouse Sunday.",
    spice: 1,
    tags: ["heritage"],
    tone: ["#7A4A1E", "#3A2410"],
  },
  {
    id: "p16",
    slug: "ghost-chilli-bites",
    name: "Ghost Chilli Bites",
    category: "Chilli Bites",
    price: 89,
    weight: "150g",
    blurb: "Not for the faint-hearted. Naga heat over deep-cured beef cubes.",
    spice: 3,
    tags: ["extra hot", "limited"],
    tone: ["#A8341F", "#3A0E08"],
  },
  {
    id: "p17",
    slug: "biltong-subscription",
    name: "Monthly Biltong Club",
    category: "Gifting",
    price: 279,
    weight: "600g / month",
    blurb: "A rotating box delivered monthly. New cut, new spice, every single time.",
    spice: 1,
    tags: ["subscription", "gift"],
    tone: ["#8A9079", "#3A4030"],
  },
  {
    id: "p18",
    slug: "droewors-snapstick-combo",
    name: "Snapstick Variety Pack",
    category: "Snapsticks",
    price: 129,
    weight: "24 sticks",
    blurb: "Original and BBQ in one box. Built for road trips and rugby Saturdays.",
    spice: 1,
    tags: ["value", "lunchbox"],
    tone: ["#9A5A2A", "#451E10"],
  },
];

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function getByCategory(category: Category | "All") {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatZAR(n: number) {
  return "R" + n.toFixed(0);
}
