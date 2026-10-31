import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Serif, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/supabase/queries/settings";
import NextTopLoader from 'nextjs-toploader';

const settings = await getSettings();

export const metadata: Metadata = {
  title: settings.company_name,
  description:
    "Elite Himalayan trekking expeditions with premium safety protocols",
};

const noto = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${noto.variable} ${vietnam.variable} antialiased`}>
        <Suspense fallback={null}>
          <NextTopLoader color="#002046" shadow={false} showSpinner={false} />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
