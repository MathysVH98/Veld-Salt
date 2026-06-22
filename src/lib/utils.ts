import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = {
  name: "Veld & Salt",
  tagline: "Air-dried. Hand-cut. Proudly Waterberg.",
  region: "Waterberg, Limpopo",
  whatsapp: "27000000000", // replace with real number, format: country code + number, no +
  email: "orders@veldandsalt.co.za",
  phone: "+27 00 000 0000",
};

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
