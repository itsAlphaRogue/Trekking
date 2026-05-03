import type { Metadata } from "next";
import { Noto_Serif, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himalayan Vistas",
  description:
    "Elite Himalayan trekking expeditions with premium safety protocols",
};

const noto = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
});

const vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
