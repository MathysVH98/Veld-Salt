export type Category = "Biltong" | "Droëwors" | "Gifting";

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
  /** optional real product photo (in /public); falls back to the procedural visual */
  image?: string;
}

export const CATEGORIES: Category[] = ["Biltong", "Droëwors", "Gifting"];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "geelvet-biltong",
    name: "Geelvet Biltong",
    category: "Biltong",
    price: 390,
    weight: "per kg",
    blurb: "Our flagship cut. Grass-fed Waterberg beef with its signature yellow fat, coriander, rock salt and a whisper of vinegar, air-dried slow.",
    spice: 0,
    tags: ["bestseller", "grass-fed"],
    featured: true,
    tone: ["#7A241D", "#431311"],
    image: "/products/geelvet-biltong.png",
  },
  {
    id: "p02",
    slug: "beef-droewors",
    name: "Beef Droëwors",
    category: "Droëwors",
    price: 390,
    weight: "per kg",
    blurb: "Coiled farm sausage from the same beef, air-dried until it snaps. Coriander forward, honest and lean.",
    spice: 1,
    tags: ["bestseller"],
    featured: true,
    tone: ["#7A3A1D", "#3A1A0E"],
    image: "/products/beef-droewors.jpg",
  },
  {
    id: "p03",
    slug: "game-biltong",
    name: "Game Biltong",
    category: "Biltong",
    price: 320,
    weight: "per kg",
    blurb: "Free-roaming Waterberg venison. Lean, dark and unmistakably wild, cured by hand the old way.",
    spice: 1,
    tags: ["wild"],
    featured: true,
    tone: ["#5A3A28", "#241410"],
    image: "/products/game-biltong.jpg",
  },
  {
    id: "p04",
    slug: "game-droewors",
    name: "Game Droëwors",
    category: "Droëwors",
    price: 320,
    weight: "per kg",
    blurb: "Venison coil with a deep, gamey bite. Slow-dried farm sausage for those who like it wild.",
    spice: 1,
    tags: ["wild"],
    featured: true,
    tone: ["#6A4A2E", "#2E1E10"],
    image: "/products/game-droewors.png",
  },
  {
    id: "p05",
    slug: "beef-gift-hamper",
    name: "Beef Gift Hamper",
    category: "Gifting",
    price: 780,
    weight: "2kg (1kg biltong, 1kg droëwors)",
    blurb: "A full crate of our beef biltong and droëwors, boxed to gift. Priced per kg, no markup on the meat.",
    spice: 1,
    tags: ["gift", "bestseller"],
    featured: true,
    tone: ["#5C1A16", "#15110E"],
    image: "/products/gift-hamper.webp",
  },
  {
    id: "p06",
    slug: "game-gift-hamper",
    name: "Game Gift Hamper",
    category: "Gifting",
    price: 640,
    weight: "2kg (1kg biltong, 1kg droëwors)",
    blurb: "Our Waterberg venison biltong and droëwors paired in one box. The full wild story, priced per kg.",
    spice: 1,
    tags: ["gift", "wild"],
    featured: true,
    tone: ["#4A3A28", "#15110E"],
    image: "/products/gift-hamper.webp",
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
