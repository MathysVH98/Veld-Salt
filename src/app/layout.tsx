import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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
  title: "Veld & Salt | Air-dried Biltong from the Waterberg",
  description:
    "Premium South African biltong, droëwors and chilli bites. Hand-cut, slow air-dried, sourced from a single farm in the Waterberg region of Limpopo.",
  keywords: [
    "biltong",
    "droewors",
    "South African biltong",
    "Waterberg",
    "Limpopo",
    "air-dried beef",
  ],
  openGraph: {
    title: "Veld & Salt | Air-dried Biltong from the Waterberg",
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
      <body className="grain bg-espresso text-bone">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
