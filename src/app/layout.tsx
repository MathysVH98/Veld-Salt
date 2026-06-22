import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AmbientVeld from "@/components/AmbientVeld";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plaas Gedrag | Air-dried Biltong from the Waterberg",
  description:
    "Premium South African biltong and droëwors, beef and game. Hand-cut, slow air-dried, sourced from a single farm in the Waterberg region of Limpopo.",
  keywords: [
    "biltong",
    "droewors",
    "South African biltong",
    "Waterberg",
    "Limpopo",
    "air-dried beef",
  ],
  openGraph: {
    title: "Plaas Gedrag | Air-dried Biltong from the Waterberg",
    description: "Hand-cut, slow air-dried biltong from a single Waterberg farm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-espresso text-bone">
        <AmbientVeld />
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <WhatsAppFloat />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
