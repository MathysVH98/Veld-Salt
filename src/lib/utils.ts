import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = {
  name: "Veld & Salt",
  tagline: "Air-dried. Hand-cut. Proudly Waterberg.",
  region: "Waterberg, Limpopo",
  whatsapp: "27783186923", // format: country code + number, no +
  email: "21rssolutions@gmail.com",
  phone: "+27 78 318 6923",
};

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
